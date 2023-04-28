import React from "react";
import { ConsultantChats } from "../Pages/Account/Consultant/ConsultantSessions/consultantChats";

function userConsultingChatPage() {
	return (
		<div style={{ width: "60%", margin: "0 auto" }}>
			<ConsultantChats userName={"john"} userId={"56789u"} to={"12340u"} />
		</div>
	);
}

export default userConsultingChatPage;
