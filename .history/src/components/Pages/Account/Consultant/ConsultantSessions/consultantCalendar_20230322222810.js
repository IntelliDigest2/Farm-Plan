import React from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

const popover = (
	<Popover id="popover-basic">
		<Popover.Header as="h3">Popover right</Popover.Header>
		<Popover.Body>
			And here's some <strong>amazing</strong> content. It's very engaging.
			right?
		</Popover.Body>
	</Popover>
);

function consultantCalendar() {
	const events = [
		{
			title: "The Title",
			start: "2023-03-05T08:00:00",
			end: "2023-03-05T09:00:00",
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
					end: "dayGridMonth timeGridWeek timeGridDay",
				}}
				events={events}
				eventDidMount={(info) => {
					return (
						<Overlay
							show={show}
							target={target}
							placement="bottom"
							container={ref}
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
				}}
			/>
		</>
	);
}

export default consultantCalendar;
