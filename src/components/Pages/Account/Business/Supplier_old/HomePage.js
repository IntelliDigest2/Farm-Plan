import React from 'react';
import { Stack, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import './Supplier.css';

function SupplierHomePage() {
  return (
    <>
      <div class='hero-section'>
        <h1>Become a Supplier</h1>
        <p>
          Learn more about becoming a supplier to Intellidigest
          <br /> and it's customers
        </p>
      </div>
      <div className='home-content'>
        <p>
          <small>
            Intellidigest is looking to work with leading multinational and
            local companies in the agricultural industry who are suppliers of
            farm tools and equipment
          </small>
        </p>
        <p>
          <small>
            To register your interest, please complete the two-stage process
            below.
          </small>
        </p>
        <p>
          <small>
            <b>First step: registration </b>
            <br />
            Create your profile and attach the signed supplier-authorized letter
            along with the required documents - in addition to accepting the NDA
            and code of conduct.
          </small>
          <br />
        </p>
        <p>
          <small>
            <b>Second step: questionnaire</b>
            <br /> You will receive an email with an invitation to complete the
            supplier questionnaire. Please complete it in order to be
            successfully registered as a supplier. <br />
            <br />
            For any questions, please contact us at info@intellidigest.com
          </small>
        </p>
        <div className='homebtn-container'>
          <Stack spacing={3} direction='row'>
            <Link to='/supplier/auth' style={{ textDecoration: 'none' }}>
              <Button variant='contained'>Registration</Button>
            </Link>
          </Stack>
        </div>
      </div>
    </>
  );
}

export default SupplierHomePage;
