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
import { fetchConsultantInfo } from "../../../../store/actions/consultantActions/consultantActions";
import { IconButton } from "../../../SubComponents/Button";
import logo from "../../../../images/WFTLogo.png";
import { Profile } from "../../../SubComponents/Profile";

const ConsultantAccountPage = (props) => {
	const { url } = useRouteMatch();
	const [current, setCurrent] = useState(
		"https://thumbs.dreamstime.com/b/default-avatar-profile-trendy-style-social-media-user-icon-187599373.jpg"
	);

	const { isLoggedIn, consultantData, profile, auth } = props;

	const [isAuthorized, setIsAuthorized] = useState(false);
	const [userInfo, setUserInfo] = useState("");

	const [show, setShow] = useState(false);
	const [setting, setSetting] = useState(false);
	const [type, setType] = useState(props.profile.type);

	useEffect(() => {
		props.getConsultantData(auth.uid);
	}, []);

	useEffect(() => {
		setType(props.profile.type);
	}, [props.profile.type]);

	// console.log(profile);

	// console.log(profile, `this is the profile`);

	useEffect(() => {
		// console.log(consultantData);
		if (consultantData) {
			setUserInfo(consultantData);
		}
	}, [consultantData]);

	// console.log(profile, `first`);
	let consultantContent =
		profile.isLoaded === false ? (
			"loading..."
		) : auth.uid && profile?.consultant === "active" ? (
			<>
				{/* <main className={classes.consultant_main}> */}
				<section className={classes.consultant_nav}>
					{/* <TabLink
					icon={<SessionsIcon />}
					link={"/consultant/sessions"}
					text="Sessions"
					backgroundColor="#afba15"
				/> */}
					<IconButton
						title="view all consultation requests"
						icon="requests"
						label="Requests"
						color="turquoise"
						goTo="/consultant/requests"
					/>
					<IconButton
						title="Check all active consultation sessions"
						icon="sessions"
						label="Sessions"
						color="turquoise"
						goTo="/consultant/Sessions"
					/>
					{/* <IconButton
					title="Check consultation requests"
					icon="calendar"
					label="Records"
					color="turquoise"
					goTo="/consultant/records"
				/> */}

					{/* <TabLink
					icon={<CalendarIcon />}
					link={"/consultant/requests"}
					text="Requests"
					backgroundColor="#0c0847"
				/> */}
					<TabLink
						icon={<RecordsIcon />}
						link={"/consultant/records"}
						text="Customer Records"
						backgroundColor="#afba15"
					/>
				</section>
				{show && <ImageProfile setShow={setShow} />}
				{setting && <ConsultantSettings setting={setSetting} />}
				{/* </main> */}
			</>
		) : (
			<Redirect to="/consultant/login" />
		);

	return (
		<>
			<main className={classes.consultant_main}>
				<header className={classes.consultant_header}>
					{/* <div>Intelli Logo</div> */}
					<div className="flex">
						<img
							src={logo}
							alt="World Food Tracker, empowering global food sustainability"
							className="img-fluid rounded fix-image mb-3"
							style={{ maxWidth: "40%" }}
						/>
						<Profile profile={props.profile} type={type} />
					</div>
					{/* <div className={classes.consultant_profile}>
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
							
							</div>
						</div> */}
				</header>
				{consultantContent}
			</main>
		</>
	);
};

const mapStateToProps = (state) => ({
	consultantData: state.consultantState.consultantData,
	isLoggedIn: state.consultantAuth.consultantLoggedIn,
	profile: state.firebase.profile,
	auth: state.firebase.auth,
});

const mapDispatchToProps = (dispatch) => {
	return {
		getConsultantData: (userId) => dispatch(fetchConsultantInfo(userId)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ConsultantAccountPage);

// export default SecondPage;
