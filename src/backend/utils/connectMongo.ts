import mongoose from 'mongoose';

const connectMongo = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI environment variable is not set.');
  }
  await mongoose.connect(process.env.MONGO_URI);
};

export default connectMongo;
