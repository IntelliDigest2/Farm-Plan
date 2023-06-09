import React from "react";
import ConsultantRecord from "./consultantRecords";
import { PageWrapPayment } from "./../../../../SubComponents/PageWrapPayment";

function ConsultantRecordsPage() {
	return (
		<PageWrapPayment goTo="/consultant" header="Records">
			{/* consultantRecordsPage */}
			<ConsultantRecord />
		</PageWrapPayment>
	);
}

export default ConsultantRecordsPage;
