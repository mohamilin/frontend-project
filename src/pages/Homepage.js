import React, { useState, useEffect } from 'react'


// redux
import UserService from "../service/userService";
import Header from "../components/Header";


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
    // eslint-disable-next-line
    },[UserService])


    return (
        <>
            <Header />
            <div>
                <h2>Single Sign On (SSO) <br/>  PPTQ Assalam Riyadlul Jannah</h2>
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
