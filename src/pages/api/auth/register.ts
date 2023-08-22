import bcrypt from 'bcryptjs';
import User from '@/backend/models/user';
import connectMongo from '@/backend/utils/connectMongo';
import { NextApiRequest, NextApiResponse } from 'next';
// import Jwt from 'jsonwebtoken';

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
      console.log(req.body);
      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res.status(400).json({ message: 'User already exists.' });
      if (password !== confirmPassword)
        return res.status(400).json({ message: "Passwords don't match." });
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        photo,
      });
      // const token = Jwt.sign({email: user.email, id: user._id}, 'test', {expiresIn: "1h"});
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
