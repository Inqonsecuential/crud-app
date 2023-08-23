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
        return alert('User does not exist. Please register first.');
      const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password,
      );
      if (!isPasswordCorrect)
        return alert('Invalid credentials. Please try again.');
      const token = Jwt.sign(
        { email: existingUser.email, id: existingUser._id },
        'test',
        { expiresIn: '30m' },
      );
      if (res.status(401))
        return alert('Invalid credentials. Please try again.');
      if (!token) return alert('Token generation failed.');
      res.status(200).json({ result: existingUser, token });
    } catch (error) {
      console.log(error);

      res.status(500).json({ message: 'Something went wrong.' });
    }
  }
}
