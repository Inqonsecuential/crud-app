import Employee from '@/backend/models/employeeModel';
import connectMongo from '@/backend/utils/connectMongo';

export async function getEmployees() {
  await connectMongo();
  const employees = await Employee.find({});
  return JSON.parse(JSON.stringify(employees));
}
