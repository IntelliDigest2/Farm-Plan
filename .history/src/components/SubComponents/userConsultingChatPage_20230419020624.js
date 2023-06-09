import React, { useEffect, useState } from "react";
import { ConsultantChats } from "../Pages/Account/Consultant/ConsultantSessions/consultantChats";
import { connect } from "react-redux";
import { getUserChatsData } from "../../store/actions/consultantActions/consultantActions";

function UserConsultingChatPage(props) {
	const { userChats, getChats, auth } = props;

	return (
		<div style={{ width: "60%", margin: "0 auto" }}>
			<ConsultantChats />
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		userChats: state.consultantState.userChats,
		auth: state.firebase.auth,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getChats: (userId) => dispatch(getUserChatsData(userId)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserConsultingChatPage);
