import React from 'react'
import { Link , Form, redirect, useNavigation , useNavigate} from 'react-router-dom'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import logo from '../assets/images/logo.svg'
import { FromRow } from '../components'
import customFetch from '../utils/customFetch.js'
import { toast } from 'react-toastify'

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try{
    await customFetch.post('/auth/login' , data);
    toast.success('Login successfully');
    return redirect('/dashboard')
  }
  catch(error){
    toast.error(error?.response?.data?.msg);
    return error;
  }
}

const Login = () => {

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const navigate = useNavigate();

  const loginDemoUser = async () => {
    const data = {
      "email": "test@test.com",
      "password": "secret123"
    }
    try{
      await customFetch.post('/auth/login' , data);
      toast.success('Take a test drive')
      navigate('/dashboard');
    }
    catch(error){
      toast.error(error?.response?.data?.msg);
    }
  }

  return (
    <Wrapper>
      <Form method='post' className='form'>
          <img src={logo} alt="jobify" className='logo'/>
          <h4>Login</h4>
          <FromRow type='email' name='email'/>
          <FromRow type='password' name='password'/>
          <button type='submit' className='btn btn-block' disabled={isSubmitting}>
            {isSubmitting ? 'submitting....' : 'submit'}
          </button>
          <button type='button' className='btn btn-block' onClick={loginDemoUser}>Explore the app</button>
          <p>
              Not a member yet?
              <Link to='/register' className='member-btn'>Register</Link>
          </p>
      </Form>
    </Wrapper>
  )
}

export default Login
