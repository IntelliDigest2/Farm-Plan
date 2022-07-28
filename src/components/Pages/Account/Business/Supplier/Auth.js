import React, { useState, useEffect } from 'react';
import { TextField, Stack, Button } from '@mui/material';
import { Link, Redirect } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';

import { connect } from 'react-redux';
// import { signUp } from '../../../../../store/actions/supplierActions/signUp';
// import { signUp } from '../../../../../store/actions/authActions';

import './Supplier.css';

const accounts = [
  {
    value: 'Business',
    label: 'Business',
  },
  {
    value: 'Personal',
    label: 'Personal',
  },
];

const organizations = [
  {
    value: 'Organization',
    label: 'Organization',
  },
  {
    value: 'Sole Business',
    label: 'Sole Business',
  },
];

function SupplierAuth(props) {
  const [organization, setOrganization] = React.useState('');
  const [account, setAccount] = React.useState('');
  const [referrer, setReferrer] = React.useState('');
  const [comment, setComment] = React.useState('');

  const handleOrganization = (event) => {
    setOrganization(event.target.value);
  };
  const handleAccount = (event) => {
    setAccount(event.target.value);
  };
  const handleReferrer = (event) => {
    setReferrer(event.target.value);
  };
  const handleComment = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (e) => {
    let data = {
      organization: organization,
      account: account,
      referrer: referrer,
      comment: comment,
    };
    console.log(data);
  };

  return (
    <>
      <div className='heading'>
        <p>Become a Supplier with us</p>
      </div>
      <div className='form-container'>
        <form>
          <Stack spacing={3} direction='column'>
            <TextField
              id='outlined-select-currency'
              select
              label='Are you part of an organization or a sole business?'
              value={organization}
              onChange={handleOrganization}
            >
              {organizations.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id='outlined-select-currency'
              select
              label='Do you have a business or personal account on the World Food Tracker?'
              value={account}
              onChange={handleAccount}
              // helperText='Please select your account type'
            >
              {accounts.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <p>How did you hear about the Intellidigest Supplier Program?</p>
            <TextField
              id='outlined-basic'
              label='Source'
              variant='outlined'
              onchange={handleReferrer}
            />
            <TextField
              id='outlined-multiline-static'
              label='Referral comments'
              multiline
              rows={4}
              onChange={handleComment}
            />
          </Stack>
          <label className='auth-checkbox'>
            <input type='checkbox' />
            <span>
              I have read and acknowleged the{' '}
              <a href='https://intellidigest.com'>
                Intellidigest Code of Conduct
              </a>
            </span>
          </label>
          <br />
          <div className='authbtn-container'>
            <Stack spacing={3} direction='row'>
              <Link to='/supplier/login' style={{ textDecoration: 'none' }}>
                <Button
                  variant='contained'
                  onClick={(e) => {
                    handleSubmit();
                  }}
                >
                  Auth to WFT
                </Button>
              </Link>
            </Stack>
          </div>
        </form>
      </div>
    </>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     auth: state.firebase.auth,
//     authError: state.auth.authError,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     signUp: (newSupplier) => dispatch(signUp(newSupplier)),
//   };
// };
export default SupplierAuth;
