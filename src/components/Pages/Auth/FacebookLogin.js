import React, { useEffect, useState } from 'react';
// import FacebookLoginWithButton from 'react-facebook-login';
import FacebookLoginWithButton from 'react-facebook-login/dist/facebook-login-render-props' 

import { connect, useSelector } from 'react-redux';
import axios from 'axios';
import { signUpWithFacebook } from '../../../store/actions/authActions';

const FacebookLoginButton = ({ onLoginSuccess, onLoginFailure, signUp }) => {
  
  const [profile, setProfile] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const facebookLogoUrl = 'https://res.cloudinary.com/dghm4xm7k/image/upload/v1702457899/static%20images/Facebook_logo_meq3wa.png';


  const responseFacebook = async (response) => {
    if (response.status !== 'unknown') {
      try {
        const res = await axios.get(`https://graph.facebook.com/v15.0/${response.id}?fields=id,name,email,picture&access_token=${response.accessToken}`);
  
        const data = {
          userData: res.data,
          user: response,
          function: 'Personal',
          type: 'household_admin',
          isSocialLogin: true,
          verification: "pending"
        };
    
        signUp(data);

        onLoginSuccess(res);
      } catch (err) {
        console.log('Error fetching user profile:', err);
        onLoginFailure(err);
      }
    } else {
      // Handle login failure
      onLoginFailure(response);
    }
  };
  
  return (
    <FacebookLoginWithButton
          appId="25037934792460445"
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
          render={renderProps => (
            <button onClick={renderProps.onClick} style={{ background: 'transparent', border: 'none' }}>
              <img 
                src={facebookLogoUrl} 
                alt="Facebook Logo" 
                style={{ width: '25px', height: '25px', marginRight: '8px' }}
              />
            </button>
          )}
        />
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (creds) => dispatch(signUpWithFacebook(creds)),
  };
};

export default connect(null, mapDispatchToProps)(FacebookLoginButton);
