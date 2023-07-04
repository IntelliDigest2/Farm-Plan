import React from "react";
import ConsultantRecords from "./consultantRecords";
import { PageWrapPayment } from "./../../../../SubComponents/PageWrapPayment";
import classes from "./consultantRecordsPage.module.css";
import { PageWrap } from "./../../../../SubComponents/PageWrap";

function ConsultantRecordsPage() {
	return (
		// <div attr="me and you" className={classes.consultantRecordsCont}>
		<PageWrapPayment goTo="/consultant" header="Records">
			<div className={classes.cont}>
				{/* consultantRecordsPage */}
				<ConsultantRecords />
			</div>
		</PageWrapPayment>
	);
}

export default ConsultantRecordsPage;
