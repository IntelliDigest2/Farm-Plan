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

const time = moment().format("W")

class Chart76 extends Component {

    state = {
        uid: this.props.auth.uid,
        mondaySurplusCostBusiness: 0,
        tuesdaySurplusCostBusiness: 0,
        wednesdaySurplusCostBusiness: 0,
        thursdaySurplusCostBusiness: 0,
        fridaySurplusCostBusiness: 0,
        saturdaySurplusCostBusiness: 0,
        sundaySurplusCostBusiness: 0,
        // prevOption: ""
    }

    fetchData = async () => {
        fs.collection('data').doc(this.state.uid).collection('writtenFoodWasteData')
          .get()
          .then( snapshot => {

            snapshot.forEach(doc => {

                var week = doc.data().WEEK
                var day = doc.data().WDAY
                var cost = doc.data().COST
                var curr = doc.data().CURRENCY
                //var isSurplus = doc.data().EDIBLEORINEDIBLE

                var st = doc.data().SUBMISSIONTYPE
                var los = doc.data().LOCALORNOT

                var newCost = 0;

                if (curr === "GBP (£)"){
                    newCost = Number(cost*1)
                } else if (curr === "USD ($)"){
                    newCost = Number((cost/1.404).toFixed(2))
                } else if (curr === "EUR (€)"){
                    newCost = Number((cost/1.161).toFixed(2))
                }

                if (week === time && day === "Mon" && st === "Surplus Business" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                        mondaySurplusCostBusiness: prevState.mondaySurplusCostBusiness += newCost
                    }));
                } else if (week === time && day === "Tue" && st === "Surplus Business" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                        tuesdaySurplusCostBusiness: prevState.tuesdaySurplusCostBusiness += newCost
                    }));
                } else if (week === time && day === "Wed" && st === "Surplus Business" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                        wednesdaySurplusCostBusiness: prevState.wednesdaySurplusCostBusiness += newCost
                    }));
                } else if (week === time && day === "Thu" && st === "Surplus Business" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                        thursdaySurplusCostBusiness: prevState.thursdaySurplusCostBusiness += newCost
                    }));
                } else if (week === time && day === "Fri" && st === "Surplus Business" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                        fridaySurplusCostBusiness: prevState.fridaySurplusCostBusiness += newCost
                    }));
                } else if (week === time && day === "Sat" && st === "Surplus Business" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                        saturdaySurplusCostBusiness: prevState.saturdaySurplusCostBusiness += newCost
                    }));
                } else if (week === time && day === "Sun" && st === "Surplus Business" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                        sundaySurplusCostBusiness: prevState.sundaySurplusCostBusiness += newCost
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
                                ['Day', 'Food Surplus Costs Saved'],
                                ['Monday', this.state.mondaySurplusCostBusiness],
                                ['Tuesday', this.state.tuesdaySurplusCostBusiness],
                                ['Wednesday', this.state.wednesdaSurplusCostBusiness],
                                ['Thursday', this.state.thursdaySurplusCostBusiness],
                                ['Friday', this.state.fridaySurplusCostBusiness],
                                ['Saturday', this.state.saturdaySurplusCostBusiness],
                                ['Sunday', this.state.sundaySurplusCostBusiness],
                            ]}
                            options={{
                                title: 'This week\'s Food Surplus Costs Saved Performance (' + time + ', Business)',
                                chartArea: {width: '50%'},
                                colors: ['rgb(13, 27, 92)'],
                                hAxis: {
                                    title: 'Day of the Week',
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
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthSurplusCostBusiness">View Next (Monthly Surplus Cost)</Button>
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
                                ['Day', 'Costs Saved '],
                                ['Mon', this.state.mondaySurplusCostBusiness],
                                ['Tue', this.state.tuesdaySurplusCostBusiness],
                                ['Wed', this.state.wednesdaSurplusCostBusiness],
                                ['Thu', this.state.thursdaySurplusCostBusiness],
                                ['Fri', this.state.fridaySurplusCostBusiness],
                                ['Sat', this.state.saturdaySurplusCostBusiness],
                                ['Sun', this.state.sundaySurplusCostBusiness],
                            ]}
                            options={{
                                title: 'This week\'s Food Surplus Costs Saved Performance (Business)',
                                chartArea: {width: '52.5%'},
                                colors: ['rgb(13, 27, 92)'],
                                legend: "none",
                                hAxis: {
                                    title: 'Day of the Week',
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
                            <Button style={{width: "15%"}} className="custom-btn" disabled>Prev</Button>
                            <Button style={{width: "7.5%"}} className="custom-btn" as={Link} to="/account">Back</Button>
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthSurplusCostBusiness">Next</Button>
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
      profile: state.firebase.profile,
  }
}

export default connect(mapStateToProps, null)(Chart76);
