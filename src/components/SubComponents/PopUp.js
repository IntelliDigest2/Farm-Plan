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
    <Dialog open={open} maxWidth="xs" fullWidth>
      <DialogTitle>
        {props.children}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
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

export function ModalPopUp(props) {
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
              {props.icon}
            </ListItemIcon>
            <ListItemText>{props.text}</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
      <PopUp
        open={open}
        onClose={handleClose}
        text={props.text}
        handleButtonClick={props.handleSignOut}
        to={props.to}
      >
        {props.message}
      </PopUp>
    </>
  );
}
