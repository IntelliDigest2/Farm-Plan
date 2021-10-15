import React, {Component} from 'react'
import { Chart } from "react-google-charts"
import styled from "styled-components"
import { BrowserView, MobileView } from 'react-device-detect'
import moment from 'moment'
import { connect } from 'react-redux'
import { fs } from '../../../../../../config/fbConfig'

import { Button, ButtonGroup } from 'react-bootstrap';
import "../../../../Pages.css"
import "../../../../../../App.css";
import {Link} from "react-router-dom"
import {Card} from "react-bootstrap"

const time = moment().format("W")

class Chart19 extends Component {

    state = {
        uid: this.props.auth.uid,
        mondaySurplusGHG: 0,
        tuesdaySurplusGHG: 0,
        wednesdaySurplusGHG: 0,
        thursdaySurplusGHG: 0,
        fridaySurplusGHG: 0,
        saturdaySurplusGHG: 0,
        sundaySurplusGHG: 0,
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

                // var carbCon = doc.data().CARBSCONTENT
                // var proCon = doc.data().PROTEINCONTENT
                // var fatCon = doc.data().FATCONTENT
                // var fibCon = doc.data().FIBRECONTENT

                if (week === time && day === "Mon" && st === "Surplus" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                        mondaySurplusGHG: prevState.mondaySurplusGHG += ghg
                    }));
                } else if (week === time && day === "Tue" && st === "Surplus" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                        tuesdaySurplusGHG: prevState.tuesdaySurplusGHG += ghg
                    }));
                } else if (week === time && day === "Wed" && st === "Surplus" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                        wednesdaySurplusGHG: prevState.wednesdaySurplusGHG += ghg
                    }));
                } else if (week === time && day === "Thu" && st === "Surplus" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                        thursdaySurplusGHG: prevState.thursdaySurplusGHG += ghg
                    }));
                } else if (week === time && day === "Fri" && st === "Surplus" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                        fridaySurplusGHG: prevState.fridaySurplusGHG += ghg
                    }));
                } else if (week === time && day === "Sat" && st === "Surplus" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                        saturdaySurplusGHG: prevState.saturdaySurplusGHG += ghg
                    }));
                } else if (week === time && day === "Sun" && st === "Surplus" && (los === "Surplus Food" || los === "Surplus Local Produce")){
                    this.setState( (prevState) => ({
                        sundaySurplusGHG: prevState.sundaySurplusGHG += ghg
                    }));
                }

                // else if (week === time && day === "Mon" && isSurplus === "Surplus"){
                //     this.setState( (prevState) => ({
                //         mondayGHG: prevState.mondayGHG -= ghg
                //     }));
                // } else if (week === time && day === "Tue" && isSurplus === "Surplus"){
                //     this.setState( (prevState) => ({
                //         tuesdayGHG: prevState.tuesdayGHG -= ghg
                //     }));
                // } else if (week === time && day === "Wed" && isSurplus === "Surplus"){
                //     this.setState( (prevState) => ({
                //         wednesdayGHG: prevState.wednesdayGHG -= ghg
                //     }));
                // } else if (week === time && day === "Thu" && isSurplus === "Surplus"){
                //     this.setState( (prevState) => ({
                //         thursdayGHG: prevState.thursdayGHG -= ghg
                //     }));
                // } else if (week === time && day === "Fri" && isSurplus === "Surplus"){
                //     this.setState( (prevState) => ({
                //         fridayGHG: prevState.fridayGHG -= ghg
                //     }));
                // } else if (week === time && day === "Sat" && isSurplus === "Surplus"){
                //     this.setState( (prevState) => ({
                //         saturdayGHG: prevState.saturdayGHG -= ghg
                //     }));
                // } else if (week === time && day === "Sun" && isSurplus === "Surplus"){
                //     this.setState( (prevState) => ({
                //         sundayGHG: prevState.sundayGHG -= ghg
                //     }));
                // }
            })

          })
          .catch(error => console.log(error))
    }

    // getPrevOption(){

    //     const { auth, profile } = this.props;
  
    //     if (profile.buildingFunction === "Households"){
    //       this.setState({prevOption: "/chart/daySurplusGHG"})
    //     } else if (profile.buildingFunction !== "Households" && profile.buildingFunction !== "Farm"){
    //       this.setState({prevOption: "/chart/dayBusinessGHG"})
    //     }
  
    //   }

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
                                ['Monday', this.state.mondaySurplusGHG],
                                ['Tuesday', this.state.tuesdaySurplusGHG],
                                ['Wednesday', this.state.wednesdaySurplusGHG],
                                ['Thursday', this.state.thursdaySurplusGHG],
                                ['Friday', this.state.fridaySurplusGHG],
                                ['Saturday', this.state.saturdaySurplusGHG],
                                ['Sunday', this.state.sundaySurplusGHG],
                            ]}
                            options={{
                                title: 'This week\'s Food Surplus GHG Saved Performance (' + time + ')',
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
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthSurplusGHG">View Next (Monthly Surplus GHG)</Button>
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
                                ['Mon', this.state.mondaySurplusGHG],
                                ['Tue', this.state.tuesdaySurplusGHG],
                                ['Wed', this.state.wednesdaySurplusGHG],
                                ['Thu', this.state.thursdaySurplusGHG],
                                ['Fri', this.state.fridaySurplusGHG],
                                ['Sat', this.state.saturdaySurplusGHG],
                                ['Sun', this.state.sundaySurplusGHG],
                            ]}
                            options={{
                                title: 'This week\'s Food Surplus GHG Saved Performance',
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
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthSurplusGHG">Next</Button>
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

export default connect(mapStateToProps, null)(Chart19);
