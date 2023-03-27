import React, { useState } from "react";
import "./login.css";
import { AiOutlineCamera, AiOutlineSetting } from "react-icons/ai";
// import ImageProfile from './ImageProfile';
import { BsPeople, BsChatDots } from "react-icons/bs";
import { FaRegAddressBook } from "react-icons/fa";
import { AiOutlineCalendar } from "react-icons/ai";
import ImageProfile from "./ImageProfile";
import ConsultantSettings from "./ConsultantSettings";
import { Link } from "react-router-dom";

const SecondPage = () => {
	const [current, setCurrent] = useState(
		"https://thumbs.dreamstime.com/b/default-avatar-profile-trendy-style-social-media-user-icon-187599373.jpg"
	);
	const [show, setShow] = useState(false);
	const [setting, setSetting] = useState(false);

	return (
		<div className="login-contanier">
			<main className="login-main">
				<div className="profile-main">
					<div className="settings-icon-contanier">
						<AiOutlineSetting className="settings-icon" />
					</div>
					<img className="profile-contanier" src={current} />
				</div>
				<div className="profile-update">
					<AiOutlineCamera
						style={{ marginTop: "10px", textAlign: "center" }}
						onClick={() => setShow(true)}
					/>
				</div>

				<section className="login-text">
					<h3>Dorathy Williams</h3>
					<p>Nutritionist</p>
				</section>

				<section className="feature-buttons">
					<Link
						to="consultants-accounts/sessions"
						style={{ backgroundColor: "#afba15" }}
					>
						<BsPeople className="icons-style" />
						<p style={{ padding: "9px" }}>Sessions</p>
					</Link>

					<Link
						to="consultants-accounts/requests"
						style={{ backgroundColor: "#0c0847" }}
					>
						<AiOutlineCalendar className="icons-style" />
						<p style={{ padding: "9px" }}>Requests</p>
					</Link>

					<Link
						to="consultants-accounts/customer-records"
						style={{ backgroundColor: "#afba15" }}
					>
						<FaRegAddressBook className="icons-style" />
						<p style={{ padding: "9px" }}>Customer Records</p>
					</Link>

					{/* <div style={{ backgroundColor: "#0c0847" }}>
						<BsChatDots className="icons-style" />
						<p style={{ padding: "9px" }}>Connect</p>
					</div> */}
				</section>
				{show && <ImageProfile setShow={setShow} />}
				{setting && <ConsultantSettings setting={setSetting} />}
			</main>
		</div>
	);
};

export default SecondPage;
