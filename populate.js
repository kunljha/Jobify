import { readFile } from 'fs/promises'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

import Job from './models/jobModel.js'
import User from './models/userModel.js'

//basically humne isme mackaroo se data leyke mongoDB mai populate kia hai admin or demo user le liye
//first we find both of this user in our DB then delete prev jobs of there user and make array of mackaroo JSON
//data then simply create DB of this array

try {
  await mongoose.connect(process.env.MONGO_URL)
  const user = await User.findOne({ email: 'test@test.com' })
  const jsonJobs = JSON.parse(
    await readFile(new URL('./utils/mockData.json', import.meta.url))
  )
  const jobs = jsonJobs.map((job) => {
    return { ...job, createdBy: user._id }
  })
  await Job.deleteMany({ createdBy: user._id })
  await Job.create(jobs)
  console.log('success')
  process.exit(0)
} catch (error) {
  console.log(error)
  process.exit(1)
}
