import React, { useState, ChangeEvent, useEffect } from 'react';
import Image from 'next/image';
import { addEmployee, editEmployee } from '@/actions/actions/employee';

interface InitialFormData {
  name: string;
  email: string;
  phone: string;
  department: string;
  photo: ArrayBuffer | string | null;
}

const initialFormData: InitialFormData = {
  name: '',
  email: '',
  department: '',
  phone: '',
  photo: null,
};

const Form = ({ employee, closeModal }: any) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false); // State to indicate if request is running
  const [errors, setErrors] = useState({
    email: false,
    name: false,
    phone: false,
  });
  const [errorTexts, setErrorTexts] = useState({
    name: '',
    email: '',
    phone: '',
  });

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name) {
      setErrors({ ...errors, name: true }); // Update the 'name' error flag
      setErrorTexts({ ...errorTexts, name: 'Name is required' }); // Update the 'name' error message
    } else if (!formData.email) {
      setErrors({ ...errors, email: true }); // Update the 'email' error flag
      setErrorTexts({ ...errorTexts, email: 'Email is required' }); // Update the 'email' error message
    } else if (!formData.phone) {
      setErrors({ ...errors, phone: true }); // Update the 'phone' error flag
      setErrorTexts({ ...errorTexts, phone: 'Phone is required' }); // Update the 'phone' error message
    } else {
      setLoading(true);
      if (employee) {
        const res = editEmployee(employee._id, formData);
      } else {
        addEmployee(formData);
        setLoading(false);
        window.location.reload();
      }
    }
  };

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    }
  }, [employee]);

  const handleClear = () => {
    setFormData(initialFormData);
    setSelectedImage(null);
    setErrorTexts({
      name: '',
      email: '',
      phone: '',
    });
  };

  return (
    <div className='py-6 font-content'>
      <h2 className='text-center font-heading pb-6 text-2xl'>
        {employee ? `Edit Employee` : `Add Employee`}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className='grid  md:grid-cols-2 gap-2 mx-auto'>
          <div className='mx-auto'>
            <input
              onError={() => errors.name}
              className='text-lg font-content border-2 text-razzle-dazzle-rose-950 border-electric-violet-500 hover:border-razzle-dazzle-rose-500 focus:outline-none focus:border-razzle-dazzle-rose-500 rounded-lg py-2 px-3 text-center transition-all duration-300 ease-in-out'
              placeholder='Name'
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            {errors.name && (
              <div className='text-center text-sm py-1 pb-3 text-red-500'>
                {errorTexts.name}
              </div>
            )}
          </div>
          <div className='mx-auto'>
            <input
              onError={() => errors.email}
              placeholder='Email'
              className='text-lg font-content border-2 text-razzle-dazzle-rose-950 border-electric-violet-500 hover:border-razzle-dazzle-rose-500 focus:outline-none focus:border-razzle-dazzle-rose-500 rounded-lg py-2 px-3 text-center transition-all duration-300 ease-in-out'
              type='email'
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {errors.email && (
              <div className='text-center text-sm py-1 pb-3 text-red-500'>
                {errorTexts.email}
              </div>
            )}
          </div>
          <div className='mx-auto'>
            <input
              onError={() => errors.phone}
              placeholder='Mobile'
              className='text-lg font-content border-2 text-razzle-dazzle-rose-950 border-electric-violet-500 hover:border-razzle-dazzle-rose-500 focus:outline-none focus:border-razzle-dazzle-rose-500 rounded-lg py-2 px-3 text-center transition-all duration-300 ease-in-out'
              type='tel'
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
            {errors.phone && (
              <div className='text-center text-sm py-1 pb-3 text-red-500'>
                {errorTexts.phone}
              </div>
            )}
          </div>
          <div className='mx-auto'>
            <input
              placeholder='Department'
              className='text-lg font-content border-2 text-razzle-dazzle-rose-950 border-electric-violet-500 hover:border-razzle-dazzle-rose-500 focus:outline-none focus:border-razzle-dazzle-rose-500 rounded-lg py-2 px-3 text-center transition-all duration-300 ease-in-out'
              value={formData.department}
              onChange={(e) =>
                setFormData({ ...formData, department: e.target.value })
              }
            />
          </div>
        </div>
        <div className='flex justify-center items-center space-x-3 mt-6'>
          <input
            type='file'
            accept='image/*'
            onChange={handleImageChange}
            className='hidden'
            id='image-upload-input'
          />
          <label
            htmlFor='image-upload-input'
            className='text-base font-content text-gray-400 border-2 border-electric-violet-500 hover:border-razzle-dazzle-rose-500 focus:outline-none focus:border-razzle-dazzle-rose-500 rounded-lg py-2 px-3 text-center transition-all duration-300 ease-in-out'
          >
            Select Image
          </label>
          {selectedImage && (
            <div className='mt-4'>
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
        <div className='flex items-center justify-center gap-4 mt-6'>
          <button
            type='submit'
            onClick={closeModal}
            className='text-lg border-2 px-4 py-2 rounded-lg border-electric-violet-500 bg-electric-violet-500 text-white font-semibold hover:border-razzle-dazzle-rose-500 hover:bg-razzle-dazzle-rose-500 focus:outline-none focus:border-razzle-dazzle-rose-500 transition-all duration-300 ease-in-out'
          >
            {loading ? 'Loading...' : employee ? 'Edit' : 'Add'}
          </button>

          <button
            className='text-lg border-2 px-4 py-2 rounded-lg border-electric-violet-500 bg-electric-violet-500 text-white font-semibold hover:border-razzle-dazzle-rose-500 hover:bg-razzle-dazzle-rose-500 focus:outline-none focus:border-razzle-dazzle-rose-500 transition-all duration-300 ease-in-out'
            type='reset'
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};
export default Form;
