const ErrorResponse = require('../utils/errorResponse');
const Bootcamp = require('../models/Bootcamp');
const asyncHandler = require('../Middleware/async');
const e = require('express');


//@desc     Get all botcamps
//@route    GET /api/v1/bootcamps
//@access   Public
exports.getBootcamps = asyncHandler(async (req, res, next) =>{
	res.status(200).json(res.advancedResults);
});

//@desc     Get single botcamp
//@route    GET /api/v1/bootcamps/:id
//@access   Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
	const bootcamp = await Bootcamp.findById(req.params.id);
	
	if(!bootcamp){
		return 	next(new ErrorResponse(req.params.id, 404));
	}
	res.status(200).json({success: true, data:bootcamp});	
});

//@desc     Create new botcamp
//@route    POST /api/v1/bootcamps/
//@access   Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
	const bootcamp = await Bootcamp.create(req.body);

	res.status(201).json({
		success: true,
		data: bootcamp
	});
});

//@desc     Update botcamp
//@route    PUT /api/v1/bootcamps/:id
//@access   Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
	const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators:true
	});

	if(!bootcamp){
		return 	next(new ErrorResponse(req.params.id, 404));
	}
	return res.status(200).json({success:true});
});

//@desc     Delete botcamp
//@route    DELETE /api/v1/bootcamps/:id
//@access   Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
	const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

	if(!bootcamp){
		return 	next(new ErrorResponse(req.params.id, 404));
	}
	return res.status(200).json({success:true, data: {} });
});
