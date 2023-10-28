import React from "react";
import { useId } from "react";
import { Modal } from "react-bootstrap";
import FarmerListInfo from "./FarmerListInfo";
import { useTranslation, Trans } from "react-i18next";

export function FarmersList({
	list,
	cart,
	address,
	delivery_code,
	receiversID,
	show,
	setShow,
	forceUpdate,
	buyers_account_type,
	admin_id,
}) {
	const { t } = useTranslation();

	const handleFormClose = () => setShow(false);
	return (
		<Modal
			show={show}
			onHide={handleFormClose}
			size="lg"
			aria-labelledby="edit meal"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="add-meal">{t("description.order")}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<FarmerListInfo
					list={list}
					cart={cart}
					address={address}
					delivery_code={delivery_code}
					forceUpdate={forceUpdate}
					receiversID={receiversID}
					handleFormClose={handleFormClose}
					buyers_account_type={buyers_account_type}
					admin_id={admin_id}
				/>
			</Modal.Body>
		</Modal>
	);
}
