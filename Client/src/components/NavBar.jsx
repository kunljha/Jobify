import React from 'react'
import Wrapper from '../assets/wrappers/Navbar'
import { FaAlignLeft } from 'react-icons/fa'
import { useDashboardContext } from '../pages/DashBoard'
import logo from '../assets/images/logo.svg'
import LogoutButton from './LogoutButton'
import ThemeToggle from './ThemeToggle'

const NavBar = () => {
  const {toggleSidebar} = useDashboardContext();
  return (
    <Wrapper>
      <div className='nav-center'>
        <button type='button' className='toggle-btn' onClick={toggleSidebar}>
          <FaAlignLeft/>
        </button>
        <div>
           <img src={logo} alt="jobify" className='logo'/>
           <h4 className='logo-text'>dashboard</h4>
        </div>
        <div className='btn-container'>
          <ThemeToggle />
          <LogoutButton />
        </div>
      </div>
    </Wrapper>
  )
}

export default NavBar
