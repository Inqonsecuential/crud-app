import { getEmployees } from '@/backend/utils/api-utils';
import Index from '@/components/employee/Index';
import { NextApiRequest, NextApiResponse } from 'next';

const Home = ({ employees }: any) => {
  return <Index employees={employees} />;
};

export async function getStaticProps(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const employees = await getEmployees();
  return {
    props: {
      employees: employees,
    },
    revalidate: 5,
  };
}

export default Home;
