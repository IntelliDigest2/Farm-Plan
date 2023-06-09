import React, { useEffect, useState, useRef } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import classes from "./consultantCalendar.module.css";

function ConsultantCalendar({
	events,
	addBookableEventToDay,
	editBookableDayEvent,
	passCurrentDate,
}) {
	const calendarRef = useRef("");

	const [currentDate, setCurrentDate] = useState("");

	useEffect(() => {
		console.log(calendarRef.current.getApi().getEvents());
		// console.log(calendarRef.getApi());
	}, []);

	return (
		<>
			<Fullcalendar
				ref={calendarRef}
				plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
				initialView={"dayGridMonth"}
				headerToolbar={{
					start: "today prev,next",
					center: "title",
					end: "dayGridMonth timeGridDay",
				}}
				// selectMirror={true}
				// selectHelper={true}
				selectable={true}
				events={events}
				select={(start, end, allDays) => {
					addBookableEventToDay(start, end, allDays);
				}}
				// eventContent={(info, createElement) => {
				// 	console.log(info.event.id, "line41");
				// 	console.log(info.event, 42);

				// 	const popover = (
				// 		<Popover id="popover-basic">
				// 			<Popover.Title as="h4">{info.event.title}</Popover.Title>
				// 			<Popover.Content>
				// 				Lead Auditor: <br />
				// 			</Popover.Content>
				// 		</Popover>
				// 	);

				// 	let evtId = "event-" + info.event.id;
				// 	const content = (
				// 		<OverlayTrigger
				// 			style={{ width: "inherit" }}
				// 			placement="bottom"
				// 			overlay={popover}
				// 		>
				// 			<div className="fc-content" id={evtId}>
				// 				<span className="fc-title">{info.event.title}</span>
				// 				<span className="fc-title">{info.event.startStr}</span>
				// 			</div>
				// 		</OverlayTrigger>
				// 	);

				// 	return createElement(
				// 		"div",
				// 		{ className: `${classes.calendarDay} ` },
				// 		content
				// 	);
				// }}
			/>
		</>
	);
}

export default ConsultantCalendar;
