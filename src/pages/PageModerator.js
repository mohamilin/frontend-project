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
        UserService.getMod().then(
            response => {
                setContext({
                    content: response.data
                });
            },
            error => {
                setContext({
                    content: (error.response && error.response.data && error.response.data.message) || 
                    error.message || error.toString()
                });
            }
        )
    },[])


    return (
        <>
            <Header />
            <div>
                <h2>Halaman Moderator</h2>
              
                <div>
                    {context.content}
                </div>
            </div>
        </>
    )
}

export default Homepage
