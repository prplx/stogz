import { NextApiRequest, NextApiResponse } from "next";
import jwt from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const secret = process.env.JWT_SECRET as string;
  const token = await jwt.getToken({ req, secret });
  console.log("token:", token);
  res.end();
}
