import React, { useEffect, useState,useMemo } from 'react'
import { useParams,useNavigate,useLocation } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from './AuthContext'
function StudentData() {
    const {logout,user,setUser}=useAuth()
    console.log(user);
    const navigate=useNavigate()
    const location=useLocation()
    const {id}=useParams()
    const[data,setData]=useState({
        id:"",
        name:"",
        email:"",
        password:"",
        semester:[]
    })
    useEffect(()=>{
        axios.get(`http://localhost:2000/student/${id}`)
        .then((res)=>{
            setData(res.data)
        })
        .catch((err)=>alert(err))
    },[])
    const memoSemester=useMemo(()=>{                     //use memo
        return data.semester;
    },[data.semester])
    function goback(){
        setUser(null)
        navigate('/student')
    }
  return (
    <>
    <div>
       <label htmlFor="">USN: </label>{data.id} <br />
       <label htmlFor="">name: </label>{data.name} <br />
       <label htmlFor="">email: </label>{data.email} <br />
       <label htmlFor="">password: </label>{data.password} <br />
       <label htmlFor="">semester: </label>
       <div>
        {memoSemester.map((item,index)=>{
            if(item.sem1){
                return(
                    <div key={index}>
                        <h1>sem1</h1>
                        <p>sub1:   {item.sem1.sub1}</p>
                        <p>sub1:   {item.sem1.sub2}</p>
                        <p>sub1:   {item.sem1.sub3}</p>
                    </div>
                )
            }
            if(item.sem2){
                return(
                    <div key={index}>
                        <h1>sem2</h1>
                        <p>sub1 {item.sem2.sub1}</p>
                        <p>sub2 {item.sem2.sub2}</p>
                        <p>sub3 {item.sem2.sub3}</p>
                    </div>
                )
            }
            if(item.cgpa){
                return(
                    <div key={index}>
                        <h1>CGPA: {item.cgpa}</h1>
                    </div>
                )
            }
        })}
       </div>
    </div>
    <button onClick={goback}>logout</button>
    </>
  )
}

export default StudentData