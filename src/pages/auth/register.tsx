import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, ChangeEvent } from 'react';
import { signUp } from '../../actions/actions/auth';
import Input from '@/components/auth/Input';
import Image from 'next/image';
const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  photo: '',
};
const Register = () => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [formData, setFormData] = useState(initialState);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedImage(file);
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      }).then((base64) => {
        setFormData((prevValues) => ({
          ...prevValues,
          photo: base64 as string,
        }));
      });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await signUp(formData);
    router.push('/auth/login');
  };
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className='mx-auto font-content border max-w-md shadow-2xl rounded-md'>
        <h2 className='text-center py-6 lg:py-10 text-2xl font-heading'>
          Register
        </h2>
        <div className='max-w-sm mx-auto px-2'>
          <form onSubmit={handleSubmit}>
            <div className='space-y-3'>
              <div className='flex w-full space-x-2'>
                <Input
                  name='firstName'
                  label='First name'
                  handleChange={handleChange}
                  autoFocus
                />
                <Input
                  name='lastName'
                  label='Last name'
                  handleChange={handleChange}
                />
              </div>
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
              <Input
                name='confirmPassword'
                label='Repeat password'
                handleChange={handleChange}
                type='password'
              />
              <div className='border-2 text-center text-gray-400 px-3 py-2 rounded-lg border-electric-violet-500 hover:border-razzle-dazzle-rose-600'>
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleImageChange}
                  className='hidden'
                  id='image-upload-input'
                />
                <label htmlFor='image-upload-input' className=''>
                  Select Image
                </label>
                {selectedImage && (
                  <div className='mt-4 mx-auto flex items-center justify-center pb-3'>
                    <Image
                      src={URL.createObjectURL(selectedImage)}
                      alt='Selected'
                      className='w-44 h-44 object-cover rounded-full border-2 shadow-xl drop-shadow-xl'
                      width={200}
                      height={200}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className='mt-6 flex items-center justify-end'>
              <button
                type='submit'
                className='px-3 py-2 border-2 rounded-md border-electric-violet-500 bg-electric-violet-500 text-white font-semibold hover:border-razzle-dazzle-rose-500 hover:bg-razzle-dazzle-rose-500 focus:outline-none focus:border-razzle-dazzle-rose-500 transition-all duration-300 ease-in-out '
              >
                Register
              </button>
            </div>
            <div className='mt-3 flex items-center justify-end'>
              <button>
                <Link href='/auth/login' className='hover:underline'>
                  Already have an acount? Sign In
                </Link>
              </button>
            </div>
          </form>
        </div>
        <div className='text-xs pt-10 pb-1 px-3 text-center'>
          Note: Please do not use any Banking or social media password. I have
          not invested anything on security.{' '}
        </div>
      </div>
    </>
  );
};

export default Register;
