import React, { useState, useRef } from "react";
import "./ConsultantSignup.css";
import { useHistory } from "react-router-dom";
// import Form from "react-bootstrap/Form";
import { connect } from "react-redux";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { createExample } from "../../../../../store/actions/consultingActions/consultingActions";
import { FormControl, Form, InputGroup, Row, Col } from "react-bootstrap";
import emailjs from "@emailjs/browser";
import { AddButton, IconButton } from "../../../../SubComponents/Button";

const ConsultantSignup = (props) => {
	const [completed, setCompleted] = useState(false);
	const [show, setShow] = useState("password");
	const [user, setUser] = useState({
		fullName: "",
		email: "",
		urlLink: "",
		experience: "",
		expertise: "",
		password: "",
		consultantVisit: "",
		summary: "",
	});

	const [userServiceArray, setUserServiceArray] = useState([
		{ service: "", price: 0 },
	]);
	const history = useHistory();
	const form = useRef();

	// for the email
	const sendEmail = () => {
		emailjs
			.sendForm(
				"service_id",
				"template_q2mtocl",
				form.current,
				"user_Yh6fJKoLLp3ZNYYieHO3r"
			)
			.then(
				(result) => {
					console.log(result.text);
				},
				(error) => {
					console.log(error.text);
				}
			);
	};

	let service = (
		<div>
			<Row>
				<Col md={8}>
					<Form.Control
						as="select"
						className="form-control"
						// onChange={(e) => setUser({ ...user, expertise: e.target.value })}
						required
						aria-label="Default select example"
					>
						<option>Open this select menu</option>
						<option value="Phone call"> Phone call</option>
						<option value="Written Feedback"> Written Feedback</option>
						<option value="video call"> Phone call</option>
						<option value="Visit to consultant"> Visit to consultant</option>
						<option value="Consultant visitation">
							{" "}
							Consultant visitation
						</option>
					</Form.Control>
				</Col>
				<Col md={3}>
					<div>
						{/* <span>$</span> */}
						<Form.Control
							type="number"
							aria-label="Amount (to the nearest dollar)"
							placeholder="price"
							onChange={(e) =>
								setUser({ ...user, consultantVisit: e.target.value })
							}
						/>
					</div>
				</Col>
				<Col md={1}></Col>
			</Row>
		</div>
	);

	function addService() {
		if (userServiceArray.length < 5) {
			let newArray = userServiceArray.slice();
			newArray.splice(userServiceArray.length - 1, 0, {
				service: "",
				price: 0,
			});

			console.log(newArray, "line 99");

			setUserServiceArray(newArray);
		}
		// console.log("add btn clicked");
		return;
	}

	console.log(userServiceArray, "line 107");
	// for the form
	function handleSubmit() {
		var data = { ...user };
		props.createExample(data);
		setCompleted(true);
	}
	// for the next button
	function handleNext() {
		if (!completed) {
			history.push(`/consultants/onboard`);
		} else {
			history.push(``);
		}
	}

	function deleteService(e, i) {
		let newArray = userServiceArray.slice();
		newArray.splice(i, 1);
		setUserServiceArray(newArray);

		console.log("clicked");
	}

	function showDeleteBtn(index) {
		if (index > 0) {
			return <button onClick={(e) => deleteService(e, index)}>D</button>;
		}
		return "";
	}

	function updateService(e, i) {
		// console.log(e.target.type, `${i}-index`, "changed");
		// console.log(e.target.value, `${i}-index`, "changed");
		let newArray = userServiceArray.slice();
		console.log(newArray, "this is the newArray");

		if (e.target.type === "number") {
			let newValue = newArray.map((value, index) => {
				let newVal;
				if (index === i) {
					newVal = { ...value, price: e.target.value };
					console.log(newVal, "line150");
				}
				return newVal;
			});
			console.log(newValue, "line152");
			newArray.slice(i, 1, newValue[i]);

			console.log(newArray, "line 156");

			setUserServiceArray(newArray);
		}
	}

	let services = userServiceArray.map((value, index) => {
		return (
			<div key={`userService-${index}`}>
				<Row mb={4}>
					<Col md={8}>
						<Form.Control
							as="select"
							className="form-control"
							type="select"
							onChange={(e) => updateService(e, index)}
							required
							aria-label="Default select example"
						>
							<option>select service</option>
							<option value="Phone call"> Phone call</option>
							<option value="Written Feedback"> Written Feedback</option>
							<option value="video call"> Video call</option>
							<option value="Visit to consultant"> Visit to consultant</option>
							<option value="Consultant visitation">
								{" "}
								Consultant visitation
							</option>
						</Form.Control>
					</Col>
					<Col md={3}>
						<div>
							{/* <span>$</span> */}
							<Form.Control
								type="number"
								aria-label="Amount (to the nearest dollar)"
								placeholder="price"
								onChange={(e) => updateService(e, index)}
							/>
						</div>
					</Col>
					<Col md={1}>
						{/* {index > 0 ?? (
							<button onClick={(e) => deleteService(e, index)}>D</button>
						)} */}
						{showDeleteBtn(index)}
					</Col>
				</Row>
			</div>
		);
	});

	// let services = [
	// 	"Phone call",
	// 	"Written Feedback",
	// 	"video call",
	// 	"Visit to consultant",
	// 	"Consultant visitation",
	// ];

	// const serviceOptions = services.map((value) => {});

	return (
		<div className="question-contanier">
			<section style={{ height: "auto" }} className="question-main">
				<header className="logo-header">
					<img src="/green.png" alt="logo" className="logo1-btn" />
					<p>Become a Consultant with us.</p>
				</header>

				{/* bootstrap form */}
				<Form
					ref={form}
					style={{ marginTop: "180px" }}
					onSubmit={(e) => {
						e.preventDefault();
						handleSubmit();
						handleNext();
						sendEmail();
					}}
				>
					<Form.Group controlId="formBasicName" className="form-group">
						<Form.Label className="form-label">
							1. Full Name<span style={{ color: "red" }}>*</span>
						</Form.Label>
						<Form.Control
							type="text"
							name="name"
							onChange={(e) => setUser({ ...user, fullName: e.target.value })}
							className="form-control"
							required
						></Form.Control>
					</Form.Group>

					<Form.Group controlId="formBasicEmail" className="form-group">
						<Form.Label className="form-label">
							2. Email<span style={{ color: "red" }}>*</span>
						</Form.Label>
						<Form.Control
							type="email"
							name="email"
							className="form-control"
							onChange={(e) => setUser({ ...user, email: e.target.value })}
							required
						></Form.Control>
					</Form.Group>

					<Form.Group controlId="formBasicPassword" className="form-group">
						<Form.Label className="form-label">
							3. Password<span style={{ color: "red" }}>*</span>
						</Form.Label>
						<Form.Control
							type={show}
							className="form-control"
							onChange={(e) => setUser({ ...user, password: e.target.value })}
							required
						></Form.Control>
						{/*for the show/hide password  */}
						{show == "password" ? (
							<BsEyeSlash
								className="eye-style"
								onClick={() => setShow("text")}
							/>
						) : (
							<BsEye
								className="eye-style"
								onClick={() => setShow("password")}
							/>
						)}
					</Form.Group>

					<Form.Group controlId="formBasicUrl" className="form-group">
						<Form.Label className="form-label">
							4. Website Url(social media link)
							<span style={{ color: "red" }}>*</span>
						</Form.Label>
						<Form.Control
							type="text"
							className="form-control"
							onChange={(e) => setUser({ ...user, urlLink: e.target.value })}
							required
						></Form.Control>
					</Form.Group>

					<Form.Group controlId="formBasicText" className="form-group">
						<Form.Label className="form-label1">
							{" "}
							5. How Long have you been in business?
							<span style={{ color: "red" }}>*</span>
						</Form.Label>
						<Form.Control
							type="number"
							className="form-control"
							onChange={(e) => setUser({ ...user, experience: e.target.value })}
							required
						></Form.Control>
					</Form.Group>

					<Form.Group className="form-group">
						<Form.Label className="form-label">
							6. Field of Expertise<span style={{ color: "red" }}>*</span>
						</Form.Label>
						<Form.Control
							as="select"
							className="form-control"
							onChange={(e) => setUser({ ...user, expertise: e.target.value })}
							required
						>
							<option>Select</option>
							<option>Dietician</option>
							<option>Nutrition</option>
							<option>Food and Beverage</option>
							<option>Food Safety</option>
							<option>Sustainable Food Packaging</option>
							<option>Aquaculture</option>
							<option>Horticulture</option>
							<option>Agro-Feed</option>
							<option>Account and Legal</option>
							<option>Supply Chain</option>
						</Form.Control>
					</Form.Group>
					{/* 
					<Form.Group className="form-group  different">
						<Form.Label>
							7. Service Charge (hourly rate)
							<span style={{ color: "red" }}>*</span>
						</Form.Label>
						<FormControl
							className="form-control  different"
							type="text"
							placeholder="Phone Call"
							disabled
						></FormControl>
						<span className="fixed-service-money">$100</span>
						<FormControl
							className="form-control  different"
							type="text"
							placeholder="Written Feedback"
							disabled
						></FormControl>
						<span className="fixed-service-money">$60</span>
						<FormControl
							className="form-control  different"
							type="text"
							placeholder="Online Meeting"
							disabled
						></FormControl>
						<span className="fixed-service-money">$100</span>
						<FormControl
							className="form-control  different"
							type="text"
							placeholder="In-person visit to Consultant"
							disabled
						></FormControl>
						<span className="fixed-service-money">$100</span>
						<FormControl
							type="text"
							placeholder="Consultant Visit to Client hourly charge"
							className="form-control"
							onChange={(e) =>
								setUser({ ...user, consultantVisit: e.target.value })
							}
							required
						></FormControl>
					</Form.Group> */}

					<Form.Group controlId="formBasicService" className="form-group">
						<Form.Label style={{ width: "100%" }}>
							7 Select service and charge (hourly rate)
							<span style={{ color: "red" }}>*</span>
						</Form.Label>
						<AddButton onClick={addService}></AddButton>
						{services}
						{/* <InputGroup> */}

						{/* </InputGroup> */}
					</Form.Group>

					<Form.Group controlId="formBasicSummary" className="form-group">
						<Form.Label className="form-label">
							8. Brief Summary of your Expertise/Key areas in the Food System.
							<span style={{ color: "red" }}>*</span>
						</Form.Label>
						<Form.Control
							as="textarea"
							rows={4}
							type="text"
							onChange={(e) => setUser({ ...user, summary: e.target.value })}
							required
						></Form.Control>
					</Form.Group>

					<Form.Group controlId="formBasicOptional" className="form-group">
						<Form.Label className="form-label">
							9. Any other thing you would like to share with us ?(optional)
						</Form.Label>
						<Form.Control as="textarea" rows={4} type="text"></Form.Control>
					</Form.Group>

					<button className="question2-btn" type="submit" value="submit">
						Submit
					</button>
				</Form>
			</section>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		createExample: (data) => dispatch(createExample(data)),
	};
};

export default connect(null, mapDispatchToProps)(ConsultantSignup);
