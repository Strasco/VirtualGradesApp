const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const path = require("path");

//Load env vars
dotenv.config({ path: "./config/config.env" });

//database connection
connectDB();

//Route files
const courses = require("./routes/courses");
const users = require("./routes/users");
const grades = require("./routes/grades");
const auth = require("./routes/auth");

const app = express();

//Dev logging environment
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Body Parser
app.use(express.json());

//Cookie parser
app.use(cookieParser());

//static folder
app.use(express.static(path.join(__dirname, "public")));

//Mount router
app.use("/api/v1/courses", courses);
app.use("/api/v1/users", users);
app.use("/api/v1/grades", grades);
app.use("/api/v1/auth", auth);

app.use(errorHandler);

const PORT = process.env.PORT;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
//Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //Close server & exit process
  server.close(() => process.exit(1));
});
