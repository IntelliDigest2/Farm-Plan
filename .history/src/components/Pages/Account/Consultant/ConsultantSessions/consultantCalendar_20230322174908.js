import React from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";

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
				eventDidMount={(info) => {}}
			/>
		</>
	);
}

export default consultantCalendar;
