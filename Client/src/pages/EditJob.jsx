import React from 'react'
import { FromRow, FormRowSelect } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useLoaderData } from 'react-router-dom';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { Form, useNavigation, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

//Here we require both loader and action because loader se hume load hone se pehle specific job ka data milega and 
//action se hum update request bhejenge

export const loader = async({ params }) => {
  try{
    const { data } = await customFetch.get(`/jobs/${params.id}`);
    return data;
  }
  catch(error){
    toast.error(error?.response?.data?.msg);
    return redirect('/dashboard/all-jobs');
  }
}

//jo data form se aaya se us se update request krenge
export const action = async({ request , params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try{
    await customFetch.patch(`/jobs/${params.id}` , data);
    toast.success('job updated successfully')
    return redirect('/dashboard/all-jobs')
  }
  catch(error){
    toast.error(error?.response?.data?.msg);
    return error;
  }
}

const EditJob = () => {
  const {job} = useLoaderData();
  //console.log(job);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>Edit Jobs</h4>
        <div className='form-centre'>
          <FromRow type='text' name='position' defaultValue={job.position}/>
          <FromRow type='text' name='company' defaultValue={job.company}/>
          <FromRow type='text' name='jobLocation' labelText='job location' defaultValue={job.jobLocation}/>
          <FormRowSelect
            name='jobStatus'
            labelText='job Status'
            defaultValue={job.jobStatus}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name='jobType'
            labelText='job Type'
            defaultValue={job.jobType}
            list={Object.values(JOB_TYPE)}
          />
          <button type='submit' className='btn btn-block form-btn' disabled={isSubmitting}>
            {isSubmitting ? 'submitting...' : 'submit'}
          </button>
        </div>
      </Form>
    </Wrapper>
  )
}

export default EditJob
