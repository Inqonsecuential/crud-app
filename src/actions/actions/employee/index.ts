import axios from 'axios';

export const addEmployee = async (formData: any) => {
  axios
    .post('/api/employee', formData)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const editEmployee = async (id: string, formData: any) => {
  axios
    .put('/api/employee/' + id, formData)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const deleteEmployee = async (id: string) => {
  axios
    .delete('/api/employee/' + id)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};
