

import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout/Layout'
import Home from "./Pages/Home/Home"
import About from './Pages/About/About'
import Contact from './Pages/Contact/Contact'
import NothFound from './Pages/NothFound/NothFound'

const App = () => {


  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: '/about',
          element: <About />,
        },
        {
          path: '/contact',
          element: <Contact/>,
        }
      ]
       
    },
    {
      path: "*",
      element:<NothFound/>
    }
    ])

  return <RouterProvider router={router} />
}

export default App