import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Form, Row, Col, Accordion, Button } from "react-bootstrap";
import { getConsultantImages, activateConsultant } from "./../../AdminData";
import { submitNotification } from "./../../../../../lib/Notifications";

export const AdminConsultant = (props) => {
	const [userId, setUserId] = useState("");
	const [images, setImages] = useState(null);
	const [loadingGetImage, setloadingGetImage] = useState(false);
	const [loadingActiveConsultant, setLoadingActiveConsultant] = useState(false);

	function SearchConsultantImages(e) {
		e.preventDefault();
		if (userId.trim() !== "") {
			setloadingGetImage(true);
			getConsultantImages(userId)
				.then((result) => {
					setloadingGetImage(false);

					setImages(result);
				})
				.catch((err) => {
					setloadingGetImage(false);

					console.log(err);
				});
		}
	}

	useEffect(() => {
		console.log(images);
	}, [images]);

	useEffect(() => {}, [loadingActiveConsultant]);

	const submitConsultantActivation = (e) => {
		e.preventDefault();
		console.log(`this has been clicked`, userId);
		setLoadingActiveConsultant(true);
		activateConsultant(userId)
			.then(() => {
				setLoadingActiveConsultant(false);
				//Notification
				submitNotification("Success", "Consultant status changed to active");
			})
			.catch((err) => {
				console.log(err);
				setLoadingActiveConsultant(false);
				submitNotification("Error", "Something went wrong");
			});
	};

	let content =
		images === null ? (
			"Consultant certifications images will appear here"
		) : images && images.length === 0 ? (
			"theres isnt any image with this user information"
		) : (
			<>
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

	let activationButton = !images ? (
		""
	) : (
		<Button
			style={{ float: "right" }}
			type="button"
			onClick={(e) => submitConsultantActivation(e)}
		>
			{loadingActiveConsultant ? "...loading" : "Activate consultant account"}
		</Button>
	);

	return (
		<div>
			<Row style={{ alignItems: "baseline" }}>
				<Col>
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
				</Col>

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
