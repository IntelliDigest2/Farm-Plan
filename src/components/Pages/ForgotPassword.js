import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import { connect } from "react-redux";
import { resetPassword } from "../../store/actions/authActions";
import "./ForgotPassword.css";
import { submitNotification } from "../lib/Notifications";

class ForgotPassword extends Component {
	state = {
		email: "",
	};

	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.resetPassword(this.state);
		submitNotification("Success", "Please check your mail for the reset link");

	};

	render() {
		const { authError, auth } = this.props;
		if (auth.uid) return <Redirect to="/account" />;

		return (
			<div className="forgot-password-container">
				<Row className="m-0 p-0 justify-content-center align-items-center d-flex frg-pass">
					<Col xs={12}></Col>
					<Col xs={12}></Col>
					<Col xs={12} lg={4}></Col>
					<Col xs={12} lg={4} className="justify-content-center align-items-center d-block mt-5 pt-5 mt-lg-0 pt-lg-0">
						<div className="card">
							<Card>
								<Card.Body>
									<Card.Text>
										<div>
											<h1 className="text-center">Reset Password</h1>
											<Form onSubmit={this.handleSubmit}>
												<Form.Group>
													<Form.Control
														className="signup-input placeholder-input"
														type="email"
														id="email"
														placeholder="Email"
														required
														onChange={this.handleChange}
													/>
												</Form.Group>
												<Form.Group controlId="formActions" className="form-actions">
													<Button className="signup-confirm" type="submit">
														Reset
													</Button>
												</Form.Group>
											</Form>
											<p className="text-center rmb-pass">
												<Link to="/login" className="remember-password">
													I remember my password.
												</Link>
											</p>
											<p className="text-center no-acc">
												Don't have an account?{" "}
												<Link to="/signup" className="register">
													Click here
												</Link>{" "}
												to sign up today!
											</p>
											<div className="auth-error">
												{authError ? <p> {authError}</p> : null}
											</div>
										</div>
									</Card.Text>
								</Card.Body>
							</Card>
						</div>
					</Col>
					<Col xs={12} lg={4}></Col>
					<Col xs={12}></Col>
					<Col xs={12}></Col>
				</Row>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		authError: state.auth.authError,
		auth: state.firebase.auth,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		resetPassword: (creds) => dispatch(resetPassword(creds)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
