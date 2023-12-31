const express = require("express");
const morgan = require("morgan");
const AppError = require("./utils/appError");
const globalErrorHandler = require('./controllers/errorController')
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// MIDDLEWARE - is a function that receives the request and response objects - Executes code in order, so placement is important
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// ROUTES
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`));
});

app.use(globalErrorHandler);

module.exports = app;
