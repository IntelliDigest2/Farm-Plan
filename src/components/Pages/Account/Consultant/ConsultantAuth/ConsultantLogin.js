import React, { useState, useEffect } from "react";
import "./login.css";

import "../../../Account/UserAccount.css";
import "../../../Auth/Mob.css";
import { Title } from "../../../Auth/MobComponents";

import { Form, Button, Alert } from "react-bootstrap";

import { connect } from "react-redux";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import {
	signIn,
	setErrorToDefault,
} from "../../../../../store/actions/consultantActions/consultantAuthActions";

const ConsultantLogin = (props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState(false);
	const [isLoginIn, setIsLoginIn] = useState(false);

	const history = useHistory();
	const {
		signIn,
		resetError,
		isLogInError,
		isLoggedIn,
		isLoadingLogin,
		profile,
	} = props;
	const [pendingAlert, setPendingAlert] = useState("");

	function handleSubmit(e) {
		e.preventDefault();
		var data = {
			email: email,
			password: password,
		};
		signIn(data);
		resetError("consultantLoggingError");
	}

	useEffect(() => {
		// console.log(isLoggedIn);
		if (isLoggedIn) {
			history.push("/consultant");
			console.log("here bro");
		}
		if (isLogInError) {
			setErrorMsg(true);
		}

		// console.log(isLoggedIn);
	}, [history, isLogInError, isLoggedIn]);

	useEffect(() => {
		setIsLoginIn(isLoadingLogin);
	}, [isLoadingLogin]);

	let error = errorMsg ? <p>something went wrong</p> : "";

	// console.log(isLoggedIn);

	useEffect(() => {
		console.log(profile);
		if (profile.consultant === "pending") {
			setPendingAlert(true);
		}
	}, [profile, profile.isLoaded]);

	const navigateHome = () => {};

	let consultantAlert = pendingAlert ? (
		<Alert
			key="primary"
			variant="primary"
			onClose={() => setPendingAlert(false)}
			dismissible
		>
			Your consultant account registeration is still being reviewed we would
			send you an email when all verifications have been made
			<Button onClick={navigateHome}>Go back to home</Button>
		</Alert>
	) : (
		""
	);

	return (
		<>
			{consultantAlert}
			<Title subtitle="Log In to your Consultant Account">
				<Form>
					<Form.Group className="mb-3">
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter email"
							required
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Password"
							required
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Group>
					{/* {error} */}
					<Button
						style={{ fontWeight: "700", margin: "0 auto " }}
						variant="default"
						className="signup-confirm signup-center"
						type="button"
						onClick={(e) => {
							handleSubmit(e);
						}}
					>
						{isLoginIn ? "loading..." : `Submit`}
					</Button>
				</Form>
				<div className="auth-error">
					{/* {errorMsg ? <p> {isLogInError}</p> : null} */}
					{error}
				</div>

				<div className=" subtitles">
					<Link to="/forgot-password" style={{ color: "#AFBA15" }}>
						Forgot your password?
					</Link>
				</div>

				<div>
					<span>
						Don't have a worldfoodtracker account?
						<Link to="../signup" style={{ color: "#AFBA15" }}>
							SIGN UP
						</Link>{" "}
					</span>{" "}
					here
				</div>
			</Title>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.consultantAuth.consultantLoggedIn,
		isLogInError: state.consultantAuth.consultantLoggingError,
		isLoadingLogin: state.consultantAuth.loadingLogIn,
		profile: state.firebase.profile,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		signIn: (creds) => dispatch(signIn(creds)),
		resetError: (errorName) => dispatch(setErrorToDefault(errorName)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsultantLogin);
