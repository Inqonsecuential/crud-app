import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '@/backend/models/user';
import bcrypt from 'bcryptjs';
import connectMongo from '@/backend/utils/connectMongo';

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          throw new Error('Please enter your credentials');
        }
        const { email, password } = credentials;
        if (!email || !password) {
          throw new Error('Please enter your email and password');
        }

        await connectMongo();
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error('User does not exist. Please register first.');
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
          throw new Error('Invalid password');
        }
        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user) {
        alert('Please check your email and password.');
        return Promise.resolve(false);
      }
      return Promise.resolve(true);
    },
  },
});
