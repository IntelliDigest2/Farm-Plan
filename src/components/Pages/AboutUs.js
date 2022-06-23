import React from "react";
import { PageWrap } from "../SubComponents/PageWrap";
import Divider from "@mui/material/Divider";
// import logo from "../../images/WFTLogo.png";
// import { Row, Col } from "react-bootstrap";

export default function AboutUs() {
  return (
    <PageWrap header="About Us" goTo="/landing">
      {/* <div className="web-center">
        <div className="flex">
          <image
            src={logo}
            alt="World Food Tracker, empowering global food sustainability"
            className="img-fluid rounded fix-image mb-4"
            style={{ display: "block", width: "50px" }}
          />
        </div>
      </div> */}
      <h1 className="mt-2">About the World Food Tracker</h1>
      <h5 style={{ fontWeight: "600" }}>
        END FOOD WASTE | END HUNGER | END MALNUTRITION | IMPROVE LOCAL FOOD
        PRODUCTION
      </h5>
      <p>
        The World Food Tracker is a comprehensive application designed with the
        food system as a whole in mind, from farm to fork.
      </p>
      <p>
        As a circular food platform, the World Food Tracker is supporting
        individuals, households and businesses to develop a more sustainable
        relationship with food through a practical insight on the impact of food
        on health and environment.
      </p>
      <p>
        Let's help you plan to save our food, save our health, save our wealth
        and save our earth.
      </p>
      <p>
        Find out more on our{" "}
        <a
          style={{ color: "#afba15" }}
          href="https://intellidigest.com/services/food-waste-tracker"
        >
          website
        </a>
      </p>
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
