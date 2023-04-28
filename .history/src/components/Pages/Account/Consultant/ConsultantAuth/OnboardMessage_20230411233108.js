import React from "react";
import { useHistory } from "react-router-dom";
import "./ConsultantSignup.css";

import { Form, Button, Modal, Row, Col } from "react-bootstrap";

const OnboardMessage = ({ onClick }) => {
	const history = useHistory();
	return (
		// <Modal
		// 	// {...props}
		// 	size="lg"
		// 	aria-labelledby="contained-modal-title-vcenter"
		// 	centered
		// >
		// 	<Modal.Header closeButton>
		// 		<Modal.Title id="contained-modal-title-vcenter">
		// 			Modal heading
		// 		</Modal.Title>
		// 	</Modal.Header>
		// 	<Modal.Body>
		// 		<h4>Centered Modal</h4>
		// 		<p>
		// 			Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
		// 			dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
		// 			consectetur ac, vestibulum at eros.
		// 		</p>
		// 	</Modal.Body>
		// </Modal>

		<div className="">
			<section>
				<div className="onboard-message">
					<h1 style={{ padding: "50px" }}>
						Congrats. You have successfully signed up as a consultant with us.
						We will send you an email when your account as been verified
					</h1>
				</div>
			</section>
		</div>
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
