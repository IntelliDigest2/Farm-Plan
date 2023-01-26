import React, { useState, useEffect } from "react";

import "../../../../../SubComponents/Button.css";
import { Form, Button } from "react-bootstrap";

import { storage } from "../../../../../../config/fbConfig";

export default function Stage2({ certificate, setCertificate, setForm }) {
  const [progress, setProgress] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [err, setErr] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      setSubmitted(true);
    }
  }, [progress]);

  const uploadFiles = (certificate) => {
    //uploads document to firebase storage and gives feedback to the user
    const uploadTask = storage
      //sending to folder named "farmer-auth" inside fb storage
      .ref(`farmer-auth/${certificate.name}`)
      .put(certificate);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        storage
          .ref("farmer-auth")
          .child(certificate.name)
          .getDownloadURL()
          .then((url) => console.log(url));
      }
    );
  };

  const handleFile = (e) => {
    if (certificate) {
      e.preventDefault();
      uploadFiles(certificate);
    } else {
      e.preventDefault();
      setErr(true);
    }
  };

  return (
    <Form
      onSubmit={() => {
        setForm(3);
      }}
    >
      <Form.Group>
        <Form.Label>
          If registered, please upload your certificate of incorporation.
        </Form.Label>
        <Form.Control
          required
          type="file"
          id="certificate"
          onInput={(e) => {
            setCertificate(e.target.files[0]);
          }}
        />
        <p style={{ color: "rgb(131, 131, 131)" }}>Uploaded {progress}%</p>
      </Form.Group>
      {submitted ? (
        <Button type="submit" className="blue-btn mt-3 shadow-none">
          Next
        </Button>
      ) : (
        <>
          <Button className="green-btn mt-3 shadow-none" onClick={handleFile}>
            Submit Certificate
          </Button>
          {err ? (
            <div className="err">
              <p>please upload a certificate of incorporation</p>
            </div>
          ) : null}
        </>
      )}
    </Form>
  );
}
