import React from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";

function consultantCalendar() {
	return (
		<>
			<Fullcalendar
				plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
				initaialView={"dayGridMonth"}
				headerToolbar={{
					start: "",
					center: "title",
					end: "today prev,next",
				}}
			/>
		</>
	);
}

export default consultantCalendar;
