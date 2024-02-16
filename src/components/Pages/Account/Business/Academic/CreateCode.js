import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import { PageWrap } from '../../../../SubComponents/PageWrap';

const CreateSchoolCode = (props) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const baseUrlDev="http://localhost:5000"
  const baseUrlProd="https://wallet-api-mbvca3fcma-ew.a.run.app"

  const sendEmail = async (email, schoolCode) => {
    try {
      // ... (existing code for sending email)
      const response = await fetch(`${baseUrlDev}/v1/auth/send-school-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, schoolCode: schoolCode}),
      });
  
      return { success: true, message: `Email sent to ${email}` };
    } catch (error) {
      console.error(`Error sending email to ${email}: ${error.message}`);
      throw new Error(`Error sending email to ${email}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${baseUrlDev}/v1/auth/create-school-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ schoolID: props.profile.uid }),
      });

      if (!response.ok) {
        throw new Error('Failed to create school code');
      }

      const data = await response.json();

      const schoolCode = data.newSchoolCode.schoolCode

      await sendEmail(email, schoolCode)

      console.log('generated code:', data);

      // Optionally, send an email to the provided email address
      // This would typically be handled in your backend API

      Swal.fire({
        title: 'Success!',
        text: 'School code created successfully.',
        icon: 'success',
      });
    } catch (error) {
      console.error('Error creating school code:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to create school code. Please try again later.',
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
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create School Code'}
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

export default connect(mapStateToProps)(CreateSchoolCode);
