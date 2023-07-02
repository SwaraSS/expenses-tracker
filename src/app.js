const express = require('express');
const dotenv = require('dotenv');
const dbConnect = require('./config/dbConnect');
const userRoute = require('./routes/user/usersRoute');
const { errorHandler, notFound } = require('./middlewares/errorMiddleware');
const app = express();

dotenv.config();

dbConnect();

//middlewares
app.use(express.json());


//routes
app.use("/api/users", userRoute);

//Error
app.use(notFound);
app.use(errorHandler);



module.exports = app;