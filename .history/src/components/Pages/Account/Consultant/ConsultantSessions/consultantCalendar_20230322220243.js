import React from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

function popover() {
	return;
	<div>
		<Popover id="popover-basic">
			<Popover.Header as="h3">Popover right</Popover.Header>
			<Popover.Body>
				And here's some <strong>amazing</strong> content. It's very engaging.
				right?
			</Popover.Body>
		</Popover>
	</div>;
}

function consultantCalendar() {
	const events = [
		{
			title: "The Title",
			start: "2023-03-05T08:00:00",
			end: "2023-03-05T09:00:00",
		},
	];

	// <OverlayTrigger
	// 	trigger="click"
	// 	placement="right"
	// 	overlay={popover}
	// ></OverlayTrigger>;

	return (
		<>
			<Fullcalendar
				plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
				initialView={"dayGridMonth"}
				headerToolbar={{
					start: "today prev,next",
					center: "title",
					end: "dayGridMonth timeGridWeek timeGridDay",
				}}
				events={events}
				eventDidMount={(info) => {
					return console.log("me");
				}}
			/>
		</>
	);
}

export default consultantCalendar;
