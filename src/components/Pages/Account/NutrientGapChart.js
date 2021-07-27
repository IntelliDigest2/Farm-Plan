import React, {Component, useState, useEffect} from 'react'
import {Chart} from "react-google-charts"
import styled from "styled-components"
// import chartData from "../../../data/chart-data.json";
// import { Row, Col } from 'react-bootstrap';
import {BrowserView, MobileView} from "react-device-detect"
import {Card, Table} from "react-bootstrap"
import moment from "moment"

import { connect } from 'react-redux';
import {fs} from "../../../config/fbConfig"

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
                <h1 className="text-center">Nutrient Gap Breakdown (Example)</h1>
                    <div style={{height: "190%", marginBottom: "2.5%", marginLeft: "10%"}}>
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
                    </div>
                </BrowserView>

                <MobileView>
                    <h4 className="text-center">Nutrient Gap Breakdown (Example)</h4>
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