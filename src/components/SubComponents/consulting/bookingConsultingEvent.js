import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Row, Col } from "react-bootstrap";
import { bookEvent } from "../../../store/actions/consultingActions";
import { format, parseISO } from "date-fns";
import { submitNotification } from "./../../lib/Notifications";
import { countryNames, countries } from "./../../../config/countries.json";

export const BookingConsultingEvent = (props) => {
	const [isBookingLoading, setisBookingLoading] = useState(false);
	const {
		openEvent,
		index,
		// bookEvent,
		bookingLoading,
		consultantId,
		// consultantName,
		event,

		auth,
		profile,
	} = props;

	let startTime = format(parseISO(event.start), "hh:mm a");
	let endTime = format(parseISO(event.end), "hh:mm a");
	const [userCurrency, setUserCurrency] = useState(null);

	// console.log(event);

	// useEffect(() => {
	// 	if (!bookingLoading) {
	// 		setisBookingLoading(false);
	// 	}
	// 	// setisBookingLoading(bookingLoading);
	// }, [bookingLoading]);

	const convertPrice = (currency, userCurrency, price) => {
		// Iterate through cart items and convert prices
		const convertedPrice = fetch(
			`https://v6.exchangerate-api.com/v6/e286ca59c055230262d2aa60/pair/${currency}/${userCurrency}/${price}`,
			{
				method: "GET",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			}
		)
			.then((resp) => {
				return resp;
			})
			.catch((err) => {
				return "unavailable";
			}); // Handle cases where price conversion fails
		// console.log("convertedItemPrices", convertedItemPrices);

		return convertedPrice;
	};

	const getCountryCurrency = (country) => {
		let cc = countries.country.find((c) => c.countryName === country);
		return cc;
	};

	useEffect(() => {
		if (props.profile.isLoaded) {
			getCountryCurrency;
		}
	}, [props.profile]);

	const bookConsultantEvent = (e, event, consultantId) => {
		setisBookingLoading(true);
		console.log(event, `this is the event `);
		bookEvent(event, auth.uid, profile)
			.then((result) => {
				setisBookingLoading(false);
				submitNotification("Success", "Consultation request has been sent");
			})
			.catch((err) => {
				console.log(err);
				submitNotification(
					"Error",
					"Something went wrong while booking, this consultation time might have been taken"
				);
				setisBookingLoading(false);
			});
	};

	return (
		<>
			<div>
				<div>Event Type: {event.eventType}</div>
				<div>
					<h4>Consultant Information</h4>
					{/* <p> Consultant Summary: {event.consultant.summary}</p> */}
					<p> Consultant Name: {event.consultant.name}</p>
					<p>Years of experience: {event.consultant.experience}</p>
				</div>
				<div> Additional information: {event.description}</div>
				<div>{`Price : ${event.currency} ${event.price}`}</div>
				<div>{`Local price : ${convertPrice(
					event.currency,
					userCurrency,
					event.price
				)}`}</div>

				<Row>
					<Col>
						<div>Start Time: {startTime}</div>
					</Col>
					<Col>
						<div>End Time: {endTime}</div>
					</Col>
				</Row>

				<Button
					onClick={(e) => bookConsultantEvent(e, event, consultantId)}
					disabled={event.status.requesterId !== null ? true : false}
				>
					{event.status.requesterId !== null
						? "Requested"
						: isBookingLoading
						? "booking..."
						: "Book Opening"}
				</Button>
			</div>
		</>
	);
};

const mapStateToProps = (state) => ({
	// bookingLoading: state.consultingState.isBooking,
	auth: state.firebase.auth,
	profile: state.firebase.profile,
});

const mapDispatchToProps = (dispatch) => {
	return {
		// bookEvent: (event, userId) => {
		// 	dispatch(bookEvent(event, userId));
		// },
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BookingConsultingEvent);
