import React, { createContext, useContext, useState } from 'react'
import { Outlet, redirect, useLoaderData, useNavigate } from 'react-router'
import Wrapper from '../assets/wrappers/Dashboard'
import { BigSideBar , SmallSideBar , NavBar } from '../components'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'

//page render hone se pehle data laane ke liye and it always return something from it
export const loader = async () => {
  try{
    const {data} = await customFetch.get('/users/current-user');
    return data;
  }
  catch(error){
    return redirect('/');
  }
}
const DashboardContext = createContext();

const DashBoard = ({ isDarkThemeEnable } ) => {

  const navigate = useNavigate();

  const {user} = useLoaderData();

  const [showSidebar , setSidebar] = useState(false);
  const [isDarkTheme , setIsDarkTheme] = useState(isDarkThemeEnable);

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle('dark-theme' , newDarkTheme);
    localStorage.setItem('darkTheme' , newDarkTheme);
  }

  const toggleSidebar = () => {
    setSidebar(!showSidebar);
  }

  const logoutUser = async() => {
    navigate('/');
    await customFetch.get('/auth/logout');
    toast.success('logging out....')
  }

  return (
    <DashboardContext.Provider
    value={{user , showSidebar , isDarkTheme , toggleDarkTheme , toggleSidebar , logoutUser}}
    >
      <Wrapper>
        <main className='dashboard'>
          <SmallSideBar/>
          <BigSideBar/>
          <div>
            <NavBar/>
            <div className='dashboard-page'>
              <Outlet context={{user}} />
            </div>
          </div>
        </main>
     </Wrapper>
    </DashboardContext.Provider>
  )
}

export const useDashboardContext = () => useContext(DashboardContext);
export default DashBoard
