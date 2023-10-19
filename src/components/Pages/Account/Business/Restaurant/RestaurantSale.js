import React from "react";
import { connect } from "react-redux";
import { Tab, Tabs } from "react-bootstrap";

import RestaurantSalesComponent from "./RestaurantSalesComponent";
import RestuarantSalesChart from "./RestuarantSalesChart";
import { PageWrap } from "./../../../../SubComponents/PageWrap";

export const RestaurantSale = (props) => {
	return (
		<div>
			<PageWrap goTo="/account" header="Dashboard">
				{/* <WaveLoader /> */}
				<Tabs
					defaultActiveKey="RestaurantSales"
					id="meal-plan-tabs"
					className="mb-3 mealtabs basic-title"
				>
					<Tab
						eventKey="RestaurantSales"
						title="Restaurant Sales"
						className="mealtab"
					>
						{/* returns all saved recipes */}
						<RestaurantSalesComponent />
						{/* value={value} onChange={setValue} */}
						{/* search for recipes via api */}
						{/* <RestaurantRecipes value={value} onChange={setValue} /> */}
						{/* <AddMealForm_restaurant/> */}

						{/* <MenuPreview /> */}
					</Tab>

					{/* <Tab eventKey="menu-preview" title="Menu Preview" className="menupreview"> 
<MenuPreview/>
</Tab> */}

					<Tab eventKey="SalesChart" title="Sales Chart" className="mealtab">
						<RestuarantSalesChart />
						{/* value={value} */}
					</Tab>
				</Tabs>

				{/* input available locations for picking up */}
				{/* shopping list */}
			</PageWrap>
		</div>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantSale);
