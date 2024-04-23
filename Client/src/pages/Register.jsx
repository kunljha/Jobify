import React from 'react'
import { Link , Form , redirect, useNavigation} from 'react-router-dom'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import logo from '../assets/images/logo.svg'
import { FromRow } from '../components'
import customFetch from '../utils/customFetch.js'
import { toast } from 'react-toastify'

export const action = async({ request }) => {
  
  //formData() is an js api which is used to extract all register user info which was given by user on front-end
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try{
    await customFetch.post('/auth/register' , data);
    toast.success('Registration sucessfull')
    return redirect('/login');
  }
  catch(error){
    toast.error(error?.response?.data?.msg);
    return error;
  }
}

const Register = () => {

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting'
  return (
    <Wrapper>
        <Form method='post' className='form'>
            <img src={logo} alt="jobify" className='logo'/>
            <h4>Register</h4>
            <FromRow type='text' name='name' />
            <FromRow type='text' name='lastName' labelText='last name'/>
            <FromRow type='text' name='location' />
            <FromRow type='email' name='email' />
            <FromRow type='password' name='password' />
            <button type='submit' className='btn btn-block' disabled={isSubmitting}>
                {isSubmitting ? 'submitting...' : 'submit'}
            </button>
            <p>
                Already a member?
                <Link to='/login' className='member-btn'>Login</Link>
            </p>
        </Form>
    </Wrapper>
  )
}

export default Register
