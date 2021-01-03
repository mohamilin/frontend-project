import React from 'react';
import {useSelector } from "react-redux";


import Header from "../components/Header";

function Profile() {
    const newUser = useSelector((state) => state.authReducer.user)
    
    console.log('showuser new', newUser)
    
    return (
        <>
        <Header/>
        <h1>Halaman Profile</h1>
    <p>{newUser.username}</p>
    <p>{newUser.email}</p>
    <p>{newUser.id}</p>
    <p>{newUser.accessToken}</p>
    {newUser.roles.map((item, id) => (
        <p key={id}> {item} </p>
    ))}
        </>
    )
}

export default Profile
