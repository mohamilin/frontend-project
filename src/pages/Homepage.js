import React, { useState, useEffect } from 'react'


// redux
import UserService from "../service/userService";
import Header from "../components/Header";
import Register from "./Register";
import Login from "./Login";



function Homepage() {

    

    const [context, setContext] = useState({
        content: ""
    })

    console.log("context", context.content)

    useEffect(() => {
        UserService.getPublic().then(
            response => {
                setContext({
                    content: response.data
                });
            },
            error => {
                setContext({
                    content: (error.response && error.response.data) || 
                    error.message || error.toString()
                });
            }
        )
    },[UserService])


    return (
        <>
            <Header />
            <div>
                <h2>Halaman Homepage</h2>
                {/* <Register/> */}
                {/* <Login/> */}
                <div>
                    {context.content}
                </div>

            </div>
        </>
    )
}

export default Homepage
