require("dotenv").config();
require("express-async-errors");
//extra security package
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const ratelimit = require("express-rate-limit");

const express = require("express");
const app = express();

const connectDB = require("./db/connect");
const authenticateUser = require("./middleware/authentication");

//routers

const authRouter = require("./routes/auth");
const friendRouter = require("./routes/friend");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const { connect } = require("mongoose");
app.set("trust proxy", 1);
app.use(
  ratelimit({
    windowMs: 15 * 60 * 1000, //15minutes
    max: 100, //limit each IP to 100 requests per windows
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// extra packages

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/friend", authenticateUser, friendRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
