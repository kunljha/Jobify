import React from 'react'
import Wrapper from '../assets/wrappers/BigSidebar'
import { useDashboardContext } from '../pages/DashBoard'
import logo from '../assets/images/logo.svg'
import NavLinks from './NavLinks'

const BigSideBar = () => {

  const { showSidebar } = useDashboardContext();

  return (
    <Wrapper>
      <div className={ showSidebar ? 'sidebar-container' : 'sidebar-container show-sidebar'}>
        <div className='content'>
          <header>
            <img src={logo} alt="jobify" className='logo'/>
          </header>
          <NavLinks isSideBar />
        </div>
      </div>
    </Wrapper>
  )
}

export default BigSideBar

//** Line 13 -> by default navlinks dikhenge */
//** Line 18 -> on clicking on links we dont want that sidebar will close in the case of BigSidebar */
