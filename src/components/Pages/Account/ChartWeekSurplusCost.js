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

class Chart23 extends Component {

    state = {
        uid: this.props.auth.uid,
        mondaySurplusCost: 0,
        tuesdaySurplusCost: 0,
        wednesdaySurplusCost: 0,
        thursdaySurplusCost: 0,
        fridaySurplusCost: 0,
        saturdaySurplusCost: 0,
        sundaySurplusCost: 0,
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

                // if (week === time && day === "Mon" && isSurplus === "Edible"){
                //     this.setState( (prevState) => ({
                //         mondayCost: prevState.mondayCost += newCost
                //     }));
                // } else if (week === time && day === "Tue" && isSurplus === "Edible"){
                //     this.setState( (prevState) => ({
                //         tuesdayCost: prevState.tuesdayCost += newCost
                //     }));
                // } else if (week === time && day === "Wed" && isSurplus === "Edible"){
                //     this.setState( (prevState) => ({
                //         wednesdayCost: prevState.wednesdayCost += newCost
                //     }));
                // } else if (week === time && day === "Thu" && isSurplus === "Edible"){
                //     this.setState( (prevState) => ({
                //         thursdayCost: prevState.thursdayCost += newCost
                //     }));
                // } else if (week === time && day === "Fri" && isSurplus === "Edible"){
                //     this.setState( (prevState) => ({
                //         fridayCost: prevState.fridayCost += newCost
                //     }));
                // } else if (week === time && day === "Sat" && isSurplus === "Edible"){
                //     this.setState( (prevState) => ({
                //         saturdayCost: prevState.saturdayCost += newCost
                //     }));
                // } else if (week === time && day === "Sun" && isSurplus === "Edible"){
                //     this.setState( (prevState) => ({
                //         sundayCost: prevState.sundayCost += newCost
                //     }));
                // }

                if (week === time && day === "Mon" && isSurplus === "Surplus"){
                    this.setState( (prevState) => ({
                        mondaySurplusCost: prevState.mondaySurplusCost += newCost
                    }));
                } else if (week === time && day === "Tue" && isSurplus === "Surplus"){
                    this.setState( (prevState) => ({
                        tuesdaySurplusCost: prevState.tuesdaySurplusCost += newCost
                    }));
                } else if (week === time && day === "Wed" && isSurplus === "Surplus"){
                    this.setState( (prevState) => ({
                        wednesdaySurplusCost: prevState.wednesdaySurplusCost += newCost
                    }));
                } else if (week === time && day === "Thu" && isSurplus === "Surplus"){
                    this.setState( (prevState) => ({
                        thursdaySurplusCost: prevState.thursdaySurplusCost += newCost
                    }));
                } else if (week === time && day === "Fri" && isSurplus === "Surplus"){
                    this.setState( (prevState) => ({
                        fridaySurplusCost: prevState.fridaySurplusCost += newCost
                    }));
                } else if (week === time && day === "Sat" && isSurplus === "Surplus"){
                    this.setState( (prevState) => ({
                        saturdaySurplusCost: prevState.saturdaySurplusCost += newCost
                    }));
                } else if (week === time && day === "Sun" && isSurplus === "Surplus"){
                    this.setState( (prevState) => ({
                        sundaySurplusCost: prevState.sundaySurplusCost += newCost
                    }));
                }
            })

          })
          .catch(error => console.log(error))
    }

    // getPrevOption(){

    //     const { auth, profile } = this.props;
  
    //     if (profile.buildingFunction === "Households"){
    //       this.setState({prevOption: "/chart/daySurplusCost"})
    //     } else if (profile.buildingFunction !== "Households" && profile.buildingFunction !== "Farm"){
    //       this.setState({prevOption: "/chart/dayBusinessCost"})
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
                                ['Day', 'Food Surplus Costs Saved'],
                                ['Monday', this.state.mondaySurplusCost],
                                ['Tuesday', this.state.tuesdaySurplusCost],
                                ['Wednesday', this.state.wednesdaSurplusCost],
                                ['Thursday', this.state.thursdaySurplusCost],
                                ['Friday', this.state.fridaySurplusCost],
                                ['Saturday', this.state.saturdaySurplusCost],
                                ['Sunday', this.state.sundaySurplusCost],
                            ]}
                            options={{
                                title: 'This week\'s Food Surplus Costs Saved Performance (' + time + ')',
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
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthSurplusCost">View Next (Monthly Surplus Cost)</Button>
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
                                ['Mon', this.state.mondaySurplusCost],
                                ['Tue', this.state.tuesdaySurplusCost],
                                ['Wed', this.state.wednesdaSurplusCost],
                                ['Thu', this.state.thursdaySurplusCost],
                                ['Fri', this.state.fridaySurplusCost],
                                ['Sat', this.state.saturdaySurplusCost],
                                ['Sun', this.state.sundaySurplusCost],
                            ]}
                            options={{
                                title: 'This week\'s Food Surplus Costs Saved Performance',
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
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthSurplusCost">Next</Button>
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

export default connect(mapStateToProps, null)(Chart23);
