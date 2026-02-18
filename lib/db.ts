
import mongoose, { MongooseOptions } from 'mongoose';

async function dbConnect(){
  if (mongoose.connection.readyState === 0) {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error('Please define the MONGODB_URI environment variable.');
    }

    const mongooseOpts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as MongooseOptions;

    await mongoose.connect(mongoURI, mongooseOpts);
  }

  return mongoose.connection;
}