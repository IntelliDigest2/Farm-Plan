import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { TextField, Stack, Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

import { connect } from 'react-redux';
import { signIn } from '../../../../../store/actions/authActions';

import './Supplier.css';

const businessTimespan = [
  {
    value: '0-3 years',
    label: '0-3 years',
  },
  {
    value: '4-7 years',
    label: '4-7 years',
  },
  {
    value: '8 years+',
    label: '8 years+',
  },
];

const supplyEquipmentType = [
  {
    value: 'Mechanical',
    label: 'Mechanical',
  },
  {
    value: 'Electronic',
    label: ' Electronic',
  },
  {
    value: 'Manual',
    label: 'Manual',
  },
];

const shipToLocations = [
  {
    value: 'Africa',
    label: 'Africa',
  },
  {
    value: 'Asia',
    label: 'Asia',
  },
  {
    value: 'Australia',
    label: 'Australia',
  },
  {
    value: 'Europe',
    label: 'Europe',
  },
  {
    value: 'North America',
    label: 'North America',
  },
  {
    value: 'South America',
    label: 'South America',
  },
];
function ContinueAuth(props) {
  const [timespan, setTimespan] = useState('');
  const [equipmentType, setEquipmentType] = useState([]);
  const [shippingLocations, setShippingLocations] = useState([]);

  const handleBusinessTime = (event) => {
    setTimespan(event.target.value);
  };
  const handleEquipment = (event) => {
    setEquipmentType(event.target.value);
  };
  const handleLocations = (event) => {
    setShippingLocations(event.target.value);
  };

  // const { authError } = props;
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  console.log(props);
  console.log(props.auth);
  console.log(props.auth.uid === undefined);

  useEffect(() => {
    if (props.auth.uid === undefined) {
      setIsLoggedIn(false);
    }
  }, [props.auth.uid]);

  useEffect(() => {
    if (isLoggedIn === false) {
      return <Redirect to='/supplier/login' />;
    }
  }, [isLoggedIn]);

  return (
    <>
      <div className='heading'>
        <p>Become a Supplier with us</p>
      </div>
      <div className='form-container'>
        <form>
          <Stack spacing={3} direction='column'>
            <TextField
              id='outlined-basic'
              select
              label='How long have you been in business?'
              value={timespan}
              onChange={handleBusinessTime}
            >
              {businessTimespan.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id='outlined-select-currency'
              select
              label='What type of equipment do you supply?'
              value={equipmentType}
              onChange={handleEquipment}
            >
              {supplyEquipmentType.map((time) => (
                <MenuItem key={time.value} value={time.value}>
                  {time.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id='outlined-select-currency'
              select
              label='What are your ship-to or service locations?'
              value={shippingLocations}
              onChange={handleLocations}
            >
              {shipToLocations.map((location) => (
                <MenuItem key={location.value} value={location.value}>
                  {location.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id='outlined-basic'
              label='Any other additional information?'
              variant='outlined'
            />
          </Stack>
          <br />
          <div className='authbtn-container'>
            <Stack spacing={3} direction='row'>
              <Link
                to='/supplier/auth/continue/success'
                style={{ textDecoration: 'none' }}
              >
                <Button variant='contained'>Submit</Button>
              </Link>
            </Stack>
          </div>
        </form>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContinueAuth);
