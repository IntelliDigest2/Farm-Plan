import { List, ListItem } from "@mui/material";
import React, { useState, useEffect } from "react";
import { AddToInventoryModal } from "./Icons/AddToInventoryModal";
import "./Inventory.css";
import InventoryItems from "./InventoryItems";
import { Alert, Row, Col } from "react-bootstrap";

import { useTranslation, Trans } from "react-i18next";

export const Inventory = ({ forceUpdate, value, tab }) => {
	const { t } = useTranslation();

	const [update, setUpdate] = useState(0);
	const [show, setShow] = useState(false);

	return (
		<div>
			<div className="row">
				<div className="col-8" style={{ textAlign: "left" }}>
					<p>{t("description.add_new_items")} 🙂</p>
				</div>
				<div className="col-4" style={{ textAlign: "right" }}>
					<AddToInventoryModal
						show={show}
						setShow={setShow}
						update={update}
						setUpdate={setUpdate}
					/>
				</div>
			</div>
			<Row>
				<Alert variant="primary">{t("description.please_add_weight")}</Alert>
			</Row>
			<div>
				<InventoryItems
					value={value}
					tab={tab}
					update={update}
					setUpdate={setUpdate}
				/>
			</div>
		</div>
	);
};
