import React, {Component} from 'react'
import { Chart } from "react-google-charts"
import styled from "styled-components"
import { BrowserView, MobileView } from 'react-device-detect'
import moment from 'moment'
import { connect } from 'react-redux'
import { fs } from '../../../config/fbConfig'

import { Button, ButtonGroup } from 'react-bootstrap';
import "../Pages.css"
import "../../../App.css";
import {Link} from "react-router-dom"
import {Card} from "react-bootstrap"

const time = moment().format("ddd MMM Do YYYY")

class Chart24 extends Component {

    state = {
        uid: this.props.auth.uid,
        // totalCarbsCost: 0,
        // totalProteinCost: 0,
        // totalFatCost: 0,
        // totalFibreCost: 0,
        totalBreakfastSurplusCost: 0,
        totalLunchSurplusCost: 0,
        totalDinnerSurplusCost: 0,
        totalOtherSurplusCost: 0,
    }

    fetchData = async () => {
        fs.collection('data').doc(this.state.uid).collection('writtenFoodWasteData')
          .get()
          .then( snapshot => {

            snapshot.forEach(doc => {

                var fd = doc.data().FULLDATE
                var cost = doc.data().COST
                var curr = doc.data().CURRENCY
                var meal = doc.data().MEAL
                var isSurplus = doc.data().EDIBLEORINEDIBLE

                var newCost = 0;

                if (curr === "GBP (£)"){
                    newCost = Number(cost*1)
                } else if (curr === "USD ($)"){
                    newCost = Number((cost/1.404).toFixed(2))
                } else if (curr === "EUR (€)"){
                    newCost = Number((cost/1.161).toFixed(2))
                }

                // var carbCon = doc.data().CARBSCONTENT
                // var proCon = doc.data().PROTEINCONTENT
                // var fatCon = doc.data().FATCONTENT
                // var fibCon = doc.data().FIBRECONTENT 

                // if (fd === time && (carbCon >= 0 && carbCon <= 100) && (proCon >= 0 && proCon <= 100) && (fatCon >= 0 && fatCon <= 100) && (fibCon >= 0 && fibCon <= 100)){
                //     this.setState( (prevState) => ({
                //         totalCarbsCost: prevState.totalCarbsCost += Number((newCost*(carbCon/100)).toFixed(2)),
                //         totalProteinCost: prevState.totalProteinCost += Number((newCost*(proCon/100)).toFixed(2)),
                //         totalFatCost: prevState.totalFatCost += Number((newCost*(fatCon/100)).toFixed(2)),
                //         totalFibreCost: prevState.totalFibreCost += Number((newCost*(fibCon/100)).toFixed(2)),
                //     }))
                // }

                // if (fd === time && meal === "Breakfast" && isSurplus === "Edible"){
                //     this.setState( (prevState) => ({
                //         totalBreakfastCost: prevState.totalBreakfastCost += newCost
                //     }));
                // } else if (fd === time && meal === "Lunch" && isSurplus === "Edible"){
                //     this.setState( (prevState) => ({
                //         totalLunchCost: prevState.totalLunchCost += newCost
                //     }));
                // } else if (fd === time && meal === "Dinner" && isSurplus === "Edible"){
                //     this.setState( (prevState) => ({
                //         totalDinnerCost: prevState.totalDinnerCost += newCost
                //     }));
                // }

                if (fd === time && meal === "Breakfast" && isSurplus === "Surplus"){
                    this.setState( (prevState) => ({
                        totalBreakfastSurplusCost: prevState.totalBreakfasSurplusCost += newCost
                    }));
                } else if (fd === time && meal === "Lunch" && isSurplus === "Surplus"){
                    this.setState( (prevState) => ({
                        totalLunchSurplusCost: prevState.totalLunchSurplusCost += newCost
                    }));
                } else if (fd === time && meal === "Dinner" && isSurplus === "Surplus"){
                    this.setState( (prevState) => ({
                        totalDinnerSurplusCost: prevState.totalDinnerSurplusCost += newCost
                    }));
                } else if (fd === time && meal === "Other" && isSurplus === "Surplus"){
                    this.setState( (prevState) => ({
                        totalOtherSurplusCost: prevState.totalOtherSurplusCost += newCost
                    }));
                }
            })

          })
          .catch(error => console.log(error))
    }

