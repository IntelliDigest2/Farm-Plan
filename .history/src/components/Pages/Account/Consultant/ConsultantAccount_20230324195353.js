import React, { useState } from "react";

import ImageProfile from "./ConsultantSettings/ImageProfile";
import ConsultantSettings from "./ConsultantSettings/ConsultantSettings";
import ConsultantLogin from "./ConsultantAuth/ConsultantLogin";
import classes from "./ConsultantAccount.module.css";
import SessionsIcon from "./ConsutltantIcons/sessionsIcon";
import CalendarIcon from "./ConsutltantIcons/calendarIcon";
import RecordsIcon from "./ConsutltantIcons/recordsIcon";
import TabLink from "./TabLink";
import SettingsIcon from "./ConsutltantIcons/settingsIcon";
import { Link, useRouteMatch } from "react-router-dom";

const SecondPage = () => {
	const [current, setCurrent] = useState(
		"https://thumbs.dreamstime.com/b/default-avatar-profile-trendy-style-social-media-user-icon-187599373.jpg"
	);

	const [isAuthorized, setIsAuthorized] = useState(true);

	const [show, setShow] = useState(false);
	const [setting, setSetting] = useState(false);
	let { path, url } = useRouteMatch();

	// useEffect(() => {
	// 	if(isAuthorized){

	// 	}

	// }, [isAuthorized])

	let consultantContent = isAuthorized ? (
		<>
			<main className={classes.consultant_main}>
				<header className={classes.consultant_header}>
					<div className={classes.profile_Img}>
						<img
							alt="default for new accounts created"
							className={classes.defaultImg}
							src={current}
						/>
					</div>

					{/* <div className={classes.profile_update}>
						<AiOutlineCamera
							style={{ marginTop: "10px", textAlign: "center" }}
							onClick={() => setShow(true)}
						/>
					</div> */}
					<div className={classes.profile_info}>
						Welcome <span>Dorathy Williams</span>
					</div>
					<div className={classes.consultant_settings}>
						<Link to={`${url}/settings`}>
							<SettingsIcon />
						</Link>
						{/* <AiOutlineSetting className={classes.settings_icon} /> */}
					</div>
				</header>

				<section className={classes.consultant_nav}>
					<TabLink
						icon={<SessionsIcon />}
						link={"/consultant/sessions"}
						text="Sessions"
						backgroundColor="#afba15"
					/>
					<TabLink
						icon={<CalendarIcon />}
						link={"/consultant/requests"}
						text="Requests"
						backgroundColor="#0c0847"
					/>
					<TabLink
						icon={<RecordsIcon />}
						link={"/consultant/records"}
						text="Customer Records"
						backgroundColor="#afba15"
					/>
				</section>
				{show && <ImageProfile setShow={setShow} />}
				{setting && <ConsultantSettings setting={setSetting} />}
			</main>
		</>
	) : (
		<ConsultantLogin />
	);

	return <>{consultantContent}</>;
};

export default SecondPage;
