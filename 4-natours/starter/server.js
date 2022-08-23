const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
dotenv.config({ path: "./secrets.env" });

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

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4,
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price"],
  },
});

const Tour = mongoose.model("Tour", tourSchema);

const testTour = new Tour({
  name: "The Forest Hiker",
  rating: 4.7,
  price: 500,
});

testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log(err);
  });

const app = require("./app");

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
