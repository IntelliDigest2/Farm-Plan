import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Container,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { PageWrap } from "../../../../components/SubComponents/PageWrap";

const SupplierManagement = () => {
  const [open, setOpen] = useState(false);
  const [supplier, setSupplier] = useState({
    name: "",
    contact: "",
    email: "",
    address: "",
    supplies: "",
  });
  const [supplierList, setSupplierList] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier({ ...supplier, [name]: value });
  };

  const handleAddSupplier = () => {
    setSupplierList([...supplierList, supplier]);
    setSupplier({
      name: "",
      contact: "",
      email: "",
      address: "",
      supplies: "",
    });
    handleClose();
  };
  return (
    <>
      <PageWrap goTo="/account">
        <Container>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Add Supplier
          </Button>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Supplier</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                name="name"
                label="Name"
                type="text"
                fullWidth
                variant="outlined"
                value={supplier.name}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="contact"
                label="Contact"
                type="text"
                fullWidth
                variant="outlined"
                value={supplier.contact}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="email"
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                value={supplier.email}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="address"
                label="Address"
                type="text"
                fullWidth
                variant="outlined"
                value={supplier.address}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="supplies"
                label="Supplies"
                type="text"
                fullWidth
                variant="outlined"
                value={supplier.supplies}
                onChange={handleChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleAddSupplier} color="primary">
                Add Supplier
              </Button>
            </DialogActions>
          </Dialog>

          {supplierList.length === 0 ? (
            <Typography
              variant="h6"
              align="center"
              color="textSecondary"
              style={{ marginTop: 20 }}
            >
              No Suppliers
            </Typography>
          ) : (
            <List>
              {supplierList.map((supplier, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={supplier.name}
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                          Contact: {supplier.contact}
                        </Typography>
                        <br />
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                          Email: {supplier.email}
                        </Typography>
                        <br />
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                          Address: {supplier.address}
                        </Typography>
                        <br />
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                          Supplies: {supplier.supplies}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Container>
      </PageWrap>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps, null)(SupplierManagement);
