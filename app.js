const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');


// connectDB
const connectToDatabase = require('./database/connect')

// Authentication


// Routers
const studentRouter = require('./routes/studentRoute');

//Error Handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// Load environment variables from the config file
dotenv.config({ path: './config.env' });

// Create the Express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Custom middlewares to log requests and add request time
app.use((req, res, next) => {
  console.log('Hello from the server 👋');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routes
app.use();

app.get('/', (req, res) => {
  res.redirect('/api/v1/student');
});

// Handle all undefined routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global error handling middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// Start the server
const port = process.env.PORT || 3000;

const start = async () => {
    try {
      await connectToDatabase();
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.log(error);
    }
  };
  start();
