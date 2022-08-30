const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Tour = require("../../models/tourModels");

dotenv.config({ path: "./../../config.env" });
dotenv.config({ path: "./../../secrets.env" });

// Database connection
const dbConn = process.env.DATABASE.replace(
  "<USERNAME>",
  process.env.MONGODB_USER
).replace("<PASSWORD>", process.env.MONGODB_PASS);

mongoose
  .connect(dbConn, {
    useNewUrlParser: true,
  })
  .then(() => {
    // Can pass in 'con' here and print out all object info
    console.log("DB connection sucessful!");
  });

// Read JSON file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8")
);

// Import function into database
const importData = async () => {
  try {
    // Tour.create can accept an array, JSON parse abover converts json to this array.
    await Tour.create(tours);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Delete all data from DB
const deleteData = async () => {
  try {
    // deleteMany with 0 args will drop all.
    await Tour.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
}

if (process.argv[2] === "--delete") {
  deleteData();
}

console.log(process.argv);
