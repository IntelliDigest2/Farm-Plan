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

class Chart64 extends Component {

    state = {
        uid: this.props.auth.uid,
        mondayGHGBusiness: 0,
        tuesdayGHGBusiness: 0,
        wednesdayGHGBusiness: 0,
        thursdayGHGBusiness: 0,
        fridayGHGBusiness: 0,
        saturdayGHGBusiness: 0,
        sundayGHGBusiness: 0,
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

                if (week === time && day === "Mon" && st === "Waste Business"){
                    this.setState( (prevState) => ({
                        mondayGHGBusiness: prevState.mondayGHGBusiness += ghg
                    }));
                } else if (week === time && day === "Tue" && st === "Waste Business"){
                    this.setState( (prevState) => ({
                        tuesdayGHGBusiness: prevState.tuesdayGHGBusiness += ghg
                    }));
                } else if (week === time && day === "Wed" && st === "Waste Business"){
                    this.setState( (prevState) => ({
                        wednesdayGHGBusiness: prevState.wednesdayGHGBusiness += ghg
                    }));
                } else if (week === time && day === "Thu" && st === "Waste Business"){
                    this.setState( (prevState) => ({
                        thursdayGHGBusiness: prevState.thursdayGHGBusiness += ghg
                    }));
                } else if (week === time && day === "Fri" && st === "Waste Business"){
                    this.setState( (prevState) => ({
                        fridayGHGBusiness: prevState.fridayGHGBusiness += ghg
                    }));
                } else if (week === time && day === "Sat" && st === "Waste Business"){
                    this.setState( (prevState) => ({
                        saturdayGHGBusiness: prevState.saturdayGHGBusiness += ghg
                    }));
                } else if (week === time && day === "Sun" && st === "Waste Business"){
                    this.setState( (prevState) => ({
                        sundayGHGBusiness: prevState.sundayGHGBusiness += ghg
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
                                ['Day', 'Food Wastage GHG'],
                                ['Monday', this.state.mondayGHGBusiness],
                                ['Tuesday', this.state.tuesdayGHGBusiness],
                                ['Wednesday', this.state.wednesdayGHGBusiness],
                                ['Thursday', this.state.thursdayGHGBusiness],
                                ['Friday', this.state.fridayGHGBusiness],
                                ['Saturday', this.state.saturdayGHGBusiness],
                                ['Sunday', this.state.sundayGHGBusiness],
                            ]}
                            options={{
                                title: 'This week\'s Food Wastage GHG Performance (' + time + ', Business)',
                                chartArea: {width: '50%'},
                                colors: ['#aab41e'],
                                hAxis: {
                                    title: 'Day of the Week',
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'GHG Emissions of Food Wastage (kg co2)'
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
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthGHGBusiness">View Next (Monthly GHG)</Button>
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
                                ['Food Wastage Type', 'GHG '],
                                ['Mon', this.state.mondayGHGBusiness],
                                ['Tue', this.state.tuesdayGHGBusiness],
                                ['Wed', this.state.wednesdayGHGBusiness],
                                ['Thu', this.state.thursdayGHGBusiness],
                                ['Fri', this.state.fridayGHGBusiness],
                                ['Sat', this.state.saturdayGHGBusiness],
                                ['Sun', this.state.sundayGHGBusiness],
                            ]}
                            options={{
                                title: 'This week\'s Food Wastage GHG Performance (Business)',
                                chartArea: {width: '52.5%'},
                                colors: ['#aab41e'],
                                legend: "none",
                                hAxis: {
                                    title: 'Day of the Week',
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'GHG Emissions of Food Wastage (kg co2)'
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
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthGHGBusiness">Next</Button>
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

export default connect(mapStateToProps, null)(Chart64);
