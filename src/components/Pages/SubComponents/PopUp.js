// import React from "react";

// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import { SubButton } from "./Button";

// import { signOut } from "../../../store/actions/authActions";
// import { connect } from "react-redux";

// function PopUp(props) {

//     const { open, handleButtonClick } = props

//     return (
//         <Dialog open={open}>
//             <DialogTitle>{props.title}</DialogTitle>
//             <SubButton styling="blue" text="Log Out" onClick={() => handleButtonClick} />
//         </Dialog>
//     )
// }

// function LogOutPopUp(props) {
//     const { onClose, open} = props;

//     const handleClose = () => {

//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//       signOut: () => dispatch(signOut()),
//     };
//   };

//   const mapStateToProps = (state) => {
//     // console.log(state);
//     return {
//       auth: state.firebase.auth,
//     };
//   };

//   export default connect(mapStateToProps, mapDispatchToProps)(PopUp);
