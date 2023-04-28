import React, { useEffect, useState } from "react";
import { ConsultantChats } from "../Pages/Account/Consultant/ConsultantSessions/consultantChats";
import { connect } from "react-redux";
import { getUserChatsData } from "../../store/actions/consultantActions/consultantActions";

function UserConsultingChatPage(props) {
	const { userChats, getChats, auth } = props;
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		getChats(auth.uid);
	}, []);

	useEffect(() => {
		console.log(userChats);
		setIsLoading(false);
	}, [userChats]);

	let chatList = userChats.length > 0 ? userChats.data.data : [];

	return (
		<div style={{ width: "60%", margin: "0 auto" }}>
			{isLoading ? (
				"Loading..."
			) : (
				<ConsultantChats chats={chatList} userId={auth.uid} />
			)}
			{/*  */}
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
