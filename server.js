const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');

//Load env vars
dotenv.config({ path: './config/config.env' });

//database connection
connectDB();

//Route files
const bootcamps = require('./routes/bootcamps');

const app = express();

//Dev logging environment
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

//Body Parser
app.use(express.json());

//Mount router
app.use('/api/v1/bootcamps', bootcamps);
const PORT = process.env.PORT;

const server = app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);

process.on('unhandledRejection', (err, promise) => {
	console.log(`Error: ${err.message}`.red);
	//Close server & exit process
	server.close(() => process.exit(1));
});
