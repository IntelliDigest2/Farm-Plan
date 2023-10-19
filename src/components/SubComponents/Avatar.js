import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	avatar: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: "3.2rem",
		height: "3.2rem",
		borderRadius: "50%",
		backgroundColor: "#1C1569", // Update to the desired background color
		color: "#ffffff", // Update to the desired text color
		fontSize: "1.0rem",
		fontWeight: "bold",
		margin: "0 6px 0 6px ",
		// marginRight: theme.spacing(2), // Add some margin for spacing
		// overflow: "hidden", // Prevents the initials from overflowing the circle
	},

	"@media (max-width: 600px)": {
		avatar: {
			width: "40px",
			height: "40px",
		},
	},
}));

const Avatar = ({ initials }) => {
	const classes = useStyles();

	return (
		<div className={classes.avatarContainer}>
			<div className={classes.avatar}>{initials?.toUpperCase()}</div>
		</div>
	);
};

export default Avatar;
