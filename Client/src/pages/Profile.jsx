import React from 'react'
import { useDashboardContext } from './DashBoard'
import { useNavigation } from 'react-router';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form } from 'react-router-dom';
import { FromRow } from '../components';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

export const action = async( {request} ) => {
  const formData = await request.formData();
  const file = formData.get('avatar');
  if(file && file.size > 500000){
    toast.error('Image size too large')
    return null;
  }
  try{
    await customFetch.patch('/users/update-user' , formData);
    toast.success('Profile updated successfully')
  }
  catch(error){
    toast.error(error?.response?.data?.msg);
  }
  return null;
}

const Profile = () => {

  const { user } = useDashboardContext();
  const { name , email , lastName , location} = user;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  //encType because we send image data in the form of form-data not json to the server
  return (
    <Wrapper>
      <Form method='post' className='form' encType='multipart/form-data'>
        <h4 className='form-title'>Profile</h4>
        <div className="form-center">
          <div className="form-row">
            <label htmlFor='avatar' className='form-label'>
              Select an image file (max 0.5 MB)
            </label>
            <input
              type='file'
              id='avatar'
              name='avatar'
              className='form-input'
              accept='image/*'
            />
          </div>
          <FromRow type='text' name='name' defaultValue={name}/>
          <FromRow type='text' name='lastName' labelText='last name' defaultValue={lastName}/>
          <FromRow type='email' name='email' defaultValue={email}/>
          <FromRow type='text' name='location' defaultValue={location}/>
          <button className='btn btn-block form-btn' type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </Form>
    </Wrapper>
  )
}

export default Profile
