import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Input from '@/components/auth/Input';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  photo: '',
};

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState(initialState);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { email, password } = formData;
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (res && res.status === 200) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className='max-w-sm mx-auto'>
      <div className='font-content border-2 p-6 rounded-md shadow-2xl'>
        <h2 className='text-2xl text-center font-heading py-6 lg:py-10'>
          Sign In
        </h2>
        <form className='' onSubmit={handleSubmit}>
          <div className='space-y-3'>
            <Input
              name='email'
              label='Email address'
              handleChange={handleChange}
              type='email'
            />
            <Input
              name='password'
              label='Password'
              handleChange={handleChange}
              type={'password'}
            />
          </div>
          <div className='flex items-center justify-end mt-3'>
            <button
              type='submit'
              className='border-2 px-3 py-2 font-semibold rounded-md border-electric-violet-500 text-electric-violet-500 hover:bg-electric-violet-500 hover:text-white transition duration-300 ease-in-out'
            >
              Sign In
            </button>
          </div>

          <div className='flex items-center justify-end mt-3'>
            <button>
              <Link
                href='/auth/register'
                className='hover:underline text-razzle-dazzle-rose-900'
              >
                Don&apos;t have an acount? Sign Up
              </Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
