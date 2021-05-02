import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Link } from 'react-router-dom';
import "./account.css"

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function DialogSelect() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(Number(event.target.value) || '');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <p className="paragraph" onClick={handleClickOpen} style={{fontSize: "15px !important", color: "rgb(7, 7, 77) !important", textDecoration: "none", cursor: "pointer", display: "inline"}}>Chart</p>
      <Dialog disableBackdropClick disableEscapeKeyDown  open={open} onClose={handleClose}>
          <div style={{background:'black', color:'white'}}>

      <DialogActions>
        <DialogTitle style={{fontSize: "30px"}}>Which chart do you want to see?</DialogTitle>
          <Button onClick={handleClose} color="red" style={{color:'red', fontSize:'30px'}}>
            X
          </Button>
        </DialogActions>
          {/* <hr style={{color:'white'}}/> */}
        
        <DialogContent className="" >
        <DialogActions style={{display: "flex", justifyContent: 'space-between'}}>
          <Link style={{color:'white', textDecoration:'none', fontSize: "20px"}} to="/chart/year">
          Year
          </Link>
      
          <Link style={{color:'white', textDecoration:'none', fontSize: "20px"}} to="/chart/month">
          Month
          </Link>
      </DialogActions>
      <DialogActions style={{display: "flex", justifyContent: 'space-between'}}>
          <Link style={{color:'white', textDecoration:'none', fontSize: "20px"}} to="/chart/week">
          Week
          </Link>
      
          <Link style={{color:'white', textDecoration:'none', fontSize: "20px"}} to="/chart/day">
          Day
          </Link>
      </DialogActions>
        </DialogContent>

          </div>
      </Dialog>
    </div>
  );
}
