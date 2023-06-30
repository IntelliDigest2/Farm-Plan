import React, { useEffect, useState } from "react";
import { fetchCompletedBookings } from "../../../../../store/actions/consultantActions/consultantActions";

import { connect } from "react-redux";
import {
	Form,
	Col,
	Button,
	Row,
	ListGroup,
	ListGroupItem,
} from "react-bootstrap";
import { parseISO, format } from "date-fns";
 
function ConsultantRecord(props) {
	const [bookingsData, setBookingsData] = useState(null);
	const { completedBookings, auth, getCompletedBookings } = props;
  
	useEffect(() => {
	  getCompletedBookings(auth.uid);
	}, []);
  
	useEffect(() => {
	  setBookingsData(completedBookings);
	}, [completedBookings]);
  
	// ... Existing code ...
  
	let content;
	if (bookingsData && bookingsData.length > 0) {
	  content = bookingsData.map((booking) => {
		// ... Existing code ...
	  });
	} else {
	  content = <div>You dont have any records yet 🙂</div>;
	}
  
	return (
	  <div>
		<ListGroup>{content}</ListGroup>
	  </div>
	);
  }

const mapStateToProps = (state) => ({
	auth: state.firebase.auth,
	completedBookings: state.consultantState.completedBookings,
	// profile: state.firebase.profile,
});

const mapDispatchToProps = (dispatch) => {
	return {
		getCompletedBookings: (uid) => {
			dispatch(fetchCompletedBookings(uid));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsultantRecord);
