import React from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";
// import * as bootstrap from "bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

function consultantCalendar() {
	const events = [
		{
			title: "The Title",
			start: "2023-06-05T08:00:00",
			end: "2023-06-05T09:00:00",
		},
	];
	return (
		<>
			<Fullcalendar
				plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
				initialView={"dayGridMonth"}
				headerToolbar={{
					start: "today prev,next",
					center: "title",
					end: "dayGridMonth, timeGridWeek, timeGridDay",
				}}
				height={"50vh"}
				events={events}
				// eventDidMount={(info) => {
				// 	return new bootstrap.Popover(info.el, {
				// 		title: info.event.title,
				// 		placement: "auto",
				// 		trigger: "hover",
				// 		customClass: "popoverStyle",
				// 		content: "<p>here is the event",
				// 		html: true,
				// 	});
				// }}
			/>
		</>
	);
}

export default consultantCalendar;
