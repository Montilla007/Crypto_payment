const mongoose = require('mongoose')
const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../errors');



const connectDB = (url) => {

  if (!url) {
    throw new NotFoundError("No Database URL Found");
  }
  return url.replace('<password>', process.env.DATABASE_PASSWORD);
};

const dbURL = connectDB(process.env.MONGO_URI);

const connectToDatabase = async () => {

  try {
    mongoose
      .connect(dbURL)
      .then(() => console.log('Database connection is successful'));

  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = connectDB;