import React from "react";
import { PageWrap } from "../SubComponents/PageWrap";
import "./Pages.css";
// import Divider from "@mui/material/Divider";
import food from "../../images/Food.jpg";
import health from "../../images/Health.jpg";
import environment from "../../images/Environment.jpg";
// import logo from "../../images/WFTLogo.png";
import { Row, Col } from "react-bootstrap";
import { SubButton } from "../SubComponents/Button";
import { Container } from "react-bootstrap";

export default function AboutUs() {

	const bannerURL = "https://res.cloudinary.com/dghm4xm7k/image/upload/v1703380760/static%20images/pxfuel_ubzeof.jpg";

	const buildingFunctionVideos = {
		Restaurants: {
		  title: "Restaurant Video",
		  link: "https://www.youtube.com/embed/_Y2mWfK0RT8?si=rsC0rkIFr8IxyvHF",
		},
		Schools: {
		  title: "Schools Video",
		  link: "https://www.youtube.com/embed/_Y2mWfK0RT8?si=rsC0rkIFr8IxyvHF",
		},
		Hospitals: {
		  title: "Hospitals Video",
		  link: "https://www.youtube.com/embed/_Y2mWfK0RT8?si=rsC0rkIFr8IxyvHF",
		},
		Hotels: {
		  title: "Hotels Video",
		  link: "https://www.youtube.com/embed/_Y2mWfK0RT8?si=rsC0rkIFr8IxyvHF",
		},
		Offices: {
		  title: "Offices Video",
		  link: "https://www.youtube.com/embed/_Y2mWfK0RT8?si=rsC0rkIFr8IxyvHF",
		},
		MachinerySupply: {
		  title: "Machinery Supply Video",
		  link: "https://www.youtube.com/embed/_Y2mWfK0RT8?si=rsC0rkIFr8IxyvHF",
		},
		// Add more build functions and their corresponding video links as needed
	  };

	return (
		<PageWrap header="About Us" goTo="/landing">
			

			<div
				className="banner"
				style={{ backgroundImage: `url(${bannerURL})` }}
			>
				<span>
					<h1 className="banner-text">About the World Food Tracker</h1>	
				</span>
				<p className="banner-list">
					<span>
					END FOOD WASTE | END HUNGER | END MALNUTRITION | IMPROVE LOCAL FOOD
					PRODUCTION
					</span>
				</p>
				
			</div>

			<div className="no-contrast">				
				<p>
				<b>The World Food Tracker is a multi-stakeholder online platform that:</b>
				<p>Assist households/Individuals to plan their meals, monitor their nutritional consumption, monitor, and prevent edible food waste, and source their food from local producers.</p>
				<p>Assist farmers in adopting sustainable practices throughout the food production process, while connecting them with local consumers and food establishments to supply fresh and highly nutritious produce.</p>
				<p>Assist hotels and restaurants in meal planning, fostering engagement with local consumers, and facilitating the sourcing of ingredients from sustainable local farmers and producers.</p>
				<p>Support material and equipment suppliers connecting with various stakeholders in the food system, ranging from farmers to households and individuals. Enabling the recovery of bio-nutrient from food waste to be supplied to local food producers while bio-chemicals, mostly carbohydrates by products recovered from the food waste, are made available to local packaging manufacturing companies to produce sustainable packaging for the safe distribution of local produce.</p>
				<p>Enable Consultants (Agronomists, Horticulturist, veterinary doctors, dieticians, nutritionists)  to expand their network while providing expert support to the different stakeholders across the food system from farmers to householders/Individuals.</p>
				<p>Aid local authorities and member states in reinforcing the food system and ensuring equitable access to quality food for all members of their communities. The positive impact in local economic activities through the World Food Tracker is a key advantage for adoption by the government as all activities are focused on enhancing the health/well being of the local populace while restoring the environment.</p>

				</p>
				<p>
					Together, we can plan to save our food, save our health, save our wealth
					and save our earth.
				</p>
			</div>
			{/* <div className="contrast mb-3">
        <Row>
          <Col>
            <img src={food} alt={"Food"} className="image" />
          </Col>
          <Col>
            <img src={health} alt={"Health"} className="image" />
          </Col>
          <Col>
            <img src={environment} alt={"Environment"} className="image" />
          </Col>
        </Row>
      </div> */}
			{/* <Divider /> */}
			<div className="breaker">
				<img src={food} alt="" />
			</div>
			<div className="no-contrast">
				<h5 style={{ fontWeight: "600" }} className="mt-3">
					FOOD
				</h5>
				<p>
					<b>Want to keep a detailed meal plan?</b> The World Food Tracker is
					designed for you to get your meal planning to the next level.
				</p>
				<p>
					With detailed information about every meal and its nutritional
					content, there is no better solution to meal planning than the World
					Food Tracker.
				</p>
				<p>
					Through the Plan to Save campaign, the platform also connects you with
					local farmers so you can source common ingredients directly.
				</p>
				<p>
					Keeping a long-term meal plan also helps the farmers with planning
					their production, which reduces the food that is wasted after harvest.
				</p>
			</div>

			<div className="breaker">
				<img src={health} alt="" />
			</div>

			<div className="no-contrast">
				<h5 style={{ fontWeight: "600" }} className="mt-3">
					Health
				</h5>
				<p>
					The World Food Tracker helps individuals and households to live a
					healthier lifeand transition towards a healthier diet through support
					with meal planning.
				</p>
				<p>
					<b>Want to plan and keep track of your nutritional intake?</b> Keeping
					track of your nutritional intake and seeing what you are lacking in
					your diet will help you make the changes you need to stay healthy.
				</p>
				<p>
					<b>Eating in or eating out?</b> No worries. We have sustainable
					restaurants that source their food ingredients only from sustainable
					farmers to meet your needs and seamlessly update your meal plan.
				</p>
			</div>

			<div className="breaker">
				<img src={environment} alt="" />
			</div>

			<div className="no-contrast">
				<h5 style={{ fontWeight: "600" }} className="mt-3">
					Environment
				</h5>
				<p>The World Food Tracker helps you keep track of your food waste.</p>
				<p>
					<b>Curious about how much food is being wasted?</b> The World Food
					Tracker is designed to track waste such that the insight given to you
					or your organisation will help you to eliminate edible food waste and
					reduce inedible food waste. The World Food Tracker will also provide
					extra information about the greenhouse gas emissions of yor waste.
				</p>

				
			</div>

			<div className="no-contrast">
				<h1 className="mt-3">About IntelliDigest Ltd</h1>

				<p>
				IntelliDigest is a purpose driven company on a mission to empower global food 
				sustainability through technology innovation and capacity building. Engaging with 
				national and international organisations, we draw on our cutting edge research, 
				technology innovation, and capacity building capabilities to address the 
				sustainability challenges faced by stakeholders across the food system from 
				farm to fork
				</p>

				<>
				<Container>
					<Row>
						{Object.entries(buildingFunctionVideos).map(([functionName, { title, link }]) => (
						<Col key={functionName} xs={12} sm={6} md={4} className="mb-4">
							<iframe
							width="100%"
							height="200"
							src={link}
							title={`${functionName} Video`}
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowFullScreen
							></iframe>
							{/* <h6>{title}</h6> */}
						</Col>
						))}
					</Row>
					</Container>
				</>
			</div>
			{/* <div className="contrast"> */}
			<Row style={{ justifyContent: "center" }} className="mt-3">
				<Col
					style={{ width: "50%", justifyContent: "center", display: "flex" }}
				>
					<SubButton styling="blue" goTo="/login" text="Log In" />
				</Col>
				<Col
					style={{ width: "50%", justifyContent: "center", display: "flex" }}
				>
					<SubButton styling="blue" goTo="/signup" text="Sign Up" />
				</Col>
			</Row>
			{/* </div> */}
		</PageWrap>
	);
}
