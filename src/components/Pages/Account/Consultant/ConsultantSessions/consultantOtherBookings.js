import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchOtherBookings } from "../../../../../store/actions/consultingActions";

export const ConsultantOtherBookings = (props) => {
	const { auth } = props;

	useEffect(() => {
		fetchOtherBookings(auth.uid);
	}, []);

	return <div>consultantVideoBookings</div>;
};

const mapStateToProps = (state) => ({
	auth: state.firebase.auth,
});

const mapDispatchToProps = {};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ConsultantOtherBookings);
