import { body , validationResult , param } from "express-validator";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../Errors/customError.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import mongoose from "mongoose";
import Job from '../models/jobModel.js'
import User from "../models/userModel.js";

//this one we won't touch
const withValidationErrors = (validateValues) => {
    return [
        validateValues,
        (req , res , next) => {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                const errorMessages = errors.array().map((error) => error.msg);
                if(errorMessages[0].startsWith('no job')){
                    throw new NotFoundError(errorMessages);
                }
                if(errorMessages[0].startsWith('not authorized')){
                    throw new UnauthorizedError('not authorized to access this route');
                }
                throw new BadRequestError(errorMessages);
            }
            next();
        }
    ]
}

//this one we will update as out needs for validation
export const validateJobInput = withValidationErrors([
    body('company').notEmpty().withMessage('company is required'),
    body('position').notEmpty().withMessage('position is required'),
    body('jobLocation').notEmpty().withMessage('job location is required'),
    body('jobStatus')
    .isIn(Object.values(JOB_STATUS))
    .withMessage('invalid status value'),
    body('jobType')
    .isIn(Object.values(JOB_TYPE))
    .withMessage('invalid type value'),
])

export const validateIdParam = withValidationErrors([
    param('id')
    .custom(async (value , {req}) => {
        const isValidId = mongoose.Types.ObjectId.isValid(value);
        if(!isValidId) throw new BadRequestError('invalid MongoDB id')
        const job = await Job.findById(value);
        if(!job) throw new NotFoundError('no job with given id');

        //getjob by id se bhi check krna hoga k job particular user k regarding h ya nahi
        const isAdmin = req.user.role === 'admin';
        const isOwner = req.user.userId === job.createdBy.toString();
        if(!isAdmin && !isOwner){
            throw new UnauthorizedError('not authorized to access this route')
        }
    })
])

export const validateRegisterInput = withValidationErrors([
    body('name').notEmpty().withMessage('name is required'),
    body('lastName').notEmpty().withMessage('last name is required'),
    body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')

    .custom(async(email) => {
        const user = await User.findOne({email});
        if(user){
            throw new BadRequestError('email already exists')
        }
    }),

    body('password')
    .notEmpty()
    .withMessage('name is required')
    .isLength({min:8})
    .withMessage('atleast 8 char long password is required'),

    body('location').notEmpty().withMessage('name is required'),
])

export const validateLoginInput = withValidationErrors([
    body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format'),

    body('password')
    .notEmpty()
    .withMessage('name is required'),
])

export const validateUpdateUserInput = withValidationErrors([
    body('name').notEmpty().withMessage('name is required'),
    
    body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')

    .custom(async(email , { req }) => {
        const user = await User.findOne({email});
        
        //same email id ka koi uske alava user na ho!...
        if(user && user._id.toString() !== req.user.userId){
            throw new BadRequestError('email already exists')
        }
    }),
    body('location').notEmpty().withMessage('name is required'),
    body('lastName').notEmpty().withMessage('last name is required')
])