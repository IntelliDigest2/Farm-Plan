import React from "react";
import "./ConsultantRegister.css";

import { Modal } from "react-bootstrap";

const OnboardMessage = ({ onClick }) => {
	return (
		<Modal
			className="modal"
			// {...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Congratulations
				</Modal.Title>
			</Modal.Header>
			<div className="onboard-cont">
				<section>
					<div className="onboard-message">
						<h1 style={{ padding: "50px" }}>
							You have successfully signed up as a consultant with us. We will
							send you an email when your account has been verified
						</h1>
					</div>
				</section>
			</div>
		</Modal>
	);
};

export default OnboardMessage;
