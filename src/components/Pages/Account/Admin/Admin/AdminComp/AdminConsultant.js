import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Form, Row, Col, Accordion, Button } from "react-bootstrap";
import { getConsultantImages, activateConsultant } from "./../../AdminData";
import { submitNotification } from "./../../../../../lib/Notifications";

export const AdminConsultant = (props) => {
	const [userId, setUserId] = useState("");
	const [images, setImages] = useState(null);
	const [activeState, setActiveState] = useState("");
	const [loadingGetImage, setloadingGetImage] = useState(false);
	const [loadingActiveConsultant, setLoadingActiveConsultant] = useState(false);
	const [accountType, setAccountType] = useState("");

	function SearchConsultantImages(e) {
		e.preventDefault();
		if (userId.trim() !== "") {
			setloadingGetImage(true);
			getConsultantImages(userId, accountType)
				.then((result) => {
					console.log(result);
					setloadingGetImage(false);
					setActiveState(result.verificationStatus);

					setImages(result.images);
				})
				.catch((err) => {
					setloadingGetImage(false);

					console.log(err);
				});
		}
	}

	useEffect(() => {
		console.log(images, `images changed`);
	}, [images]);

	useEffect(() => {}, [loadingActiveConsultant]);

	useEffect(() => {}, [activeState]);

	const submitConsultantActivation = (e) => {
		e.preventDefault();
		console.log(`this has been clicked`, userId);
		setLoadingActiveConsultant(true);
		activateConsultant(userId)
			.then(() => {
				setLoadingActiveConsultant(false);
				//Notification
				submitNotification("Success", "Consultant status changed to active");
				setActiveState("verified");
			})
			.catch((err) => {
				console.log(err);
				setLoadingActiveConsultant(false);
				submitNotification("Error", "Something went wrong");
			});
	};

	let userVerificationState =
		activeState === "verified" ? (
			<div
				style={{
					width: "180px",
					backgroundColor: "green",
					color: "white",
					margin: "5px 0",
					borderRadius: "5px",
				}}
			>
				User is Verfied
			</div>
		) : (
			<div
				style={{
					width: "180px",
					backgroundColor: "red",
					color: "white",
					margin: "5px 0",
					borderRadius: "5px",
				}}
			>
				user is not verified
			</div>
		);

	let content =
		images === null ? (
			"Consultant certifications images will appear here"
		) : images && images.length === 0 ? (
			"theres isnt any image with this user information"
		) : (
			<>
				<Row>
					<Col>{userVerificationState}</Col>
				</Row>
				<Row style={{ alignItems: "baseline" }}>
					<Col>
						<div>
							<h3>Certification Image</h3>
							<div style={{ maxWidth: "400px" }}>
								<img
									alt={`certification for consultant`}
									src={images.certificateImg}
									width={"400px"}
								/>
							</div>
						</div>
					</Col>
					<Col>
						<div>
							<h3>Identification Image</h3>
							<div style={{ maxWidth: "400px" }}>
								<img
									alt={`identificatin for consultant`}
									src={images.identificationImg}
									width={"400px"}
								/>
							</div>
						</div>
					</Col>
				</Row>
			</>
		);

	let activationButton =
		!images || activeState === "verified" ? (
			""
		) : (
			<Button
				style={{ float: "right" }}
				type="button"
				onClick={(e) => submitConsultantActivation(e)}
			>
				{loadingActiveConsultant ? "...loading" : "Verify user account"}
			</Button>
		);

	return (
		<div>
			<Row style={{ alignItems: "baseline" }}>
				<Col>
					<Form.Group className="form-group">
						<Form.Label className="form-label">Select account type</Form.Label>
						<Form.Control
							as="select"
							className="form-control"
							onChange={(e) => setAccountType(e.target.value)}
							required
						>
							<option>Select</option>
							<option value={"restaurant_users"}>restaurant</option>
							<option value={"consultants"}>consultant</option>
							<option value={"farm_users"}>farmer</option>
						</Form.Control>
					</Form.Group>
				</Col>
				<Form.Group className="form-group">
					<Form.Label className="form-label">Type userId string</Form.Label>
					<Form.Control
						id=""
						name="publicId"
						type="text"
						onChange={(e) => {
							setUserId(e.target.value);
						}}
						placeholder="userId"
					/>
				</Form.Group>

				<Col>
					<Button type="button" onClick={(e) => SearchConsultantImages(e)}>
						{loadingGetImage ? "...loading" : "Search"}
					</Button>
				</Col>
			</Row>

			<div style={{ minHeight: "300px" }}>{content}</div>

			{activationButton}
		</div>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AdminConsultant);
