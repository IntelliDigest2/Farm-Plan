import React, { useEffect, useState } from "react";
import { GoogleLogin } from 'react-google-login';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { Redirect, Link } from 'react-router-dom';
import { auth } from '../../../config/fbConfig'; // Import your Firebase authentication instance
import { connect, useSelector } from 'react-redux';

import axios from 'axios';
import { signUpWithSocial } from "../../../store/actions/authActions";

const GoogleLoginButton = ({ onLoginSuccess, onLoginFailure, signUp }) => {
    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const authError = useSelector(state => state.auth.authError);

    const googleLogoUrl = 'https://res.cloudinary.com/dghm4xm7k/image/upload/v1702270409/static%20images/google_logo_pnhwcb.png'; 


    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setUser(codeResponse)
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(() => {

        // Use authError in your effect
        if (authError) {
            console.log('Auth Error:', authError);
            // Do something with the auth error if needed
        }

        if (user) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    console.log("response from google", res);
                    setProfile(res.data);
                    setIsLoggedIn(true);

                    // Sign in with Google credential to Firebase
                    let data = {
                        userData: res.data,
                        user: user,
                        function: "Personal",
                        type: "household_admin",
                        isSocialLogin: true,
                        verification: "pending"
                    }
                    signUp(data)
                    onLoginSuccess(res);

                    // const credential = auth.GoogleAuthProvider.credential(null, user.access_token);
                    // auth().signInWithCredential(credential)
                    //     .then((res) => {
                    //         // onLoginSuccess(res); // Call the parent's success callback
                    //         console.log(res)
                    //     })
                    //     .catch((error) => {
                    //         console.log("Firebase sign-in error", error);
                    //         onLoginFailure(error); // Call the parent's failure callback
                    //     });
                })
                
                .catch((err) => {
                    console.log(err);
                    onLoginFailure(err);
                });
        }
    }, [user, onLoginSuccess, onLoginFailure, signUp, authError]);

    // log out function to log the user out of google and Firebase
    const logOut = () => {
        googleLogout();
        auth().signOut();
        setProfile(null);
    };

    return (
        <div>
        <button onClick={() => login()} style={{ background: 'transparent', border: 'none' }}>
            <img 
            src={googleLogoUrl} 
            alt="Google Logo" 
             style={{ width: '25px', height: '25px', marginRight: '8px' }}
 
            />
        </button>
    </div>
    );
}
// const mapStateToProps = (state) => {
//     return {
//       authError: state.auth.authError,
//       auth: state.firebase.auth,
//     };
//   };
  const mapDispatchToProps = (dispatch) => {
    return {
      signUp: (creds) => dispatch(signUpWithSocial(creds)),
    };
  };
  
export default connect(null, mapDispatchToProps)(GoogleLoginButton);
