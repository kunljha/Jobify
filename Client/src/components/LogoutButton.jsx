import React from 'react'
import { FaUserCircle , FaCaretDown } from 'react-icons/fa'
import { useState } from 'react'
import { useDashboardContext } from '../pages/DashBoard'
import Wrapper from '../assets/wrappers/LogoutContainer'


const LogoutButton = () => {

    const [showLogout , setShowLogout] = useState(false);
    const {user , logoutUser} = useDashboardContext();

  return (
    <Wrapper>
      <button type = 'button' className='btn logout-btn' onClick={() => setShowLogout(!showLogout)}>

        {user.avatar ? (
          <img  src={user.avatar} alt='avatar' className='img'/>
        ) : (
          <FaUserCircle />
        )}
        
        {user?.name}
        <FaCaretDown />
      </button>
      <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
        <button type='button' className='dropdown-btn' onClick={logoutUser}>
            logout
        </button>
      </div>
    </Wrapper>
  )
}

export default LogoutButton
