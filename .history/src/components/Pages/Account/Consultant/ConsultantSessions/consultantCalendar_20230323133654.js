import React from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";
import Popover from "react-bootstrap/Popover";
import Overlay from "react-bootstrap/Overlay";
import ReactDOM from "react-dom";

const popover = (
	<Popover id="popover-basic">
		<Popover.Header as="h3">Popover right</Popover.Header>
		<Popover.Body>
			And here's some <strong>amazing</strong> content. It's very engaging.
			right?
		</Popover.Body>
	</Popover>
);

function Tooltip(info) {
	return (
		<Overlay
			show={true}
			// target={target}
			placement="bottom"
			// container={ref}
			containerPadding={20}
		>
			<Popover id="popover-contained">
				<Popover.Header as="h3">Popover bottom</Popover.Header>
				<Popover.Body>
					<strong>Holy guacamole!</strong> Check this info.
				</Popover.Body>
			</Popover>
		</Overlay>
	);
}

function ConsultantCalendar() {
	const events = [
		{
			title: "The Title",
			start: "2023-03-05T08:00:00",
			end: "2023-03-05T09:00:00",
		},
	];

	// let tooltip = (
	// 	<Overlay
	// 		show={true}
	// 		// target={target}
	// 		placement="bottom"
	// 		// container={ref}
	// 		containerPadding={20}
	// 	>
	// 		<>
	// 			<Popover id="popover-contained">
	// 				{/* <Popover.Header as="h3">Popover bottom</Popover.Header> */}
	// 				<Popover.Body>
	// 					<strong>Holy guacamole!</strong> Check this info.
	// 				</Popover.Body>
	// 			</Popover>
	// 		</>
	// 	</Overlay>
	// );

	let eventRender = (info) => {
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
	};
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
					console.log(info.event, "line41");
					console.log(info.event, 42);
					let eventRender = (info) => {
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
					};
					// <div>me</div>
				}}
			/>
		</>
	);
}

export default ConsultantCalendar;
