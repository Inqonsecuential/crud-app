import * as api from '../../api/auth';

export const signUp = async (formData: any) => await api.signUp(formData);

export const getUserByEmail = async (email: string | undefined | null) =>
  await api.getUserByEmail(email);
