import { connectToDatabase } from "@/lib/db";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize(credentials) {
        const client = await connectToDatabase();

        client.close();
      },
    }),
  ],
});
