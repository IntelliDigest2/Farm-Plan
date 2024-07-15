import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import { PageWrap } from '../../../SubComponents/PageWrap';

const ConnectSchool = (props) => {
  const [schoolCode, setSchoolCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const baseUrlProd = "https://wallet-api-mbvca3fcma-ew.a.run.app";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${baseUrlProd}/v1/auth/add-student-to-school`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userID: props.profile.uid, schoolCode: schoolCode }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      Swal.fire({
        title: 'Success!',
        text: 'School connected successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      });

    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="d-flex justify-content-center">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="schoolCode">
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
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(ConnectSchool);