import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import * as XLSX from 'xlsx';

const CreateSchoolCode = (props) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailList, setEmailList] = useState([]);
  const [namesList, setNameList] = useState([]);
  const [emailInput, setEmailInput] = useState("");
  const [fullNameInput, setFullnameInput] = useState("");
  const [showModal, setShowModal] = useState(false);

  const baseUrlDev = "http://localhost:5000";
  const baseUrlProd = "https://wallet-api-mbvca3fcma-ew.a.run.app";

  const sendEmail = async (email, name, schoolCode) => {
    try {
      // ... (existing code for sending email)
      const response = await fetch(`${baseUrlProd}/v1/auth/send-school-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          name: name,
          schoolCode: schoolCode,
        }),
      });

      return { success: true, message: `Email sent to ${email}` };
    } catch (error) {
      console.error(`Error sending email to ${email}: ${error.message}`);
      throw new Error(`Error sending email to ${email}`);
    }
  };

  const genrateSchoolCode = async ({ email, name }) => {
    try {
      setIsLoading(true);

      const generate = await fetch(
        `${baseUrlProd}/v1/auth/create-school-code`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ schoolID: props.profile.uid }),
        }
      );

      if (!generate.ok) {
        throw new Error("Failed to create school code");
      }

      const data = await generate.json();

      const schoolCode = data.newSchoolCode.schoolCode;

      let response;

      response = await sendEmail(email, name, schoolCode);

      if (response.success) {
        Swal.fire({
          title: "Success!",
          text: response.message,
          icon: "success",
        });
      } else {
        // Display error modal if the API call is not successful
        console.error(`Error sending email to ${email}: ${response.message}`);
        Swal.fire({
          title: "Error!",
          text: "Error sending email",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error generating code", error);
      Swal.fire({
        title: "Error!",
        text: "Error generating code",
        icon: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to add emails to the emailList
  const handleAddEmail = () => {
    // Split the input value by commas and trim whitespaces
    const newEmails = emailInput.split(",").map((email) => email.trim());

    // Filter out empty strings and duplicate emails
    const uniqueEmails = Array.from(
      new Set(newEmails.filter((email) => email !== ""))
    );

    // Filter out emails already in the list
    const filteredUniqueEmails = uniqueEmails.filter(
      (email) => !emailList.includes(email)
    );

    // Update the emailList state
    setEmailList((prevEmailList) => [
      ...prevEmailList,
      ...filteredUniqueEmails,
    ]);

    // Clear the email input
    setEmailInput("");
  };

  // Function to add emails to the emailList
  const handleAddName = () => {
    // Split the input value by commas and trim whitespaces
    const newNames = fullNameInput.split(",").map((name) => name.trim());

    // Filter out empty strings and duplicate emails
    const uniqueNames = Array.from(
      new Set(newNames.filter((name) => name !== ""))
    );

    // Filter out emails already in the list
    const filteredUniqueNames = uniqueNames.filter(
      (names) => !namesList.includes(names)
    );

    // Update the emailList state
    setNameList((prevNamesList) => [...prevNamesList, ...filteredUniqueNames]);

    // Clear the email input
    setFullnameInput("");
  };

  // Function to remove an email from the emailList
  // Function to remove an email from the emailList and its corresponding name from the namesList
  const handleRemoveEmail = (email) => {
    // Find the index of the email to be removed
    const indexToRemove = emailList.findIndex((item) => item === email);

    if (indexToRemove !== -1) {
      // Create new arrays without the removed email and its corresponding name
      const newEmailList = [
        ...emailList.slice(0, indexToRemove),
        ...emailList.slice(indexToRemove + 1),
      ];
      const newNameList = [
        ...namesList.slice(0, indexToRemove),
        ...namesList.slice(indexToRemove + 1),
      ];

      // Update the emailList and namesList states
      setEmailList(newEmailList);
      setNameList(newNameList);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];

          // Extract email addresses and names
          const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

          // Assuming email is in column A, first name in column B, and last name in column C
          const emailColumnIndex = 0;
          const firstNameColumnIndex = 1;
          const lastNameColumnIndex = 2;

          // Extract email addresses
          const emails = rows
            .map((row) => row[emailColumnIndex])
            .filter((email) => isValidEmail(email));

          // Extract first names
          const firstNames = rows.map((row) => row[firstNameColumnIndex]);

          // Extract last names
          const lastNames = rows.map((row) => row[lastNameColumnIndex]);

          const names = firstNames.map((firstName, index) => {
            const lastName = lastNames[index] || ""; // If last name is not available, use empty string
            return `${firstName} ${lastName}`.trim(); // Concatenate first name and last name with a space
          });

          // Update emailList state with extracted emails
          setEmailList((prevEmailList) => [...prevEmailList, ...emails]);

          // Update namesList state with extracted names
          setNameList((prevNameList) => [...prevNameList, ...names]);
        } catch (error) {
          console.error("Error reading Excel file:", error);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  // Function to validate email format
  const isValidEmail = (email) => {
    // You can implement your own email validation logic here
    // This is a basic example
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  // Function to update the email input value
  const handleEmailInputChange = (e) => {
    setEmailInput(e.target.value);
  };

  // Function to update the email input value
  const handleFullNameInputChange = (e) => {
    setFullnameInput(e.target.value);
  };

  // Function to handle sending email to multiple addresses
  const handleSendEmails = async () => {
    const contactsArray = emailList.map((email, index) => ({
      email,
      name: namesList[index],
    }));

    for (const contact of contactsArray) {
      await genrateSchoolCode(contact);
    }
  };

  const handleRemoveAllEmails = () => {
    setEmailList([]); // Clear the emailList
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
      <div className="page-container">
        <div className="d-flex justify-content-center">
          <Form>
            <div className="row">
              <div className="col-md-6">
                {" "}
                {/* Adjust the column width as needed */}
                <Form.Group controlId="email" className="d-flex">
                  <div className="flex-grow-1">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={emailInput}
                      onChange={handleEmailInputChange}
                      required
                    />
                  </div>
                </Form.Group>
              </div>
              <div className="col-md-6">
                {" "}
                {/* Adjust the column width as needed */}
                <Form.Group controlId="fullName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter full name"
                    value={fullNameInput}
                    onChange={handleFullNameInputChange}
                    required
                  />
                </Form.Group>
              </div>
            </div>
            <div className="ml-2">
              {" "}
              {/* Add margin between the input and button */}
              <Button
                onClick={() => {
                  handleAddEmail();
                  handleAddName();
                }}
                className="green-btn shadow-none"
              >
                Add
              </Button>
            </div>
            {/* Add space between the buttons and file input */}

            <div className="mt-3">
              <input
                type="file"
                accept=".xlsx"
                onChange={handleFileUpload}
                className="w-100"
              />
            </div>

            {namesList.length > 0 && emailList.length > 0 && (
              <div>
                <p>Student Details:</p>
                <table>
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emailList.map((email, index) => (
                      <tr key={index}>
                        <td>{email}</td>
                        <td>{namesList[index]}</td>
                        <td>
                          <span
                            className="remove-icon"
                            onClick={() => handleRemoveEmail(email)}
                          >
                            &times;
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="d-flex align-items-center justify-content-between mt-3">
              <Button
                variant="primary"
                onClick={handleSendEmails}
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Create School Code"}
              </Button>

              <div className="ml-3">
                {emailList.length > 0 && (
                  <Button
                    variant="danger"
                    onClick={handleRemoveAllEmails}
                    className="mr-2"
                  >
                    Remove All
                  </Button>
                )}
              </div>
            </div>
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

export default connect(mapStateToProps)(CreateSchoolCode);
