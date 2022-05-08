const ErrorResponse = require("../utils/errorResponse");
const Grade = require("../models/Grade");
// const Student = require('../models/Student');
const asyncHandler = require("../Middleware/async");

//@desc     Get all grades
//@route    GET /api/v1/grades
//@access   Public
exports.getGrades = asyncHandler(async (req, res, next) => {
  let query;
  query = Grade.find();

  const grades = await query; //this queries to the database
  res.status(200).json({
    success: true,
    count: grades.length,
    data: grades,
  });
});

exports.getGrade = asyncHandler(async (req, res, next) => {
  const grade = await Grade.findById(req.params.id); //otherwise just get all courses

  if (!grade) {
    return next(new ErrorResponse(req.params.id, 404));
  }
  res.status(200).json({
    success: true,
    data: grade,
  });
});

exports.createGrade = asyncHandler(async (req, res, next) => {
  const grade = await Grade.create(req.body);

  res.status(201).json({
    success: true,
    data: grade,
  });
});

exports.updateGrade = asyncHandler(async (req, res, next) => {
  const grade = await Grade.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!grade) {
    return next(new ErrorResponse(req.params.id, 404));
  }
  return res.status(200).json({ success: true });
});

exports.deleteGrade = asyncHandler(async (req, res, next) => {
  const course = await Grade.findByIdAndDelete(req.params.id);

  if (!course) {
    return next(new ErrorResponse(req.params.id, 404));
  }
  return res.status(200).json({ success: true, data: {} });
});
