import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { getUserByEmail } from '@/actions/actions/auth';
import { useRouter } from 'next/router';
import { CgProfile } from 'react-icons/cg';
import { GoSignIn } from 'react-icons/go';

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

const AccountMenu = () => {
  const router = useRouter();
  const { data } = useSession();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (data && data.user) {
      getUserByEmail(data.user.email)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => console.log(error));
    }
  }, [data]);

  const handleLogout = () => {
    signOut();
    router.push('/auth/login');
  };
  return !data ? (
    <Link
      href='/auth/login'
      className='text-lg font-heading text-razzle-dazzle-rose-200'
    >
      <div className='flex items-center justify-center space-x-3'>
        <GoSignIn className='text-4xl font-bold' />
        <span>Sign In</span>
      </div>
    </Link>
  ) : (
    <React.Fragment>
      <div className='py-1'>
        <div className='flex items-center justify-center space-x-3 text-electric-violet-300'>
          <div>
            <div className='font-semibold text-xl font-heading'>
              {user?.firstName + ' ' + user?.lastName}
            </div>
            <button
              className='font-heading text-razzle-dazzle-rose-300'
              onClick={handleLogout}
            >
              Sign Out
            </button>
          </div>
          <CgProfile className='text-6xl' />
        </div>
      </div>
    </React.Fragment>
  );
};
export default AccountMenu;
