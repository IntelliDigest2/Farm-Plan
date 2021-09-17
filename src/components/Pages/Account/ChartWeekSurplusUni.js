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

class Chart52 extends Component {

    state = {
        uid: this.props.auth.uid,
        mondaySurplusUni: 0,
        tuesdaySurplusUni: 0,
        wednesdaySurplusUni: 0,
        thursdaySurplusUni: 0,
        fridaySurplusUni: 0,
        saturdaySurplusUni: 0,
        sundaySurplusUni: 0,
    }

    fetchData = async () => {
        fs.collection('data').doc(this.state.uid).collection('writtenFoodWasteData')
          .get()
          .then( snapshot => {

            snapshot.forEach(doc => {

                var week = doc.data().WEEK
                var day = doc.data().WDAY
                var weight = doc.data().weight
                var wu = doc.data().WEIGHTUNIT
                // var isSurplus = doc.data().EDIBLEORINEDIBLE

                var st = doc.data().SUBMISSIONTYPE
                var los = doc.data().LOCALORNOT
  
                var newWeight = 0
      
                if (wu === "kg" || wu === "l"){
                  newWeight = Number(weight * 1)
                  // console.log(newWeight)
                } else if (wu === "g" || wu === "ml"){
                  newWeight = Number((weight * 0.001).toFixed(3))
                  // console.log(newWeight)
                } else if (wu === "oz"){
                  newWeight = Number((weight * 0.028).toFixed(3))
                  // console.log(newWeight)
                } else if (wu === "lbs"){
                  newWeight = Number((weight * 0.454).toFixed(3))
                  // console.log(newWeight)
                }

                if (week === time && day === "Mon" && st === "Surplus Academic" && los === "Surplus"){
                    this.setState( (prevState) => ({
                        mondaySurplusUni: prevState.mondaySurplusUni += newWeight
                    }));
                } else if (week === time && day === "Tue" && st === "Surplus Academic" && los === "Surplus"){
                  this.setState( (prevState) => ({
                      tuesdaySurplusUni: prevState.tuesdaySurplusUni += newWeight
                  }));
                } else if (week === time && day === "Wed" && st === "Surplus Academic" && los === "Surplus"){
                  this.setState( (prevState) => ({
                      wednesdaySurplusUni: prevState.wednesdaySurplusUni += newWeight
                  }));
                } else if (week === time && day === "Thu" && st === "Surplus Academic" && los === "Surplus"){
                  this.setState( (prevState) => ({
                    thursdaySurplusUni: prevState.thursdaySurplusUni += newWeight
                  })); 
                } else if (week === time && day === "Fri" && st === "Surplus Academic" && los === "Surplus"){
                  this.setState( (prevState) => ({
                    fridaySurplusUni: prevState.fridaySurplusUni += newWeight
                  }));
                } else if (week === time && day === "Sat" && st === "Surplus Academic" && los === "Surplus"){
                  this.setState( (prevState) => ({
                    saturdaySurplusUni: prevState.saturdaySurplusUni += newWeight
                  }));
                } else if (week === time && day === "Sun" && st === "Surplus Academic" && los === "Surplus"){
                  this.setState( (prevState) => ({
                    sundaySurplusUni: prevState.sundaySurplusUni += newWeight
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

                      <div style={{height: "120%", marginBottom: "2.5%", marginLeft: "10%"}}>
                        <Chart className="bar-chart"
                          width={'78vw'}
                          height={'600px'}
                          chartType="ColumnChart"
                          loader={<div>Loading Chart</div>}
                          data={[
                              ['Day of the Week', 'Food Surplus Weight Saved'],
                              ['Monday', this.state.mondaySurplusUni],
                              ['Tuesday', this.state.tuesdaySurplusUni],
                              ['Wednesday', this.state.wednesdaySurplusUni],
                              ['Thursday', this.state.thursdaySurplusUni],
                              ['Friday', this.state.fridaySurplusUni],
                              ['Saturday', this.state.saturdaySurplusUni],
                              ['Sunday', this.state.sundaySurplusUni],
                          ]}
                          options={{
                              title: 'This week\'s Food Surplus Weight Saved Performance (' + time + ', Academic)',
                              chartArea: {width: '50%'},
                              colors: ['rgb(13, 27, 92)'],
                              hAxis: {
                                  title: 'Day of the Week',
                                  minValue: 0,
                              },
                              vAxis: {
                                  title: 'Weight of Food Saved (kg)'
                              }
                          }}
                          legendToggle
                        />
                      </div>

                    <div style={{height: "40px", marginBottom: "10%"}}>
                        <Card  style={{width: '78vw', height: '35px', marginBottom: "10%", marginLeft: '10%', padding: "2.5% 5% 2.5% 5%", justifyContent: "center"}}>
                        <ButtonGroup>
                            <Button style={{width: "15%"}} disabled>View Previous</Button>
                            <Button style={{width: "7.5%"}} className="custom-btn" as={Link} to="/account">Back</Button>
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthSurplus">View Next (Monthly Surplus Weight)</Button>
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
                                ['Meal of the day', 'Weight Saved '],
                                ['Mon', this.state.mondaySurplusUni],
                                ['Tue', this.state.tuesdaySurplusUni],
                                ['Wed', this.state.wednesdaySurplusUni],
                                ['Thu', this.state.thursdaySurplusUni],
                                ['Fri', this.state.fridaySurplusUni],
                                ['Sat', this.state.saturdaySurplusUni],
                                ['Sun', this.state.sundaySurplusUni],
                            ]}
                            options={{
                                title: 'This week\'s Food Surplus Weight Saved Performance (' + time + ', Uni)',
                                chartArea: {width: '52.5%'},
                                colors: ['rgb(13, 27, 92)'],
                                legend: "none",
                                hAxis: {
                                    title: 'Day of the Week',
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'Weight of Food Saved (kg)'
                                }
                            }}
                        />
                    {/* </ChartStyle> */}
                    </div>

                    <div style={{height: "95px", marginBottom: "10%"}}>
                        <Card  style={{width: '78vw', height: '95px', marginBottom: "10%", marginLeft: '10%', padding: "2.5% 5% 2.5% 5%", justifyContent: "center"}}>
                        <ButtonGroup>
                            <Button style={{width: "15%"}} className="custom-btn" disabled>Prev</Button>
                            <Button style={{width: "7.5%"}} className="custom-btn" as={Link} to="/account">Back</Button>
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthSurplus">Next</Button>
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

export default connect(mapStateToProps, null)(Chart52);