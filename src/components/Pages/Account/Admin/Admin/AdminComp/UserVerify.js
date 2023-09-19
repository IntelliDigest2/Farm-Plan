import React, { useState, useEffect, useRef } from "react";
import emailjs, { init } from "@emailjs/browser";

import FileCopyIcon from '@mui/icons-material/FileCopy';
import EmailIcon from '@mui/icons-material/Email';
import IconButton from "@mui/material/IconButton";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { connect } from "react-redux";
import moment from "moment";
import { getUnverifiedUsers } from "../../../../../../store/actions/dataActions";


function UserVerify(props) {

const baseUrlDev="http://localhost:5000"
const baseUrlProd="https://wallet-api-mbvca3fcma-ew.a.run.app"

  const [list, setList] = useState([]);
  const [message, setMessage] = useState(null);
  const [copySuccess, setCopySuccess] = useState(null);

  const [openEmailModal, setOpenEmailModal] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");
  const [selectedEmail, setSelectedEmail] = useState(""); 

  const handleCopyClick = (uid) => {
    const textArea = document.createElement('textarea');
    textArea.value = uid;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    setCopySuccess(uid);
    setTimeout(() => setCopySuccess(null), 1500); // Reset copy success message after 1.5 seconds
  };


  //this sends data request
  useEffect(() => {
    props.getUnverifiedUsers();
    //console.log("getting inv ==>", props.data)
  }, [props.value, props.update]);

  const updateUnverifiedUsersList = async () => {
    //clears the items array before each update- IMPORTANT
    setList([]);

    //sets a new item object in the array for every document
    props.data.forEach((doc) => {
      // id is the docref for deletion
      var uid = doc.uid;
	  var firstName = doc.firstName;
	  var lastName = doc.lastName;
	  var email = doc.email;
      var buildingFunction = doc.buildingFunction;

      setList((list) => [
        ...list,
        {
          uid: uid,
		  firstName: firstName,
		  lastName: lastName,
		  email: email,
          buildingFunction: buildingFunction,
        },
      ]);
    });
  };

  useEffect(() => {
    updateUnverifiedUsersList();
  }, [props.data]);
  
  const sendEmail = (email, message) => {
    try {
        const response = fetch(`${baseUrlDev}/v1/auth/send-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({email: email, message: message}),
        });
  
        // Handle the response from your backend
        if (response) {
          setMessage("Email Sent!");

        } else {
          setMessage("Send email failed.");
        }
      } catch (err) {
        setMessage("An error occurred sending Email.");
      }
  }

  // Function to handle sending email from the modal
  const handleSendEmail = () => {
    sendEmail(selectedEmail, emailMessage); // Pass the email and message to sendEmail function
    handleCloseEmailModal(); // Close the modal after sending
  };


  // Function to open the email modal
  const handleOpenEmailModal = () => {
    setOpenEmailModal(true);
  };

  // Function to close the email modal
  const handleCloseEmailModal = () => {
    setOpenEmailModal(false);
  };

  return (
    <>
      {list.length ? (
        <>
			<table  style={{ margin: '0 auto', width: '80%', textAlign: 'center' }}> 
			<tbody>
				{list.map((item, index) => (
				<tr key={`item${index}`}>
					<td>
					{item.firstName} {item.lastName}
					</td>
					<td>{item.uid}</td>
					<td>
					<IconButton
						onClick={() => handleCopyClick(item.uid)}						
						color="primary"
						aria-label="Copy"
						style={{ borderRadius: '0', paddingLeft: '10px', width: 'auto' }} // Add or adjust styles here
					>
						<FileCopyIcon />
					</IconButton>
					<IconButton
						onClick={() => {
							handleOpenEmailModal(); // Pass the email to open the email modal
							setSelectedEmail(item.email)
						}}
						color="primary"
						aria-label="Email"
						style={{ borderRadius: '0', paddingLeft: '10px', width: 'auto' }} // Add or adjust styles here
					>
						<EmailIcon />
					</IconButton>
					{copySuccess === item.uid && (
						<span style={{ color: 'green', marginLeft: '5px' }}>Copied!</span>
					)}
					</td>
				</tr>
				))}
			</tbody>
			</table>

			{/* Email modal */}
			<Dialog open={openEmailModal} onClose={handleCloseEmailModal}>
        <DialogTitle>Send Email</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your message below:
          </DialogContentText>
          <textarea
            rows="4"
            cols="50"
            value={emailMessage}
            onChange={(e) => setEmailMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <button onClick={handleCloseEmailModal}>Cancel</button>
          <button onClick={handleSendEmail}>Send Email</button>
        </DialogActions>
      </Dialog>

        </>
      ) : (
        <div className="empty basic-title-left">
          <p>There are no items in the list :( </p>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.data.unverifiedUsers,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUnverifiedUsers: (item) => dispatch(getUnverifiedUsers(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserVerify);
