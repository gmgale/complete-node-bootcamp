const express = require("express");
const morgan = require("morgan");

const app = express();

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
// Middleware to be run on every route
app.use(express.json());
app.use(morgan("dev"));

// Will be called on every request, has to before the routing as the routes end the request/responce cycle.
app.use((req, res, next) => {
	console.log("Hello from the middleware!");
	next();
});

app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();
	next();
});

// Mounting the routers (middleware to run on specifc routes)
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

// Exports the app to use in entrypoint server.js
module.exports = app;
