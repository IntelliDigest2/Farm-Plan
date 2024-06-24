import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { deleteAccount, deleteFeedBack } from "../../store/actions/authActions";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const options = [
  "I do not understand how to use the product",
  "Switching to another product",
  "Too expensive",
  "It is temporary, I will be back",
  "Missing features that I need",
  "Technical Issues",
  "Not interested",
  "Others (Provide Details)",
];

function getStyles(name, reason, theme) {
  return {
    fontWeight:
      reason.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function DeletePopUp(props) {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [feedBack, setFeedBack] = React.useState("");
  const [otherReason, setOtherReason] = React.useState("");
  const [error, setError] = React.useState(false);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setFeedBack(value);
    if (value && value !== "Others (Provide Details)") {
      setError(false);
    }
  };

  const handleOtherReasonChange = (event) => {
    setOtherReason(event.target.value);
    if (event.target.value) {
      setError(false);
    }
  };

  const [openForm, setOpenForm] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenForm = () => {
    handleClose();
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  async function handleAccountDelete(text) {
    try {
      // First, submit the feedback
      await props.deleteFeedBack({ text });

      // Then, delete the account
      const data = {
        userId: props.profile.uid,
        buildingFunction: props.profile.buildingFunction,
        userType: props.profile.type,
        email: props.auth.providerData[0].email,
        password: props.auth.providerData[0].providerId,
      };
      await props.deleteAccount(data);

      // Close the form and redirect to the landing page
      handleCloseForm();
      history.push("/landing");
      console.log("Account deletion process completed.");
    } catch (error) {
      console.error("Account deletion failed:", error);
    }
  }

  return (
    <>
      <Button
        sx={{
          backgroundColor: "red",
          color: "white",
          fontWeight: "bold",
          border: "none",
          "&:hover": {
            backgroundColor: "red",
            color: "white",
            border: "none",
          },
          padding: "15px",
        }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Delete Account
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle fontSize={"30px"} id="responsive-dialog-title">
          {"Delete Account"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              backgroundColor: "#AFBA15",
              color: "white",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#AFBA15",
                color: "white",
              },
            }}
            autoFocus
            onClick={handleClose}
          >
            No
          </Button>
          <Button
            sx={{
              backgroundColor: "#AFBA15",
              color: "white",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#AFBA15",
                color: "white",
              },
            }}
            onClick={handleClickOpenForm}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {openForm && (
        <Dialog
          open={openForm}
          onClose={handleCloseForm}
          PaperProps={{
            component: "form",
            onSubmit: async (event) => {
              event.preventDefault();
              if (feedBack === "Others (Provide Details)" && !otherReason) {
                setError(true);
                return;
              }
              if (!feedBack) {
                setError(true);
                return;
              }

              const feedbackText =
                feedBack === "Others (Provide Details)"
                  ? otherReason
                  : feedBack;
              await handleAccountDelete(feedbackText);
            },
          }}
        >
          <DialogTitle>Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please could you give a short description on why you would like to
              delete your account!
            </DialogContentText>
            {feedBack === "Others (Provide Details)" ? (
              <>
                <input
                  autoFocus
                  margin="dense"
                  id="other-reason"
                  placeholder="Provide Details"
                  fullWidth
                  value={otherReason}
                  onChange={handleOtherReasonChange}
                  style={{
                    width: "100%",
                    padding: "8px",
                    marginTop: "8px",
                    boxSizing: "border-box",
                  }}
                />
                {error && !otherReason && (
                  <DialogContentText color="error">
                    This field is required
                  </DialogContentText>
                )}
              </>
            ) : (
              <FormControl sx={{ m: 1, width: 300, mt: 3 }} error={error}>
                <Select
                  displayEmpty
                  value={feedBack}
                  onChange={handleChange}
                  input={<OutlinedInput />}
                  renderValue={(selected) => {
                    if (!selected) {
                      return <em>Please Select a Reason</em>;
                    }
                    return selected;
                  }}
                  MenuProps={MenuProps}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  {options.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, feedBack, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
                {error && (
                  <DialogContentText color="error">
                    Please select a reason before submitting.
                  </DialogContentText>
                )}
              </FormControl>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              sx={{
                backgroundColor: "#AFBA15",
                color: "white",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#AFBA15",
                  color: "white",
                },
              }}
              onClick={handleCloseForm}
            >
              Cancel
            </Button>
            <Button
              sx={{
                backgroundColor: "#AFBA15",
                color: "white",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#AFBA15",
                  color: "white",
                },
              }}
              type="submit"
            >
              DELETE
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteAccount: (cred) => dispatch(deleteAccount(cred)),
    deleteFeedBack: (data) => dispatch(deleteFeedBack(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeletePopUp);
