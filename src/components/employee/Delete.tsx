import React, { useRef, useEffect } from 'react';
import { deleteEmployee } from '@/actions/actions/employee';

interface DeleteProps {
  handleCloseDelete: () => void;
  openDelete: boolean;
  employee: {
    name: string;
    _id: string;
  };
}

const Delete = ({ handleCloseDelete, employee }: DeleteProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handelDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await deleteEmployee(employee._id);
    handleCloseDelete;
    window.location.reload();
  };

  const handleOverlayClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleCloseDelete();
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
      <div className='w-[400px] bg-white rounded-lg p-6' ref={modalRef}>
        <h2 className='text-center text-2xl font-heading'>
          Delete {employee.name}
        </h2>
        <div className='text-center'>
          <div className='text-lg pt-3'>
            Do you want to delete employee <b>{employee.name}</b>?
          </div>
          <div className='text-sm py-2 text-red'>
            <p>Note: after deletion you will not see this record.</p>
          </div>
        </div>
        <div className='flex items-center justify-center space-x-3 mt-4'>
          <button
            type='submit'
            onClick={handelDelete}
            className='text-lg font-content border-2 w-16 text-razzle-dazzle-rose-950 border-electric-violet-500 font-semibold hover:text-white focus:outline-none hover:bg-electric-violet-500 rounded-lg py-2 px-3 text-center transition-all duration-300 ease-in-out'
          >
            Yes
          </button>
          <button
            onClick={handleCloseDelete}
            className='text-lg font-content border-2 w-16 text-razzle-dazzle-rose-950 border-electric-violet-500 font-semibold hover:text-white hover:border-razzle-dazzle-rose-500 focus:outline-none hover:bg-razzle-dazzle-rose-500 focus:border-razzle-dazzle-rose-500 rounded-lg py-2 px-3 text-center transition-all duration-300 ease-in-out'
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};
export default Delete;
