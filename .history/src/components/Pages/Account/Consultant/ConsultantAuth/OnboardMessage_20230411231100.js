import React from "react";
import { useHistory } from "react-router-dom";
import "./ConsultantSignup.css";

import { Form, Button, Modal, Row, Col } from "react-bootstrap";

const OnboardMessage = () => {
	const history = useHistory();
	return (
		<Modal show={showPests} onHide={() => setShowPests(false)}>
			<Modal.Header closeButton>
				<Modal.Title>
					{crop ? <p>Common pests in {crop}</p> : <p>No data</p>}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{crop && cropData.categories[props.cat][cropIndex] && (
					<Pests category={cropData.categories[props.cat][cropIndex].pests} />
				)}
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={() => setShowPests(false)}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
		// <div className="question-contanier">
		// 	<section className="question-subcontanier">
		// 		<header className="logo-header">
		// 			<img src="/green.png" alt="logo" className="logo1-btn" />
		// 			<p>Become a Consultant with us.</p>
		// 		</header>

		// 		<div className="onboard-message">
		// 			<h4 style={{ padding: "50px" }}>
		// 				Congrats. You have successfully signed up as a consultant with us.
		// 				We will send you an email when your account as been verified
		// 			</h4>
		// 			<button
		// 				style={{ width: "240px" }}
		// 				className="question2-btn"
		// 				onClick={() => history.push("/consultants")}
		// 			>
		// 				Go back to Home page
		// 			</button>
		// 		</div>
		// 	</section>
		// </div>
	);
};

export default OnboardMessage;

{
	/* <Modal show={showPests} onHide={() => setShowPests(false)}>
<Modal.Header closeButton>
  <Modal.Title>
	{crop ? <p>Common pests in {crop}</p> : <p>No data</p>}
  </Modal.Title>
</Modal.Header>
<Modal.Body>
  {crop && cropData.categories[props.cat][cropIndex] && (
	<Pests category={cropData.categories[props.cat][cropIndex].pests} />
  )}
</Modal.Body>
<Modal.Footer>
  <Button variant="secondary" onClick={() => setShowPests(false)}>
	Close
  </Button>
</Modal.Footer>
</Modal> */
}
