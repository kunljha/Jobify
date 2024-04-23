import React from 'react'
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router';
import { StatsContainer , ChartsConatiner} from '../components';


export const loader = async() => {
  try{
    const response = await customFetch.get('/jobs/stats');
    return response.data;
  }
  catch(error){
    return error;
  }
}

const Stats = () => {

  const {defaultStatus , monthlyApplication} = useLoaderData();
 // console.log(defaultStatus);

  return (
    <>
    <StatsContainer defaultStatus = {defaultStatus} />
    {
      monthlyApplication?.length > 1 && (
        <ChartsConatiner data = {monthlyApplication} />
      )
    }
    </>
  )
}

export default Stats
