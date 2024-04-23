import React, { createContext, useContext } from 'react'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify';
import { useLoaderData } from 'react-router';
import { JobsContainer, SearchContainer } from '../components';

export const loader = async({ request }) => {
  //is se url mai jo params aaye hai vo sb ek object mai gather hp jayenge
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  try{
    const {data} = await customFetch.get('/jobs', {
      params,
    });
    return {data, searchValues:{...params}};
  }
  catch(error){
    toast.error(error?.response?.data?.msg);
    return error;
  }
}

const AllJobsContext = createContext();

const AllJobs = () => {
  //loader se aayi jobs grab krne ke liye
  const {data , searchValues} = useLoaderData(); 
  //console.log(data);
  return (
    <AllJobsContext.Provider value={{ data , searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  )
}
//custom hook for further using data
export const useAllJobsContext = () => useContext(AllJobsContext);

export default AllJobs
