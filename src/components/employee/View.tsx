import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { CgProfile } from 'react-icons/cg';
import { AiOutlinePhone } from 'react-icons/ai';
import { HiMail } from 'react-icons/hi';
import { HiOutlineLibrary } from 'react-icons/hi';

interface ViewProps {
  setOpenView: (openView: boolean) => void;
  employee: {
    name: string;
    photo: string;
    phone: string;
    department: string;
    email: string;
  };
}

const View = ({ setOpenView, employee }: ViewProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setOpenView(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleOverlayClick);
    return () => {
      document.removeEventListener('mousedown', handleOverlayClick);
    };
  }, []);
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-10'>
      <div className='bg-white rounded-lg p-6 w-full max-w-lg' ref={modalRef}>
        <div className='text-2xl font-heading text-center pb-6'>
          Employee details
        </div>
        <div className='flex flex-col md:flex-row items-center justify-around'>
          <div className='md:w-1/3 mx-auto'>
            {employee.photo ? (
              <Image
                className='h-32 w-32 object-cover border shadow-lg drop-shadow-lg rounded-full'
                src={employee.photo}
                alt={`a picture of ${employee?.name}`}
                width={48}
                height={48}
              />
            ) : (
              <CgProfile className='h-12 w-12 rounded-full shadow-lg drop-shadow-lg' />
            )}
          </div>
          <div className='md:w-3/4 py-6 text-razzle-dazzle-rose-950 md:ml-10'>
            <div className='flex items-center justify-start space-x-2'>
              <CgProfile className='text-xl text-razzle-dazzle-rose-700' />{' '}
              <span>{employee?.name}</span>
            </div>
            <div className='flex items-center justify-start space-x-2'>
              <HiMail className='text-xl text-razzle-dazzle-rose-700' />{' '}
              <span>{employee?.email}</span>
            </div>
            <div className='flex items-center justify-start space-x-2'>
              <AiOutlinePhone className='text-xl text-razzle-dazzle-rose-700' />{' '}
              <span>{employee?.phone}</span>
            </div>
            <div className='flex items-center justify-start space-x-2'>
              <HiOutlineLibrary className='text-xl text-razzle-dazzle-rose-700' />{' '}
              <span>{employee?.department}</span>
            </div>
          </div>
        </div>
        <div className='pt-6 flex items-center justify-center'>
          <button
            onClick={() => setOpenView(false)}
            className='text-lg px-3 py-2 font-content border-2 border-electric-violet-500 text-razzle-dazzle-rose-950 hover:border-razzle-dazzle-rose-500 hover:text-white font-semibold hover:bg-razzle-dazzle-rose-500 focus:outline-none focus:border-razzle-dazzle-rose-500 rounded-lg text-center transition-all duration-300 ease-in-out'
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default View;
