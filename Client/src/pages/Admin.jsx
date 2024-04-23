import React from 'react'
import customFetch from '../utils/customFetch'
import { redirect, useLoaderData } from 'react-router';
import { toast } from 'react-toastify';
import Wrapper from '../assets/wrappers/StatsContainer';
import { Statitem } from '../components';
import { FaCalendarCheck, FaSuitcaseRolling } from 'react-icons/fa';

export const loader = async() => {
  try{
    const response = await customFetch.get('/users/admin/app-stats');
    return response.data;
  }
  catch(error){
    toast.error('You re not authorised to visit this page');
    return redirect('/dashboard');
  }
}
const Admin = () => {
  const { users , jobs } = useLoaderData();
  return (
    <Wrapper>
      <Statitem 
        title='current users'
        count={users}
        color='#e9b949'
        bcg='#fcefc7'
        icon={<FaSuitcaseRolling />}
      />
      <Statitem 
        title='total jobs'
        count={jobs}
        color='#647acb'
        bcg='#e0e8f9'
        icon={<FaCalendarCheck />}
      />
    </Wrapper>
  )
}

export default Admin
