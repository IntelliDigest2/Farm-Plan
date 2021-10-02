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

class Chart67 extends Component {

    state = {
        uid: this.props.auth.uid,
        mondayCostBusiness: 0,
        tuesdayCostBusiness: 0,
        wednesdayCostBusiness: 0,
        thursdayCostBusiness: 0,
        fridayCostBusiness: 0,
        saturdayCostBusiness: 0,
        sundayCostBusiness: 0,
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
                var isSurplus = doc.data().EDIBLEORINEDIBLE

                var st = doc.data().SUBMISSIONTYPE

                var newCost = 0;

                if (curr === "GBP (£)"){
                    newCost = Number(cost*1)
                } else if (curr === "USD ($)"){
                    newCost = Number((cost/1.404).toFixed(2))
                } else if (curr === "EUR (€)"){
                    newCost = Number((cost/1.161).toFixed(2))
                }

                if (week === time && day === "Mon" && isSurplus === "Edible" && st === "Waste Business"){
                    this.setState( (prevState) => ({
                        mondayCostBusiness: prevState.mondayCostBusiness += newCost
                    }));
                } else if (week === time && day === "Tue" && isSurplus === "Edible" && st === "Waste Business"){
                    this.setState( (prevState) => ({
                        tuesdayCostBusiness: prevState.tuesdayCostBusiness += newCost
                    }));
                } else if (week === time && day === "Wed" && isSurplus === "Edible" && st === "Waste Business"){
                    this.setState( (prevState) => ({
                        wednesdayCostBusiness: prevState.wednesdayCostBusiness += newCost
                    }));
                } else if (week === time && day === "Thu" && isSurplus === "Edible" && st === "Waste Business"){
                    this.setState( (prevState) => ({
                        thursdayCostBusiness: prevState.thursdayCostBusiness += newCost
                    }));
                } else if (week === time && day === "Fri" && isSurplus === "Edible" && st === "Waste Business"){
                    this.setState( (prevState) => ({
                        fridayCostBusiness: prevState.fridayCostBusiness += newCost
                    }));
                } else if (week === time && day === "Sat" && isSurplus === "Edible" && st === "Waste Business"){
                    this.setState( (prevState) => ({
                        saturdayCostBusiness: prevState.saturdayCostBusiness += newCost
                    }));
                } else if (week === time && day === "Sun" && isSurplus === "Edible" && st === "Waste Business"){
                    this.setState( (prevState) => ({
                        sundayCostBusiness: prevState.sundayCostBusiness += newCost
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
                                ['Day', 'Food Wastage Cost'],
                                ['Monday', this.state.mondayCostBusiness],
                                ['Tuesday', this.state.tuesdayCostBusiness],
                                ['Wednesday', this.state.wednesdayCostBusiness],
                                ['Thursday', this.state.thursdayCostBusiness],
                                ['Friday', this.state.fridayCostBusiness],
                                ['Saturday', this.state.saturdayCostBusiness],
                                ['Sunday', this.state.sundayCostBusiness],
                            ]}
                            options={{
                                title: 'This week\'s Food Wastage Cost Performance (' + time + ', Business)',
                                chartArea: {width: '50%'},
                                colors: ['#aab41e'],
                                hAxis: {
                                    title: 'Day of the Week',
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'Cost of Food Wastage (GBP (£))'
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
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthCostBusiness">View Next (Monthly Cost)</Button>
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
                                ['Day', 'Cost '],
                                ['Mon', this.state.mondayCostBusiness],
                                ['Tue', this.state.tuesdayCostBusiness],
                                ['Wed', this.state.wednesdayCostBusiness],
                                ['Thu', this.state.thursdayCostBusiness],
                                ['Fri', this.state.fridayCostBusiness],
                                ['Sat', this.state.saturdayCostBusiness],
                                ['Sun', this.state.sundayCostBusiness],
                            ]}
                            options={{
                                title: 'This week\'s Food Wastage Cost Performance (Business)',
                                chartArea: {width: '52.5%'},
                                colors: ['#aab41e'],
                                legend: "none",
                                hAxis: {
                                    title: 'Day of the Week',
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'Cost of Food Wastage (GBP (£))'
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
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthCostBusiness">Next</Button>
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

export default connect(mapStateToProps, null)(Chart67);
