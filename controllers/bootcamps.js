const Bootcamp = require('../models/Bootcamp');

//@desc     Get all botcamps
//@route    GET /api/v1/bootcamps
//@access   Public
exports.getBootcamps = (req, res, next) => {
	res.status(200).json({ success: true, msg: 'Show all botcamps', hello: req.hello });
};

//@desc     Get single botcamp
//@route    GET /api/v1/bootcamps/:id
//@access   Public
exports.getBootcamp = (req, res, next) => {
	res.status(200).json({ success: true, msg: `Show bootcamp ${req.params.id}` });
};

//@desc     Create new botcamp
//@route    POST /api/v1/bootcamps/
//@access   Private
exports.createBootcamp = async (req, res, next) => {
	try {
		const bootcamp = await Bootcamp.create(req.body);

		res.status(201).json({
			success: true,
			data: bootcamp
		});
	} catch (error) {
		res.status(400).json({ success: false });
	}

	// console.log(req.body);
	// res.status(200).json({ success: true, msg: 'Create new bootcamp' });
};

//@desc     Update botcamp
//@route    PUT /api/v1/bootcamps/:id
//@access   Private
exports.updateBootcamp = (req, res, next) => {
	res.status(200).json({ success: true, msg: `Update bootcamp ${req.params.id}` });
};

//@desc     Delete botcamp
//@route    DELETE /api/v1/bootcamps/:id
//@access   Private
exports.deleteBootcamp = (req, res, next) => {
	res.status(200).json({ success: true, msg: `Delete bootcamp ${req.params.id}` });
};
