import React, { useState } from 'react';
import { Form, Button, Container, ListGroup, ListGroupItem } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { fs } from '../../../../../config/fbConfig';

const AddClass = () => {
  const [teacherName, setTeacherName] = useState('');
  const [classCode, setClassCode] = useState('');
  const [subClassName, setSubClassName] = useState('');
  const [classes, setClasses] = useState([]);

  const handleClassSubmit = async (e) => {
    e.preventDefault();
    
    if (teacherName && classCode && classes.length > 0) {
      try {
        // Create a new document in the 'school_users' collection with the class code as the document ID
        const classDocRef = fs.collection('school_users').doc(classCode);
        
        // Create the class document with an empty field for teacherName (it will be added in the sub-collection)
        await classDocRef.set({
          className: classCode,
        });

        // Add each subclass to the 'subclasses' sub-collection
        const subClassesRef = classDocRef.collection('subclasses');
        const batch = fs.batch();
        classes.forEach(subClass => {
          const subClassRef = subClassesRef.doc(subClass);
          batch.set(subClassRef, { teacherName });
        });
        await batch.commit();

        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Class and subclasses have been successfully added.',
        });

        // Clear form fields
        setTeacherName('');
        setClassCode('');
        setSubClassName('');
        setClasses([]);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message || 'Something went wrong!',
        });
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Form',
        text: 'Please ensure all fields are filled and at least one subclass is added.',
      });
    }
  };

  const handleSubClassSubmit = (e) => {
    e.preventDefault();
    if (subClassName) {
      setClasses([...classes, subClassName]);
      setSubClassName('');
    }
  };

  return (
    <Container>
      <h1>Add Class</h1>
      <Form onSubmit={handleClassSubmit}>
        <Form.Group controlId="teacherName">
          <Form.Label>Teacher Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter teacher name"
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="classCode">
          <Form.Label>Class Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter class code (e.g., Primary 4)"
            value={classCode}
            onChange={(e) => setClassCode(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Class
        </Button>
      </Form>

      <Form onSubmit={handleSubClassSubmit} className="mt-4">
        <Form.Group controlId="subClassName">
          <Form.Label>Sub Class Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter sub class name"
            value={subClassName}
            onChange={(e) => setSubClassName(e.target.value)}
          />
        </Form.Group>
        <Button variant="secondary" type="submit">
          Add Sub Class
        </Button>
      </Form>

      {classes.length > 0 && (
        <div className="mt-4">
          <h2>Sub Classes List</h2>
          <ListGroup>
            {classes.map((subClass, index) => (
              <ListGroupItem key={index}>{subClass}</ListGroupItem>
            ))}
          </ListGroup>
        </div>
      )}
    </Container>
  );
};

export default AddClass;