import React, { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import { addChild } from '../../../../store/actions/actions';
import { fs } from "../../../../config/fbConfig"

const AddChild = (props) => {
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [dob, setDob] = useState('');
  const [childClass, setChildClass] = useState('');
  const [sex, setSex] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [availableClasses, setAvailableClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const classesSnapshot = await fs.collection('classes').get();
        const classesData = classesSnapshot.docs.map(doc => doc.id);
        setAvailableClasses(classesData);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchClasses();
  }, []);

  useEffect(() => {
    if (childClass) {
      const filtered = availableClasses.filter((cls) => cls.startsWith(childClass));
      setFilteredClasses(filtered);
    } else {
      setFilteredClasses([]);
    }
  }, [childClass, availableClasses]);

  const handleNext = (e) => {
    e.preventDefault();
    if (filteredClasses.length > 0) {
      setShowModal(true);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No available classes found for the entered class!',
      });
    }
  };

  const handleAddChild = async () => {
    const child = {
      firstName,
      surname,
      dob,
      childClass: selectedClass,
      sex,
      userID: props.profile.uid,
    };

    try {
      await fs.collection('school_users').add(child);
      Swal.fire({
        icon: 'success',
        title: 'Child Added',
        text: 'The child has been successfully added to the school users.',
      });

      // Optionally, you can also add the child to the Redux store if needed
      props.addChild(child);

      setFirstName('');
      setSurname('');
      setDob('');
      setChildClass('');
      setSex('');
      setSelectedClass('');
      setShowModal(false);
    } catch (error) {
      console.error('Error adding child:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was an error adding the child. Please try again later.',
      });
    }
  };

  return (
    <div className="page-container">
      <div className="d-flex justify-content-center">
        <Form onSubmit={handleNext}>
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="surname">
            <Form.Label>Surname</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="dob">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter date of birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="childClass">
            <Form.Label>Class</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter class (e.g., Primary 4)"
              value={childClass}
              onChange={(e) => setChildClass(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="sex">
            <Form.Label>Sex</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter sex"
              value={sex}
              onChange={(e) => setSex(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={props.isLoading}>
            {props.isLoading ? 'Processing...' : 'Next'}
          </Button>
        </Form>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="filteredClasses">
            <Form.Label>Class</Form.Label>
            <Form.Control
              as="select"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              required
            >
              <option value="" disabled>Select class</option>
              {filteredClasses.map((cls, index) => (
                <option key={index} value={cls}>{cls}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddChild} disabled={!selectedClass || props.isLoading}>
            {props.isLoading ? 'Adding...' : 'Add Child'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
    isLoading: state.child.isLoading,
  };
};

const mapDispatchToProps = {
  addChild,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddChild);