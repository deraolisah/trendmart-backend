import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); 

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connected yo");
  } catch (error) {
    console.error("DB Connection Error:", error.message);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB;