require('dotenv').config({ path: '../.env' });
const Mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await Mongoose.connect(process.env.MONGO_URI);
    console.log('db connected');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
