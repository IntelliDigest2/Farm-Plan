import React, { useState, useRef, useEffect } from "react";
import "./ConsultantSignup.css";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { consultantSignup } from "../../../../../store/actions/consultantActions/consultantAuthActions";
import { Form, Row, Col } from "react-bootstrap";
import emailjs from "@emailjs/browser";
import { AddButton, IconButton } from "../../../../SubComponents/Button";
import { Redirect, Link, useRouteMatch } from "react-router-dom";
import OnboardMessage from "./OnboardMessage";

const ConsultantSignup = (props) => {
	const [completed, setCompleted] = useState(false);
	const [isLoading, setIsLoading] = useState(null);
	const [show, setShow] = useState("password");
	const [certificateImg, setCertificateImg] = useState();
	const [IDImg, setIDImg] = useState();
	const [imgPreview1, setImgPreview1] = useState();
	const [imgPreview2, setImgPreview2] = useState();
	const [showBanner, setShowBanner] = useState(true);
	const [user, setUser] = useState({
		fullName: "",
		email: "",
		urlLink: "",
		experience: "",
		expertise: "",
		password: "",
		services: [{ service: "", price: "0" }],
		summary: "",
		isActive: true,
		images: [{ certificateImg: null }, { identificationImg: null }],
	});
	const [error, setError] = useState(false);

	const { isLoadingSignUp, signUpError, signUpSuccess, signUp } = props;

	const history = useHistory();

	const form = useRef();

	//preview uploaded image
	useEffect(() => {
		if (!certificateImg) {
			setImgPreview1(undefined);
			return;
		}

		const objectUrl = URL.createObjectURL(certificateImg);
		setImgPreview1(objectUrl);

		return () => URL.revokeObjectURL(objectUrl);
	}, [certificateImg]);

	useEffect(() => {
		if (!IDImg) {
			setImgPreview2(undefined);
			return;
		}

		const objectUrl = URL.createObjectURL(IDImg);
		setImgPreview2(objectUrl);

		return () => URL.revokeObjectURL(objectUrl);
	}, [IDImg]);

	useEffect(() => {}, []);

	useEffect(() => {
		console.log(isLoadingSignUp, "this is the isLoading Signup");
		setIsLoading(isLoadingSignUp);
		if (signUpError) {
			setError(signUpError);
		}
		if (signUpSuccess) {
			setShowBanner(true);
		}
	}, [isLoadingSignUp, signUpError, signUpSuccess]);

	const handleSelectedImage = (e) => {
		if (!e.target.files || e.target.files.length === 0) {
			setCertificateImg(undefined);
			setIDImg(undefined);
			return;
		} else {
		}

		// I've kept this example simple by using the first image instead of multiple
		if (e.target.id === "img1") {
			let imageFile = e.target.files[0];
			setCertificateImg(imageFile);
			let newArray = user.images.slice();
			newArray.splice(0, 1, { certificateImg: imageFile });
			setUser({ ...user, images: newArray });
		} else {
			let imageFile = e.target.files[0];
			let newArray = user.images.slice();
			setIDImg(imageFile);
			newArray.splice(1, 1, { identificationImg: imageFile });
			setUser({ ...user, images: newArray });
		}
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
		if (user.services.length < 5) {
			let newArray = user.services.slice();
			newArray.splice(user.services.length, 0, {
				service: "",
				price: 0,
			});

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
		let newArray = user.services.slice();
		newArray.splice(i, 1);
		setUser({ ...user, services: newArray });
	}

	function showDeleteBtn(index) {
		if (index > 0) {
			return <button onClick={(e) => deleteService(e, index)}>D</button>;
		}
		return "";
	}

	function updateService(e, i) {
		let newArray = user.services.slice();

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

			setUser({ ...user, services: newArray });
		} else {
			let newValue = newArray.map((value, index) => {
				let newVal;
				if (index === i) {
					newVal = { ...value, service: e.target.value };
					return newVal;
				}
				return newVal;
			});
			newArray.splice(i, 1, newValue[i]);

			setUser({ ...user, services: newArray });
		}
	}

	let servicesInput = user.services.map((value, index) => {
		return (
			<div key={`userService-${index}`}>
				<Row className="mb-3">
					<Col md={8}>
						<Form.Control
							as="select"
							className="form-control"
							type="select"
							onChange={(e) => updateService(e, index)}
							required
							aria-label="Default select example"
							// id={`service-${index}`}
						>
							<option>select service</option>
							<option value="Phone call"> Phone call</option>
							<option value="Written feedback"> Written Feedback</option>
							<option value="Video call"> Video call</option>
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
					<Col>{showDeleteBtn(index)}</Col>
				</Row>
			</div>
		);
	});

	let addNewServiceBtn =
		user.services.length < 5 ? (
			<AddButton onClick={addService}></AddButton>
		) : (
			""
		);

	// for the form
	function submitForm(e) {
		e.preventDefault();

		setIsLoading(true);

		// var data = { ...user };
		signUp(user);
		setUser({
			fullName: "",
			email: "",
			urlLink: "",
			experience: "",
			expertise: "",
			password: "",
			services: [{ service: "", price: "0" }],
			summary: "",
			isActive: true,
			images: [{ certificateImg: null }, { identificationImg: null }],
		});
		// setCompleted(true);
		// handleNext();
		// sendEmail();
	}

	let certificateImg1 = certificateImg ? (
		<img
			className="consultant_previewImg"
			alt="certificate preview"
			height="120px"
			width="70%"
			src={imgPreview1}
		/>
	) : (
		""
	);
	let IDImg1 = IDImg ? (
		<img
			alt="certificate preview"
			height="120px"
			width="70%"
			src={imgPreview2}
		/>
	) : (
		""
	);

	let errorMsg = error ? `something went wrong` : "";

	let onboardMessage = showBanner ? (
		<OnboardMessage
			onClick={(e) => {
				setShowBanner(false);
			}}
		/>
	) : (
		""
	);

	return (
		<div className="question-contanier">
			{onboardMessage}
			<section style={{ height: "auto" }} className="question-main">
				<header className="consultant_logo-header">
					<img src="/green.png" alt="logo" className="logo1-btn" />
					<p>Become a Consultant with us.</p>
				</header>
				<div>
					<h1 className="h5">
						Fill in the form below to start your journey as a consultant
					</h1>

					<div>
						Already have an account? Click here to{" "}
						<span>
							<Link to={`./login`} style={{ color: "#AFBA15" }}>
								LOGIN
							</Link>
						</span>
					</div>

					<Form ref={form}>
						<p className="">
							All fields marked with <span style={{ color: "red" }}>*</span> are
							required
						</p>
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
								onChange={(e) =>
									setUser({ ...user, experience: e.target.value })
								}
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
								onChange={(e) =>
									setUser({ ...user, expertise: e.target.value })
								}
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
							<Row className="mb-3">
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
										className="mb-3"
										label="upload Identification document"
										type="file"
									/>
								</Col>
							</Row>
							<Row>
								<Col>{certificateImg1}</Col>
								<Col>{IDImg1}</Col>
							</Row>
						</Form.Group>

						<Form.Group controlId="formBasicOptional" className="form-group">
							<Form.Label className="form-label">
								9. Any other thing you would like to share with us ?(optional)
							</Form.Label>
							<Form.Control as="textarea" rows={4} type="text"></Form.Control>
						</Form.Group>
						<div>{errorMsg}</div>
						<button
							onClick={(e) => {
								submitForm(e);
							}}
							className="question2-btn"
							type="submit"
							value="submit"
						>
							{isLoading ? "isLoading..." : "Submit"}
						</button>
					</Form>
				</div>

				{/* bootstrap form */}
			</section>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		isLoadingSignUp: state.consultantAuth.loadingSignUp,
		signUpError: state.consultantAuth.authError,
		signUpSuccess: state.consultantAuth.consultantSignedUp,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		signUp: (data) => dispatch(consultantSignup(data)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsultantSignup);
