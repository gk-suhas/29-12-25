import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useAuth } from './AuthContext'
import { useNavigate } from 'react-router-dom'
function Student() {
    const {login,user}=useAuth()
    const navigate=useNavigate()
    const[data,setData]=useState([])
    const[student,setStudent]=useState({
        email:"",
        password:""
    })
    console.log(user);
    
    useEffect(()=>{
        axios.get("http://localhost:2000/student ")
        .then((res)=>{
            setData(res.data)
        })
        .catch((err)=>alert(err))
    },[])
    function validate(e){
        e.preventDefault()
        let logined=data.find((item)=>
            item.email===student.email && item.password===student.password
        )
        let usn=logined.id;
        if(usn){
            login({
                email:logined.email,
                password:logined.password
            })
            navigate(`/student/studentdata/${usn}`)
        }else{
            alert("invalid credentials")
        }
    }
  return (
    <>
    <form action="" onSubmit={validate}>
        <label htmlFor="email">email</label>
        <input type="text" value={student.email} onChange={(e)=>setStudent({...student,email:e.target.value})} /> <br />
        <label htmlFor="">passwod</label>
        <input type="text" value={student.password} onChange={(e)=>setStudent({...student,password:e.target.value})} /> <br />
        <button type='submit'>login</button>
    </form>
    </>
  )
}

export default Student