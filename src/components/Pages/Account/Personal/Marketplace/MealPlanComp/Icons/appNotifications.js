import React from "react";
import { useId } from "react";
import { Modal } from "react-bootstrap";
import ViewAppNotifications from "./viewAppNotifications";
import "./ViewPurchaseInfo.css";
import { useTranslation, Trans } from "react-i18next";

export function AppNotifications({ show, setShow, forceUpdate }) {
	const { t } = useTranslation();

	const handleFormClose = () => setShow(false);
	return (
		<Modal
			show={show}
			onHide={handleFormClose}
			size="lg"
			aria-labelledby="edit meal"
			centered
			dialogClassName="custom-modal"
		>
			<Modal.Header closeButton>
				<Modal.Title id="add-meal">
					{/* {t('description.order')} */}
					Notifications
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<ViewAppNotifications />
			</Modal.Body>
		</Modal>
	);
}
