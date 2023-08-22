import Employee from '@/backend/models/employeeModel';
import connectMongo from '@/backend/utils/connectMongo';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    method,
    query: { id },
  } = req;
  await connectMongo().catch(() =>
    res.status(405).json({ error: 'Error in the connection' }),
  );
  switch (method) {
    case 'PUT':
      const employee = await Employee.findByIdAndUpdate(id, req.body);
      res.status(200).json(employee);
      break;
    case 'DELETE':
      await Employee.findByIdAndDelete(id);
      res.status(200).json('Employee deleted');
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} not allowed`);
      break;
  }
}
