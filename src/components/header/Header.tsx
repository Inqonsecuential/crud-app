import React from 'react';
import { BiLogoSketch } from 'react-icons/bi';
import AccountMenu from '@/components/header/AccountMenu';
import Link from 'next/link';

export default function Header() {
  return (
    <div className='bg-electric-violet-700 py-2 shadow-lg'>
      <div className='max-w-7xl px-6 mx-auto'>
        <div className='flex items-center justify-between'>
          <div>
            <Link href='/' style={{ textDecoration: 'none' }}>
              <BiLogoSketch className='text-6xl text-electric-violet-300' />
            </Link>
          </div>
          <AccountMenu />
        </div>
      </div>
    </div>
  );
}
