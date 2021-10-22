import React, {useState} from 'react';
import '../../App.css';
import "./Pages.css"
import { Row, Col, Table, Dropdown, Button } from "react-bootstrap";
import { Layout } from "../Layout/Layout"
import logo from "../../images/intellidigest-logo.png";
import placeholder from "../../images/help2.jpg";
import benefits from "../../images/help.jpg";
import surplus from "../../images/surplus.jpeg";
import waste from "../../images/waste.jpeg";

import ediblefoodloss from "../../images/ediblefoodloss.jpeg"
import inediblefoodloss from "../../images/inediblefoodloss.jpeg"
import ediblefoodwaste from "../../images/edible-foodwaste.jpeg"
import inediblefoodwaste from "../../images/inedible-foodwaste.jpeg"
import moisture from "../../images/moist.jpeg"
import carbs from "../../images/carbs.jpg"
import protein from "../../images/protein.png"
import fibre from "../../images/fibre.jpeg"
import fat from "../../images/fat.jpeg"

import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

import { BrowserView, MobileView, isMobile, isBrowser } from 'react-device-detect';
import styled from "styled-components"

function About() {

  const [tableView, setTableView] = useState("");

  return (
    <div>
      <BrowserView>
        <React.Fragment>
            <Layout>
              <Row>
                <Col className="pt-5 mt-5 ml-3 text-left"> 
                  <h1>About Us</h1>
                </Col>
              </Row>

            <Row className="pb-5 mt-3 mr-0 ml-0 text-justify about">
                <Col className="d-flex justify-content-center"sm={12} md={12} lg={4}>
                <img src={logo} alt="IntelliDigest Logo"  className="img-fluid rounded fix-image"/>

                </Col>
                <Col  className=" d-block justify-content-center" sm={12} md={12} lg={8}>
                <h1>IntelliDigest</h1>
                <p>Drawing on cutting edge research, training and consulting, our mission at IntelliDigest is to develop new, sustainable technologies, 
                  and create innovative solutions to address the sustainability challenges faced by food producers and governments globally.</p>
                <p>Eliminating edible food waste and repurposing inedible waste to climate friendly chemicals is at the core of everything we do. We believe that reducing 
                  food waste at food production, retail, and household level can provide numerous benefits for both the planet and our communities.</p>
                <p>Through our research and consulting facilities, IntelliDigest is continuously working on helping governments and the public 
                  understand the true scale of the food waste issue and the consequences of inadequate food waste handling. Advocating for increased awareness 
                  about measuring food waste inspired our Global Food Loss & Waste Tracker system, designed to allow households to monitor their efforts and save money through reducing food waste.</p>
                </Col>
            </Row>
            <Row className="pb-5 mr-0 ml-0 text-justify about">
                <Col className="d-block justify-content-center"sm={12} md={12} lg={8}>
                <h1>The Global Food Loss & Waste Tracker</h1>
                <p>The biggest threat faced by our planet today is derived from the way that we produce and consume food. Every year 1.3billion tonnes of 
                  food is wasted resulting in 3.3 Gtonnes of carbon dioxide entering the atmosphere. Alarmingly, 70% of food wastage across the 
                  world comes from household waste.</p>
                <p>IntelliDigest have used innovative research and technology to tackle the problem of household waste by developing the Global Food Loss & Waste Tracker. 
                Global Food Loss & Waste Tracker is an easy-to-use online platform whereby signing up allows 
                  households to connect their smart bin to the platform. The Global Food Loss & Waste Tracker then observes how much food is wasted each day, week and month from a single household and presents it as food surplus and food waste.
                  <a href="https://play.google.com/store/apps/details?id=com.IntelliDigest.TheGlobalFoodLossandWasteTracker" target="_blank" rel="noopener noreferrer"> Click here </a>to view/download the Global Food Loss & Waste Tracker Android app from the Google Play Store.</p>
                </Col>
                <Col  className=" d-flex justify-content-center" sm={12} md={12} lg={4}>
                <img src={placeholder} alt="Placeholder"  className="img-fluid rounded fix-image"/>

                </Col>
            </Row>
            <Row className="pb-5 mb-5 mr-0 ml-0 text-justify about">
                <Col className="d-flex justify-content-center"sm={12} md={12} lg={4}>
                <img src={surplus} alt="Help"  className="img-fluid rounded fix-image"/>
                </Col>
                <Col  className=" d-block justify-content-center" sm={12} md={12} lg={8}>
                <h1>Food Loss</h1>
                <p>Food loss is the decrease in quantity or quality of food resulting from decisions and actions by food suppliers in the chain, excluding retailers, food service providers and consumers. Empirically, it
                  refers to any food that is discarded, incinerated or otherwise disposed of along the food supply chain from harvest/slaughter/catch up to, but excluding, the retail level, and does not re-enter in any
                  other productive utilization, such as feed or seed. Food loss, as reported by FAO in the Food Loss Index occurs from post-harvest upto, but not including, the retail level.</p>
                </Col>
            </Row>

            <Row className="pb-5 mr-0 ml-0 text-justify about">
              <Col className="d-block justify-content-center"sm={12} md={12} lg={8}>
                <h1>Edible Food Loss</h1>
                <p>Edible food loss is any food grown and harvested for human consumption however, due to poor defects during harvest
                  processing and storage pre-farm gate they are no longer fit for human consumption. An example will be a mango eaten
                  by an insect while on the tree or a diseased apple
                </p>
              </Col>
              <Col  className=" d-flex justify-content-center" sm={12} md={12} lg={4}>
                <img src={ediblefoodloss} alt="ediblefoodloss"  className="img-fluid rounded fix-image"/>

                </Col>
            </Row>

            <Row className="pb-5 mr-0 ml-0 text-justify about">
              <Col className="d-flex justify-content-center"sm={12} md={12} lg={4}>
                <img src={inediblefoodloss} alt="inediblefoodloss"  className="img-fluid rounded fix-image"/>

              </Col>
              <Col className="d-block justify-content-center"sm={12} md={12} lg={8}>
                <h1>Inedible Food Loss</h1>
                <p>These are the part of the plant which was never meant to be consumed by human and are not suitable for use in the
                  next planting season. These parts of the Agrifood production will include the leaves, stem and root of plant after
                  harvesting
                </p>
              </Col>
            </Row>

            <Row className="pb-5 mr-0 ml-0 text-justify about">
                <Col className="d-block justify-content-center"sm={12} md={12} lg={8}>
                <h1>Food Waste</h1>
                <p>Food waste refers to the decrease in the quantity or quality of food resulting from decisions and actions by retailers, food service providers and consumers. Food is wasted in many ways:-</p>
                <li>Fresh produce that deviates from what is considered optimal, for example in terms of shape, size and colour, is often removed from the supply chain during sorting operations</li>
                <li>Foods that are close to, at, or beyond the 'best-before' date are often discarded by retailers and consumers</li>
                <li>Large quantities of wholesome edible food are often unused or left over and discarded from household kitchens and eating establishments</li>
                <p>Less food loss and waste would lead to more efficient land use and better water resource management with positive impacts on climate change and livelihoods</p>
                </Col>
                <Col  className=" d-flex justify-content-center" sm={12} md={12} lg={4}>
                <img src={waste} alt="Placeholder"  className="img-fluid rounded fix-image"/>

                </Col>
            </Row>

            <Row className="pb-5 mr-0 ml-0 text-justify about">
              <Col className="d-flex justify-content-center"sm={12} md={12} lg={4}>
                <img src={ediblefoodwaste} alt="ediblefoodwaste"  className="img-fluid rounded fix-image"/>

              </Col>
              <Col className="d-block justify-content-center"sm={12} md={12} lg={8}>
                <h1>Edible Food Waste</h1>
                <p>Edible food waste is any food grown and harvested for human consumption which has been successfully harvested, processed,
                  stored then moved out of the farm to be made available to food manufacturers, retailers and end users for consumption.
                  However, if the food is not consumed due to manufacturing error or the food deteriorating such that it has become unsafe
                  for human health, it will be trashed leading to edible food waste. Examples of edible food waste will include expired
                  yoghurt, left over buffet, moldy baked bread/cake, spoilt tomatoes etc.
                </p>
              </Col>
            </Row>

            <Row className="pb-5 mr-0 ml-0 text-justify about">
              <Col className="d-block justify-content-center"sm={12} md={12} lg={8}>
                <h1>Inedible Food Waste</h1>
                <p>These are parts of food that has left the farm gate but were never intended for human consumption. The classification
                  of inedible food waste could vary widely depending on the parts of the food that people have grown up to consume. There
                  has been a wider awareness on sustainable gastronomy which aim to provide a more in depth knowledge on how we can maximise
                  the use of the different components of our food to improve healthier diets while reducing waste. Inedible food waste include
                  pineapple peels, Watermelon rind, Melon core, bones etc. If these inedible food waste are used in feeding animal or put back
                  in the food system in any form, then they are no longer classified as waste.
                </p>
              </Col>
              <Col className="d-flex justify-content-center"sm={12} md={12} lg={4}>
                <img src={inediblefoodwaste} alt="inediblefoodwaste"  className="img-fluid rounded fix-image"/>

              </Col>
            </Row>

            <Row className="pb-5 mb-5 mr-0 ml-0 text-justify about">
                <Col className="d-flex justify-content-center"sm={12} md={12} lg={4}>
                <img src={benefits} alt="Help"  className="img-fluid rounded fix-image"/>
                </Col>
                <Col  className=" d-block justify-content-center" sm={12} md={12} lg={8}>
                <h1>User Benefits</h1>
                <p>You cannot manage what you cannot measure – The Global Food Loss & Waste Tracker is an innovative solution to support our fight to end food 
                  wastage. The Global Food Loss & Waste Tracker is able to track household food wastage and allows households to anonymously compare wastage with neighbours’ 
                  households through an online virtual map. 
                  Eradicating food waste allows households to save money – currently over £800 billion is lost in the UK alone through food wastage.</p>
                <p>The Global Food Loss & Waste Tracker’s innovative technology allows waste managers to have a better-quality food wastage programme collection procedure. 
                  Food wastage is a challenge by governments across the globe – The Global Food Loss & Waste Tracker allows government policy makers to gather anonymous data on food wastage 
                  across the country. 
                  This is significant to allow governments to develop a strong call to action on ending food waste. </p>
                  <p>IntelliDigest believes The Global Food Loss & Waste Tracker will assist in meeting Sustainable Development Goal 12 by 2030 – creating responsible consumption and production. 
                    By meeting this goal and ending food wastage, we can empower global food sustainability and create sustainable food impacts for future generations. </p>
                </Col>
            </Row>

            <Row className="pb-5 mb-5 mr-0 ml-0 text-justify about">
                <Col>
                  <h1>Moisture Content</h1>
                  <p>This is the percentage of moisture in the food waste, usually, mixed food waste contain 70-90% moisture content. However, this may vary depending on where the food waste occur. Food waste containing a lot of peel, rind and bones will have a very low moisture content of 0-10% while a sandwich will have less than 5%, etc.</p>
                </Col>
                <Col className="d-flex justify-content-center"sm={12} md={12} lg={4}>
                <img src={moisture} alt="moisture"  className="img-fluid rounded fix-image"/>

                </Col>
            </Row>

            <Row className="pb-5 mb-5 mr-0 ml-0 text-justify about">
              <Col className="d-flex justify-content-center"sm={12} md={12} lg={4}>
                <img src={carbs} alt="carbs"  className="img-fluid rounded fix-image"/>

              </Col>
                <Col>
                  <h1>Macronutrients</h1>
                  <p>Food is made up of these key macronutrients: carbohydrates, proteins, fibre and fats</p>
                  <h5>What are Carbohydrates?</h5>
                  <p>Carbohydrates are found in a wide array of both healthy and unhealthy foods—bread, beans, milk, popcorn, potatoes, cookies, spaghetti, soft drinks, corn, and cherry pie. They also come in a variety of forms. The most common and abundant forms are sugars, fibers, and starches.
    Foods high in carbohydrates are an important part of a healthy diet. Carbohydrates provide the body with glucose, which is converted to energy used to support bodily functions and physical activity. But carbohydrate quality is important; some types of carbohydrate-rich foods are better than others:
    The healthiest sources of carbohydrates—unprocessed or minimally processed whole grains, vegetables, fruits and beans—promote good health by delivering vitamins, minerals, fiber, and a host of important phytonutrients.
    Unhealthier sources of carbohydrates include white bread, pastries, sodas, and other highly processed or refined foods.  These items contain easily digested carbohydrates that may contribute to weight gain, interfere with weight loss, and promote diabetes and heart disease.
    The Healthy Eating Plate recommends filling most of your plate with healthy carbohydrates – with vegetables (except potatoes) and fruits taking up about half of your plate, and whole grains filling up about one fourth of your plate. </p>
                </Col>
            </Row>

            <Row className="pb-5 mb-5 mr-0 ml-0 text-justify about">
                <Col>
                  <h5>What are Proteins?</h5>
                  <p>Proteins are the building blocks of life. Every cell in the human body contains protein. The basic structure of protein is a chain of amino acids.
    We need protein in your diet to help your body repair cells and make new ones. Protein is also important for growth and development in children, teens, and pregnant women.
    Protein foods are broken down into parts called amino acids during digestion. The human body needs a number of amino acids in large enough amounts to maintain good health.
    Proteins are found in animal sources such as meats, milk, fish, and eggs. They are also found in plant sources such as soy, beans, legumes, nut butters, and some grains (such as wheat germ and quinoa). The right combination of plant and animal protein helps to balance biodiversity, enhance regenerative agriculture and improve our health.     </p>
                </Col>
                <Col className="d-flex justify-content-center"sm={12} md={12} lg={4}>
                <img src={protein} alt="protein"  className="img-fluid rounded fix-image"/>

                </Col>
            </Row>

            <Row className="pb-5 mb-5 mr-0 ml-0 text-justify about">
              <Col className="d-flex justify-content-center"sm={12} md={12} lg={4}>
                <img src={fibre} alt="fibre"  className="img-fluid rounded fix-image"/>

              </Col>
                <Col>
                  <h5>What are Fibres?</h5>
                  <p>Fiber is a type of carbohydrate that the body can’t digest. Though most carbohydrates are broken down into sugar molecules, fiber cannot be broken down into sugar molecules, and instead it passes through the body undigested. Fiber helps regulate the body’s use of sugars, helping to keep hunger and blood sugar in check.
    Children and adults need at least 20 to 30 grams of fiber per day for good health, but most Americans get only about 15 grams a day. Great sources are whole fruits and vegetables, whole grains, and beans.
    Fiber comes in two varieties, both beneficial to health:
    Soluble fiber, which dissolves in water, can help lower glucose levels as well as help lower blood cholesterol. Foods with soluble fiber include oatmeal, nuts, beans, lentils, apples and blueberries.
    Insoluble fiber, which does not dissolve in water, can help food move through your digestive system, promoting regularity and helping prevent constipation. Foods with insoluble fibers include wheat, whole wheat bread, whole grain couscous, brown rice, legumes, carrots, cucumbers and tomatoes.
    The best sources of fiber are whole grains, fresh fruits and vegetables, legumes, and nuts.</p>
                </Col>
            </Row>

            <Row className="pb-5 mb-5 mr-0 ml-0 text-justify about">
                <Col>
                  <h5>What are Fats?</h5>
                  <p>Rather than adopting a low-fat diet, it’s more important to focus on eating beneficial “good” fats and avoiding harmful “bad” fats. Fat is an important part of a healthy diet. Choose foods with “good” unsaturated fats, limit foods high in saturated fat, and avoid “bad” trans fat.
    “Good” unsaturated fats — Monounsaturated and polyunsaturated fats — lower disease risk. Foods high in good fats include vegetable oils (such as olive, canola, sunflower, soy, and corn), nuts, seeds, and fish.
    “Bad” fats — trans fats — increase disease risk, even when eaten in small quantities. Foods containing trans fats are primarily in processed foods made with trans fat from partially hydrogenated oil. Fortunately, trans fats have been eliminated from many of these foods.
    Saturated fats, while not as harmful as trans fats, by comparison with unsaturated fats negatively impact health and are best consumed in moderation. Foods containing large amounts of saturated fat include red meat, butter, cheese, and ice cream. Some plant-based fats like coconut oil and palm oil are also rich in saturated fat.
    When you cut back on foods like red meat and butter, replace them with fish, beans, nuts, and healthy oils instead of refined carbohydrates.</p>
                </Col>
                <Col className="d-flex justify-content-center"sm={12} md={12} lg={4}>
                <img src={fat} alt="fat"  className="img-fluid rounded fix-image"/>

                </Col>
            </Row>

            {/* <Row className="pb-5 mb-5 mr-0 ml-0 text-justify about">
                <Col className="d-flex justify-content-center"sm={12} md={12} lg={4}>

                </Col>
            </Row> */}

            <h3 style={{marginTop: "-5%", marginBottom: "2.5%"}}>Recommended Daily Nutrient Intake</h3>

            {/* 
              Conditional rendering/ternary operators used again here to alter the table upon clicking certian options from this dropdown menu.
              This example makes use of the 'useState' hook since this is a 'functional component' rather than a 'class component' (where you would make use of 'this.setState({ ... })' )
              More info/help on this: https://reactjs.org/docs/hooks-state.html
            */}

            <Dropdown>
              <DropdownToggle className="custom-btn" style={{marginBottom: "2.5%"}}>Select Age Group</DropdownToggle>
              <DropdownMenu>
                <DropdownItem><div onClick={(e) => setTableView(e.target.textContent)}>0-5</div></DropdownItem>
                <DropdownItem><div onClick={(e) => setTableView(e.target.textContent)}>5-10</div></DropdownItem>
                <DropdownItem><div onClick={(e) => setTableView(e.target.textContent)}>10-15</div></DropdownItem>
                <DropdownItem><div onClick={(e) => setTableView(e.target.textContent)}>15-20</div></DropdownItem>
                <DropdownItem><div onClick={(e) => setTableView(e.target.textContent)}>70-75</div></DropdownItem>
                <DropdownItem><div onClick={(e) => setTableView(e.target.textContent)}>75-80</div></DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <div>{ tableView === "0-5" ?

              <Table style={{width: "110%", marginBottom: "10%", marginLeft: "-5%"}} striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th><b>Age</b></th>
                    <th><b>Sex</b></th>
                    <th><b>Protein</b></th>
                    <th><b>Fluid</b></th>
                    <th><b>Fibre</b></th>
                    <th><b>Vitamin A</b></th>
                    <th><b>Thiamin</b></th>
                    <th><b>Riboflavin</b></th>
                    <th><b>Niacin</b></th>
                    <th><b>Vitamin B6</b></th>
                    <th><b>Vitamin B12</b></th>
                    <th><b>Folate</b></th>
                    <th><b>Vitamin</b></th>
                    <th><b>Calcium</b></th>
                    <th><b>Iodine</b></th>
                    <th><b>Iron</b></th>
                    <th><b>Magnesium</b></th>
                    <th><b>Potassium</b></th>
                    <th><b>Sodium</b></th>
                    <th><b>Zinc</b></th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <th>0-5</th>
                    <th>F</th>
                    <th>20g</th>
                    <th>1.2L</th>
                    <th>18g</th>
                    <th>400Î¼g</th>
                    <th>0.6mg</th>
                    <th>0.6mg</th>
                    <th>8mg</th>
                    <th>0.6mg</th>
                    <th>1.2Î¼g</th>
                    <th>200Î¼g</th>
                    <th>35mg</th>
                    <th>700mg</th>
                    <th>90Î¼g</th>
                    <th>10mg</th>
                    <th>130mg</th>
                    <th>2300mg</th>
                    <th>300-600mg</th>
                    <th>4mg</th>
                  </tr>

                  <tr>
                    <th>0-5</th>
                    <th>M</th>
                    <th>20g</th>
                    <th>1.2L</th>
                    <th>18g</th>
                    <th>400Î¼g</th>
                    <th>0.6mg</th>
                    <th>0.6mg</th>
                    <th>8mg</th>
                    <th>0.6mg</th>
                    <th>1.2Î¼g</th>
                    <th>200Î¼g</th>
                    <th>35mg</th>
                    <th>700mg</th>
                    <th>90Î¼g</th>
                    <th>10mg</th>
                    <th>130mg</th>
                    <th>2300mg</th>
                    <th>300-600mg</th>
                    <th>4mg</th>
                  </tr>
                </tbody>

              </Table>

              :

              <>
                <div>{ tableView === "5-10" ?

                  <Table style={{width: "110%", marginBottom: "10%", marginLeft: "-5%"}} striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th><b>Age</b></th>
                      <th><b>Sex</b></th>
                      <th><b>Protein</b></th>
                      <th><b>Fluid</b></th>
                      <th><b>Fibre</b></th>
                      <th><b>Vitamin A</b></th>
                      <th><b>Thiamin</b></th>
                      <th><b>Riboflavin</b></th>
                      <th><b>Niacin</b></th>
                      <th><b>Vitamin B6</b></th>
                      <th><b>Vitamin B12</b></th>
                      <th><b>Folate</b></th>
                      <th><b>Vitamin</b></th>
                      <th><b>Calcium</b></th>
                      <th><b>Iodine</b></th>
                      <th><b>Iron</b></th>
                      <th><b>Magnesium</b></th>
                      <th><b>Potassium</b></th>
                      <th><b>Sodium</b></th>
                      <th><b>Zinc</b></th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <th>5-10</th>
                      <th>F</th>
                      <th>35g</th>
                      <th>1.4L</th>
                      <th>20g</th>
                      <th>600Î¼g</th>
                      <th>0.9mg</th>
                      <th>0.9mg</th>
                      <th>12mg</th>
                      <th>1mg</th>
                      <th>1.8Î¼g</th>
                      <th>300Î¼g</th>
                      <th>40mg</th>
                      <th>1000mg</th>
                      <th>120Î¼g</th>
                      <th>8mg</th>
                      <th>240mg</th>
                      <th>2500mg</th>
                      <th>400-800mg</th>
                      <th>6mg</th>
                    </tr>

                    <tr>
                      <th>5-10</th>
                      <th>M</th>
                      <th>40g</th>
                      <th>1.6L</th>
                      <th>24g</th>
                      <th>600Î¼g</th>
                      <th>0.9mg</th>
                      <th>0.9mg</th>
                      <th>12mg</th>
                      <th>1mg</th>
                      <th>1.8Î¼g</th>
                      <th>300Î¼g</th>
                      <th>40mg</th>
                      <th>1000mg</th>
                      <th>120Î¼g</th>
                      <th>8mg</th>
                      <th>240mg</th>
                      <th>3000mg</th>
                      <th>400-800mg</th>
                      <th>6mg</th>
                    </tr>
                  </tbody>

                  </Table>

                  :

                  <>
                    <div>{ tableView === "10-15" ?
                      <Table style={{width: "110%", marginBottom: "10%", marginLeft: "-5%"}} striped bordered hover size="sm">
                        <thead>
                          <tr>
                            <th><b>Age</b></th>
                            <th><b>Sex</b></th>
                            <th><b>Protein</b></th>
                            <th><b>Fluid</b></th>
                            <th><b>Fibre</b></th>
                            <th><b>Vitamin A</b></th>
                            <th><b>Thiamin</b></th>
                            <th><b>Riboflavin</b></th>
                            <th><b>Niacin</b></th>
                            <th><b>Vitamin B6</b></th>
                            <th><b>Vitamin B12</b></th>
                            <th><b>Folate</b></th>
                            <th><b>Vitamin</b></th>
                            <th><b>Calcium</b></th>
                            <th><b>Iodine</b></th>
                            <th><b>Iron</b></th>
                            <th><b>Magnesium</b></th>
                            <th><b>Potassium</b></th>
                            <th><b>Sodium</b></th>
                            <th><b>Zinc</b></th>
                          </tr>
                        </thead>
      
                        <tbody>
                          <tr>
                            <th>10-15</th>
                            <th>F</th>
                            <th>45g</th>
                            <th>1.6L</th>
                            <th>22g</th>
                            <th>700Î¼g</th>
                            <th>1.1mg</th>
                            <th>1.1mg</th>
                            <th>14mg</th>
                            <th>1.2mg</th>
                            <th>2.4Î¼g</th>
                            <th>400Î¼g</th>
                            <th>40mg</th>
                            <th>1300mg</th>
                            <th>150Î¼g</th>
                            <th>15mg</th>
                            <th>360mg</th>
                            <th>2600mg</th>
                            <th>460-920mg</th>
                            <th>7mg</th>
                          </tr>

                          <tr>
                            <th>10-15</th>
                            <th>M</th>
                            <th>65g</th>
                            <th>1.9L</th>
                            <th>28g</th>
                            <th>900Î¼g</th>
                            <th>1.2mg</th>
                            <th>1.3mg</th>
                            <th>16mg</th>
                            <th>1.3mg</th>
                            <th>2.4Î¼g</th>
                            <th>400Î¼g</th>
                            <th>40mg</th>
                            <th>1300mg</th>
                            <th>150Î¼g</th>
                            <th>11mg</th>
                            <th>410mg</th>
                            <th>3600mg</th>
                            <th>460-920mg</th>
                            <th>13mg</th>
                          </tr>
                        </tbody>
    
                      </Table>

                      :

                      <>
                        <div>{ tableView === "15-20" ?
                          <Table style={{width: "110%", marginBottom: "10%", marginLeft: "-5%"}} striped bordered hover size="sm">
                            <thead>
                              <tr>
                                <th><b>Age</b></th>
                                <th><b>Sex</b></th>
                                <th><b>Protein</b></th>
                                <th><b>Fluid</b></th>
                                <th><b>Fibre</b></th>
                                <th><b>Vitamin A</b></th>
                                <th><b>Thiamin</b></th>
                                <th><b>Riboflavin</b></th>
                                <th><b>Niacin</b></th>
                                <th><b>Vitamin B6</b></th>
                                <th><b>Vitamin B12</b></th>
                                <th><b>Folate</b></th>
                                <th><b>Vitamin</b></th>
                                <th><b>Calcium</b></th>
                                <th><b>Iodine</b></th>
                                <th><b>Iron</b></th>
                                <th><b>Magnesium</b></th>
                                <th><b>Potassium</b></th>
                                <th><b>Sodium</b></th>
                                <th><b>Zinc</b></th>
                              </tr>
                            </thead>

                            <tbody>
                              <tr>
                                <th>15-20</th>
                                <th>F</th>
                                <th>46g</th>
                                <th>2.1L</th>
                                <th>25g</th>
                                <th>700Î¼g</th>
                                <th>1.1mg</th>
                                <th>1.1mg</th>
                                <th>14mg</th>
                                <th>1.3mg</th>
                                <th>2.4Î¼g</th>
                                <th>400Î¼g</th>
                                <th>45mg</th>
                                <th>1000mg</th>
                                <th>150Î¼g</th>
                                <th>18mg</th>
                                <th>310mg</th>
                                <th>2800mg</th>
                                <th>460-920mg</th>
                                <th>8mg</th>
                              </tr>

                              <tr>
                                <th>15-20</th>
                                <th>M</th>
                                <th>64g</th>
                                <th>2.3L</th>
                                <th>30g</th>
                                <th>900Î¼g</th>
                                <th>1.2mg</th>
                                <th>1.3mg</th>
                                <th>16mg</th>
                                <th>1.3mg</th>
                                <th>2.4Î¼g</th>
                                <th>400Î¼g</th>
                                <th>45mg</th>
                                <th>1000mg</th>
                                <th>150Î¼g</th>
                                <th>8mg</th>
                                <th>400mg</th>
                                <th>3800mg</th>
                                <th>460-920mg</th>
                                <th>14mg</th>
                              </tr>
                            </tbody>

                        </Table>

                        :

                        <>
                          <div>{ tableView === "70-75" ?
                            <Table style={{width: "110%", marginBottom: "10%", marginLeft: "-5%"}} striped bordered hover size="sm">
                              <thead>
                                <tr>
                                  <th><b>Age</b></th>
                                  <th><b>Sex</b></th>
                                  <th><b>Protein</b></th>
                                  <th><b>Fluid</b></th>
                                  <th><b>Fibre</b></th>
                                  <th><b>Vitamin A</b></th>
                                  <th><b>Thiamin</b></th>
                                  <th><b>Riboflavin</b></th>
                                  <th><b>Niacin</b></th>
                                  <th><b>Vitamin B6</b></th>
                                  <th><b>Vitamin B12</b></th>
                                  <th><b>Folate</b></th>
                                  <th><b>Vitamin</b></th>
                                  <th><b>Calcium</b></th>
                                  <th><b>Iodine</b></th>
                                  <th><b>Iron</b></th>
                                  <th><b>Magnesium</b></th>
                                  <th><b>Potassium</b></th>
                                  <th><b>Sodium</b></th>
                                  <th><b>Zinc</b></th>
                                </tr>
                              </thead>

                              <tbody>
                                <tr>
                                  <th>70-75</th>
                                  <th>F</th>
                                  <th>57g</th>
                                  <th>2.1L</th>
                                  <th>25g</th>
                                  <th>700Î¼g</th>
                                  <th>1.1mg</th>
                                  <th>1.3mg</th>
                                  <th>14mg</th>
                                  <th>1.5mg</th>
                                  <th>2.4Î¼g</th>
                                  <th>400Î¼g</th>
                                  <th>45mg</th>
                                  <th>1300mg</th>
                                  <th>150Î¼g</th>
                                  <th>8mg</th>
                                  <th>320mg</th>
                                  <th>2800mg</th>
                                  <th>460-920mg</th>
                                  <th>8mg</th>
                                </tr>

                                <tr>
                                  <th>70-75</th>
                                  <th>M</th>
                                  <th>81g</th>
                                  <th>2.6L</th>
                                  <th>30g</th>
                                  <th>900Î¼g</th>
                                  <th>1.2mg</th>
                                  <th>1.6mg</th>
                                  <th>16mg</th>
                                  <th>1.7mg</th>
                                  <th>2.4Î¼g</th>
                                  <th>400Î¼g</th>
                                  <th>45mg</th>
                                  <th>1300mg</th>
                                  <th>150Î¼g</th>
                                  <th>8mg</th>
                                  <th>420mg</th>
                                  <th>3800mg</th>
                                  <th>460-920mg</th>
                                  <th>14mg</th>
                                </tr>
                              </tbody>

                            </Table>
                            
                            :

                            <>
                              <div>{ tableView === "75-80" ?
                                <Table style={{width: "110%", marginBottom: "10%", marginLeft: "-5%"}} striped bordered hover size="sm">
                                <thead>
                                  <tr>
                                    <th><b>Age</b></th>
                                    <th><b>Sex</b></th>
                                    <th><b>Protein</b></th>
                                    <th><b>Fluid</b></th>
                                    <th><b>Fibre</b></th>
                                    <th><b>Vitamin A</b></th>
                                    <th><b>Thiamin</b></th>
                                    <th><b>Riboflavin</b></th>
                                    <th><b>Niacin</b></th>
                                    <th><b>Vitamin B6</b></th>
                                    <th><b>Vitamin B12</b></th>
                                    <th><b>Folate</b></th>
                                    <th><b>Vitamin</b></th>
                                    <th><b>Calcium</b></th>
                                    <th><b>Iodine</b></th>
                                    <th><b>Iron</b></th>
                                    <th><b>Magnesium</b></th>
                                    <th><b>Potassium</b></th>
                                    <th><b>Sodium</b></th>
                                    <th><b>Zinc</b></th>
                                  </tr>
                                </thead>

                                <tbody>
                                  <tr>
                                    <th>75-80</th>
                                    <th>F</th>
                                    <th>57g</th>
                                    <th>2.1L</th>
                                    <th>25g</th>
                                    <th>700Î¼g</th>
                                    <th>1.1mg</th>
                                    <th>1.3mg</th>
                                    <th>14mg</th>
                                    <th>1.5mg</th>
                                    <th>2.4Î¼g</th>
                                    <th>400Î¼g</th>
                                    <th>45mg</th>
                                    <th>1300mg</th>
                                    <th>150Î¼g</th>
                                    <th>8mg</th>
                                    <th>320mg</th>
                                    <th>2800mg</th>
                                    <th>460-920mg</th>
                                    <th>8mg</th>
                                  </tr>

                                  <tr>
                                    <th>75-80</th>
                                    <th>M</th>
                                    <th>81g</th>
                                    <th>2.6L</th>
                                    <th>30g</th>
                                    <th>900Î¼g</th>
                                    <th>1.2mg</th>
                                    <th>1.6mg</th>
                                    <th>16mg</th>
                                    <th>1.7mg</th>
                                    <th>2.4Î¼g</th>
                                    <th>400Î¼g</th>
                                    <th>45mg</th>
                                    <th>1300mg</th>
                                    <th>150Î¼g</th>
                                    <th>8mg</th>
                                    <th>420mg</th>
                                    <th>3800mg</th>
                                    <th>460-920mg</th>
                                    <th>14mg</th>
                                  </tr>
                                </tbody>

                              </Table>
                          
                          :

                          <>
                            <div>{ tableView === ""  ?
                              <Table style={{width: "110%", marginBottom: "10%", marginLeft: "-5%"}} striped bordered hover size="sm">
                                <thead>
                                  <tr>
                                    <th><b>Age</b></th>
                                    <th><b>Sex</b></th>
                                    <th><b>Protein</b></th>
                                    <th><b>Fluid</b></th>
                                    <th><b>Fibre</b></th>
                                    <th><b>Vitamin A</b></th>
                                    <th><b>Thiamin</b></th>
                                    <th><b>Riboflavin</b></th>
                                    <th><b>Niacin</b></th>
                                    <th><b>Vitamin B6</b></th>
                                    <th><b>Vitamin B12</b></th>
                                    <th><b>Folate</b></th>
                                    <th><b>Vitamin</b></th>
                                    <th><b>Calcium</b></th>
                                    <th><b>Iodine</b></th>
                                    <th><b>Iron</b></th>
                                    <th><b>Magnesium</b></th>
                                    <th><b>Potassium</b></th>
                                    <th><b>Sodium</b></th>
                                    <th><b>Zinc</b></th>
                                  </tr>
                                </thead>

                                <tbody>
                                  <tr>
                                    <th>...</th>
                                    <th>...</th>
                                    <th>...</th>
                                    <th>...</th>
                                    <th>...</th>
                                    <th>...</th>
                                    <th>...</th>
                                    <th>...</th>
                                    <th>...</th>
                                    <th>...</th>
                                    <th>...</th>
                                    <th>...</th>
                                    <th>...</th>
                                    <th>...</th>
                                    <th>...</th>
                                    <th>...</th>
                                    <th>...</th>
                                    <th>...</th>
                                    <th>...</th>
                                    <th>...</th>
                                  </tr>

                                </tbody>

                            </Table>

                            :

                            <></>

                          }</div>
                          </>

                            }</div>
                            </>
                        }</div>
                        </>

                      }</div>
                      </>

                  }</div>

                  </>

                 }</div>

              </>

            }</div>

            {/* <div style={{marginBottom: "10%", marginLeft: "-5%", marginRight: "-7.5%"}}>
              <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th><b>Age</b></th>
                        <th><b>Sex</b></th>
                        <th><b>Protein</b></th>
                        <th><b>Fluid</b></th>
                        <th><b>Fibre</b></th>
                        <th><b>Vitamin A</b></th>
                        <th><b>Thiamin</b></th>
                        <th><b>Riboflavin</b></th>
                        <th><b>Niacin</b></th>
                        <th><b>Vitamin B6</b></th>
                        <th><b>Vitamin B12</b></th>
                        <th><b>Folate</b></th>
                        <th><b>Vitamin</b></th>
                        <th><b>Calcium</b></th>
                        <th><b>Iodine</b></th>
                        <th><b>Iron</b></th>
                        <th><b>Magnesium</b></th>
                        <th><b>Potassium</b></th>
                        <th><b>Sodium</b></th>
                        <th><b>Zinc</b></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                      <th>0-5</th>
                      <th>F</th>
                      <th>20g</th>
                      <th>1.2L</th>
                      <th>18g</th>
                      <th>400Î¼g</th>
                      <th>0.6mg</th>
                      <th>0.6mg</th>
                      <th>8mg</th>
                      <th>0.6mg</th>
                      <th>1.2Î¼g</th>
                      <th>200Î¼g</th>
                      <th>35mg</th>
                      <th>700mg</th>
                      <th>90Î¼g</th>
                      <th>10mg</th>
                      <th>130mg</th>
                      <th>2300mg</th>
                      <th>300-600mg</th>
                      <th>4mg</th>
                    </tr>

                    <tr>
                      <th>0-5</th>
                      <th>M</th>
                      <th>20g</th>
                      <th>1.2L</th>
                      <th>18g</th>
                      <th>400Î¼g</th>
                      <th>0.6mg</th>
                      <th>0.6mg</th>
                      <th>8mg</th>
                      <th>0.6mg</th>
                      <th>1.2Î¼g</th>
                      <th>200Î¼g</th>
                      <th>35mg</th>
                      <th>700mg</th>
                      <th>90Î¼g</th>
                      <th>10mg</th>
                      <th>130mg</th>
                      <th>2300mg</th>
                      <th>300-600mg</th>
                      <th>4mg</th>
                    </tr>

                    <tr>
                      <th>5-10</th>
                      <th>F</th>
                      <th>35g</th>
                      <th>1.4L</th>
                      <th>20g</th>
                      <th>600Î¼g</th>
                      <th>0.9mg</th>
                      <th>0.9mg</th>
                      <th>12mg</th>
                      <th>1mg</th>
                      <th>1.8Î¼g</th>
                      <th>300Î¼g</th>
                      <th>40mg</th>
                      <th>1000mg</th>
                      <th>120Î¼g</th>
                      <th>8mg</th>
                      <th>240mg</th>
                      <th>2500mg</th>
                      <th>400-800mg</th>
                      <th>6mg</th>
                    </tr>

                    <tr>
                      <th>5-10</th>
                      <th>M</th>
                      <th>40g</th>
                      <th>1.6L</th>
                      <th>24g</th>
                      <th>600Î¼g</th>
                      <th>0.9mg</th>
                      <th>0.9mg</th>
                      <th>12mg</th>
                      <th>1mg</th>
                      <th>1.8Î¼g</th>
                      <th>300Î¼g</th>
                      <th>40mg</th>
                      <th>1000mg</th>
                      <th>120Î¼g</th>
                      <th>8mg</th>
                      <th>240mg</th>
                      <th>3000mg</th>
                      <th>400-800mg</th>
                      <th>6mg</th>
                    </tr>

                    <tr>
                      <th>10-15</th>
                      <th>F</th>
                      <th>45g</th>
                      <th>1.6L</th>
                      <th>22g</th>
                      <th>700Î¼g</th>
                      <th>1.1mg</th>
                      <th>1.1mg</th>
                      <th>14mg</th>
                      <th>1.2mg</th>
                      <th>2.4Î¼g</th>
                      <th>400Î¼g</th>
                      <th>40mg</th>
                      <th>1300mg</th>
                      <th>150Î¼g</th>
                      <th>15mg</th>
                      <th>360mg</th>
                      <th>2600mg</th>
                      <th>460-920mg</th>
                      <th>7mg</th>
                    </tr>

                    <tr>
                      <th>10-15</th>
                      <th>M</th>
                      <th>65g</th>
                      <th>1.9L</th>
                      <th>28g</th>
                      <th>900Î¼g</th>
                      <th>1.2mg</th>
                      <th>1.3mg</th>
                      <th>16mg</th>
                      <th>1.3mg</th>
                      <th>2.4Î¼g</th>
                      <th>400Î¼g</th>
                      <th>40mg</th>
                      <th>1300mg</th>
                      <th>150Î¼g</th>
                      <th>11mg</th>
                      <th>410mg</th>
                      <th>3600mg</th>
                      <th>460-920mg</th>
                      <th>13mg</th>
                    </tr>

                    <tr>
                      <th>15-20</th>
                      <th>F</th>
                      <th>46g</th>
                      <th>2.1L</th>
                      <th>25g</th>
                      <th>700Î¼g</th>
                      <th>1.1mg</th>
                      <th>1.1mg</th>
                      <th>14mg</th>
                      <th>1.3mg</th>
                      <th>2.4Î¼g</th>
                      <th>400Î¼g</th>
                      <th>45mg</th>
                      <th>1000mg</th>
                      <th>150Î¼g</th>
                      <th>18mg</th>
                      <th>310mg</th>
                      <th>2800mg</th>
                      <th>460-920mg</th>
                      <th>8mg</th>
                    </tr>

                    <tr>
                      <th>15-20</th>
                      <th>M</th>
                      <th>64g</th>
                      <th>2.3L</th>
                      <th>30g</th>
                      <th>900Î¼g</th>
                      <th>1.2mg</th>
                      <th>1.3mg</th>
                      <th>16mg</th>
                      <th>1.3mg</th>
                      <th>2.4Î¼g</th>
                      <th>400Î¼g</th>
                      <th>45mg</th>
                      <th>1000mg</th>
                      <th>150Î¼g</th>
                      <th>8mg</th>
                      <th>400mg</th>
                      <th>3800mg</th>
                      <th>460-920mg</th>
                      <th>14mg</th>
                    </tr>

                    <tr>
                      <th>70-75</th>
                      <th>F</th>
                      <th>57g</th>
                      <th>2.1L</th>
                      <th>25g</th>
                      <th>700Î¼g</th>
                      <th>1.1mg</th>
                      <th>1.3mg</th>
                      <th>14mg</th>
                      <th>1.5mg</th>
                      <th>2.4Î¼g</th>
                      <th>400Î¼g</th>
                      <th>45mg</th>
                      <th>1300mg</th>
                      <th>150Î¼g</th>
                      <th>8mg</th>
                      <th>320mg</th>
                      <th>2800mg</th>
                      <th>460-920mg</th>
                      <th>8mg</th>
                    </tr>

                    <tr>
                      <th>70-75</th>
                      <th>M</th>
                      <th>81g</th>
                      <th>2.6L</th>
                      <th>30g</th>
                      <th>900Î¼g</th>
                      <th>1.2mg</th>
                      <th>1.6mg</th>
                      <th>16mg</th>
                      <th>1.7mg</th>
                      <th>2.4Î¼g</th>
                      <th>400Î¼g</th>
                      <th>45mg</th>
                      <th>1300mg</th>
                      <th>150Î¼g</th>
                      <th>8mg</th>
                      <th>420mg</th>
                      <th>3800mg</th>
                      <th>460-920mg</th>
                      <th>14mg</th>
                    </tr>

                    <tr>
                      <th>75-80</th>
                      <th>F</th>
                      <th>57g</th>
                      <th>2.1L</th>
                      <th>25g</th>
                      <th>700Î¼g</th>
                      <th>1.1mg</th>
                      <th>1.3mg</th>
                      <th>14mg</th>
                      <th>1.5mg</th>
                      <th>2.4Î¼g</th>
                      <th>400Î¼g</th>
                      <th>45mg</th>
                      <th>1300mg</th>
                      <th>150Î¼g</th>
                      <th>8mg</th>
                      <th>320mg</th>
                      <th>2800mg</th>
                      <th>460-920mg</th>
                      <th>8mg</th>
                    </tr>

                    <tr>
                      <th>75-80</th>
                      <th>M</th>
                      <th>81g</th>
                      <th>2.6L</th>
                      <th>30g</th>
                      <th>900Î¼g</th>
                      <th>1.2mg</th>
                      <th>1.6mg</th>
                      <th>16mg</th>
                      <th>1.7mg</th>
                      <th>2.4Î¼g</th>
                      <th>400Î¼g</th>
                      <th>45mg</th>
                      <th>1300mg</th>
                      <th>150Î¼g</th>
                      <th>8mg</th>
                      <th>420mg</th>
                      <th>3800mg</th>
                      <th>460-920mg</th>
                      <th>14mg</th>
                    </tr>
                </tbody>
              </Table>
            </div> */}

            </Layout>
        </React.Fragment>
        </BrowserView>

        <MobileView>
          <MobileDivStyle>

            <div className="para">
              <Col>
              <h1>About us</h1>
              <img src={logo} alt="IntelliDigest Logo" className="img-fluid rounded fix-image"/>
              <p>Drawing on cutting edge research, training and consulting, our mission at IntelliDigest is to develop new, sustainable technologies, 
                      and create innovative solutions to address the sustainability challenges faced by food producers and governments globally.</p>
                    <p>Eliminating edible food waste and repurposing inedible waste to climate friendly chemicals is at the core of everything we do. We believe that reducing 
                      food waste at food production, retail, and household level can provide numerous benefits for both the planet and our communities.</p>
                    <p>Through our research and consulting facilities, IntelliDigest is continuously working on helping governments and the public 
                      understand the true scale of the food waste issue and the consequences of inadequate food waste handling. Advocating for increased awareness 
                      about measuring food waste inspired our Global Food Loss & Waste Tracker system, designed to allow households to monitor their efforts and save money through reducing food waste.</p></Col>
            </div>

            <div className="para">
              <Col>
                <h1>The Global Food Loss & Waste Tracker</h1>
                <img src={placeholder} alt="Placeholder"  className="img-fluid rounded fix-image"/>
                <p>The biggest threat faced by our planet today is derived from the way that we produce and consume food. Every year 1.3billion tonnes of 
                  food is wasted resulting in 3.3 Gtonnes of carbon dioxide entering the atmosphere. Alarmingly, 70% of food wastage across the 
                  world comes from household waste.</p>
                <p>IntelliDigest have used innovative research and technology to tackle the problem of household waste by developing the Global Food Loss & Waste Tracker. 
                Global Food Loss & Waste Tracker is an easy-to-use online platform whereby signing up allows 
                  households to connect their smart bin to the platform. The Global Food Loss & Waste Tracker then observes how much food is wasted each day, week and month from a single household and presents it as food surplus and food waste.</p>
              </Col>
            </div>

            <div className="para">
              <Col>
                <h1>Food Loss</h1>
                <img src={surplus} alt="Help"  className="img-fluid rounded fix-image" width="100%"/>
                <p>Food loss is the decrease in quantity or quality of food resulting from decisions and actions by food suppliers in the chain, excluding retailers, food service providers and consumers. Empirically, it
                  refers to any food that is discarded, incinerated or otherwise disposed of along the food supply chain from harvest/slaughter/catch up to, but excluding, the retail level, and does not re-enter in any
                  other productive utilization, such as feed or seed. Food loss, as reported by FAO in the Food Loss Index occurs from post-harvest upto, but not including, the retail level.</p>
              

              <h4>Edible Food Loss</h4>
              <img src={ediblefoodloss} alt="ediblefoodloss"  className="img-fluid rounded fix-image"/>
              <p>Edible food loss is any food grown and harvested for human consumption however, due to poor defects during harvest
                  processing and storage pre-farm gate they are no longer fit for human consumption. An example will be a mango eaten
                  by an insect while on the tree or a diseased apple
                </p>

              <h4>Inedible Food Loss</h4>
              <img src={inediblefoodloss} alt="inediblefoodloss"  className="img-fluid rounded fix-image"/>
              <p>These are the part of the plant which was never meant to be consumed by human and are not suitable for use in the
                  next planting season. These parts of the Agrifood production will include the leaves, stem and root of plant after
                  harvesting
                </p>
              </Col>
            </div>

            <div className="para">
              <Col>
                <h1>Food Waste</h1>
                <img src={waste} alt="Placeholder"  className="img-fluid rounded fix-image" width="100%"/>
                <p>Food waste refers to the decrease in the quantity or quality of food resulting from decisions and actions by retailers, food service providers and consumers. Food is wasted in many ways:-</p>
                <li>Fresh produce that deviates from what is considered optimal, for example in terms of shape, size and colour, is often removed from the supply chain during sorting operations</li>
                <li>Foods that are close to, at, or beyond the 'best-before' date are often discarded by retailers and consumers</li>
                <li>Large quantities of wholesome edible food are often unused or left over and discarded from household kitchens and eating establishments</li>
                <p>Less food loss and waste would lead to more efficient land use and better water resource management with positive impacts on climate change and livelihoods</p>

                <h4>Edible Food Waste</h4>
                <img src={ediblefoodwaste} alt="ediblefoodwaste"  className="img-fluid rounded fix-image"/>
                <p>Edible food waste is any food grown and harvested for human consumption which has been successfully harvested, processed,
                  stored then moved out of the farm to be made available to food manufacturers, retailers and end users for consumption.
                  However, if the food is not consumed due to manufacturing error or the food deteriorating such that it has become unsafe
                  for human health, it will be trashed leading to edible food waste. Examples of edible food waste will include expired
                  yoghurt, left over buffet, moldy baked bread/cake, spoilt tomatoes etc.
                </p>

                <h4>Inedible Food Waste</h4>
                <img src={inediblefoodwaste} alt="inediblefoodwaste"  className="img-fluid rounded fix-image"/>
                <p>These are parts of food that has left the farm gate but were never intended for human consumption. The classification
                  of inedible food waste could vary widely depending on the parts of the food that people have grown up to consume. There
                  has been a wider awareness on sustainable gastronomy which aim to provide a more in depth knowledge on how we can maximise
                  the use of the different components of our food to improve healthier diets while reducing waste. Inedible food waste include
                  pineapple peels, Watermelon rind, Melon core, bones etc. If these inedible food waste are used in feeding animal or put back
                  in the food system in any form, then they are no longer classified as waste.
                </p>                
              </Col>
            </div>

            <div className="para">
              <Col>
                <h1>User Benefits</h1>
                <img src={benefits} alt="Help"  className="img-fluid rounded fix-image"/>
                <p>You cannot manage what you cannot measure – The Global Food Loss & Waste Tracker is an innovative solution to support our fight to end food 
                  wastage. The Global Food Loss & Waste Tracker is able to track household food wastage and allows households to anonymously compare wastage with neighbours’ 
                  households through an online virtual map. 
                  Eradicating food waste allows households to save money – currently over £800 billion is lost in the UK alone through food wastage.</p>
                <p>The Global Food Loss & Waste Tracker’s innovative technology allows waste managers to have a better-quality food wastage programme collection procedure. 
                  Food wastage is a challenge by governments across the globe – The Global Food Loss & Waste Tracker allows government policy makers to gather anonymous data on food wastage 
                  across the country. 
                  This is significant to allow governments to develop a strong call to action on ending food waste. </p>
                  <p>IntelliDigest believes The Global Food Loss & Waste Tracker will assist in meeting Sustainable Development Goal 12 by 2030 – creating responsible consumption and production. 
                    By meeting this goal and ending food wastage, we can empower global food sustainability and create sustainable food impacts for future generations. </p>
              </Col>
            </div>

            <div className="para">
              <Col>
                <h1>Moisture Content</h1>
                <img src={moisture} alt="moisture"  className="img-fluid rounded fix-image"/>
                <p>This is the percentage of moisture in the food waste, usually, mixed food waste contain 70-90% moisture content. However, this may vary depending on where the food waste occur. Food waste containing a lot of peel, rind and bones will have a very low moisture content of 0-10% while a sandwich will have less than 5%, etc.</p>
              </Col>
            </div>

            <div className="para">
              <Col>
              <h1>Macronutrients</h1>
              <p>Food is made up of these key macronutrients: carbohydrates, proteins, fibre and fats</p>
                  <h4>What are Carbohydrates?</h4>
                  <img src={carbs} alt="carbs"  className="img-fluid rounded fix-image" width="100%"/>
                  <p>Carbohydrates are found in a wide array of both healthy and unhealthy foods—bread, beans, milk, popcorn, potatoes, cookies, spaghetti, soft drinks, corn, and cherry pie. They also come in a variety of forms. The most common and abundant forms are sugars, fibers, and starches.
    Foods high in carbohydrates are an important part of a healthy diet. Carbohydrates provide the body with glucose, which is converted to energy used to support bodily functions and physical activity. But carbohydrate quality is important; some types of carbohydrate-rich foods are better than others:
    The healthiest sources of carbohydrates—unprocessed or minimally processed whole grains, vegetables, fruits and beans—promote good health by delivering vitamins, minerals, fiber, and a host of important phytonutrients.
    Unhealthier sources of carbohydrates include white bread, pastries, sodas, and other highly processed or refined foods.  These items contain easily digested carbohydrates that may contribute to weight gain, interfere with weight loss, and promote diabetes and heart disease.
    The Healthy Eating Plate recommends filling most of your plate with healthy carbohydrates – with vegetables (except potatoes) and fruits taking up about half of your plate, and whole grains filling up about one fourth of your plate. </p>
              </Col>
            </div>

            <div className="para">
              <Col>
                <h4>What are Proteins?</h4>
                <img src={protein} alt="protein"  className="img-fluid rounded fix-image"/>
                <p>Proteins are the building blocks of life. Every cell in the human body contains protein. The basic structure of protein is a chain of amino acids.
    We need protein in your diet to help your body repair cells and make new ones. Protein is also important for growth and development in children, teens, and pregnant women.
    Protein foods are broken down into parts called amino acids during digestion. The human body needs a number of amino acids in large enough amounts to maintain good health.
    Proteins are found in animal sources such as meats, milk, fish, and eggs. They are also found in plant sources such as soy, beans, legumes, nut butters, and some grains (such as wheat germ and quinoa). The right combination of plant and animal protein helps to balance biodiversity, enhance regenerative agriculture and improve our health.     </p>
              </Col>
            </div>

            <div className="para">
              <Col>
                <h4>What are Fibres?</h4>
                <img src={fibre} alt="fibre"  className="img-fluid rounded fix-image"/>
                <p>Fiber is a type of carbohydrate that the body can’t digest. Though most carbohydrates are broken down into sugar molecules, fiber cannot be broken down into sugar molecules, and instead it passes through the body undigested. Fiber helps regulate the body’s use of sugars, helping to keep hunger and blood sugar in check.
    Children and adults need at least 20 to 30 grams of fiber per day for good health, but most Americans get only about 15 grams a day. Great sources are whole fruits and vegetables, whole grains, and beans.
    Fiber comes in two varieties, both beneficial to health:
    Soluble fiber, which dissolves in water, can help lower glucose levels as well as help lower blood cholesterol. Foods with soluble fiber include oatmeal, nuts, beans, lentils, apples and blueberries.
    Insoluble fiber, which does not dissolve in water, can help food move through your digestive system, promoting regularity and helping prevent constipation. Foods with insoluble fibers include wheat, whole wheat bread, whole grain couscous, brown rice, legumes, carrots, cucumbers and tomatoes.
    The best sources of fiber are whole grains, fresh fruits and vegetables, legumes, and nuts.</p>
              </Col>
            </div>

            <div className="para">
              <Col>
                <h4>What are Fats?</h4>
                <img src={fat} alt="fat"  className="img-fluid rounded fix-image"/>
                <p>Rather than adopting a low-fat diet, it’s more important to focus on eating beneficial “good” fats and avoiding harmful “bad” fats. Fat is an important part of a healthy diet. Choose foods with “good” unsaturated fats, limit foods high in saturated fat, and avoid “bad” trans fat.
    “Good” unsaturated fats — Monounsaturated and polyunsaturated fats — lower disease risk. Foods high in good fats include vegetable oils (such as olive, canola, sunflower, soy, and corn), nuts, seeds, and fish.
    “Bad” fats — trans fats — increase disease risk, even when eaten in small quantities. Foods containing trans fats are primarily in processed foods made with trans fat from partially hydrogenated oil. Fortunately, trans fats have been eliminated from many of these foods.
    Saturated fats, while not as harmful as trans fats, by comparison with unsaturated fats negatively impact health and are best consumed in moderation. Foods containing large amounts of saturated fat include red meat, butter, cheese, and ice cream. Some plant-based fats like coconut oil and palm oil are also rich in saturated fat.
    When you cut back on foods like red meat and butter, replace them with fish, beans, nuts, and healthy oils instead of refined carbohydrates.</p>
              </Col>
            </div>

            <div className="para">
              <h4>Recommended Daily Nutrient Intake</h4>

              <Dropdown>
                <DropdownToggle className="custom-btn" style={{marginBottom: "2.5%", left: "50%", right: "50%", transform: "translate(75%, 0%)"}}>Select Age Group</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem><div onClick={(e) => setTableView(e.target.textContent)}>0-5</div></DropdownItem>
                  <DropdownItem><div onClick={(e) => setTableView(e.target.textContent)}>5-10</div></DropdownItem>
                  <DropdownItem><div onClick={(e) => setTableView(e.target.textContent)}>10-15</div></DropdownItem>
                  <DropdownItem><div onClick={(e) => setTableView(e.target.textContent)}>15-20</div></DropdownItem>
                  <DropdownItem><div onClick={(e) => setTableView(e.target.textContent)}>70-75</div></DropdownItem>
                  <DropdownItem><div onClick={(e) => setTableView(e.target.textContent)}>75-80</div></DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <div>{ tableView === "0-5" ? 
                <Table style={{marginLeft: "1%", marginRight: "7.5%"}} striped bordered hover size="sm">

                  <thead>
                    <tr>
                      <th><b>Age</b></th>
                      <th>0-5</th>
                      <th>0-5</th>
                    </tr>
                  </thead>

                  <tbody>

                    <tr>
                      <th><b>Sex</b></th>
                      <th>F</th>
                      <th>M</th>
                    </tr>

                    <tr>
                      <th><b>Protein</b></th>
                      <th>20g</th>
                      <th>20g</th>
                    </tr>

                    <tr>
                      <th><b>Fluid</b></th>
                      <th>1.2L</th>
                      <th>1.2L</th>
                    </tr>

                    <tr>
                      <th><b>Fibre</b></th>
                      <th>18g</th>
                      <th>18g</th>
                    </tr>

                    <tr>
                      <th><b>Vit A</b></th>
                      <th style={{fontSize: "80%"}}>400Î¼g</th>
                      <th style={{fontSize: "80%"}}>400Î¼g</th>
                    </tr>

                    <tr>
                      <th><b style={{fontSize: "80%"}}>Thiamin</b></th>
                      <th>0.6mg</th>
                      <th>0.6mg</th>
                    </tr>

                    <tr>
                      <th><b style={{fontSize: "80%"}}>Riboflavin</b></th>
                      <th>0.6mg</th>
                      <th>0.6mg</th>
                    </tr>

                    <tr>
                      <th><b>Niacin</b></th>
                      <th>8mg</th>
                      <th>8mg</th>
                    </tr>

                    <tr>
                      <th><b>Vit B6</b></th>
                      <th>0.6mg</th>
                      <th>0.6mg</th>
                    </tr>

                    <tr>
                      <th><b>Vit B12</b></th>
                      <th style={{fontSize: "80%"}}>1.2Î¼g</th>
                      <th style={{fontSize: "80%"}}>1.2Î¼g</th>
                    </tr>

                    <tr>
                      <th><b>Folate</b></th>
                      <th style={{fontSize: "80%"}}>200Î¼g</th>
                      <th style={{fontSize: "80%"}}>200Î¼g</th>
                    </tr>

                    <tr>
                      <th><b style={{fontSize: "80%"}}>Vitamin</b></th>
                      <th>35mg</th>
                      <th>35mg</th>
                    </tr>

                    <tr>
                      <th><b style={{fontSize: "80%"}}>Calcium</b></th>
                      <th style={{fontSize: "80%"}}>700mg</th>
                      <th style={{fontSize: "80%"}}>700mg</th>
                    </tr>

                    <tr>
                      <th><b>Iodine</b></th>
                      <th style={{fontSize: "80%"}}>90Î¼g</th>
                      <th style={{fontSize: "80%"}}>90Î¼g</th>
                    </tr>

                    <tr>
                      <th><b>Iron</b></th>
                      <th>10mg</th>
                      <th>10mg</th>
                    </tr>

                    <tr>
                      <th><b style={{fontSize: "75%"}}>Magnesium</b></th>
                      <th>130mg</th>
                      <th>130mg</th>
                    </tr>

                    <tr>
                      <th><b style={{fontSize: "80%"}}>Potassium</b></th>
                      <th style={{fontSize: "80%"}}>2300mg</th>
                      <th style={{fontSize: "80%"}}>2300mg</th>
                    </tr>

                    <tr>
                      <th><b>Sodium</b></th>
                      <th style={{fontSize: "80%"}}>300-600mg</th>
                      <th style={{fontSize: "80%"}}>300-600mg</th>
                    </tr>

                    <tr>
                      <th><b>Zinc</b></th>
                      <th>4mg</th>
                      <th>4mg</th>
                    </tr>

                  </tbody>

                </Table>  

                :

                <>
                  <div>{ tableView === "5-10" ?
                    <Table style={{marginLeft: "1%", marginRight: "7.5%"}} striped bordered hover size="sm">

                      <thead>
                        <tr>
                          <th><b>Age</b></th>
                          <th style={{fontSize: "90%"}}>5-10</th>
                          <th style={{fontSize: "90%"}}>5-10</th>
                        </tr>
                      </thead>

                      <tbody>

                        <tr>
                          <th><b>Sex</b></th>
                          <th>F</th>
                          <th>M</th>
                        </tr>

                        <tr>
                          <th><b>Protein</b></th>
                          <th>35g</th>
                          <th>40g</th>
                        </tr>

                        <tr>
                          <th><b>Fluid</b></th>
                          <th>1.4L</th>
                          <th>1.6L</th>
                        </tr>

                        <tr>
                          <th><b>Fibre</b></th>
                          <th>20g</th>
                          <th>24g</th>
                        </tr>

                        <tr>
                          <th><b>Vit A</b></th>
                          <th style={{fontSize: "80%"}}>600Î¼g</th>
                          <th style={{fontSize: "80%"}}>600Î¼g</th>
                        </tr>

                        <tr>
                          <th><b style={{fontSize: "80%"}}>Thiamin</b></th>
                          <th>0.9mg</th>
                          <th>0.9mg</th>
                        </tr>

                        <tr>
                          <th><b style={{fontSize: "80%"}}>Riboflavin</b></th>
                          <th>0.9mg</th>
                          <th>0.9mg</th>
                        </tr>

                        <tr>
                          <th><b>Niacin</b></th>
                          <th>12mg</th>
                          <th>12mg</th>
                        </tr>

                        <tr>
                          <th><b>Vit B6</b></th>
                          <th>1mg</th>
                          <th>1mg</th>
                        </tr>

                        <tr>
                          <th><b>Vit B12</b></th>
                          <th style={{fontSize: "80%"}}>1.8Î¼g</th>
                          <th style={{fontSize: "80%"}}>1.8Î¼g</th>
                        </tr>

                        <tr>
                          <th><b>Folate</b></th>
                          <th style={{fontSize: "80%"}}>300Î¼g</th>
                          <th style={{fontSize: "80%"}}>300Î¼g</th>
                        </tr>

                        <tr>
                          <th><b style={{fontSize: "80%"}}>Vitamin</b></th>
                          <th>40mg</th>
                          <th>40mg</th>
                        </tr>

                        <tr>
                          <th><b style={{fontSize: "80%"}}>Calcium</b></th>
                          <th style={{fontSize: "80%"}}>1000mg</th>
                          <th style={{fontSize: "80%"}}>1000mg</th>
                        </tr>

                        <tr>
                          <th><b>Iodine</b></th>
                          <th style={{fontSize: "80%"}}>120Î¼g</th>
                          <th style={{fontSize: "80%"}}>120Î¼g</th>
                        </tr>

                        <tr>
                          <th><b>Iron</b></th>
                          <th>8mg</th>
                          <th>8mg</th>
                        </tr>

                        <tr>
                          <th><b style={{fontSize: "75%"}}>Magnesium</b></th>
                          <th>240mg</th>
                          <th>240mg</th>
                        </tr>

                        <tr>
                          <th><b style={{fontSize: "80%"}}>Potassium</b></th>
                          <th style={{fontSize: "80%"}}>2500mg</th>
                          <th style={{fontSize: "80%"}}>3000mg</th>
                        </tr>

                        <tr>
                          <th><b>Sodium</b></th>
                          <th style={{fontSize: "80%"}}>400-800mg</th>
                          <th style={{fontSize: "80%"}}>400-800mg</th>
                        </tr>

                        <tr>
                          <th><b>Zinc</b></th>
                          <th>6mg</th>
                          <th>6mg</th>
                        </tr>

                      </tbody>

                  </Table> 

                  :

                  <>
                    <div>{ tableView === "10-15" ?
                      <Table style={{marginLeft: "1%", marginRight: "7.5%"}} striped bordered hover size="sm">

                        <thead>
                          <tr>
                            <th><b>Age</b></th>
                            <th style={{fontSize: "90%"}}>10-15</th>
                            <th style={{fontSize: "90%"}}>10-15</th>
                          </tr>
                        </thead>

                        <tbody>

                          <tr>
                            <th><b>Sex</b></th>
                            <th>F</th>
                            <th>M</th>
                          </tr>

                          <tr>
                            <th><b>Protein</b></th>
                            <th>45g</th>
                            <th>65g</th>
                          </tr>

                          <tr>
                            <th><b>Fluid</b></th>
                            <th>1.6L</th>
                            <th>1.9L</th>
                          </tr>

                          <tr>
                            <th><b>Fibre</b></th>
                            <th>22g</th>
                            <th>28g</th>
                          </tr>

                          <tr>
                            <th><b>Vit A</b></th>
                            <th style={{fontSize: "80%"}}>700Î¼g</th>
                            <th style={{fontSize: "80%"}}>900Î¼g</th>
                          </tr>

                          <tr>
                            <th><b style={{fontSize: "80%"}}>Thiamin</b></th>
                            <th>1.1mg</th>
                            <th>1.2mg</th>
                          </tr>

                          <tr>
                            <th><b style={{fontSize: "80%"}}>Riboflavin</b></th>
                            <th>1.1mg</th>
                            <th>1.3mg</th>
                          </tr>

                          <tr>
                            <th><b>Niacin</b></th>
                            <th>14mg</th>
                            <th>16mg</th>
                          </tr>

                          <tr>
                            <th><b>Vit B6</b></th>
                            <th>1.2mg</th>
                            <th>1.3mg</th>
                          </tr>

                          <tr>
                            <th><b>Vit B12</b></th>
                            <th style={{fontSize: "80%"}}>2.4Î¼g</th>
                            <th style={{fontSize: "80%"}}>2.4Î¼g</th>
                          </tr>

                          <tr>
                            <th><b>Folate</b></th>
                            <th style={{fontSize: "80%"}}>400Î¼g</th>
                            <th style={{fontSize: "80%"}}>400Î¼g</th>
                          </tr>

                          <tr>
                            <th><b style={{fontSize: "80%"}}>Vitamin</b></th>
                            <th>40mg</th>
                            <th>40mg</th>
                          </tr>

                          <tr>
                            <th><b style={{fontSize: "80%"}}>Calcium</b></th>
                            <th style={{fontSize: "80%"}}>1300mg</th>
                            <th style={{fontSize: "80%"}}>1300mg</th>
                          </tr>

                          <tr>
                            <th><b>Iodine</b></th>
                            <th style={{fontSize: "80%"}}>150Î¼g</th>
                            <th style={{fontSize: "80%"}}>150Î¼g</th>
                          </tr>

                          <tr>
                            <th><b>Iron</b></th>
                            <th>15mg</th>
                            <th>11mg</th>
                          </tr>

                          <tr>
                            <th><b style={{fontSize: "75%"}}>Magnesium</b></th>
                            <th>360mg</th>
                            <th>410mg</th>
                          </tr>

                          <tr>
                            <th><b style={{fontSize: "80%"}}>Potassium</b></th>
                            <th style={{fontSize: "80%"}}>2600mg</th>
                            <th style={{fontSize: "80%"}}>3600mg</th>
                          </tr>

                          <tr>
                            <th><b>Sodium</b></th>
                            <th style={{fontSize: "80%"}}>460-920mg</th>
                            <th style={{fontSize: "80%"}}>460-920mg</th>
                          </tr>

                          <tr>
                            <th><b>Zinc</b></th>
                            <th>7mg</th>
                            <th>13mg</th>
                          </tr>

                        </tbody>

                      </Table>  
                      
                      :

                      <>
                        <div>{ tableView === "15-20" ?
                          <Table style={{marginLeft: "1%", marginRight: "7.5%"}} striped bordered hover size="sm">

                            <thead>
                              <tr>
                                <th><b>Age</b></th>
                                <th style={{fontSize: "90%"}}>15-20</th>
                                <th style={{fontSize: "90%"}}>15-20</th>
                              </tr>
                            </thead>
    
                            <tbody>
    
                              <tr>
                                <th><b>Sex</b></th>
                                <th>F</th>
                                <th>M</th>
                              </tr>
    
                              <tr>
                                <th><b>Protein</b></th>
                                <th>46g</th>
                                <th>64g</th>
                              </tr>
    
                              <tr>
                                <th><b>Fluid</b></th>
                                <th>2.1L</th>
                                <th>2.3L</th>
                              </tr>
    
                              <tr>
                                <th><b>Fibre</b></th>
                                <th>25g</th>
                                <th>30g</th>
                              </tr>
    
                              <tr>
                                <th><b>Vit A</b></th>
                                <th style={{fontSize: "80%"}}>700Î¼g</th>
                                <th style={{fontSize: "80%"}}>900Î¼g</th>
                              </tr>
    
                              <tr>
                                <th><b style={{fontSize: "80%"}}>Thiamin</b></th>
                                <th>1.1mg</th>
                                <th>1.2mg</th>
                              </tr>
    
                              <tr>
                                <th><b style={{fontSize: "80%"}}>Riboflavin</b></th>
                                <th>1.1mg</th>
                                <th>1.3mg</th>
                              </tr>
    
                              <tr>
                                <th><b>Niacin</b></th>
                                <th>14mg</th>
                                <th>16mg</th>
                              </tr>
    
                              <tr>
                                <th><b>Vit B6</b></th>
                                <th>1.3mg</th>
                                <th>1.3mg</th>
                              </tr>
    
                              <tr>
                                <th><b>Vit B12</b></th>
                                <th style={{fontSize: "80%"}}>2.4Î¼g</th>
                                <th style={{fontSize: "80%"}}>2.4Î¼g</th>
                              </tr>
    
                              <tr>
                                <th><b>Folate</b></th>
                                <th style={{fontSize: "80%"}}>400Î¼g</th>
                                <th style={{fontSize: "80%"}}>400Î¼g</th>
                              </tr>
    
                              <tr>
                                <th><b style={{fontSize: "80%"}}>Vitamin</b></th>
                                <th>45mg</th>
                                <th>45mg</th>
                              </tr>
    
                              <tr>
                                <th><b style={{fontSize: "80%"}}>Calcium</b></th>
                                <th style={{fontSize: "80%"}}>1000mg</th>
                                <th style={{fontSize: "80%"}}>1000mg</th>
                              </tr>
    
                              <tr>
                                <th><b>Iodine</b></th>
                                <th style={{fontSize: "80%"}}>150Î¼g</th>
                                <th style={{fontSize: "80%"}}>150Î¼g</th>
                              </tr>
    
                              <tr>
                                <th><b>Iron</b></th>
                                <th>18mg</th>
                                <th>8mg</th>
                              </tr>
    
                              <tr>
                                <th><b style={{fontSize: "75%"}}>Magnesium</b></th>
                                <th>310mg</th>
                                <th>400mg</th>
                              </tr>
    
                              <tr>
                                <th><b style={{fontSize: "80%"}}>Potassium</b></th>
                                <th style={{fontSize: "80%"}}>2800mg</th>
                                <th style={{fontSize: "80%"}}>3800mg</th>
                              </tr>
    
                              <tr>
                                <th><b>Sodium</b></th>
                                <th style={{fontSize: "80%"}}>460-920mg</th>
                                <th style={{fontSize: "80%"}}>460-920mg</th>
                              </tr>
    
                              <tr>
                                <th><b>Zinc</b></th>
                                <th>8mg</th>
                                <th>14mg</th>
                              </tr>
    
                            </tbody>
  
                          </Table>  

                          :

                          <>
                            <div>{ tableView === "70-75" ?
                              <Table style={{marginLeft: "1%", marginRight: "7.5%"}} striped bordered hover size="sm">

                                <thead>
                                  <tr>
                                    <th><b>Age</b></th>
                                    <th style={{fontSize: "90%"}}>70-75</th>
                                    <th style={{fontSize: "90%"}}>70-75</th>
                                  </tr>
                                </thead>
        
                                <tbody>
        
                                  <tr>
                                    <th><b>Sex</b></th>
                                    <th>F</th>
                                    <th>M</th>
                                  </tr>
        
                                  <tr>
                                    <th><b>Protein</b></th>
                                    <th>57g</th>
                                    <th>81g</th>
                                  </tr>
        
                                  <tr>
                                    <th><b>Fluid</b></th>
                                    <th>2.1L</th>
                                    <th>2.6L</th>
                                  </tr>
        
                                  <tr>
                                    <th><b>Fibre</b></th>
                                    <th>25g</th>
                                    <th>30g</th>
                                  </tr>
        
                                  <tr>
                                    <th><b>Vit A</b></th>
                                    <th style={{fontSize: "80%"}}>700Î¼g</th>
                                    <th style={{fontSize: "80%"}}>900Î¼g</th>
                                  </tr>
        
                                  <tr>
                                    <th><b style={{fontSize: "80%"}}>Thiamin</b></th>
                                    <th>1.1mg</th>
                                    <th>1.2mg</th>
                                  </tr>
        
                                  <tr>
                                    <th><b style={{fontSize: "80%"}}>Riboflavin</b></th>
                                    <th>1.3mg</th>
                                    <th>1.6mg</th>
                                  </tr>
        
                                  <tr>
                                    <th><b>Niacin</b></th>
                                    <th>14mg</th>
                                    <th>16mg</th>
                                  </tr>
        
                                  <tr>
                                    <th><b>Vit B6</b></th>
                                    <th>1.5mg</th>
                                    <th>1.7mg</th>
                                  </tr>
        
                                  <tr>
                                    <th><b>Vit B12</b></th>
                                    <th style={{fontSize: "80%"}}>2.4Î¼g</th>
                                    <th style={{fontSize: "80%"}}>2.4Î¼g</th>
                                  </tr>
        
                                  <tr>
                                    <th><b>Folate</b></th>
                                    <th style={{fontSize: "80%"}}>400Î¼g</th>
                                    <th style={{fontSize: "80%"}}>400Î¼g</th>
                                  </tr>
        
                                  <tr>
                                    <th><b style={{fontSize: "80%"}}>Vitamin</b></th>
                                    <th>45mg</th>
                                    <th>45mg</th>
                                  </tr>
        
                                  <tr>
                                    <th><b style={{fontSize: "80%"}}>Calcium</b></th>
                                    <th style={{fontSize: "80%"}}>1300mg</th>
                                    <th style={{fontSize: "80%"}}>1300mg</th>
                                  </tr>
        
                                  <tr>
                                    <th><b>Iodine</b></th>
                                    <th style={{fontSize: "80%"}}>150Î¼g</th>
                                    <th style={{fontSize: "80%"}}>150Î¼g</th>
                                  </tr>
        
                                  <tr>
                                    <th><b>Iron</b></th>
                                    <th>8mg</th>
                                    <th>8mg</th>
                                  </tr>
        
                                  <tr>
                                    <th><b style={{fontSize: "75%"}}>Magnesium</b></th>
                                    <th>320mg</th>
                                    <th>420mg</th>
                                  </tr>
        
                                  <tr>
                                    <th><b style={{fontSize: "80%"}}>Potassium</b></th>
                                    <th style={{fontSize: "80%"}}>2800mg</th>
                                    <th style={{fontSize: "80%"}}>3800mg</th>
                                  </tr>
        
                                  <tr>
                                    <th><b>Sodium</b></th>
                                    <th style={{fontSize: "80%"}}>460-920mg</th>
                                    <th style={{fontSize: "80%"}}>460-920mg</th>
                                  </tr>
        
                                  <tr>
                                    <th><b>Zinc</b></th>
                                    <th>8mg</th>
                                    <th>14mg</th>
                                  </tr>
        
                                </tbody>

                              </Table>   
                              
                              :

                              <>
                                <div>{ tableView === "75-80" ?
                                  <Table style={{marginLeft: "1%", marginRight: "7.5%"}} striped bordered hover size="sm">

                                    <thead>
                                      <tr>
                                        <th><b>Age</b></th>
                                        <th style={{fontSize: "90%"}}>75-80</th>
                                        <th style={{fontSize: "90%"}}>75-80</th>
                                      </tr>
                                    </thead>
            
                                    <tbody>
            
                                      <tr>
                                        <th><b>Sex</b></th>
                                        <th>F</th>
                                        <th>M</th>
                                      </tr>
            
                                      <tr>
                                        <th><b>Protein</b></th>
                                        <th>57g</th>
                                        <th>81g</th>
                                      </tr>
            
                                      <tr>
                                        <th><b>Fluid</b></th>
                                        <th>2.1L</th>
                                        <th>2.6L</th>
                                      </tr>
            
                                      <tr>
                                        <th><b>Fibre</b></th>
                                        <th>25g</th>
                                        <th>30g</th>
                                      </tr>
            
                                      <tr>
                                        <th><b>Vit A</b></th>
                                        <th style={{fontSize: "80%"}}>700Î¼g</th>
                                        <th style={{fontSize: "80%"}}>900Î¼g</th>
                                      </tr>
            
                                      <tr>
                                        <th><b style={{fontSize: "80%"}}>Thiamin</b></th>
                                        <th>1.1mg</th>
                                        <th>1.2mg</th>
                                      </tr>
            
                                      <tr>
                                        <th><b style={{fontSize: "80%"}}>Riboflavin</b></th>
                                        <th>1.3mg</th>
                                        <th>1.6mg</th>
                                      </tr>
            
                                      <tr>
                                        <th><b>Niacin</b></th>
                                        <th>14mg</th>
                                        <th>16mg</th>
                                      </tr>
            
                                      <tr>
                                        <th><b>Vit B6</b></th>
                                        <th>1.5mg</th>
                                        <th>1.7mg</th>
                                      </tr>
            
                                      <tr>
                                        <th><b>Vit B12</b></th>
                                        <th style={{fontSize: "80%"}}>2.4Î¼g</th>
                                        <th style={{fontSize: "80%"}}>2.4Î¼g</th>
                                      </tr>
            
                                      <tr>
                                        <th><b>Folate</b></th>
                                        <th style={{fontSize: "80%"}}>400Î¼g</th>
                                        <th style={{fontSize: "80%"}}>400Î¼g</th>
                                      </tr>
            
                                      <tr>
                                        <th><b style={{fontSize: "80%"}}>Vitamin</b></th>
                                        <th>45mg</th>
                                        <th>45mg</th>
                                      </tr>
            
                                      <tr>
                                        <th><b style={{fontSize: "80%"}}>Calcium</b></th>
                                        <th style={{fontSize: "80%"}}>1300mg</th>
                                        <th style={{fontSize: "80%"}}>1300mg</th>
                                      </tr>
            
                                      <tr>
                                        <th><b>Iodine</b></th>
                                        <th style={{fontSize: "80%"}}>150Î¼g</th>
                                        <th style={{fontSize: "80%"}}>150Î¼g</th>
                                      </tr>
            
                                      <tr>
                                        <th><b>Iron</b></th>
                                        <th>8mg</th>
                                        <th>8mg</th>
                                      </tr>
            
                                      <tr>
                                        <th><b style={{fontSize: "75%"}}>Magnesium</b></th>
                                        <th>320mg</th>
                                        <th>420mg</th>
                                      </tr>
            
                                      <tr>
                                        <th><b style={{fontSize: "80%"}}>Potassium</b></th>
                                        <th style={{fontSize: "80%"}}>2800mg</th>
                                        <th style={{fontSize: "80%"}}>3800mg</th>
                                      </tr>
            
                                      <tr>
                                        <th><b>Sodium</b></th>
                                        <th style={{fontSize: "80%"}}>460-920mg</th>
                                        <th style={{fontSize: "80%"}}>460-920mg</th>
                                      </tr>
            
                                      <tr>
                                        <th><b>Zinc</b></th>
                                        <th>8mg</th>
                                        <th>14mg</th>
                                      </tr>
            
                                    </tbody>

                                  </Table>  
                                
                                  :

                                  <>
                                    <div>{ tableView === "" ?
                                      <Table style={{marginLeft: "1%", marginRight: "7.5%"}} striped bordered hover size="sm">

                                        <thead>
                                          <tr>
                                            <th><b>Age</b></th>
                                            <th style={{fontSize: "90%"}}>...</th>
                                            <th style={{fontSize: "90%"}}>...</th>
                                          </tr>
                                        </thead>
                
                                        <tbody>
                
                                          <tr>
                                            <th><b>Sex</b></th>
                                            <th>...</th>
                                            <th>...</th>
                                          </tr>
                
                                          <tr>
                                            <th><b>Protein</b></th>
                                            <th>...</th>
                                            <th>...</th>
                                          </tr>
                
                                          <tr>
                                            <th><b>Fluid</b></th>
                                            <th>...</th>
                                            <th>...</th>
                                          </tr>
                
                                          <tr>
                                            <th><b>Fibre</b></th>
                                            <th>...</th>
                                            <th>...</th>
                                          </tr>
                
                                          <tr>
                                            <th><b>Vit A</b></th>
                                            <th style={{fontSize: "80%"}}>...</th>
                                            <th style={{fontSize: "80%"}}>...</th>
                                          </tr>
                
                                          <tr>
                                            <th><b style={{fontSize: "80%"}}>Thiamin</b></th>
                                            <th>...</th>
                                            <th>...</th>
                                          </tr>
                
                                          <tr>
                                            <th><b style={{fontSize: "80%"}}>Riboflavin</b></th>
                                            <th>...</th>
                                            <th>...</th>
                                          </tr>
                
                                          <tr>
                                            <th><b>Niacin</b></th>
                                            <th>...</th>
                                            <th>...</th>
                                          </tr>
                
                                          <tr>
                                            <th><b>Vit B6</b></th>
                                            <th>...</th>
                                            <th>...</th>
                                          </tr>
                
                                          <tr>
                                            <th><b>Vit B12</b></th>
                                            <th style={{fontSize: "80%"}}>...</th>
                                            <th style={{fontSize: "80%"}}>...</th>
                                          </tr>
                
                                          <tr>
                                            <th><b>Folate</b></th>
                                            <th style={{fontSize: "80%"}}>...</th>
                                            <th style={{fontSize: "80%"}}>...</th>
                                          </tr>
                
                                          <tr>
                                            <th><b style={{fontSize: "80%"}}>Vitamin</b></th>
                                            <th>...</th>
                                            <th>...</th>
                                          </tr>
                
                                          <tr>
                                            <th><b style={{fontSize: "80%"}}>Calcium</b></th>
                                            <th style={{fontSize: "80%"}}>...</th>
                                            <th style={{fontSize: "80%"}}>...</th>
                                          </tr>
                
                                          <tr>
                                            <th><b>Iodine</b></th>
                                            <th style={{fontSize: "80%"}}>...</th>
                                            <th style={{fontSize: "80%"}}>...</th>
                                          </tr>
                
                                          <tr>
                                            <th><b>Iron</b></th>
                                            <th>...</th>
                                            <th>...</th>
                                          </tr>
                
                                          <tr>
                                            <th><b style={{fontSize: "75%"}}>Magnesium</b></th>
                                            <th>...</th>
                                            <th>...</th>
                                          </tr>
                
                                          <tr>
                                            <th><b style={{fontSize: "80%"}}>Potassium</b></th>
                                            <th style={{fontSize: "80%"}}>...</th>
                                            <th style={{fontSize: "80%"}}>...</th>
                                          </tr>
                
                                          <tr>
                                            <th><b>Sodium</b></th>
                                            <th style={{fontSize: "80%"}}>...</th>
                                            <th style={{fontSize: "80%"}}>...</th>
                                          </tr>
                
                                          <tr>
                                            <th><b>Zinc</b></th>
                                            <th>...</th>
                                            <th>...</th>
                                          </tr>
                
                                        </tbody>

                                      </Table>  
                                      
                                      :

                                      <></>
                                  }</div>
                                  </>
                              }</div>
                              </>

                          }</div>
                          </>

                      }</div>
                      </>

                  }</div>
                  </>

                }</div>
                </>

            }</div>

              {/* <Table style={{marginLeft: "1%", marginRight: "1%"}} striped bordered hover size="sm" responsive="sm">
                <thead>
                    <tr>
                        <th><b>Age</b></th>
                        <th style={{fontSize: "90%"}}>0-5</th>
                        <th style={{fontSize: "90%"}}>0-5</th>
                        <th style={{fontSize: "90%"}}>5-10</th>
                        <th style={{fontSize: "90%"}}>5-10</th>
                        <th style={{fontSize: "90%"}}>10-15</th>
                        <th style={{fontSize: "90%"}}>10-15</th>
                        <th style={{fontSize: "90%"}}>15-20</th>
                        <th style={{fontSize: "90%"}}>15-20</th>
                        <th style={{fontSize: "90%"}}>70-75</th>
                        <th style={{fontSize: "90%"}}>70-75</th>
                        <th style={{fontSize: "90%"}}>75-80</th>
                        <th style={{fontSize: "90%"}}>75-80</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                      <th><b>Sex</b></th>
                      <th>F</th>
                      <th>M</th>
                      <th>F</th>
                      <th>M</th>
                      <th>F</th>
                      <th>M</th>
                      <th>F</th>
                      <th>M</th>
                      <th>F</th>
                      <th>M</th>
                      <th>F</th>
                      <th>M</th>
                    </tr>

                    <tr>
                      <th><b>Protein</b></th>
                      <th>20g</th>
                      <th>20g</th>
                      <th>35g</th>
                      <th>40g</th>
                      <th>45g</th>
                      <th>65g</th>
                      <th>46g</th>
                      <th>64g</th>
                      <th>57g</th>
                      <th>81g</th>
                      <th>57g</th>
                      <th>81g</th>
                    </tr>

                    <tr>
                      <th><b>Fluid</b></th>
                      <th>1.2L</th>
                      <th>1.2L</th>
                      <th>1.4L</th>
                      <th>1.6L</th>
                      <th>1.6L</th>
                      <th>1.9L</th>
                      <th>2.1L</th>
                      <th>2.3L</th>
                      <th>2.1L</th>
                      <th>2.6L</th>
                      <th>2.1L</th>
                      <th>2.6L</th>
                    </tr>

                    <tr>
                      <th><b>Fibre</b></th>
                      <th>18g</th>
                      <th>18g</th>
                      <th>20g</th>
                      <th>24g</th>
                      <th>22g</th>
                      <th>28g</th>
                      <th>25g</th>
                      <th>30g</th>
                      <th>25g</th>
                      <th>30g</th>
                      <th>25g</th>
                      <th>30g</th>
                    </tr>

                    <tr>
                      <th><b>Vit A</b></th>
                      <th style={{fontSize: "80%"}}>400Î¼g</th>
                      <th style={{fontSize: "80%"}}>400Î¼g</th>
                      <th style={{fontSize: "80%"}}>600Î¼g</th>
                      <th style={{fontSize: "80%"}}>600Î¼g</th>
                      <th style={{fontSize: "80%"}}>700Î¼g</th>
                      <th style={{fontSize: "80%"}}>900Î¼g</th>
                      <th style={{fontSize: "80%"}}>700Î¼g</th>
                      <th style={{fontSize: "80%"}}>900Î¼g</th>
                      <th style={{fontSize: "80%"}}>700Î¼g</th>
                      <th style={{fontSize: "80%"}}>900Î¼g</th>
                      <th style={{fontSize: "80%"}}>700Î¼g</th>
                      <th style={{fontSize: "80%"}}>900Î¼g</th>
                    </tr>

                    <tr>
                      <th><b style={{fontSize: "80%"}}>Thiamin</b></th>
                      <th>0.6mg</th>
                      <th>0.6mg</th>
                      <th>0.9mg</th>
                      <th>0.9mg</th>
                      <th>1.1mg</th>
                      <th>1.2mg</th>
                      <th>1.1mg</th>
                      <th>1.2mg</th>
                      <th>1.1mg</th>
                      <th>1.2mg</th>
                      <th>1.1mg</th>
                      <th>1.2mg</th>
                    </tr>

                    <tr>
                      <th><b style={{fontSize: "80%"}}>Riboflavin</b></th>
                      <th>0.6mg</th>
                      <th>0.6mg</th>
                      <th>0.9mg</th>
                      <th>0.9mg</th>
                      <th>1.1mg</th>
                      <th>1.3mg</th>
                      <th>1.1mg</th>
                      <th>1.3mg</th>
                      <th>1.3mg</th>
                      <th>1.6mg</th>
                      <th>1.3mg</th>
                      <th>1.6mg</th>
                    </tr>

                    <tr>
                      <th><b>Niacin</b></th>
                      <th>8mg</th>
                      <th>8mg</th>
                      <th>12mg</th>
                      <th>12mg</th>
                      <th>14mg</th>
                      <th>16mg</th>
                      <th>14mg</th>
                      <th>16mg</th>
                      <th>14mg</th>
                      <th>16mg</th>
                      <th>14mg</th>
                      <th>16mg</th>
                    </tr>

                    <tr>
                      <th><b>Vit B6</b></th>
                      <th>0.6mg</th>
                      <th>0.6mg</th>
                      <th>1mg</th>
                      <th>1mg</th>
                      <th>1.2mg</th>
                      <th>1.3mg</th>
                      <th>1.3mg</th>
                      <th>1.3mg</th>
                      <th>1.5mg</th>
                      <th>1.7mg</th>
                      <th>1.5mg</th>
                      <th>1.7mg</th>
                    </tr>

                    <tr>
                      <th><b>Vit B12</b></th>
                      <th style={{fontSize: "80%"}}>1.2Î¼g</th>
                      <th style={{fontSize: "80%"}}>1.2Î¼g</th>
                      <th style={{fontSize: "80%"}}>1.8Î¼g</th>
                      <th style={{fontSize: "80%"}}>1.8Î¼g</th>
                      <th style={{fontSize: "80%"}}>2.4Î¼g</th>
                      <th style={{fontSize: "80%"}}>2.4Î¼g</th>
                      <th style={{fontSize: "80%"}}>2.4Î¼g</th>
                      <th style={{fontSize: "80%"}}>2.4Î¼g</th>
                      <th style={{fontSize: "80%"}}>2.4Î¼g</th>
                      <th style={{fontSize: "80%"}}>2.4Î¼g</th>
                      <th style={{fontSize: "80%"}}>2.4Î¼g</th>
                      <th style={{fontSize: "80%"}}>2.4Î¼g</th>
                    </tr>

                    <tr>
                      <th><b>Folate</b></th>
                      <th style={{fontSize: "80%"}}>200Î¼g</th>
                      <th style={{fontSize: "80%"}}>200Î¼g</th>
                      <th style={{fontSize: "80%"}}>300Î¼g</th>
                      <th style={{fontSize: "80%"}}>300Î¼g</th>
                      <th style={{fontSize: "80%"}}>400Î¼g</th>
                      <th style={{fontSize: "80%"}}>400Î¼g</th>
                      <th style={{fontSize: "80%"}}>400Î¼g</th>
                      <th style={{fontSize: "80%"}}>400Î¼g</th>
                      <th style={{fontSize: "80%"}}>400Î¼g</th>
                      <th style={{fontSize: "80%"}}>400Î¼g</th>
                      <th style={{fontSize: "80%"}}>400Î¼g</th>
                      <th style={{fontSize: "80%"}}>400Î¼g</th>
                    </tr>

                    <tr>
                      <th><b style={{fontSize: "80%"}}>Vitamin</b></th>
                      <th>35mg</th>
                      <th>35mg</th>
                      <th>40mg</th>
                      <th>40mg</th>
                      <th>40mg</th>
                      <th>40mg</th>
                      <th>45mg</th>
                      <th>45mg</th>
                      <th>45mg</th>
                      <th>45mg</th>
                      <th>45mg</th>
                      <th>45mg</th>
                    </tr>

                    <tr>
                      <th><b style={{fontSize: "80%"}}>Calcium</b></th>
                      <th style={{fontSize: "80%"}}>700mg</th>
                      <th style={{fontSize: "80%"}}>700mg</th>
                      <th style={{fontSize: "80%"}}>1000mg</th>
                      <th style={{fontSize: "80%"}}>1000mg</th>
                      <th style={{fontSize: "80%"}}>1300mg</th>
                      <th style={{fontSize: "80%"}}>1300mg</th>
                      <th style={{fontSize: "80%"}}>1000mg</th>
                      <th style={{fontSize: "80%"}}>1000mg</th>
                      <th style={{fontSize: "80%"}}>1300mg</th>
                      <th style={{fontSize: "80%"}}>1300mg</th>
                      <th style={{fontSize: "80%"}}>1300mg</th>
                      <th style={{fontSize: "80%"}}>1300mg</th>
                    </tr>

                    <tr>
                      <th><b>Iodine</b></th>
                      <th style={{fontSize: "80%"}}>90Î¼g</th>
                      <th style={{fontSize: "80%"}}>90Î¼g</th>
                      <th style={{fontSize: "80%"}}>120Î¼g</th>
                      <th style={{fontSize: "80%"}}>120Î¼g</th>
                      <th style={{fontSize: "80%"}}>150Î¼g</th>
                      <th style={{fontSize: "80%"}}>150Î¼g</th>
                      <th style={{fontSize: "80%"}}>150Î¼g</th>
                      <th style={{fontSize: "80%"}}>150Î¼g</th>
                      <th style={{fontSize: "80%"}}>150Î¼g</th>
                      <th style={{fontSize: "80%"}}>150Î¼g</th>
                      <th style={{fontSize: "80%"}}>150Î¼g</th>
                      <th style={{fontSize: "80%"}}>150Î¼g</th>
                    </tr>

                    <tr>
                      <th><b>Iron</b></th>
                      <th>10mg</th>
                      <th>10mg</th>
                      <th>8mg</th>
                      <th>8mg</th>
                      <th>15mg</th>
                      <th>11mg</th>
                      <th>18mg</th>
                      <th>8mg</th>
                      <th>8mg</th>
                      <th>8mg</th>
                      <th>8mg</th>
                      <th>8mg</th>
                    </tr>

                    <tr>
                      <th><b style={{fontSize: "75%"}}>Magnesium</b></th>
                      <th>130mg</th>
                      <th>130mg</th>
                      <th>240mg</th>
                      <th>240mg</th>
                      <th>360mg</th>
                      <th>410mg</th>
                      <th>310mg</th>
                      <th>400mg</th>
                      <th>320mg</th>
                      <th>420mg</th>
                      <th>320mg</th>
                      <th>420mg</th>
                    </tr>

                    <tr>
                      <th><b style={{fontSize: "80%"}}>Potassium</b></th>
                      <th style={{fontSize: "80%"}}>2300mg</th>
                      <th style={{fontSize: "80%"}}>2300mg</th>
                      <th style={{fontSize: "80%"}}>2500mg</th>
                      <th style={{fontSize: "80%"}}>3000mg</th>
                      <th style={{fontSize: "80%"}}>2600mg</th>
                      <th style={{fontSize: "80%"}}>3600mg</th>
                      <th style={{fontSize: "80%"}}>2800mg</th>
                      <th style={{fontSize: "80%"}}>3800mg</th>
                      <th style={{fontSize: "80%"}}>2800mg</th>
                      <th style={{fontSize: "80%"}}>3800mg</th>
                      <th style={{fontSize: "80%"}}>2800mg</th>
                      <th style={{fontSize: "80%"}}>3800mg</th>
                    </tr>

                    <tr>
                      <th><b>Sodium</b></th>
                      <th style={{fontSize: "80%"}}>300-600mg</th>
                      <th style={{fontSize: "80%"}}>300-600mg</th>
                      <th style={{fontSize: "80%"}}>400-800mg</th>
                      <th style={{fontSize: "80%"}}>400-800mg</th>
                      <th style={{fontSize: "80%"}}>460-920mg</th>
                      <th style={{fontSize: "80%"}}>460-920mg</th>
                      <th style={{fontSize: "80%"}}>460-920mg</th>
                      <th style={{fontSize: "80%"}}>460-920mg</th>
                      <th style={{fontSize: "80%"}}>460-920mg</th>
                      <th style={{fontSize: "80%"}}>460-920mg</th>
                      <th style={{fontSize: "80%"}}>460-920mg</th>
                      <th style={{fontSize: "80%"}}>460-920mg</th>
                    </tr>

                    <tr>
                      <th><b>Zinc</b></th>
                      <th>4mg</th>
                      <th>4mg</th>
                      <th>6mg</th>
                      <th>6mg</th>
                      <th>7mg</th>
                      <th>13mg</th>
                      <th>8mg</th>
                      <th>14mg</th>
                      <th>8mg</th>
                      <th>14mg</th>
                      <th>8mg</th>
                      <th>14mg</th>
                    </tr>

                    {/* <tr>
                      <th>75-80</th>
                      <th>F</th>
                      <th>57g</th>
                      <th>2.1L</th>
                      <th>25g</th>
                      <th>700Î¼g</th>
                      <th>1.1mg</th>
                      <th>1.3mg</th>
                      <th>14mg</th>
                      <th>1.5mg</th>
                      <th>2.4Î¼g</th>
                      <th>400Î¼g</th>
                      <th>45mg</th>
                      <th>1300mg</th>
                      <th>150Î¼g</th>
                      <th>8mg</th>
                      <th>320mg</th>
                      <th>2800mg</th>
                      <th>460-920mg</th>
                      <th>8mg</th>
                    </tr>

                    <tr>
                      <th>70-75</th>
                      <th>M</th>
                      <th>81g</th>
                      <th>2.6L</th>
                      <th>30g</th>
                      <th>900Î¼g</th>
                      <th>1.2mg</th>
                      <th>1.6mg</th>
                      <th>16mg</th>
                      <th>1.7mg</th>
                      <th>2.4Î¼g</th>
                      <th>400Î¼g</th>
                      <th>45mg</th>
                      <th>1300mg</th>
                      <th>150Î¼g</th>
                      <th>8mg</th>
                      <th>420mg</th>
                      <th>3800mg</th>
                      <th>460-920mg</th>
                      <th>14mg</th>
                    </tr> 
                </tbody>
              </Table> */}

            </div>
{/* 
            <div className="para">
                <Table>

                  <thead>

                    <tr>
                        <th><b>Age</b></th>
                        <th style={{fontSize: "90%"}}>15-20</th>
                        <th style={{fontSize: "90%"}}>15-20</th>
                        <th style={{fontSize: "90%"}}>70-75</th>
                        <th style={{fontSize: "90%"}}>70-75</th>
                        <th style={{fontSize: "90%"}}>75-80</th>
                        <th style={{fontSize: "90%"}}>75-80</th>
                    </tr>

                  </thead>

                  <tbody>

                    <tr>
                      <th><b>Sex</b></th>
                      <th>F</th>
                      <th>M</th>
                      <th>F</th>
                      <th>M</th>
                      <th>F</th>
                      <th>M</th>
                    </tr>

                    <tr>
                      <th style={{fontSize: "90%"}}><b>Folate</b></th>
                      <th style={{fontSize: "90%"}}></th>
                      <th style={{fontSize: "90%"}}></th>
                      <th style={{fontSize: "90%"}}></th>
                      <th style={{fontSize: "90%"}}></th>
                      <th style={{fontSize: "90%"}}></th>
                      <th style={{fontSize: "90%"}}></th>
                    </tr>

                    <tr>
                      <th><b></b></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>

                    <tr>
                      <th><b></b></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>

                    <tr>
                      <th><b></b></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>

                    <tr>
                      <th><b></b></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>

                    <tr>
                      <th><b></b></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>

                    <tr>
                      <th><b></b></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>

                    <tr>
                      <th><b></b></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>

                    <tr>
                      <th><b></b></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
      
                  </tbody>

                </Table>
            </div> */}
          </MobileDivStyle>
        </MobileView>
        </div>
  );
}

const MobileDivStyle = styled.div`
  .para{
    margin-top: 10vh;
    margin-bottom: 10vh;
  }
`;

const MobileTable = styled.div`
  .m-table{
    width: 95%;
    fontSize: 7px;
  }
`;

export default About;


