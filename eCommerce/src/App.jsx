import './App.css'
import router from "./route/router.jsx";
import {RouterProvider} from "react-router";

function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App


// import React from 'react'
// import Login from './auth/login/Login'
//
// function App() {
//     return (
//         <Login />
//     )
// }
//
// export default App
