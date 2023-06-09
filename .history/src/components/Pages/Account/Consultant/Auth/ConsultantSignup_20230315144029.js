import React, { useState, useRef, useEffect } from "react";
import "./ConsultantSignup.css";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { createExample } from "../../../../../store/actions/consultingActions/consultingActions";
import { FormControl, Form, InputGroup, Row, Col } from "react-bootstrap";
import emailjs from "@emailjs/browser";
import { AddButton, IconButton } from "../../../../SubComponents/Button";

const ConsultantSignup = (props) => {
	const [completed, setCompleted] = useState(false);
	const [show, setShow] = useState("password");
	const [userServicesArray, setUserServicesArray] = useState([
		{ service: "", price: "0" },
	]);
	const [selectedImg1, setSelectedImg1] = useState();
	const [selectedImg2, setSelectedImg2] = useState();
	const [imgPreview, setImgPreview] = useState();
	const [user, setUser] = useState({
		fullName: "",
		email: "",
		urlLink: "",
		experience: "",
		expertise: "",
		password: "",
		services: "",
		summary: "",
		isActive: true,
	});

	console.log(user);

	const history = useHistory();
	const form = useRef();

	//preview uploaded image
	useEffect(() => {
		if (!selectedImg1) {
			setImgPreview(undefined);
			return;
		}

		const objectUrl = URL.createObjectURL(selectedImg1);
		setImgPreview(objectUrl);

		return () => URL.revokeObjectURL(objectUrl);
	}, [selectedImg1]);

	useEffect(() => {
		if (!selectedImg2) {
			setImgPreview(undefined);
			return;
		}

		const objectUrl = URL.createObjectURL(selectedImg2);
		setImgPreview(objectUrl);

		return () => URL.revokeObjectURL(objectUrl);
	}, [selectedImg2]);

	const handleSelectedImage = (e) => {
		console.log(e.target.files);
		console.log(e.target.id, "this is the target id");
		if (!e.target.files || e.target.files.length === 0) {
			setSelectedImg1(undefined);
			return;
		}

		// I've kept this example simple by using the first image instead of multiple
		setSelectedImg1(e.target.files[0]);
	};

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

	function addService() {
		if (userServicesArray.length < 5) {
			let newArray = userServicesArray.slice();
			newArray.splice(userServicesArray.length - 1, 0, {
				service: "",
				price: 0,
			});

			setUserServicesArray(newArray);
			setUser({ ...user, services: newArray });
		}

		return;
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
		let newArray = userServicesArray.slice();
		newArray.splice(i, 1);
		setUserServicesArray(newArray);
		setUser({ ...user, services: newArray });

		console.log("clicked");
	}

	function showDeleteBtn(index) {
		if (index > 0) {
			return <button onClick={(e) => deleteService(e, index)}>D</button>;
		}
		return "";
	}

	function updateService(e, i) {
		let newArray = userServicesArray.slice();
		console.log(e.target.type);

		if (e.target.type === "number") {
			let newValue = newArray.map((value, index) => {
				let newVal;
				if (index === i) {
					newVal = { ...value, price: e.target.value };
					return newVal;
				}
				return newVal;
			});
			newArray.splice(i, 1, newValue[i]);

			setUserServicesArray(newArray);
			setUser({ ...user, services: newArray });
		} else {
			console.log(e.target.value);
			let newValue = newArray.map((value, index) => {
				let newVal;
				if (index === i) {
					newVal = { ...value, service: e.target.value };
					return newVal;
				}
				return newVal;
			});
			newArray.splice(i, 1, newValue[i]);

			setUserServicesArray(newArray);
			setUser({ ...user, services: newArray });
		}
	}

	let servicesInput = userServicesArray.map((value, index) => {
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
					<Col md={1}>{showDeleteBtn(index)}</Col>
				</Row>
			</div>
		);
	});

	let addNewServiceBtn =
		userServicesArray.length < 5 ? (
			<AddButton onClick={addService}></AddButton>
		) : (
			""
		);

	// for the form
	function submitForm(e) {
		e.preventDefault();
		console.log(user);
		// var data = { ...user };
		// props.createExample(data);
		// setCompleted(true);
		// handleNext();
		// sendEmail();
	}

	let uploadedImg1 = selectedImg1 ? (
		<img alt={selectedImg1.name} width="50%" src={imgPreview} />
	) : (
		""
	);
	let uploadedImg2 = selectedImg2 ? (
		<img alt={selectedImg1.name} width="50%" src={imgPreview} />
	) : (
		""
	);
	// let uploadedImg2 = img2 ? <img src={preview} /> : "";

	return (
		<div className="question-contanier">
			<section style={{ height: "auto" }} className="question-main">
				<header className="logo-header">
					<img src="/green.png" alt="logo" className="logo1-btn" />
					<p>Become a Consultant with us.</p>
				</header>

				{/* bootstrap form */}
				<Form ref={form} style={{ marginTop: "180px" }}>
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
						{show === "password" ? (
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
							5. How Long have you been a consultant? (in years)
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
						<div>{addNewServiceBtn}</div>

						{servicesInput}
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
					<Form.Group>
						<Form.Label style={{ width: "100%" }} className="form-label">
							8. Upload consultancy cerification and Id.
						</Form.Label>
						<Row className="mb=4">
							<Col>
								<Form.Control
									id="img1"
									onChange={handleSelectedImage}
									label="upload certificate"
									type="file"
								/>
							</Col>
							<Col>
								<Form.Control
									id="img2"
									onChange={handleSelectedImage}
									className="mb3"
									label="upload Id"
									type="file"
								/>
							</Col>
						</Row>
						<Row>
							<Col>{uploadedImg1}</Col>
							<Col>uploadedImg2</Col>
						</Row>
					</Form.Group>

					<Form.Group controlId="formBasicOptional" className="form-group">
						<Form.Label className="form-label">
							9. Any other thing you would like to share with us ?(optional)
						</Form.Label>
						<Form.Control as="textarea" rows={4} type="text"></Form.Control>
					</Form.Group>

					<button
						onClick={(e) => {
							submitForm(e);
						}}
						className="question2-btn"
						type="submit"
						value="submit"
					>
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
