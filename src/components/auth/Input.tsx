import React from 'react';

interface InputProps {
  name: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  autoFocus?: boolean;
  type?: string;
}

const Input = ({ name, handleChange, label, autoFocus, type }: InputProps) => (
  <div>
    <input
      name={name}
      className='w-full p-2 border-2 text-base text-razzle-dazzle-rose-950 border-electric-violet-500 rounded-lg text-center focus:border-razzle-dazzle-rose-500 focus:outline-none outline-none transition duration-500 ease-in-out hover:border-razzle-dazzle-rose-600'
      onChange={handleChange}
      required
      placeholder={label}
      autoFocus={autoFocus}
      type={type}
    />
  </div>
);
export default Input;
