import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import{ HomeLayout, Landing, Register , Login, DashBoard, Error, AddJob, AllJobs, Profile, Admin, Stats, EditJob} from './pages';
import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
import { loader as dashboardLoader } from './pages/DashBoard';
import { action as addJobAction } from './pages/AddJob';
import { loader as allJobsLoader } from './pages/AllJobs';
import { loader as EditJobLoader} from './pages/EditJob';
import { action as EditJobAction} from './pages/EditJob';
import { action as deleteJobAction} from './pages/DeleteJob';
import { loader as adminLoader} from './pages/Admin';
import { action as profileAction} from './pages/Profile';
import { loader as statsLoader} from './pages/Stats';

const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  document.body.classList.toggle('dark-theme' , isDarkTheme);
  return isDarkTheme; 
}
const isDarkThemeEnable = checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout/>,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />
      },
      {
        path: '/register',
        element: <Register />,
        action: registerAction,
      },
      {
        path: '/login',
        element: <Login />,
        action: loginAction,
      },
      {
        path: '/dashboard',
        element: <DashBoard isDarkThemeEnable={isDarkThemeEnable} />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addJobAction,
          },
          { path: 'stats', element: <Stats />, loader: statsLoader},
          {
            path: 'all-jobs',
            element: <AllJobs />,
            loader: allJobsLoader,
          },

          {
            path: 'profile',
            element: <Profile />,
            action: profileAction
          },
          {
            path: 'admin',
            element: <Admin />,
            loader: adminLoader,
          },
          {
            path: 'edit-job/:id',
            element: <EditJob />,
            loader: EditJobLoader,
            action: EditJobAction,
          },
          {
            path: 'delete-jobs/:id',
            action: deleteJobAction
          }
        ]
      },
    ]
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
