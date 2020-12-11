import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getRegisterAction} from "../redux/actions/authAction";
import {getSetMessage} from "../redux/actions/varTypes";

function Register() {
    const dispatch = useDispatch();
    const message = useSelector((state) => state.message.message)
    console.log('pesan', message)

    useEffect(() => {
       dispatch( getSetMessage())
    })
    const [register, setRegister] = useState({
        username: "",
        email : "",
        password: ""
    })

    const handleChange = (e) => {
        setRegister({
            ...register,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(getRegisterAction(register.username, register.email, register.password))
    }
    console.log(register)
    return (
       <>
       <h2>Halaman Register</h2>
       <div>
           <form onSubmit={handleSubmit}>
               <label >username</label> 
               <input type="text" name="username" value={register.username} onChange={handleChange} placeholder="username" /> <br/>
               <label >Email</label>  
               <input type="email" name="email" value={register.email} onChange={handleChange} placeholder="email" /> <br/>
               <label >password</label> 
               <input type="password" name="password" value={register.password} onChange={handleChange} placeholder="password" /> <br/>
            <button type="submit">Kirim</button>
           </form>
       </div>
       </>
    )
}

export default Register
