import Jwt from 'jsonwebtoken';
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
    const { email, password } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (!existingUser)
        return res.status(404).json({ message: "User doesn't exist." });
      const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password,
      );
      if (!isPasswordCorrect)
        return res.status(400).json({ message: 'Invalid credentials.' });
      const token = Jwt.sign(
        { email: existingUser.email, id: existingUser._id },
        'test',
        { expiresIn: '1h' },
      );
      res.status(200).json({ result: existingUser, token });
    } catch (error) {
      console.log(error);

      res.status(500).json({ message: 'Something went wrong.' });
    }
  }
}
