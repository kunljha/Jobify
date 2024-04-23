import React from 'react'
import Job from './Job'
import { useAllJobsContext } from '../pages/AllJobs'
import Wrapper from '../assets/wrappers/JobsContainer';
import PageBtnContainer from './pageBtnContainer'


const JobsContainer = () => {
    const { data } = useAllJobsContext();
    const { jobs , numOfPages , totalJobs} = data;

    if(jobs.length === 0){
        return (
          <Wrapper>
            <h2>No Jobs to Display ....</h2>
          </Wrapper>
        );
    }

  return (
    <Wrapper>
      <h5>{totalJobs} Job{jobs.length > 1 && 's'} found</h5>
      <div className='jobs'>
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  )
}

export default JobsContainer

