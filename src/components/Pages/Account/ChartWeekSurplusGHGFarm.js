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

class Chart82 extends Component {

    state = {
        uid: this.props.auth.uid,
        mondaySurplusGHGFarm: 0,
        tuesdaySurplusGHGFarm: 0,
        wednesdaySurplusGHGFarm: 0,
        thursdaySurplusGHGFarm: 0,
        fridaySurplusGHGFarm: 0,
        saturdaySurplusGHGFarm: 0,
        sundaySurplusGHGFarm: 0,
        // prevOption: ""
    }

    fetchData = async () => {
        fs.collection('data').doc(this.state.uid).collection('writtenFoodWasteData')
          .get()
          .then( snapshot => {

            snapshot.forEach(doc => {

                var week = doc.data().WEEK
                var day = doc.data().WDAY
                var month = doc.data().MONTH
                var mdate = doc.data().MDATE
                var ghg = doc.data().GHG
                // var isSurplus = doc.data().EDIBLEORINEDIBLE

                var st = doc.data().SUBMISSIONTYPE
                var los = doc.data().LOCALORNOT

                if (week === time && day === "Mon" && st === "Surplus Farm" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                        mondaySurplusGHGFarm: prevState.mondaySurplusGHGFarm += ghg
                    }));
                } else if (week === time && day === "Tue" && st === "Surplus Farm" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                        tuesdaySurplusGHGFarm: prevState.tuesdaySurplusGHGFarm += ghg
                    }));
                } else if (week === time && day === "Wed" && st === "Surplus Farm" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                        wednesdaySurplusGHGFarm: prevState.wednesdaySurplusGHGFarm += ghg
                    }));
                } else if (week === time && day === "Thu" && st === "Surplus Farm" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                        thursdaySurplusGHGFarm: prevState.thursdaySurplusGHGFarm += ghg
                    }));
                } else if (week === time && day === "Fri" && st === "Surplus Farm" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                        fridaySurplusGHGFarm: prevState.fridaySurplusGHGFarm += ghg
                    }));
                } else if (week === time && day === "Sat" && st === "Surplus Farm" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                        saturdaySurplusGHGFarm: prevState.saturdaySurplusGHGFarm += ghg
                    }));
                } else if (week === time && day === "Sun" && st === "Surplus Farm" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                        sundaySurplusGHGFarm: prevState.sundaySurplusGHGFarm += ghg
                    }));
                }

            })

          })
          .catch(error => console.log(error))
    }

    componentDidMount(){
        // this.getPrevOption();

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
                                ['Day', 'Food Surplus GHG Saved'],
                                ['Monday', this.state.mondaySurplusGHGFarm],
                                ['Tuesday', this.state.tuesdaySurplusGHGFarm],
                                ['Wednesday', this.state.wednesdaySurplusGHGFarm],
                                ['Thursday', this.state.thursdaySurplusGHGFarm],
                                ['Friday', this.state.fridaySurplusGHGFarm],
                                ['Saturday', this.state.saturdaySurplusGHGFarm],
                                ['Sunday', this.state.sundaySurplusGHGFarm],
                            ]}
                            options={{
                                title: 'This week\'s Food Surplus GHG Saved Performance (' + time + ', Farm)',
                                chartArea: {width: '50%'},
                                colors: ['rgb(13, 27, 92)'],
                                hAxis: {
                                    title: 'Day of the Week',
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'GHG Emissions Saved from Food Surplus (kg co2)'
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
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthSurplusGHGFarm">View Next (Monthly Surplus GHG)</Button>
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
                                ['Day', 'GHG Saved '],
                                ['Mon', this.state.mondaySurplusGHGFarm],
                                ['Tue', this.state.tuesdaySurplusGHGFarm],
                                ['Wed', this.state.wednesdaySurplusGHGFarm],
                                ['Thu', this.state.thursdaySurplusGHGFarm],
                                ['Fri', this.state.fridaySurplusGHGFarm],
                                ['Sat', this.state.saturdaySurplusGHGFarm],
                                ['Sun', this.state.sundaySurplusGHGFarm],
                            ]}
                            options={{
                                title: 'This week\'s Food Surplus GHG Saved Performance (Farm)',
                                chartArea: {width: '52.5%'},
                                colors: ['rgb(13, 27, 92)'],
                                legend: "none",
                                hAxis: {
                                    title: 'Day of the Week',
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'GHG Emissions Saved from Food Surplus (kg co2)'
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
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthSurplusGHGFarm">Next</Button>
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

export default connect(mapStateToProps, null)(Chart82);
