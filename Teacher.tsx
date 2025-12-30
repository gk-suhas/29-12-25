import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Teacher() {
    const navigate=useNavigate()
    const[data,setData]=useState([])
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    useEffect(()=>{
        axios.get("http://localhost:2000/teacher ")
        .then((res)=>setData(res.data))
    },[])
    function submit(e){
        e.preventDefault()
        const teacher=data.find(
            (t)=>t.email===email && t.password===password
        )
        if(teacher){
            navigate('/teacher/teacheredit')
        }else{
            alert("invalid login details")
        }
    }
  return (
    <>
    <h1>ENTER UR CREDENTIALS</h1>
    <form action="" onSubmit={submit}>
    <label htmlFor="">Email</label>
    <input type="text" onChange={(e)=>setEmail(e.target.value)} />
    <label htmlFor="">Password</label>
    <input type="text" onChange={(e)=>setPassword(e.target.value)} />
    <button type='submit'>Login</button>
    </form>
    </>
  )
}

export default Teacher