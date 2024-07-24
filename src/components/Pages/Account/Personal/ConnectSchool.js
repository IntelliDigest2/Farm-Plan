import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import { PageWrap } from '../../../SubComponents/PageWrap';

const ConnectSchool = (props) => {
  const [schoolCode, setSchoolCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const baseUrlDev="http://localhost:5000"
  const baseUrlProd="https://wallet-api-mbvca3fcma-ew.a.run.app"

  // const sendEmail = async (email, schoolCode) => {
  //   try {
  //     // ... (existing code for sending email)
  //     const response = await fetch(`${baseUrlProd}/v1/auth/send-school-code`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email: email, schoolCode: schoolCode}),
  //     });
  
  //     return { success: true, message: `Email sent to ${email}` };
  //   } catch (error) {
  //     console.error(`Error sending email to ${email}: ${error.message}`);
  //     throw new Error(`Error sending email to ${email}`);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    console.log("userID", props.profile, "school code", schoolCode)

    try {
      const response = await fetch(`${baseUrlProd}/v1/auth/add-student-to-school`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userID: props.profile.uid, schoolCode: schoolCode  }),
      });

      if (!response.ok) {
        throw new Error('Failed to connect to school');
      }

      const data = await response.json();

      // Optionally, send an email to the provided email address
      // This would typically be handled in your backend API

      Swal.fire({
        title: 'Success!',
        text: 'School connected successfully.',
        icon: 'success',
      });
    } catch (error) {
      console.error('Error connecting school:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to connect to school. Please try again later.',
        icon: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrap goTo="/account" header="Create School Code">
      <div className="page-container">
        <div className="d-flex justify-content-center">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>School Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter school code"
                value={schoolCode}
                onChange={(e) => setSchoolCode(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? 'Connecting...' : 'Connect School Code'}
            </Button>
          </Form>
        </div>
      </div>
    </PageWrap>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(ConnectSchool);
