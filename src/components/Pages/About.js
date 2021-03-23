import React from 'react';
import '../../App.css';
import "./Pages.css"
import { Row, Col } from "react-bootstrap";
import { Layout } from "../Layout/Layout"
import logo from "../../images/intellidigest-logo.png";
import placeholder from "../../images/help2.jpg";
import benefits from "../../images/help.jpg";

function About() {
  return (
    <React.Fragment>
        <Layout>
          <Row>
            <Col className="pt-5 mt-5 ml-3 text-left"> 
              <h1>About Us</h1>
            </Col>
          </Row>

        <Row className="pb-5 mt-3 mr-0 ml-0 text-justify about">
            <Col className="d-flex justify-content-center"sm={12} md={12} lg={4}>
            <img src={logo} alt="Intelliigest Logo"  className="img-fluid rounded fix-image"/>

            </Col>
            <Col  className=" d-block justify-content-center" sm={12} md={12} lg={8}>
            <h1>IntelliDigest</h1>
            <p>Drawing on cutting edge research, training and consulting, our mission at IntelliDigest is to develop new, sustainable technologies, 
              and create innovative solutions to address the sustainability challenges faced by food producers and governments globally.</p>
            <p>Eliminating edible food waste and repurposing inedible waste to climate friendly chemicals is at the core of everything we do. We believe that reducing 
              food waste at food production, retail, and household level can provide numerous benefits for both the planet and our communities.</p>
            <p>Through our research and consulting facilities, IntelliDigest is continuously working on helping governments and the public 
              understand the true scale of the food waste issue and the consequences of inadequate food waste handling. Advocating for increased awareness 
              about measuring food waste inspired our iTracker system, designed to allow households to monitor their efforts and save money through reducing food waste.</p>
            </Col>
        </Row>
        <Row className="pb-5 mr-0 ml-0 text-justify about">
            <Col className="d-block justify-content-center"sm={12} md={12} lg={8}>
            <h1>iTracker</h1>
            <p>The biggest threat faced by our planet today is derived from the way that we produce and consumer food. Every year 1.3billion tonnes of 
              food is wasted resulting in 3.3 Gtonnes of carbon dioxide entering the atmosphere. Alarmingly, 70% of food wastage across the 
              world comes from household waste.</p>
            <p>IntelliDigest have used innovative research and technology to tackle the problem of household waste by developing the iTracker. 
              iTracker is an easy-to-use online platform whereby signing up allows 
              households to connect their smart bin to the platform. iTracker then observes how much food is wasted each day, week and month from a single household.</p>
            </Col>
            <Col  className=" d-flex justify-content-center" sm={12} md={12} lg={4}>
            <img src={placeholder} alt="Placeholder"  className="img-fluid rounded fix-image"/>

            </Col>
        </Row>
        <Row className="pb-5 mb-5 mr-0 ml-0 text-justify about">
            <Col className="d-flex justify-content-center"sm={12} md={12} lg={4}>
            <img src={benefits} alt="Help"  className="img-fluid rounded fix-image"/>
            </Col>
            <Col  className=" d-block justify-content-center" sm={12} md={12} lg={8}>
            <h1>User Benefits</h1>
            <p>IntelliDigest believes that you cannot manage what you cannot measure – iTracker is an innovative solution to support our fight against ending food 
              wastage. iTracker is able to track household food wastage and allows households to anonymously compare wastage with neighbours’ 
              other households through an online virtual map. 
              Eradicating food waste allows households to save money – currently over £800 billion is lost in the UK alone through food wastage.</p>
            <p>iTracker’s innovative technology allows waste managers to have a better-quality food wastage programme collection procedure. 
              Food wastage is a challenge by governments across the globe – iTracker allows government policy makers to gather anonymous data on food wastage 
              across the country. 
              This is significant to allow governments to develop a strong call to action on ending food waste. </p>
              <p>IntelliDigest believes iTracker will assist in meeting Sustainable Development Goal 12 by 2030 – creating responsible consumption and production. 
                By meeting this goal and ending food wastage, we can empower global food sustainability and create sustainable food impacts for future generations. </p>
            </Col>
        </Row>
        </Layout>
    </React.Fragment>
  );
}

export default About;
