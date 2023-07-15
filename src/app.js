const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const dbConnect = require('./config/dbConnect');
const userRoute = require('./routes/user/usersRoute');
const { errorHandler, notFound } = require('./middlewares/errorMiddleware');
const incomeRoute = require('./routes/income/incomeRoutes');
const expenseRoute = require('./routes/expenses/expenseRoute');
const accountStatsRoute = require('./routes/accountStatusRoute/accountStatusRoute');
const app = express();


dotenv.config();

dbConnect();

//middlewares
app.use(express.json());
app.use(cors());

app.get("/",(req, res) => {
    res.json({msg: "Welcome! to Expenses tracker API"});
});


//users routes
app.use("/api/users", userRoute);

//account status routes
app.use("/api/accountStats", accountStatsRoute);

//income routes
app.use("/api/income", incomeRoute);

//expense routes

app.use("/api/expenses", expenseRoute);

//Error
app.use(notFound);
app.use(errorHandler);



module.exports = app;