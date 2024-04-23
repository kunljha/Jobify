import React from 'react'
import Wrapper from '../assets/wrappers/LandingPage'
import logo from '../assets/images/logo.svg'
import main from '../assets/images/main.svg'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <Wrapper>
        <nav>
            <img src={logo} alt="jobify" className='logo'/>
        </nav>
        <div className='container page'>
            <div className='info'>
                <h1>job <span>tracking</span></h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam labore doloremque deserunt sunt iure ex inventore, recusandae, illo commodi dolorem illum, ab error quibusdam suscipit rem itaque soluta harum sint.
                </p>
                <Link to='/register' className='btn register-link'> Register</Link>
                <Link to='/login' className='btn'> Login/ Demo user</Link>
            </div>
            <img  src={main} alt="job hunt" className='img main-img'/>
        </div>
    </Wrapper>
  )
}

export default Landing
