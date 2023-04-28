import React from "react";
import { ConsultantChats } from "../Pages/Account/Consultant/ConsultantSessions/consultantChats";
import { connect } from "react-redux";

function UserConsultingChatPage() {
	return (
		<div style={{ width: "60%", margin: "0 auto" }}>
			<ConsultantChats />
		</div>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)UserConsultingChatPage;

