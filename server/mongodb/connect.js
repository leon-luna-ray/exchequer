import mongoose from 'mongoose';

const connectDB = (uri) => {
  mongoose.set('strictQuery', true);
  mongoose
    .connect(uri)
    .then(() => console.log(`   💽 MongoDB connected
    `))
    .catch((error) => {
      console.error(error);
    });
};

export default connectDB;
