const fs = require("fs");

// Read data before event loop
const tours = JSON.parse(
	fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

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
	// req.params will parse :id into an Object. Can also have /:x/:y/:z that will
	// be split into the object but are manadtory in the URL and will throw err.
	// /x? will make it optional. /api/.../:id/:y?/:z?
	const id = req.params.id * 1; // Type coersion string->number

	const tour = tours.find((el) => el.id === id);
	// if (id > tours.length) {
	if (!tour) {
		return res.status(200).json({
			status: "fail",
			message: "Invalid ID",
		});
	}
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
	if (req.params.id * 1 > tours.length) {
		return res.status(404).json({
			status: "fail",
			message: "Invalid ID",
		});
	}
	// delete logic goes here...
	res.status(204).json({
		status: "success",
		data: {
			tour: "null",
		},
	});
};
