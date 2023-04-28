import React, { useState, useEffect } from "react";
import "./login.css";

import "../../../Account/UserAccount.css";
import "../../../Auth/Mob.css";
import { Title } from "../../../Auth/MobComponents";

import { Form, Button } from "react-bootstrap";

import { connect } from "react-redux";
import { Redirect, Link, useRouteMatch } from "react-router-dom";
import { signIn } from "../../../../../store/actions/consultantActions/consultantAuthActions";

const ConsultantLogin = (props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	function handleSubmit(e) {
		e.preventDefault();
		var data = {
			email: email,
			password: password,
		};
		props.signIn(data);
	}
	const { authError } = props;

	let { path, url } = useRouteMatch();
	return (
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
				<Button
					style={{ fontWeight: "700", margin: "0 auto " }}
					variant="default"
					className="signup-confirm signup-center"
					type="button"
					onClick={(e) => {
						handleSubmit(e);
					}}
				>
					Submit
				</Button>
			</Form>
			<div className="auth-error">{authError ? <p> {authError}</p> : null}</div>

			<div className=" subtitles">
				<Link to="/forgot-password" style={{ color: "#AFBA15" }}>
					Forgot your password?
				</Link>
			</div>
			<div>
				Dont have an account? Click here to
				<span>
					<Link to={`${url}/signup`} style={{ color: "#AFBA15" }}>
						SIGNUP
					</Link>
				</span>
			</div>
		</Title>
	);
};

const mapStateToProps = (state) => {
	return {
		authError: state.auth.authError,
		auth: state.firebase.auth,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		signIn: (creds) => dispatch(signIn(creds)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsultantLogin);
