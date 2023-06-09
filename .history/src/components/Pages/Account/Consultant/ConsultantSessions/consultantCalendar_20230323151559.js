import React from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";
import Popover from "react-bootstrap/Popover";
import Overlay from "react-bootstrap/Overlay";
import ReactDOM from "react-dom";

function ConsultantCalendar() {
	const events = [
		{
			title: "The Title",
			start: "2023-03-05T08:00:00",
			end: "2023-03-05T09:00:00",
		},
	];

	function addBookableEventToDay() {}

	function editBookableDayEvent() {}

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
				// selectMirror={true}
				selectHelper={true}
				selectable={true}
				events={events}
				select={(start, end, allDays) => {
					console.log("eventClicked", start, end, allDays);
				}}
				eventDidMount={(info) => {
					console.log(info.event, "line41");
					console.log(info.event, 42);

					const popover = (
						<Popover id="popover-basic">
							<Popover.Title as="h3">{info.event.title}</Popover.Title>
							<Popover.Content>
								Lead Auditor: <br />
							</Popover.Content>
						</Popover>
					);

					let evtId = "event-" + info.event.id;
					const content = (
						<Overlay placement="bottom" overlay={popover}>
							<div className="fc-content" id={evtId}>
								<span className="fc-title">{info.event.title}</span>
							</div>
						</Overlay>
					);

					ReactDOM.render(content, info.el);

					// <div>me</div>
				}}
			/>
		</>
	);
}

export default ConsultantCalendar;
