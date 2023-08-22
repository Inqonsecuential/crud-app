import API from './index';

export const signIn = (formData: any) => API.post('/auth/signin', formData);
export const signUp = (formData: any) => API.post('/auth/register', formData);
export const getUserByEmail = (email: string | undefined | null) =>
  API.get('/user/' + email);
