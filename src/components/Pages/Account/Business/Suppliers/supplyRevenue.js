import React from "react";
import { PageWrapSupply } from "./../../../../SubComponents/PageWrapSupply";
import { Tab, Tabs } from "react-bootstrap";
import SupplyRentComponent from "./supplyRentComponent";
import SupplySalesComponent from "./supplySalesComponent";

export const SupplyRevenue = (props) => {
	return (
		<div>
			<PageWrapSupply goTo="/account" header="Dashboard">
				<Tabs
					defaultActiveKey="sales"
					id="meal-plan-tabs"
					className="mb-3 mealtabs basic-title"
				>
					<Tab eventKey="sales" title="Sales" className="mealtab">
						{/* returns all saved sales item */}
						<SupplySalesComponent />
					</Tab>

					<Tab eventKey="rentage" title="Rent" className="mealtab">
						<SupplyRentComponent />
					</Tab>

					{/* <Tab eventKey="menu-preview" title="Menu Preview" className="menupreview"> 
        <MenuPreview/>
        </Tab> */}
				</Tabs>
			</PageWrapSupply>
		</div>
	);
};

export default SupplyRevenue;
