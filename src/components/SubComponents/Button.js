import React from "react";
import "./Button.css";
import { Button as BootstrapButton } from "react-bootstrap";
import { Link } from "react-router-dom";

// import { Colors } from "../../lib/Colors";

import DeleteIconOutlined from "@mui/icons-material/DeleteOutlined";
import BarChartOutlined from "@mui/icons-material/BarChartOutlined";
import RestaurantOutlined from "@mui/icons-material/RestaurantOutlined";
import ShoppingBasketOutlined from "@mui/icons-material/ShoppingBasketOutlined";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import PublicOutlined from "@mui/icons-material/PublicOutlined";
import MenuBookOutlined from "@mui/icons-material/MenuBookOutlined";
import SpaOutlined from "@mui/icons-material/SpaOutlined";
import KitchenOutlined from "@mui/icons-material/KitchenOutlined";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";
import CategoryIcon from "@mui/icons-material/Category";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DescriptionOutlined from "@mui/icons-material/DescriptionOutlined";
import CardGiftcardOutlined from "@mui/icons-material/CardGiftcardOutlined";
import PsychologyIcon from '@mui/icons-material/Psychology';
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import ForumSharpIcon from "@mui/icons-material/ForumSharp";
import PermContactCalendarSharpIcon from "@mui/icons-material/PermContactCalendarSharp";
import PeopleIcon from "@mui/icons-material/People";
import { Psychology } from "@mui/icons-material";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import CalendarMonthSharpIcon from "@mui/icons-material/CalendarMonthSharp";

//when using component, styling="[colour]" colour choices are turquoise, green, yellow and blue. (styles are in Button.css)

// TODO sort out hover and selected colours (defaults to bootstrap primary)

export function DefaultButton(props) {
	if (props.disabled) {
		return (
			<BootstrapButton
				variant="default"
				className={["default-btn", `${props.styling}-btn`, "shadow-none"]}
				disabled
			>
				<div className="basic-title">{props.text}</div>
			</BootstrapButton>
		);
	} else {
		return (
			<BootstrapButton
				variant="default"
				className={["default-btn", `${props.styling}-btn`, "shadow-none"]}
				href={props.goTo}
				onClick={props.onClick}
			>
				<div className="basic-title">{props.text}</div>
			</BootstrapButton>
		);
	}
}

export function SubButton(props) {
	return (
		<BootstrapButton
			variant="default"
			className={["sub-btn", `${props.styling}-btn`, "shadow-none"]}
			href={props.goTo}
			onClick={props.onClick}
			disabled={props.disabled}
		>
			<div className="basic-title" style={{ color: "white" }}>
				{props.text}
			</div>
		</BootstrapButton>
	);
}
export function SubButtonM(props) {
	return (
		<BootstrapButton
			variant="default"
			className={["sub-btn", `${props.styling}-btn`, "shadow-none"]}
			// href={props.goTo}
			// onClick={props.onClick}
			// disabled={props.disabled}
		>
			<Link to={props.goTo}>
				<div className="basic-title" style={{ color: "white" }}>
					<div>{props.text}</div>
				</div>
			</Link>
		</BootstrapButton>
	);
}

export function SubButtonInventory(props) {
	return (
		<BootstrapButton
			variant="default"
			className={["sub-btn", `${props.styling}-btn`, "shadow-none"]}
			href={props.goTo}
			onClick={props.onClick}
			disabled={props.disabled}
		>
			<div className="basic-title" style={{ color: "white" }}>
				{props.text}
			</div>
		</BootstrapButton>
	);
}

export function AddButton({ onClick, title }) {
	return (
		<BootstrapButton
			variant="default"
			className={["add-btn", "green-btn", "shadow-none"]}
			onClick={onClick}
		>
			<div>
				<AddIcon sx={{ fontSize: 24 }} />
			</div>
		</BootstrapButton>
	);
}

export function IconButton(props) {
	function IconType() {
		switch (props.icon) {
			default:
			case "waste":
				return <DeleteIconOutlined sx={{ fontSize: 90, color: "#ffffff" }} />;
			case "chart":
				return <BarChartOutlined sx={{ fontSize: 90, color: "#ffffff" }} />;
			case "gift":
				return <CardGiftcardOutlined sx={{ fontSize: 90, color: "#ffffff" }} />;
			case "food":
				return <RestaurantOutlined sx={{ fontSize: 90, color: "#ffffff" }} />;
			case "surplus":
				return <CalendarTodayIcon sx={{ fontSize: 90, color: "#ffffff" }} />;
			case "buy":
				return (
					<ShoppingBasketOutlined sx={{ fontSize: 90, color: "#ffffff" }} />
				);
			case "info":
				return <InfoOutlined sx={{ fontSize: 90, color: "#ffffff" }} />;
			case "world":
				return <PublicOutlined sx={{ fontSize: 90, color: "#ffffff" }} />;
			case "book":
				return <MenuBookOutlined sx={{ fontSize: 90, color: "#ffffff" }} />;
			case "mind":
				return <PsychologyIcon sx={{ fontSize: 90, color: "#ffffff" }} />;
			case "plant":
				return <SpaOutlined sx={{ fontSize: 90, color: "#ffffff" }} />;
			case "kitchen":
				return <KitchenOutlined sx={{ fontSize: 90, color: "#ffffff" }} />;
			case "product":
				return <ShoppingBagOutlined sx={{ fontSize: 90, color: "#ffffff" }} />;
			case "my-products":
				return <CategoryIcon sx={{ fontSize: 90, color: "#ffffff" }} />;
			case "notes":
				return <DescriptionOutlined sx={{ fontSize: 90, color: "#ffffff" }} />;
			case "consult":
				return <ForumSharpIcon sx={{ fontSize: 90, color: "#ffffff" }} />;
			case "consultant":
				return (
					<PermContactCalendarSharpIcon
						sx={{ fontSize: 90, color: "#ffffff" }}
					/>
				);
			case "sessions":
				return <PeopleIcon sx={{ fontSize: 90, color: "#ffffff" }} />;
			case "requests":
				return <CalendarTodayIcon sx={{ fontSize: 90, color: "#ffffff" }} />;
			// case "calendar":
			// 	return <CalendarMonthSharpIcon sx={{ fontSize: 90 }} />;
		}
	}

	// var target;
	// if (String(props.goTo).startsWith("/")) {
	// 	target = "_self";
	// } else {
	// 	target = "_blank";
	// }

	var target;
	if (String(props.goTo).startsWith("/")) {
		target = "_self";
	} else {
		target = "_blank";
	}

	return (
		<>
      {props.title ? (
        <Tooltip placement="bottom" arrow title={props.title}>
          <div
            className={[
              "icon-btn",
              `${props.color}-btn`,
              "shadow-none"
            ].join(" ")}
          >
            <a
              href={props.goTo}
              target={target}
              className="custom-link"
              rel={target === "_blank" ? "noopener noreferrer" : ""}
            >
              <div>
                <IconType />
                <div>{props.label}</div>
              </div>
            </a>
          </div>
        </Tooltip>
      ) : (
        <div className={["icon-btn", `${props.color}-btn`].join(" ")}>
          <a
            href={props.goTo}
            target={target}
            className="custom-link"
            rel={target === "_blank" ? "noopener noreferrer" : ""}
          >
            <div>
              <IconType />
              <div>{props.label}</div>
            </div>
          </a>
        </div>
      )}
    </>
	);
}
