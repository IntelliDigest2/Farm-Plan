import React, { useEffect, useState } from "react";
import { GoogleLogin } from 'react-google-login';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { Redirect, Link } from 'react-router-dom';


import axios from 'axios';

const GoogleLoginButton = ({onLoginSuccess, onLoginFailure}) => {
    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setUser(codeResponse)
        },
        onError: (error) => console.log('Login Failed:', error)
    });


    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        console.log("response from google", res)
                        setProfile(res.data);
                        setIsLoggedIn(true)
                        onLoginSuccess(res.data); // Call the parent's success callback

                    })
                    .catch((err) => {
                    console.log(err)
                    onLoginFailure(err)}) // Call the parent's failure callback
            }
        },
        [ user, onLoginSuccess, onLoginFailure ]
    );

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    return (
        <div>
            <h2>React Google Login</h2>
            <br />
            <br />
            {profile ? (
                <div>
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <button onClick={() => login()}>Sign in with Google 🚀 </button>
            )}
        </div>
    );
}
export default GoogleLoginButton;
