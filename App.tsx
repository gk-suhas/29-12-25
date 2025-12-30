import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import EntryPoint from './EntryPoint'
import Teacher from './Teacher'
import Student from './Student'
import Teacheredit from './Teacheredit'
import StudentData from './StudentData'
import { AuthProvider } from './AuthContext'
const router=createBrowserRouter([
  {
    path:'/',
    element: <EntryPoint/>
  },
  {
    path:'/teacher',
    element:<Teacher/>
  },
  {
    path:'/student',
    element:<Student/>
  },
  {
    path:'/teacher/teacheredit',
    element:<Teacheredit/>
  },
  {
    path:'/student/studentdata/:id',
    element:<StudentData/>
  }
])

export default function App(){
  return (
    <>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
    </>
  )
}