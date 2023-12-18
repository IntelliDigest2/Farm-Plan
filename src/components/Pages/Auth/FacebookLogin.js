import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import axios from 'axios';
import { auth } from '../../../config/fbConfig';
import { signUpWithSocial } from '../../../store/actions/authActions';
import FacebookLogin from 'react-facebook-login';

const FacebookLoginButton = ({ onLoginSuccess, onLoginFailure, signUp }) => {
  const [user, setUser] = useState(null);
  const isLoggedIn = user !== null;
  const authError = useSelector((state) => state.auth.authError);

  const facebookLogoUrl =
    'https://res.cloudinary.com/dghm4xm7k/image/upload/v1702457899/static%20images/Facebook_logo_meq3wa.png';

    // const login = useGoogleLogin({
    //     onSuccess: (codeResponse) => {
    //         setUser(codeResponse)
    //     },
    //     onError: (error) => console.log('Login Failed:', error)
    // });


  useEffect(() => {
    if (authError) {
      console.log('Auth Error:', authError);
      // Handle auth error if needed
    }

    if (user) {
      const fetchUserProfile = async () => {
        try {
          const res = await axios.get(`https://graph.facebook.com/v15.0/${user.id}?fields=id,name,email,picture&access_token=${user.accessToken}`);
          console.log('Response from Facebook:', res.data);

          const data = {
            userData: res.data,
            user,
            function: 'Personal',
            type: 'household_admin',
          };

          signUp(data);
          onLoginSuccess(res);
        } catch (err) {
          console.log('Error fetching user profile:', err);
          onLoginFailure(err);
        }
      };

      fetchUserProfile();
    }
  }, [user, onLoginSuccess, onLoginFailure, signUp, authError]);

  return (
    <div>
        <button style={{ background: 'transparent', border: 'none' }}>
            <img 
            src={facebookLogoUrl} 
            alt="Facebook Logo" 
             style={{ width: '25px', height: '25px', marginRight: '8px' }}
            />
        </button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (creds) => dispatch(signUpWithSocial(creds)),
  };
};

export default connect(null, mapDispatchToProps)(FacebookLoginButton);
