import User from '@/backend/models/user';
import connectMongo from '@/backend/utils/connectMongo';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    method,
    query: { email },
  } = req;
  await connectMongo().catch(() =>
    res.status(405).json({ error: 'Error in the connection' }),
  );
  if (method === 'GET') {
    try {
      const user = await User.findOne({ email });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
