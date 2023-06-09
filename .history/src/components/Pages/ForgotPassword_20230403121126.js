import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "../../App.css";
import "./Pages.css";
import styled from "styled-components";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import { connect } from "react-redux";
import { resetPassword } from "../../store/actions/authActions";

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
	};

	render() {
		const { authError, auth } = this.props;
		if (auth.uid) return <Redirect to="/account" />;

		return (
			<React.Fragment>
				<Row className="mr-0 ml-0 mt-0 pt-0 mt-lg-5 pt-lg-5 justify-content-center align-items-center d-flex frg-pass">
					<Col className="mt-0 pt-0 mb-0 pb-0 mt-lg-2 pt-lg-2" xs={12}></Col>
					<Col className="mt-5 pt-5" xs={12}></Col>
					<Col className="" xs={12} lg={4}></Col>
					<Col
						className=" justify-content-center align-items-center d-block mt-5 pt-5 mt-lg-0 pt-lg-0"
						xs={12}
						lg={4}
					>
						<CardStyle>
							<Card>
								<Card.Body>
									<Card.Text>
										<FormStyle>
											<h1 className="text-center">Reset Password</h1>
											<Form onSubmit={this.handleSubmit}>
												<Form.Group>
													<Form.Label>Email</Form.Label>
													<Form.Control
														type="email"
														id="email"
														placeholder="Email"
														required
														onChange={this.handleChange}
													/>
												</Form.Group>
												<Form.Group controlId="formActions">
													<Button variant="dark" type="submit">
														Reset Password
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
										</FormStyle>
									</Card.Text>
								</Card.Body>
							</Card>
						</CardStyle>
					</Col>
					<Col className="mt-5 pt-5" xs={12} lg={4}></Col>
					<Col className="mt-5 pt-5" xs={12}></Col>
					<Col className="mt-5 pt-5" xs={12}></Col>
				</Row>
			</React.Fragment>
		);
	}
}

const FormStyle = styled.div`
	form {
		margin: auto;
		padding: 10px;
		width: 100%;
	}

	input {
		border: 1px solid #62680a;
	}

	.btn-dark {
		background-color: #071850;
		color: whitesmoke;
		border: 1px solid #03091d;
		float: right;

		&:hover {
			background-color: #030d2b;
			border: 1px solid #03091d;
		}

		&:active {
			background-color: #030d2b;
			border: 1px solid #03091d;
		}
	}
`;

const CardStyle = styled.div`
	.card {
		color: rgb(59, 59, 59);
		background-color: rgb(238, 238, 238);
		border: none;
		border-radius: 5px;
		padding: 10px 0 10px 0;
	}
`;

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
