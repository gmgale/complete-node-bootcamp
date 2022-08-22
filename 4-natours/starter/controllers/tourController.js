const fs = require("fs");
const { findSourceMap } = require("module");

// Read data before event loop
const tours = JSON.parse(
	fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkId = (req, res, next, val) => {
	if (req.params.id * 1 > tours.length) {
		return res.status(404).json({
			status: "fail",
			message: "Invalid ID",
		});
	}
	next();
};

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
	console.log(req.requestTime);
	res.status(200).json({
		status: "success",
		results: tours.length,
		date: req.requestTime,
		data: {
			tours: tours,
		},
	});
};

exports.createTour = (req, res) => {
	//  console.log(req.body);
	const newId = tours[tours.length - 1].id + 1;
	const newTour = Object.assign({ id: newId }, req.body);

	tours.push(newTour);
	fs.writeFile(
		`${__dirname}/dev-data/data/tours-simple.json`,
		JSON.stringify(tours),
		(err) => {
			// .json sends the request so no need to use app.send();
			// // 201 = updated
			res.status(201).json({
				status: "success",
				data: {
					tour: newTour,
				},
			});
		}
	);
};

exports.getTour = (req, res) => {
	const tour = tours[req.params.id];
	res.status(200).json({
		status: "success",
		data: {
			tour,
		},
	});
};

exports.updateTour = (req, res) => {
	if (req.params.id * 1 > tours.length) {
		return res.status(200).json({
			status: "fail",
			message: "Invalid ID",
		});
	}
	// patch logic goes here...
	res.status(200).json({
		status: "success",
		data: {
			tour: "<updated tour here>",
		},
	});
};

exports.updateWholeTour = (req, res) => {
	if (req.params.id * 1 > tours.length) {
		return res.status(404).json({
			status: "fail",
			message: "Invalid ID",
		});
	}
	// put logic goes here...
	res.status(200).json({
		status: "success",
		data: {
			tour: "<updated tour here>",
		},
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
