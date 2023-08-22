import { useState } from 'react';
import Image from 'next/image';
import Form from '@/components/employee/Form';
import View from '@/components/employee/View';
import Delete from '@/components/employee/Delete';
import { useSession } from 'next-auth/react';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { HiMail } from 'react-icons/hi';
import { LiaUserEditSolid } from 'react-icons/lia';
import { HiOutlineLibrary } from 'react-icons/hi';
import {
  AiOutlineEye,
  AiOutlineUserDelete,
  AiOutlinePhone,
} from 'react-icons/ai';
import AddEditModal from '@/components/modals/add-edit-modal';

const Index = ({ employees }: any) => {
  const { status } = useSession();
  const [employee, setEmployee] = useState<any>('');
  const [openView, setOpenView] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [addEdit, setAddEdit] = useState(false);

  const handleEdit = (employee: any) => {
    setAddEdit(true);
    setEmployee(employee);
  };
  const handleOpenDelete = (employee: any) => {
    setOpenDelete(true);
    setEmployee(employee);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
    setEmployee(' ');
  };
  const handleOpenView = (employee: any) => {
    setOpenView(true);
    setEmployee(employee);
  };

  return (
    <>
      {employee && openView && (
        <View setOpenView={setOpenView} employee={employee} />
      )}
      {employee && openDelete && (
        <Delete
          openDelete={openDelete}
          handleCloseDelete={handleCloseDelete}
          employee={employee}
        />
      )}
      <div className='bg-white shadow max-w-7xl  mx-auto overflow-hidden sm:rounded-md'>
        <div className='flex items-center justify-between px-6 py-2'>
          <h1 className='font-heading text-xl text-electric-violet-900'>
            List of Employees
          </h1>
          <div>
            <AiOutlineUserAdd
              className='text-3xl text-brandPink cursor-pointer text-electric-violet-500 hover:text-razzle-dazzle-rose-500'
              onClick={() => {
                setAddEdit(true);
                setEmployee('');
              }}
            />
            <AddEditModal modal={addEdit} setModal={setAddEdit}>
              <Form
                closeModal={() => {
                  setAddEdit(false);
                  setEmployee('');
                }}
                employee={employee}
              />
            </AddEditModal>
          </div>
        </div>
        <ul role='list' className='divide-y divide-gray-200'>
          {employees.length > 0 ? (
            employees.map((employee: any) => (
              <li key={employee._id}>
                <a href={employee.href} className='block hover:bg-gray-50'>
                  <div className='flex items-center px-4 py-4 sm:px-6'>
                    <div className='min-w-0 flex-1 flex items-center'>
                      <div className=''>
                        {employee.photo ? (
                          <Image
                            className='h-20 w-20 object-cover border shadow-lg drop-shadow-lg rounded-full'
                            src={employee.photo}
                            alt={`a picture of ${employee?.name}`}
                            width={48}
                            height={48}
                          />
                        ) : (
                          <CgProfile className='h-12 w-12 rounded-full shadow-lg drop-shadow-lg' />
                        )}
                      </div>
                      <div className='min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4'>
                        <div>
                          <p className='text-xl font-medium text-electric-violet-700 truncate font-heading'>
                            {employee.name}
                          </p>
                          <div className='flex lg:space-x-3 flex-col lg:flex-row font-content'>
                            <p className='mt-2 flex items-center text-sm text-razzle-dazzle-rose-700'>
                              <HiMail
                                className='flex-shrink-0 mr-1.5 h-5 w-5 text-razzle-dazzle-rose-800'
                                aria-hidden='true'
                              />
                              <span className='truncate'>{employee.email}</span>
                            </p>
                            <p className='mt-2 flex items-center text-sm text-razzle-dazzle-rose-700'>
                              <AiOutlinePhone
                                className='flex-shrink-0 mr-1.5 h-5 w-5 text-razzle-dazzle-rose-800'
                                aria-hidden='true'
                              />
                              <span className='truncate'>{employee.phone}</span>
                            </p>
                            <p className='mt-2 flex items-center text-sm text-razzle-dazzle-rose-700'>
                              <HiOutlineLibrary
                                className='flex-shrink-0 mr-1.5 h-5 w-5 text-razzle-dazzle-rose-800'
                                aria-hidden='true'
                              />
                              <span className='truncate'>
                                {employee.department}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='flex space-x-3'>
                      <div>
                        <AiOutlineEye
                          className='h-6 w-6 text-razzle-dazzle-rose-800'
                          aria-hidden='true'
                          onClick={() => handleOpenView(employee)}
                        />
                      </div>
                      <div className='flex items-center space-x-1.5'>
                        <LiaUserEditSolid
                          className='h-5 w-6 text-razzle-dazzle-rose-800'
                          aria-hidden='true'
                          onClick={() => handleEdit(employee)}
                        />
                        <div>
                          <AiOutlineUserDelete
                            className='h-5 w-5 text-razzle-dazzle-rose-800'
                            aria-hidden='true'
                            onClick={() => handleOpenDelete(employee)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            ))
          ) : (
            <div className='text-base font-content py-3 px-6'>
              No Employee Found.
            </div>
          )}
        </ul>
      </div>
    </>
  );
};

export default Index;
