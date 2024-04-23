import React from 'react'
import Wrapper from '../assets/wrappers/SmallSidebar'
import { useDashboardContext } from '../pages/DashBoard'
import links from '../utils/links'
import logo from '../assets/images/logo.svg'
import { FaTimes } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import NavLinks from './NavLinks'

const SmallSideBar = () => {
  const { showSidebar ,toggleSidebar } = useDashboardContext();

  return (
    <Wrapper>
      <div className= { showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container' }>
        <div className='content'>
          <button type='button' className='close-btn' onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <img src={logo} alt="jobify" className='logo'/>
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  )
}

export default SmallSideBar
