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
	const [accountResultType, setAccountResultType] = useState("");
	const [idType, setIdType] = useState("");
	const [result, setResult] = useState("");
	const [email, setEmail] = useState("");

	const baseUrlDev="http://localhost:5000"
  	const baseUrlProd="https://wallet-api-mbvca3fcma-ew.a.run.app"	

	function SearchConsultantImages(e) {
		e.preventDefault();
		if (userId.trim() !== "") {
			setloadingGetImage(true);
			getConsultantImages(userId, accountType)
				.then((result) => {
					setResult(result);
					// console.log(result);
					setloadingGetImage(false);
					setResult();
					setActiveState(result.verificationStatus);
					setAccountResultType(result.accountType);
					setEmail(result.email)
					setImages(result.images);
					setIdType(result.idType);

					// console.log(result, `these are the results`);
				})
				.catch((err) => {
					setloadingGetImage(false);

					console.log(err);
				});
		}
	}

	// console.log(images);

	// useEffect(() => {
	// 	// console.log(images, `images changed`);
	// }, [images]);

	useEffect(() => {}, [result]);

	useEffect(() => {}, [loadingActiveConsultant]);

	useEffect(() => {}, [activeState]);
	// useEffect(() => {
	// 	console.log(accountResultType);
	// }, [accountResultType]);

	const submitConsultantActivation = (e) => {
		e.preventDefault();
		// console.log(`this has been clicked`, userId);
		setLoadingActiveConsultant(true);
		activateConsultant(userId)
			.then(() => {
				setLoadingActiveConsultant(false);
				//Notification
				submitNotification("Success", "Account status changed to active");
				setActiveState("verified");
				sendVerificationEmail(email)
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

		let display;

		switch (accountResultType) {
		  case "admin":
			display = (
			  <>
				<Col>
				  <div>
					<h3>{idType}</h3>
					<div style={{ maxWidth: "400px" }}>
					  <img alt={`${idType}`} src={images?.[idType]} width={"400px"} />
					</div>
				  </div>
				</Col>
			  </>
			);
			break;
		
		  case "Hotels":
		  case "Hospitals":
		  case "Schools":
		  case "Offices":
		  case "Recreational Centers":
		  case "Shop/Supermarket":
		  case "Restaurants":
			display = (
			  <>
				<Col>
				  <div>
					<h3>Certification Image</h3>
					<div style={{ maxWidth: "400px" }}>
					  <img
						alt={`certification for consultant`}
						src={images?.certificateImg}
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
						alt={`identification for consultant`}
						src={images?.identificationImg}
						width={"400px"}
					  />
					</div>
				  </div>
				</Col>
			  </>
			);
			break;
		
		  default:
			display = (
			  <>
				<Col>
				  <div>
					<h3>Certification Image</h3>
					<div style={{ maxWidth: "400px" }}>
					  <img
						alt={`certification for consultant`}
						src={images?.certificateImg}
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
						alt={`identification for consultant`}
						src={images?.identificationImg}
						width={"400px"}
					  />
					</div>
				  </div>
				</Col>
			  </>
			);
			break;
		}

	let content =
		images === null ? (
			"Certifications images will appear here"
		) : images && images.length === 0 ? (
			"theres isnt any image with this user information"
		) : (
			<>
				<Row>
					<Col>{userVerificationState}</Col>
				</Row>
				<Row style={{ alignItems: "baseline" }}>{display}</Row>
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

		const sendVerificationEmail = (email) => {
			try {
				const response = fetch(`${baseUrlDev}/v1/auth/send-verification-email`, {
				  method: "POST",
				  headers: {
					"Content-Type": "application/json",
				  },
				  body: JSON.stringify({email: email}),
				});
		  
				// Handle the response from your backend
				if (response.ok) {
					console.log("Success", "verification email sent");
				}
			  } catch (err) {
				console.log("An error occurred sending Email.");
			  }
		  }
		

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
							{/* <option value={"restaurant_users"}>restaurant</option> */}
							<option value={"consultants"}>consultant</option>
							{/* <option value={"farm_users"}>farmer</option> */}
							<option value={"User Admin"}>User Admin</option>
							<option value={"Restaurants"}>Restaurant</option>
							<option value={"Hospitals"}>Hospitals</option>
							<option value={"Schools"}>Schools</option>
							<option value={"Offices"}>Offices</option>
							<option value={"Hotels"}>Hotels</option>
							<option value={"Recreational Centers"}>Recreational Centers</option>
							<option value={"Shop/Supermarket"}>Shop/Supermarket</option>
							<option value={"Machinery/Supply"}>Machinery/Supply</option>



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
