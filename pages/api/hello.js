// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  console.log("api session");
  console.log(session);

  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }


  res.status(200).json({ name: 'John Doe' })
}
