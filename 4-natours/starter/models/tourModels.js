const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name."],
    unique: true,
  },
  duration: {
    type: String,
    required: [true, "A tour must have a duration."],
  },
  maxGroupSize: {
    type: Number,

    required: [true, "A tour must have a maximum group size."],
  },
  difficulty: {
    type: String,

    required: [true, "A tour must have a difficulty."],
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  ratingsAverage: {
    type: Number,
    default: 3,
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price."],
  },
  priceDiscount: {
    type: Number,
  },
  summary: {
    type: String,
    trim: true,
    required: [true, "A Tour must have a description."],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, "A tour must have a cover image."],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
