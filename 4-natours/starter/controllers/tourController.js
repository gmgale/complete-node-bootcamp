const Tour = require("../models/tourModels");

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();

    res.status(200).json({
      status: "success",
      data: tours,
    });
  } catch (err) {
    console.log(err);
  }
};
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.errmsg.message,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const id = await Tour.findById(req.params.id);
    //Tour.findOne({_id: req.params.id})
    res.status(200).json({
      status: "success",
      data: id,
    });
  } catch (err) {
    console.log(err);
  }
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
