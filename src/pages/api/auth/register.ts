import bcrypt from 'bcryptjs';
import User from '@/backend/models/user';
import connectMongo from '@/backend/utils/connectMongo';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await connectMongo().catch(() =>
    res.status(405).json({ error: 'Error in the connection' }),
  );
  if (req.method === 'POST') {
    const { firstName, lastName, email, password, confirmPassword, photo } =
      req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) return alert('User already exists');
      if (password !== confirmPassword) return alert("Passwords don't match");

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        photo,
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
