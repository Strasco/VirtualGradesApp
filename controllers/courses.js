const ErrorResponse = require('../utils/errorResponse');
const Course = require('../models/Course');
const asyncHandler = require('../Middleware/async');

//@desc     Get all coruses
//@route    GET /api/v1/courses
//@route    GET /api/v1/bootcamps/:bootcampId/courses
//@access   Public

exports.getCourses = asyncHandler(async(req,res,next) => {
    let query;

    // if(req.params.bootcampId){//if from the client we get a bootcamp id
    //     query = Course.find({bootcamp : req.params.bootcampId});//we will return just the bootcamp that has that ID
    // }else{
        query = Course.find().populate('-__v');//otherwise just get all courses
    // }

    const courses = await query;//this queries to the database
    res.status(200).json({
        success: true,
        count: courses.length,
        data: courses
    });
});

exports.createCourse = asyncHandler(async (req, res, next) => {
	const course = await Course.create(req.body);

	res.status(201).json({
		success: true,
		data: course
	});
});

exports.getCourse = asyncHandler(async (req, res, next) => {
	const course = await Course.findById(req.params.id);
	
	if(!course){
		return 	next(new ErrorResponse(req.params.id, 404));
	}
	res.status(200).json({success: true, data:course});	
});

exports.updateCourse = asyncHandler(async (req, res, next) => {
	const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators:true
	});

	if(!course){
		return 	next(new ErrorResponse(req.params.id, 404));
	}
	return res.status(200).json({success:true});
});

exports.deleteCourse = asyncHandler(async (req, res, next) => {
	const course = await Course.findByIdAndDelete(req.params.id);

	if(!course){
		return 	next(new ErrorResponse(req.params.id, 404));
	}
	return res.status(200).json({success:true, data: {} });
});