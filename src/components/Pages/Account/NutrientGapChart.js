import React, {Component, useState, useEffect} from 'react'
import {Chart} from "react-google-charts"
import styled from "styled-components"
// import chartData from "../../../data/chart-data.json";
// import { Row, Col } from 'react-bootstrap';
import {BrowserView, MobileView} from "react-device-detect"
import {Card, ListGroup, Table} from "react-bootstrap"
import moment from "moment"
import {BsStarFill, BsStar, BsArrowReturnLeft, BsArrow90DegLeft} from "react-icons/bs"
import {Link} from "react-router-dom"

import { connect } from 'react-redux';
import {fs} from "../../../config/fbConfig"
import { green, yellow } from '@material-ui/core/colors'

const time = moment().format("ddd MMM Do YYYY")

class Chart40 extends Component {

    // state = {
    //     uid: this.props.auth.uid
    // }

    render() {

        // const {auth} = this.props;

        return(
            <React.Fragment className="row">

                <br/>
                <br/>
                <br/>

                <BrowserView>
                <h1 className="text-center" style={{marginBottom: "0.5%", fontWeight: 600}}>Congratulations!</h1>

                <div className="text-center" style={{marginBottom: "3.5%"}}>
                    <BsStarFill style={{color: "gold", marginRight: "10px", fontSize: "150%"}}/>
                    <BsStarFill style={{color: "gold", marginRight: "10px", fontSize: "150%"}}/>
                    <BsStarFill style={{color: "gold", marginRight: "10px", fontSize: "150%"}}/>
                    <BsStarFill style={{color: "gold", marginRight: "10px", fontSize: "150%"}}/>
                    <BsStar style={{color: "gold", marginRight: "10px", fontSize: "150%"}}/>
                    <BsStar style={{color: "gold", marginRight: "10px", fontSize: "150%"}}/>
                </div>

                    <h4 className="text-center" style={{fontWeight: 550}}>Today's Nutrient Performance</h4>
                    <h6 className="text-center" style={{fontSize: "90%", fontWeight: 300}}>View the About page for a guide on the recommended daily intake for all of the nutrients listed below</h6>
                    <div style={{height: "20vh", marginLeft: "5%", marginRight: "5%", marginTop: "1.5%"}}>
                        <Table style={{width: "105%", marginLeft: "-2.5%"}} striped bordered size="sm">
                            <thead>
                                <tr>
                                    <th><b>Nutrient</b></th>
                                    <th>Protein</th>
                                    <th>Fluid</th>
                                    <th>Fibre</th>
                                    <th>Vitamin A</th>
                                    <th>Thiamin</th>
                                    <th>Riboflavin</th>
                                    <th>Niacin</th>
                                    <th>Vitamin B6</th>
                                    <th>Vitamin B12</th>
                                    <th>Folate</th>
                                    <th>Vitamin</th>
                                    <th>Calcium</th>
                                    <th>Iodine</th>
                                    <th>Iron</th>
                                    <th>Magnesium</th>
                                    <th>Potassium</th>
                                    <th>Sodium</th>
                                    <th>Zinc</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <th><b>Consumed?</b></th>
                                    <th style={{backgroundColor: "green"}}>YES</th>
                                    <th style={{backgroundColor: "green"}}>YES</th>
                                    <th style={{backgroundColor: "green"}}>YES</th>
                                    <th style={{backgroundColor: "green"}}>YES</th>
                                    <th style={{backgroundColor: "red"}}>NO</th>
                                    <th style={{backgroundColor: "red"}}>NO</th>
                                    <th style={{backgroundColor: "green"}}>YES</th>
                                    <th style={{backgroundColor: "green"}}>YES</th>
                                    <th style={{backgroundColor: "green"}}>YES</th>
                                    <th style={{backgroundColor: "red"}}>NO</th>
                                    <th style={{backgroundColor: "green"}}>YES</th>
                                    <th style={{backgroundColor: "green"}}>YES</th>
                                    <th style={{backgroundColor: "green"}}>YES</th>
                                    <th style={{backgroundColor: "green"}}>YES</th>
                                    <th style={{backgroundColor: "red"}}>NO</th>
                                    <th style={{backgroundColor: "red"}}>NO</th>
                                    <th style={{backgroundColor: "green"}}>YES</th>
                                    <th style={{backgroundColor: "green"}}>YES</th>
                                </tr>

                                <tr>
                                    <th><b>Food containing this nutrient</b></th>
                                    <th>Beef</th>
                                    <th>Fruit Juice</th>
                                    <th>Baked Beans</th>
                                    <th>Salmon</th>
                                    <th>N/A</th>
                                    <th>N/A</th>
                                    <th>Salmon</th>
                                    <th>Milk</th>
                                    <th>Beef</th>
                                    <th>N/A</th>
                                    <th>Salmon</th>
                                    <th>Milk</th>
                                    <th>Salmon</th>
                                    <th>Spinach</th>
                                    <th>N/A</th>
                                    <th>N/A</th>
                                    <th>Tomato Soup</th>
                                    <th>Beef</th>
                                </tr>
                            </tbody>
                        </Table>
                    </div>

                    {/* <h4 className="text-center" style={{fontWeight: 550}}>Summary</h4>
                    <div style={{height: "20vh", marginLeft: "5%", marginRight: "5%", marginTop: "1.5%"}}>
                        <Card style={{padding: "1.5% 1.5% 1.5% 1.5%"}}>
                            <li>Well done on...</li>
                            <li>You missed...</li>
                            <li>View the About page for a guide on the recommended daily intake for all of the above nutrients</li>
                        </Card>
                    </div> */}

                    <h4 className="text-center" style={{fontWeight: 550}}>Recommendations</h4>
                    <div style={{height: "40vh", display: 'flex', alignItems: 'center', marginLeft: "5%", marginBottom: "5%"}}>
                        <Card style={{height: "100%", padding: "1.5% 1.5% 1.5% 1.5%", width: "25%"}}>
                            <h3 className="text-center" style={{fontWeight: 600}}>Meals</h3>
                            {/* <li>View Browse Products pages to purchase/collect the following items: ...</li> */}
                            <h6 className="text-center">To cover the nutrients you've missed today, tomorrow you could have the following:-</h6>

                            {/* <ListGroup>
                                <ListGroup.Item style={{height: "30px" , padding: "5px 15px"}}>THIAMIN: Whole Wheat Pasta Dish</ListGroup.Item>
                                <ListGroup.Item style={{height: "30px" , padding: "5px 15px"}}>RIBOFLAVIN: Cereal</ListGroup.Item>
                                <ListGroup.Item style={{height: "30px" , padding: "5px 15px"}}>FOLATE: Legumes</ListGroup.Item>
                                <ListGroup.Item style={{height: "30px" , padding: "5px 15px"}}>MAGNESIUM: Dark Chocolate</ListGroup.Item>
                                <ListGroup.Item style={{height: "30px" , padding: "5px 15px"}}>POTASSIUM: Banana</ListGroup.Item>
                            </ListGroup> */}

                            <Table striped bordered size="sm">
                                <thead>
                                    <tr>
                                        <th><b>Thiamin</b></th>
                                        <th>Whole Wheat Pasta Dish</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th><b>Riboflavin</b></th>
                                        <th>Cereal</th>
                                    </tr>
                                    <tr>
                                        <th><b>Folate</b></th>
                                        <th>Legumes</th>
                                    </tr>
                                    <tr>
                                        <th><b>Magnesium</b></th>
                                        <th>Dark Chocolate</th>
                                    </tr>
                                    <tr>
                                        <th><b>Potassium</b></th>
                                        <th>Banana</th>
                                    </tr>
                                </tbody>
                            </Table>

                        </Card>

                        <Card style={{height: "100%", padding: "1.5% 1.5% 1.5% 1.5%", width: "25%", marginLeft: "10%"}}>
                           <h3 className="text-center" style={{fontWeight: 600}}>Recipes</h3>
                        </Card>

                        <Card style={{height: "100%", padding: "1.5% 1.5% 1.5% 1.5%", width: "25%", marginLeft: "10%"}}>
                           <h3 className="text-center" style={{fontWeight: 600}}>Local Produce</h3>
                        </Card>
                    </div>

                    {/* <div style={{height: "190%", marginBottom: "2.5%", marginLeft: "10%"}}>
                        <Chart className="bar-chart"
                            width={'78vw'}
                            height={'600px'}
                            chartType="ColumnChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['Food Composition Type', 'Recommended Nutrient Intake', 'Weight of Nutrient Intake'],
                                ['Carbohydrates', 260, 200],
                                ['Protein', 50, 52],
                                ['Fat', 70, 83],
                                ['Fibre', 30, 18],
                            ]}
                            options={{
                                title: "Today's Nutrient Gap Chart",
                                chartArea: {width: '55%', height: '70%'},
                                colors: ['#aab41e', 'rgb(12, 27, 92)'],
                                hAxis: {
                                    title: 'Food Composition Type',
                                    minValue: 0,
                                  },
                                  vAxis: {
                                    title: 'Weight of Nutrient Intake (g)',
                                  },
                            }}
                            legendToggle
                        />
                    </div>
                    <div style={{height: "70vh"}}>
                        <Card style={{width: '78vw', height: '60vh', marginBottom: "5%", marginLeft: '10%', padding: "5% 5% 5% 5%"}}>
                            <h2 className="text-center" style={{fontSize: "33px", fontWeight: "600", marginBottom: "5%"}}>Summary</h2>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Carbohydrates</th>
                                        <th>Protein</th>
                                        <th>Fat</th>
                                        <th>Fibre</th>
                                        <th><b>TOTAL</b></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Breakfast</td>
                                        <td>42g</td>
                                        <td>10g</td>
                                        <td>8g</td>
                                        <td>10g</td>
                                        <td><b>70g</b></td>
                                    </tr>
                                    <tr>
                                        <td>Lunch</td>
                                        <td>60g</td>
                                        <td>21g</td>
                                        <td>22g</td>
                                        <td>4g</td>
                                        <td><b>107g</b></td>
                                    </tr>
                                    <tr>
                                        <td>Dinner</td>
                                        <td>98g</td>
                                        <td>20g</td>
                                        <td>48g</td>
                                        <td>4g</td>
                                        <td><b>170g</b></td>
                                    </tr>
                                    <tr>
                                        <td><b>TOTAL</b></td>
                                        <td><b>200g</b></td>
                                        <td><b>51g</b></td>
                                        <td><b>78g</b></td>
                                        <td><b>18g</b></td>
                                        <td><b>347g</b></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card>
                    </div> */}
                </BrowserView>

                <MobileView>
                    {/* <h4 className="text-center">Nutrient Gap Breakdown (Example)</h4>
                    <div style={{height: "185%", marginBottom: "5%", marginLeft: "10%"}}>
                        <Chart className="bar-chart"
                            width={'295px'}
                            height={'600px'}
                            chartType="ColumnChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['Food Composition Type', 'Rec\'d ', 'Weight '],
                                ['Carbs', 260, 200],
                                ['Protein', 50, 52],
                                ['Fat', 70, 83],
                                ['Fibre', 30, 18],
                            ]}
                            options={{
                                title: "Today's Nutrient Gap Chart (Recommended Intake  vs Today's Intake)",
                                chartArea: {width: '50%', height: '70%'},
                                colors: ['#aab41e', 'rgb(12, 27, 92)'],
                                legend: 'none',
                                hAxis: {
                                    title: 'Food Composition Type',
                                    minValue: 0,
                                  },
                                  vAxis: {
                                    title: 'Weight of Nutrient Intake (g)',
                                  },
                            }}
                        />
                    </div>

                    <div>
                        <Card style={{width: '295px', height: '300px', marginBottom: "15%", marginLeft: '10%', padding: "5% 0 5% 0"}}>
                            <h2 className="text-center" style={{fontSize: "33px", fontWeight: "600", marginBottom: "5%"}}>Summary</h2>
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Breakfast</th>
                                        <th>Lunch</th>
                                        <th>Dinner</th>
                                        <th><b>TOTAL</b></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Carbs</td>
                                        <td>42g</td>
                                        <td>60g</td>
                                        <td>98g</td>
                                        <td><b>200g</b></td>
                                    </tr>
                                    <tr>
                                        <td>Protein</td>
                                        <td>10g</td>
                                        <td>21g</td>
                                        <td>20g</td>
                                        <td><b>51g</b></td>
                                    </tr>
                                    <tr>
                                        <td>Fat</td>
                                        <td>8g</td>
                                        <td>22g</td>
                                        <td>48g</td>
                                        <td><b>78g</b></td>
                                    </tr>
                                    <tr>
                                        <td>Fibre</td>
                                        <td>10g</td>
                                        <td>4g</td>
                                        <td>4g</td>
                                        <td><b>18g</b></td>
                                    </tr>
                                    <tr>
                                        <td><b>TOTAL</b></td>
                                        <td><b>70g</b></td>
                                        <td><b>107g</b></td>
                                        <td><b>170g</b></td>
                                        <td><b>347g</b></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card>
                    </div> */}

                    <h5 className="text-center" style={{marginBottom: "0.5%", fontWeight: 600}}>Congratulations!</h5>

                    <div className="text-center" style={{marginBottom: "2.5%", marginLeft: "2.5%"}}>
                        <BsStarFill style={{color: "gold", marginRight: "10px", fontSize: "150%"}}/>
                        <BsStarFill style={{color: "gold", marginRight: "10px", fontSize: "150%"}}/>
                        <BsStarFill style={{color: "gold", marginRight: "10px", fontSize: "150%"}}/>
                        <BsStarFill style={{color: "gold", marginRight: "10px", fontSize: "150%"}}/>
                        <BsStar style={{color: "gold", marginRight: "10px", fontSize: "150%"}}/>
                        <BsStar style={{color: "gold", marginRight: "10px", fontSize: "150%"}}/>
                    </div>

                    <div>
                        <Link to="/account"><BsArrow90DegLeft style={{fontSize: "250%", marginLeft: "10px", marginTop: "-105px", color: "black"}}/></Link>
                    </div>

                    <h5 className="text-center" style={{fontWeight: 550}}>Today's Nutrient Performance</h5>

                    <h6 className="text-center" style={{fontSize: "75%", fontWeight: 300}}>View the About page for a guide on the recommended daily intake for all of the nutrients listed below</h6>

                    <div style={{height: "100%", marginLeft: "5%", marginRight: "5%", marginTop: "1.5%", marginBottom: "20px"}}>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th><b>Nutrient</b></th>
                                    <th><b>Consumed?</b></th>
                                    <th><b>From Food</b></th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <th>Protein</th>
                                    <th style={{backgroundColor: "green"}}>YES</th>
                                    <th>Beef</th>
                                </tr>
                            </tbody>

                            <tbody>
                                <tr>
                                    <th>Fluid</th>
                                    <th style={{backgroundColor: "green"}}>YES</th>
                                    <th>Fruit Juice</th>
                                </tr>
                            </tbody>

                            <tbody>
                                <tr>
                                    <th>Fibre</th>
                                    <th style={{backgroundColor: "green"}}>YES</th>
                                    <th>Baked Beans</th>
                                </tr>
                            </tbody>

                            <tbody>
                                <tr>
                                    <th>Vitamin A</th>
                                    <th style={{backgroundColor: "green"}}>YES</th>
                                    <th>Salmon</th>
                                </tr>
                            </tbody>

                            <tbody>
                                <tr>
                                    <th>Thiamin</th>
                                    <th style={{backgroundColor: "red"}}>NO</th>
                                    <th>N/A</th>
                                </tr>
                            </tbody>

                            <tbody>
                                <tr>
                                    <th>Riboflavin</th>
                                    <th style={{backgroundColor: "red"}}>NO</th>
                                    <th>N/A</th>
                                </tr>
                            </tbody>

                            <tbody>
                                <tr>
                                    <th>Niacin</th>
                                    <th style={{backgroundColor: "green"}}>YES</th>
                                    <th>Salmon</th>
                                </tr>
                            </tbody>

                            <tbody>
                                <tr>
                                    <th>Vitamin B6</th>
                                    <th style={{backgroundColor: "green"}}>YES</th>
                                    <th>Milk</th>
                                </tr>
                            </tbody>

                            <tbody>
                                <tr>
                                    <th>Vitamin B12</th>
                                    <th style={{backgroundColor: "green"}}>YES</th>
                                    <th>Beef</th>
                                </tr>
                            </tbody>

                            <tbody>
                                <tr>
                                    <th>Folate</th>
                                    <th style={{backgroundColor: "red"}}>NO</th>
                                    <th>N/A</th>
                                </tr>
                            </tbody>

                            <tbody>
                                <tr>
                                    <th>Vitamin</th>
                                    <th style={{backgroundColor: "green"}}>YES</th>
                                    <th>Salmon</th>
                                </tr>
                            </tbody>

                            <tbody>
                                <tr>
                                    <th>Calcium</th>
                                    <th style={{backgroundColor: "green"}}>YES</th>
                                    <th>Milk</th>
                                </tr>
                            </tbody>

                            <tbody>
                                <tr>
                                    <th>Iodine</th>
                                    <th style={{backgroundColor: "green"}}>YES</th>
                                    <th>Salmon</th>
                                </tr>
                            </tbody>

                            <tbody>
                                <tr>
                                    <th>Iron</th>
                                    <th style={{backgroundColor: "green"}}>YES</th>
                                    <th>Spinach</th>
                                </tr>
                            </tbody>

                            <tbody>
                                <tr>
                                    <th>Magnesium</th>
                                    <th style={{backgroundColor: "red"}}>NO</th>
                                    <th>N/A</th>
                                </tr>
                            </tbody>

                            <tbody>
                                <tr>
                                    <th>Potassium</th>
                                    <th style={{backgroundColor: "red"}}>NO</th>
                                    <th>N/A</th>
                                </tr>
                            </tbody>

                            <tbody>
                                <tr>
                                    <th>Sodium</th>
                                    <th style={{backgroundColor: "green"}}>YES</th>
                                    <th>Tomato Soup</th>
                                </tr>
                            </tbody>

                            <tbody>
                                <tr>
                                    <th>Zinc</th>
                                    <th style={{backgroundColor: "green"}}>YES</th>
                                    <th>Beef</th>
                                </tr>
                            </tbody>

                        </Table>
                    </div>

                    {/* <h5 className="text-center" style={{fontWeight: 550}}>Summary</h5>
                    <div style={{marginLeft: "5%", marginRight: "5%", marginBottom: "5vh"}}>
                        <Card style={{padding: "1.5% 1.5% 1.5% 1.5%"}}>
                            <li>Well done on...</li>
                            <li>You missed...</li>
                        </Card>
                    </div> */}

                    <h5 className="text-center" style={{fontWeight: 550}}>Recommendations</h5>
                    <div style={{marginLeft: "5%", marginRight: "5%", marginBottom: "4vh"}}>
                        <Card style={{padding: "2.5% 2.5% 2.5% 2.5%", height: "38vh"}}>
                            <h6 className="text-center" style={{fontWeight: 600}}>Meals</h6>
                            {/* <li>To cover the nutrients you have missed, tomorrow you could have...</li>
                            <li>View Browse Products pages to purchase/collect the following items: ...</li> */}
                            <h7 className="text-center">To cover the nutrients you've missed today, tomorrow you could have the following:-</h7>
                            <Table striped bordered size="sm" style={{marginTop: "2.5%"}}>
                                <thead>
                                    <tr>
                                        <th><b>Thiamin</b></th>
                                        <th>Whole Wheat Pasta Dish</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th><b>Riboflavin</b></th>
                                        <th>Cereal</th>
                                    </tr>
                                    <tr>
                                        <th><b>Folate</b></th>
                                        <th>Legumes</th>
                                    </tr>
                                    <tr>
                                        <th><b>Magnesium</b></th>
                                        <th>Dark Chocolate</th>
                                    </tr>
                                    <tr>
                                        <th><b>Potassium</b></th>
                                        <th>Banana</th>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card>
                    </div>

                    <div style={{marginLeft: "5%", marginRight: "5%", marginBottom: "4vh"}}>
                        <Card style={{padding: "2.5% 2.5% 2.5% 2.5%", height: "20vh"}}>
                            <h6 className="text-center" style={{fontWeight: 600}}>Recipes</h6>
                        </Card>
                    </div>

                    <div style={{marginLeft: "5%", marginRight: "5%", marginBottom: "8vh"}}>
                        <Card style={{padding: "2.5% 2.5% 2.5% 2.5%", height: "20vh"}}>
                            <h6 className="text-center" style={{fontWeight: 600}}>Local Produce</h6>
                        </Card>
                    </div>

                </MobileView>

            </React.Fragment>
        )

    }

}

// const ChartStyle = styled.div`
//   .bar-chart{
//     position: absolute;
//     left: 50%;
//     right: 50%;
//     top: 50%;
//     transform: translate(-50%, -50%);
//   }

//   .area-chart{
//     padding: 10px;
//   }
// `;

// const mapStateToProps = (state) => { 
//   return{
//       auth: state.firebase.auth,
//   }
// }

// export default connect(mapStateToProps, null)(Chart40);

export default Chart40;