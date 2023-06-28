import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  avatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: theme.spacing(7),
    height: theme.spacing(7),
    borderRadius: '50%',
    backgroundColor: '#1C1569', // Update to the desired background color
    color: '#ffffff', // Update to the desired text color
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginRight: theme.spacing(2), // Add some margin for spacing
    overflow: 'hidden', // Prevents the initials from overflowing the circle
  },
}));


const Avatar = ({ initials }) => {
  const classes = useStyles();

  return (
    <div className={classes.avatarContainer}>
      <div className={classes.avatar}>{initials}</div>
    </div>
  );
};

export default Avatar;
