const Tour = require("./../models/tourModels");

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: "400",
      message: "Missing name or price.",
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
  });
};

exports.createTour = (req, res) => {
  res.status(204).json({
    status: "success",
    data: {
      tour: "null",
    },
  });
};

exports.getTour = (req, res) => {
  res.status(200).json({
    status: "success",
  });
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: "success",
  });
};

exports.updateWholeTour = (req, res) => {
  res.status(200).json({
    status: "success",
  });
};

exports.deleteTour = (req, res) => {
  // delete logic goes here...
  res.status(204).json({
    status: "success",
    data: {
      tour: "null",
    },
  });
};
