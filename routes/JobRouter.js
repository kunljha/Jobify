import { Router } from "express";
const router = Router();
import { validateJobInput , validateIdParam} from "../middlewares/validationMiddleware.js";
import {checkForTestUser} from '../middlewares/authMiddleware.js'
import { showStats } from "../Controllers/jobcontroller.js";

import { getAllJobs , deleteJob , createJob , getJob , updateJob } from "../Controllers/jobcontroller.js";


router.route('/').get(getAllJobs).post(checkForTestUser , validateJobInput , createJob);
router.route('/stats').get(showStats);
router.route('/:id').get(validateIdParam , getJob).patch(checkForTestUser , validateJobInput, validateIdParam ,updateJob).delete(checkForTestUser , validateIdParam , deleteJob)

export default router;