import React from 'react'
import Header from "../components/Header";
import Register from "./Register";
function Homepage() {
    return (
        <>
        <Header/>
        <div>
            <h2>Halaman Homepage</h2>
            <Register/>
        </div>
        </>
    )
}

export default Homepage
