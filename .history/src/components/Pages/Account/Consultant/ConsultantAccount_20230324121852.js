import React, { useState } from "react";

import { AiOutlineCamera, AiOutlineSetting } from "react-icons/ai";
// import ImageProfile from './ImageProfile';
import { BsPeople, BsChatDots } from "react-icons/bs";
import { FaRegAddressBook } from "react-icons/fa";
import { AiOutlineCalendar } from "react-icons/ai";
import ImageProfile from "./Settings/ImageProfile";
import ConsultantSettings from "./Settings/ConsultantSettings";
import { Link } from "react-router-dom";
import firebase from "firebase";
import ConsultantLogin from "./ConsultantAuth/ConsultantLogin";
import classes from "./ConsultantAccount.module.css";

const SecondPage = () => {
	const [current, setCurrent] = useState(
		"https://thumbs.dreamstime.com/b/default-avatar-profile-trendy-style-social-media-user-icon-187599373.jpg"
	);

	const [isAuthorized, setIsAuthorized] = useState(true);

	const [show, setShow] = useState(false);
	const [setting, setSetting] = useState(false);
	// useEffect(() => {
	// 	if(isAuthorized){

	// 	}

	// }, [isAuthorized])

	let consultantContent = isAuthorized ? (
		<>
			<main className={classes.login_main}>
				<div className={classes.profile_main}>
					<div className={classes.settings_icon_contanier}>
						<AiOutlineSetting className={classes.settings_icon} />
					</div>
					<img
						alt="default for new accounts created"
						className={classes.defaultImg}
						src={current}
					/>
				</div>
				<div className={classes.profile_update}>
					<AiOutlineCamera
						style={{ marginTop: "10px", textAlign: "center" }}
						onClick={() => setShow(true)}
					/>
				</div>

				<section className={classes.login_text}>
					<h3>Dorathy Williams</h3>
					<p>Nutritionist</p>
				</section>

				<section className={classes.feature_buttons}>
					<Link
						to="/consultant/sessions"
						style={{ backgroundColor: "#afba15" }}
					>
						<BsPeople className={classes.icons_style} />
						Sessions
					</Link>

					<Link
						to="/consultant/requests"
						style={{ backgroundColor: "#0c0847" }}
					>
						<AiOutlineCalendar className={classes.icons_style} />
						Requests
					</Link>

					<Link to="/consultant/records" style={{ backgroundColor: "#afba15" }}>
						<FaRegAddressBook className={classes.icons_style} />
						Customer Records
					</Link>

					{/* <div style={{ backgroundColor: "#0c0847" }}>
		<BsChatDots className="icons-style" />
		<p style={{ padding: "9px" }}>Connect</p>
	</div> */}
				</section>
				{show && <ImageProfile setShow={setShow} />}
				{setting && <ConsultantSettings setting={setSetting} />}
			</main>
		</>
	) : (
		<ConsultantLogin />
	);

	return <div className={classes.login_contanier}>{consultantContent}</div>;
};

export default SecondPage;
