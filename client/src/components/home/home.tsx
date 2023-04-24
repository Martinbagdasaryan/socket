import { useState } from "react"
import { useNavigate } from "react-router-dom"
import React from "react"

const Home = ()=>{
    const navigate = useNavigate()
    const [user,setUser] = useState('')

    const handelsubmit =(e: React.SyntheticEvent)=>{
        e.preventDefault();
        localStorage.setItem('user',user)
        navigate('/chat')
    }

    return(
        <div> 
            <form onSubmit={handelsubmit}>
                <h2>name</h2>
                <label htmlFor="user"></label>
                <input type='text' id='user' value={user} onChange={(e)=>setUser(e.target.value)} />
                <button type="submit" >enter</button>
            </form>
        </div>
    )
}

export default Home