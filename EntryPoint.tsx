import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
function EntryPoint() {
    const navigate=useNavigate()
  return (
    <>
    <h1>ERP PLATFORM</h1>
    <Link to="/student">student login</Link>
    <Link to="/teacher">teacher login</Link>
    </>
  )
}

export default EntryPoint