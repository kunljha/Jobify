import 'express-async-errors';
import { StatusCodes } from 'http-status-codes'
import Job from '../models/jobModel.js'
import mongoose, { Mongoose } from 'mongoose';
import day from 'dayjs'


export const getAllJobs = async (req , res) => {
    //console.log(req.user);
    const { search , jobStatus , jobType , sort } = req.query;
    const queryObject = {
        createdBy: req.user.userId,
    };

    if(search){
        queryObject.$or = [
            {position: {$regex: search, $options: 'i'}},
            {company: {$regex: search, $options: 'i'}}
        ];
    }

    if(jobStatus && jobStatus !== 'all'){
        queryObject.jobStatus = jobStatus;
    }
    if(jobType && jobType !== 'all'){
        queryObject.jobType = jobType;
    }

    const sortOptions = {
        newest: '-createdAt',
        oldest: 'createdAt',
        'a-z': 'position',
        'z-a': '-position'
    }

    const sortKey = sortOptions[sort] || sortOptions.newest;

    //pagenation setup

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1)*limit;
     
    const jobs = await Job.find(queryObject).sort(sortKey).skip(skip).limit(limit);

    const totalJobs = await Job.countDocuments(queryObject);
    const numOfPages = Math.ceil(totalJobs / limit);

    res.status(StatusCodes.OK).json({totalJobs , numOfPages, currentPage: page,  jobs});
}

export const createJob = async (req , res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.OK).json({ job })
}

export const getJob = async (req , res) => {
    const {id} = req.params;
    const job = await Job.findById(id);
    res.status(StatusCodes.OK).json({ job });
}

export const updateJob = async (req , res) => {
    const {id} = req.params;
    const updatedJobs = await Job.findByIdAndUpdate(id , req.body , 
        {
            new:true,
        }
    )
    res.status(StatusCodes.OK).json({message: 'job updated' , updatedJobs});
}

export const deleteJob = async (req , res) => {
    const {id} = req.params;
    const job = await Job.findByIdAndDelete(id);
    res.status(StatusCodes.OK).json({message: 'Job Deleted' , job});
}

//match se us user ki jobs aa gyi and group se vo group ho gyi with respect to pending,interview,declined then 
//reducer se basically humne clean kr lia
export const showStats = async(req , res) => {
    let stats = await Job.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId)}},
        { $group: { _id: '$jobStatus' , count: {$sum: 1}}},
    ])

    stats = stats.reduce((acc , curr) => {
        const {_id: title , count} = curr;
        acc[title] = count;
        return acc;
    } , {});

    const defaultStatus = {
        pending: stats.pending || 0,
        interview: stats.interview || 0,
        declined: stats.declined || 0
    }

    let monthlyApplication = await Job.aggregate([
        {$match: { createdBy: new mongoose.Types.ObjectId(req.user.userId)}},
        {
            $group: {
                _id: { year: { $year: '$createdAt'} , month: { $month: '$createdAt'}},
                count: { $sum: 1}
            },
        },
        {$sort: { '_id.year': -1 , '_id.month': -1}},
        {$limit: 6},
    ])

    monthlyApplication = monthlyApplication.map((item) => {
        const {
            _id: {year , month},
            count,
        } = item;
        const date = day()
        .month(month -1)
        .year(year)
        .format('MMM YY');
        return { date , count};
    }).reverse();

    res.status(StatusCodes.OK).json({defaultStatus , monthlyApplication});
}
