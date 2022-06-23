import React from "react";
import { PageWrap } from "../SubComponents/PageWrap";
import "./Pages.css";
import Divider from "@mui/material/Divider";
import food from "../../images/Food.jpg";
import health from "../../images/Health.jpg";
import environment from "../../images/Environment.jpg";
// import logo from "../../images/WFTLogo.png";
import { Row, Col } from "react-bootstrap";

export default function AboutUs() {
  return (
    <PageWrap header="About Us" goTo="/landing">
      <h1 className="mt-2">About the World Food Tracker</h1>
      <h5 style={{ fontWeight: "600" }}>
        END FOOD WASTE | END HUNGER | END MALNUTRITION | IMPROVE LOCAL FOOD
        PRODUCTION
      </h5>
      <div className="no-contrast">
        <p>
          The World Food Tracker is a comprehensive application designed with
          the food system as a whole in mind, from farm to fork.
        </p>
        <p>
          As a circular food platform, the World Food Tracker is supporting
          individuals, households and businesses to develop a more sustainable
          relationship with food through a practical insight on the impact of
          food on health and environment.
        </p>
        <p>
          Let's help you plan to save our food, save our health, save our wealth
          and save our earth.
        </p>
      </div>
      <div className="contrast">
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
      </div>
      <h5 style={{ fontWeight: "600" }} className="mt-3">
        FOOD
      </h5>
      <div className="no-contrast">
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

      <h5 style={{ fontWeight: "600" }} className="mt-3">
        Health
      </h5>
      <div className="no-contrast">
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
        <p>
          <b>
            Are you an organisation recognised for leading the way in
            sustainable farming and food production practices?
          </b>{" "}
          Let us help you connect to the right customers.
        </p>
      </div>

      <h5 style={{ fontWeight: "600" }} className="mt-3">
        Environment
      </h5>
      <div className="no-contrast">
        <p>The World Food Tracker helps you keep track of your food waste.</p>
        <p>
          <b>Curious about how much food is being wasted?</b> The World Food
          Tracker is designed to track waste such that the insight given to you
          or your organisation will help you to eliminate edible food waste and
          reduce inedible food waste. The World Food Tracker will also provide
          extra information about the greenhouse gas emissions of yor waste.
        </p>
        <p>
          <b>Are you a food producer?</b> Sign up to the World Food Tracker
          today to help plan your food production with sustainability in mind
          while tracking and reducing your avoidable food loss.
        </p>
      </div>
      <Divider />
      <h1 className="mt-2">About IntelliDigest Ltd</h1>
      <p>
        Drawing on cutting edge research, training and consulting, our mission
        at IntelliDigest is to develop new, sustainable technologies, and create
        innovative solutions to address the sustainability challenges faced by
        food producers and governments globally.
      </p>
      <p>
        Eliminating edible food waste and repurposing inedible waste to climate
        friendly chemicals is at the core of everything we do. We believe that
        reducing food waste at food production, retail, and household level can
        provide numerous benefits for both the planet and our communities.
      </p>
      <p>
        Through our research and consulting facilities, IntelliDigest is
        continuously working on helping governments and the public understand
        the true scale of the food waste issue and the consequences of
        inadequate food waste handling. Advocating for increased awareness about
        measuring food waste inspired our Global Food Loss & Waste Tracker
        system, designed to allow households to monitor their efforts and save
        money through reducing food waste.
      </p>
    </PageWrap>
  );
}
