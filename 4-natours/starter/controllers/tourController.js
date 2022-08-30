const Tour = require("../models/tourModels");

exports.getAllTours = async (req, res) => {
  try {
    // BUILD QUERY
    // First get query object, if we await, we cant filter later
    // 1) Filtering
    const queryObj = Object.assign(req.query);
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 2) Advanced filtering
    // EXECUTE QUERY
    let queryStr = JSON.stringify(queryObj);
    // Replace the query identifiers from url to moggoose operators
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    const query = Tour.find(JSON.parse(queryStr));

    const tours = await query;

    // When we use the find method, it returns a Query object.
    // This object has its own methods such as where, sort, less than...
    //
    // const query = await Tour.find()
    // .where('duration')
    // .equals(5)

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
      message: err,
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

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        tour: tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateWholeTour = (req, res) => {
  res.status(200).json({
    status: "success",
  });
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findIdAndDelete(req.params.id);
    res.status(204).json({
      status: "Deleted tour",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
