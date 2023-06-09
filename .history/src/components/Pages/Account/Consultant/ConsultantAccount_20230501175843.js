import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import ImageProfile from "./ConsultantSettings/ImageProfile";
import ConsultantSettings from "./ConsultantSettings/ConsultantSettings";
import ConsultantLogin from "./ConsultantAuth/ConsultantLogin";
import classes from "./ConsultantAccount.module.css";
import SessionsIcon from "./ConsutltantIcons/sessionsIcon";
import CalendarIcon from "./ConsutltantIcons/calendarIcon";
import RecordsIcon from "./ConsutltantIcons/recordsIcon";
import TabLink from "./TabLink";
import SettingsIcon from "./ConsutltantIcons/settingsIcon";
import { Link, useRouteMatch, Redirect } from "react-router-dom";
import { fetchConsultantData } from "../../../../store/actions/consultantActions/consultantActions";
import { IconButton } from "../../../SubComponents/Button";

const ConsultantAccountPage = (props) => {
	const { url } = useRouteMatch();
	const [current, setCurrent] = useState(
		"https://thumbs.dreamstime.com/b/default-avatar-profile-trendy-style-social-media-user-icon-187599373.jpg"
	);

	const { isLoggedIn, consultantData } = props;

	const [isAuthorized, setIsAuthorized] = useState(false);
	const [userInfo, setUserInfo] = useState("");

	const [show, setShow] = useState(false);
	const [setting, setSetting] = useState(false);

	useEffect(() => {
		props.getConsultantData("EAudRc5YajVorKygb0kZFGlfl163");
	}, []);

	console.log(profile);

	useEffect(() => {
		console.log(consultantData);
		if (consultantData) {
			setUserInfo(consultantData);
		}
	}, [consultantData]);

	let consultantContent = isLoggedIn ? (
		props.consultantData ? (
			<>
				<main className={classes.consultant_main}>
					<header className={classes.consultant_header}>
						<div>Intelli Logo</div>
						<div className={classes.consultant_profile}>
							<div className={classes.profile_Img}>
								<img
									alt="default for new accounts created"
									className={classes.defaultImg}
									src={current}
								/>
							</div>

							<div className={classes.profile_info}>
								Welcome <span>{userInfo.fullName}</span>
							</div>
							<div className={classes.consultant_settings}>
								<Link to={`${url}/settings`}>
									<SettingsIcon />
								</Link>
								{/* <AiOutlineSetting className={classes.settings_icon} /> */}
							</div>
						</div>
					</header>

					<section className={classes.consultant_nav}>
						{/* <TabLink
							icon={<SessionsIcon />}
							link={"/consultant/sessions"}
							text="Sessions"
							backgroundColor="#afba15"
						/> */}
						<IconButton
							title="Check consultation requests"
							icon="calendar"
							label="Requests"
							color="turquoise"
							goTo="/consultant/requests"
						/>
						<IconButton
							title="Check consultation requests"
							icon="calendar"
							label="Sessions"
							color="turquoise"
							goTo="/consultant/Sessions"
						/>
						<IconButton
							title="Check consultation requests"
							icon="calendar"
							label="Records"
							color="turquoise"
							goTo="/consultant/records"
						/>

						{/* <TabLink
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
						/> */}
					</section>
					{show && <ImageProfile setShow={setShow} />}
					{setting && <ConsultantSettings setting={setSetting} />}
				</main>
			</>
		) : (
			"loading"
		)
	) : (
		<Redirect to="/consultant/login" />
	);

	return <>{consultantContent}</>;
};

const mapStateToProps = (state) => ({
	consultantData: state.consultantState.consultantData,
	isLoggedIn: state.consultantAuth.consultantLoggedIn,
	profile: state.firebase.user,
});

const mapDispatchToProps = (dispatch) => {
	return {
		getConsultantData: (userId) => dispatch(fetchConsultantData(userId)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ConsultantAccountPage);

// export default SecondPage;
