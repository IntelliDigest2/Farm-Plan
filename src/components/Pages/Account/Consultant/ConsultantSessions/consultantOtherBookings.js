import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchOtherBookings } from "../../../../../store/actions/consultantActions/consultantActions";

export const ConsultantOtherBookings = (props) => {
	const { auth, getOtherBookings, otherBookings } = props;

	useEffect(() => {
		// fetchOtherBookings(auth.uid);
		getOtherBookings(auth.uid);
	}, []);

	useEffect(() => {
		console.log(otherBookings);
	}, [otherBookings]);

	return <div>Other Bookings</div>;
};

const mapStateToProps = (state) => ({
	auth: state.firebase.auth,
	otherBookings: state.consultingState.otherBookings,
});

const mapDispatchToProps = (dispatch) => {
	return {
		getOtherBookings: (uid) => {
			dispatch(fetchOtherBookings(uid));
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ConsultantOtherBookings);
