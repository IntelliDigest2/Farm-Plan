import React, { useState } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { SubButton } from "./Button";

export function PopUp(props) {
  const { open, onClose, handleButtonClick, to, text } = props;

  return (
    <Dialog open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {props.children}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "static",
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <SubButton
        styling="blue"
        text={text}
        onClick={handleButtonClick}
        goTo={to}
      />
    </Dialog>
  );
}

export function LogOutPopUp(props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <List>
        <ListItem className="space-between">
          <ListItemButton onClick={handleClickOpen}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
      <PopUp
        open={open}
        onClose={handleClose}
        text="Log Out"
        handleButtonClick={props.handleSignOut}
        to={props.to}
      >
        Are you sure you want to log out?
      </PopUp>
    </>
  );
}
