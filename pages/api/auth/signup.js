import { hashPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(422).json({
      message: "Invalid http request",
    });
    return;
  }
  const data = req.body;

  const { email, password } = data;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message: "Invalid input - password should be at least 7 characters long",
    });

    return;
  }

  const client = await connectToDatabase();

  const db = client.db();

  const existingUser = await db.collection("users").findOne({ email: email });

  if (existingUser) {
    res.status(422).json({
      message: "This user already exists",
    });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(password);

  const result = db
    .collection("users")
    .insertOne({ email: email, password: hashedPassword });

  res.status(201).json({
    message: "Created user",
  });
};

export default handler;
