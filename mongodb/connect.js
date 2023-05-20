import mongoose from 'mongoose';

const connectDB = (uri) => {
  mongoose.set('strictQuery', true);
  mongoose
    .connect(uri || 'mongodb://localhost/budget', {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false,
    })
    .then(() => console.log(`💽 MongoDB connected
    `))
    .catch((error) => {
      console.error(error);
    });
};

export default connectDB;