    componentDidMount(){
        this.fetchData();
    }

    render(){
        
        const {auth} = this.props;

        return(
            <React.Fragment className="row">

                <br/>
                <br/>
                <br/>

                <BrowserView>
                    {/* <ChartStyle> */}
                    <div style={{height: "120%", marginBottom: "2.5%", marginLeft: "10%"}}>
                        <Chart className="bar-chart"
                            width={'78vw'}
                            height={'600px'}
                            chartType="ColumnChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['Meal of the Day', 'Food Surplus Costs Saved'],
                                ['Breakfast', this.state.totalBreakfastSurplusCost],
                                ['Lunch', this.state.totalLunchSurplusCost],
                                ['Dinner', this.state.totalDinnerSurplusCost],
                                ['Other', this.state.totalOtherSurplusCost],
                            ]}
                            options={{
                                title: 'Today\'s Food Surplus Costs Saved Performance (' + time + ')',
                                chartArea: {width: '50%'},
                                colors: ['rgb(13, 27, 92)'],
                                hAxis: {
                                    title: 'Meal of the Day',
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'Costs Saved from Food Surplus (GBP (£))'
                                }
                            }}
                            legendToggle
                        />
                    </div>
                    {/* </ChartStyle> */}

                    <div style={{height: "40px", marginBottom: "10%"}}>
                        <Card  style={{width: '78vw', height: '35px', marginBottom: "10%", marginLeft: '10%', padding: "2.5% 5% 2.5% 5%", justifyContent: "center"}}>
                        <ButtonGroup>
                            <Button style={{width: "15%"}} disabled>View Previous</Button>
                            <Button style={{width: "7.5%"}} className="custom-btn" as={Link} to="/account">Back</Button>
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/weekSurplusCost">View Next (Weekly Surplus Cost)</Button>
                        </ButtonGroup>
                        </Card>
                    </div>

                </BrowserView>

                <MobileView>
                    {/* <ChartStyle> */}
                    <div style={{height: "120%", marginBottom: "2.5%", marginLeft: "10%"}}>
                        <Chart className="bar-chart"
                            width={'78vw'}
                            height={'600px'}
                            chartType="ColumnChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['Meal of the Day', 'Costs Saved '],
                                ['Breakfast', this.state.totalBreakfastSurplusCost],
                                ['Lunch', this.state.totalLunchSurplusCost],
                                ['Dinner', this.state.totalDinnerSurplusCost],
                                ['Other', this.state.totalOtherSurplusCost],
                            ]}
                            options={{
                                title: 'Today\'s Food Surplus Costs Saved Performance (' + time + ')',
                                chartArea: {width: '50%'},
                                colors: ['rgb(13, 27, 92)'],
                                legend: "none",
                                hAxis: {
                                    title: 'Meal of the Day',
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'Costs Saved from Food Surplus (GBP (£))'
                                }
                            }}
                        />
                    </div>
                    {/* </ChartStyle> */}

                    <div style={{height: "95px", marginBottom: "15%"}}>
                        <Card  style={{width: '78vw', height: '95px', marginBottom: "15%", marginLeft: '10%', padding: "2.5% 5% 2.5% 5%", justifyContent: "center"}}>
                            <ButtonGroup>
                                <Button style={{width: "15%"}} disabled>View Previous</Button>
                                <Button style={{width: "7.5%"}} className="custom-btn" as={Link} to="/account">Back</Button>
                                <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/weekSurplusCost">View Next</Button>
                            </ButtonGroup>
                        </Card>
                    </div>

                </MobileView>

            </React.Fragment>
        )

    }

}

const ChartStyle = styled.div`
  .bar-chart{
    position: absolute;
    left: 50%;
    right: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .area-chart{
    padding: 10px;
  }
`;

const mapStateToProps = (state) => { 
  return{
      auth: state.firebase.auth,
  }
}

export default connect(mapStateToProps, null)(Chart24);