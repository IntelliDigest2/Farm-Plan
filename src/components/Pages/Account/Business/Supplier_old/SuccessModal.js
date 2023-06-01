import React from "react";
import { Stack, Button } from "@mui/material";
import { Link } from "react-router-dom";

import "./Supplier.css";

function SupplierAuth() {
  return (
    <>
      <div className="s-heading">
        <p>Successful Account Creation</p>
      </div>
      <div className="form-container">
        <h2>Welcome Aboard</h2>
        <p className="success-content">
          You will receive an email with an invitation to complete the supplier
          questionnaire. Please complete it in order to be successfully
          registered as a supplier. <br />
          <br />
          For any questions, please contact us at info@intellidigest.com
        </p>
        <Stack spacing={3} direction="row">
          <Link to="/supplier/home" style={{ textDecoration: "none" }}>
            <Button variant="contained">Continue</Button>
          </Link>
        </Stack>
      </div>
    </>
  );
}

export default SupplierAuth;
