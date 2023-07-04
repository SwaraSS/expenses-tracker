const express = require('express');
const dotenv = require('dotenv');
const dbConnect = require('./config/dbConnect');
const userRoute = require('./routes/user/usersRoute');
const { errorHandler, notFound } = require('./middlewares/errorMiddleware');
const incomeRoute = require('./routes/income/incomeRoutes');
const expenseRoute = require('./routes/expenses/expenseRoute');
const app = express();

dotenv.config();

dbConnect();

//middlewares
app.use(express.json());

app.get("/",(req, res) => {
    res.json({msg: "Welcome! to Expenses tracker API"});
});


//users routes
app.use("/api/users", userRoute);

//income routes
app.use("/api/income", incomeRoute);

//expense routes

app.use("/api/expenses", expenseRoute);

//Error
app.use(notFound);
app.use(errorHandler);



module.exports = app;