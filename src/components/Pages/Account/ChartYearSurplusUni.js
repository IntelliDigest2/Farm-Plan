import React, {Component} from 'react'
import { BrowserView, MobileView } from 'react-device-detect'
import {Chart} from "react-google-charts"
import styled from "styled-components"
// import { Row, Col } from 'react-bootstrap';

import moment from "moment"

import { connect } from 'react-redux';
import {fs} from "../../../config/fbConfig"

import { Button, ButtonGroup } from 'react-bootstrap';
import "../Pages.css"
import "../../../App.css";
import {Link} from "react-router-dom"
import {Card} from "react-bootstrap"

const time = moment().format("YYYY")

class Chart50 extends Component {

  state = {
    uid: this.props.auth.uid,
    janSurplusUni: 0,
    febSurplusUni: 0,
    marSurplusUni: 0,
    aprSurplusUni: 0,
    maySurplusUni: 0,
    junSurplusUni: 0,
    julSurplusUni: 0,
    augSurplusUni: 0,
    sepSurplusUni: 0,
    octSurplusUni: 0,
    novSurplusUni: 0,
    decSurplusUni: 0,
  }

    // fetch db.json data
    fetchData = async () => {

      fs.collection('data').doc(this.state.uid).collection('writtenFoodWasteData')
        .get()
        .then( snapshot => {
          snapshot.forEach(doc => {

            var year = doc.data().YEAR
            var month = doc.data().MONTH
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

            if (year === time && month === "Jan" && st === "Surplus Academic" && los === "Surplus"){
              this.setState( (prevState) => ({
                janSurplusUni: prevState.janSurplusUni += newWeight
              }));
            } else if (year === time && month === "Feb" && st === "Surplus Academic" && los === "Surplus"){
              this.setState( (prevState) => ({
                febSurplusUni: prevState.febSurplusUni += newWeight
              }));
            } else if (year === time && month === "Mar" && st === "Surplus Academic" && los === "Surplus"){
              this.setState( (prevState) => ({
                marSurplusUni: prevState.marSurplusUni += newWeight
              }));
            } else if (year === time && month === "Apr" && st === "Surplus Academic" && los === "Surplus"){
              this.setState( (prevState) => ({
                aprSurplusUni: prevState.aprSurplusUni += newWeight
              }));
            } else if (year === time && month === "May" && st === "Surplus Academic" && los === "Surplus"){
              this.setState( (prevState) => ({
                maySurplusUni: prevState.maySurplusUni += newWeight
              }));
            } else if (year === time && month === "Jun" && st === "Surplus Academic" && los === "Surplus"){
              this.setState( (prevState) => ({
                junSurplusUni: prevState.junSurplusUni += newWeight
              }));
            } else if (year === time && month === "Jul" && st === "Surplus Academic" && los === "Surplus"){
              this.setState( (prevState) => ({
                julSurplusUni: prevState.julSurplusUni += newWeight
              }));
            } else if (year === time && month === "Aug" && st === "Surplus Academic" && los === "Surplus"){
              this.setState( (prevState) => ({
                augSurplusUni: prevState.augSurplusUni += newWeight
              }));
            } else if (year === time && month === "Sep" && st === "Surplus Academic" && los === "Surplus"){
              this.setState( (prevState) => ({
                sepSurplusUni: prevState.sepSurplusUni += newWeight
              }));
            } else if (year === time && month === "Oct" && st === "Surplus Academic" && los === "Surplus"){
              this.setState( (prevState) => ({
                octSurplusUni: prevState.octSurplusUni += newWeight
              }));
            } else if (year === time && month === "Nov" && st === "Surplus Academic" && los === "Surplus"){
              this.setState( (prevState) => ({
                novSurplusUni: prevState.novSurplusUni += newWeight
              }));
            } else if (year === time && month === "Dec" && st === "Surplus Academic" && los === "Surplus"){
              this.setState( (prevState) => ({
                decSurplusUni: prevState.decSurplusUni += newWeight
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
    return (
      <React.Fragment className="row">
        <br/>
        <br/>
        <br/>

          <BrowserView>
            {/* <ChartStyle> */}

            <div style={{height: "120%", marginBottom: "2.5%", marginLeft: "10%"}}>

              <Chart className='bar-chart'
                width={'78vw'}
                height={'600px'}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ['Month', 'Food Surplus Weight Saved'],
                  ['January', this.state.janSurplusUni],
                  ['February', this.state.febSurplusUni],
                  ['March', this.state.marSurplusUni],
                  ['April', this.state.aprSurplusUni],
                  ['May', this.state.maySurplusUni],
                  ['June', this.state.junSurplusUni],
                  ['July', this.state.julSurplusUni],
                  ['August', this.state.augSurplusUni],
                  ['September', this.state.sepSurplusUni],
                  ['October', this.state.octSurplusUni],
                  ['November', this.state.novSurplusUni],
                  ['December', this.state.decSurplusUni],
                ]}
                options={{
                  // backgroundColor: 'lightgray',
                  title: 'This year\'s Food Surplus Weight Saved Performance (' + time + ', Academic)',
                  chartArea: { width: '75%' },
                  colors: ['rgb(13, 27, 92)'],
                  hAxis: {
                    title: 'Month of ' + time,
                    minValue: 0,
                  },
                  vAxis: {
                    title: 'Weight of Food Saved (kg)',
                  },
                }}
                legendToggle
              />

            </div>
            {/* </ChartStyle> */}

            <div style={{height: "40px", marginBottom: "10%"}}>
              <Card  style={{width: '78vw', height: '35px', marginBottom: "10%", marginLeft: '10%', padding: "2.5% 5% 2.5% 5%", justifyContent: "center"}}>
                <ButtonGroup>
                  <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthSurplusUni">View Previous (Monthly Surplus Weight)</Button>
                  <Button style={{width: "7.5%"}} className="custom-btn" as={Link} to="/account">Back</Button>
                  <Button style={{width: "15%"}} disabled>View Next</Button>
                </ButtonGroup>
              </Card>
            </div>

          </BrowserView>
            
          <MobileView>
            {/* <ChartStyle> */}
            <div style={{height: "120%", marginBottom: "2.5%", marginLeft: "5.5%"}}>

              <Chart className='bar-chart'
                width={'90vw'}
                height={'600px'}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={[
                    ['Month', 'Weight Saved '],
                    ['Jan', this.state.janSurplusUni],
                    ['Feb', this.state.febSurplusUni],
                    ['Mar', this.state.marSurplusUni],
                    ['Apr', this.state.aprSurplusUni],
                    ['May', this.state.maySurplusUni],
                    ['Jun', this.state.junSurplusUni],
                    ['Jul', this.state.julSurplusUni],
                    ['Aug', this.state.augSurplusUni],
                    ['Sep', this.state.sepSurplusUni],
                    ['Oct', this.state.octSurplusUni],
                    ['Nov', this.state.novSurplusUni],
                    ['Dec', this.state.decSurplusUni],
                ]}
                options={{
                  // backgroundColor: 'lightgray',
                  title: 'Food Surplus Weight Saved Performance (' + time + ', Uni)',
                  chartArea: { width: '60%' },
                  legend: 'none',
                  colors: ['rgb(13, 27, 92)'],
                  hAxis: {
                    title: 'Month of ' + time,
                    minValue: 0,
                  },
                  vAxis: {
                    title: 'Weight of Food Saved (kg)',
                  },
                }}
                legendToggle
              />

            </div>
            {/* </ChartStyle> */}

            <div style={{height: "95px", marginBottom: "10%"}}>
              <Card  style={{width: '90vw', height: '95px', marginBottom: "10%", marginLeft: '5.5%', padding: "2.5% 5% 2.5% 5%", justifyContent: "center"}}>
                <ButtonGroup>
                  <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthSurplusUni">Prev</Button>
                  <Button style={{width: "7.5%"}} className="custom-btn" as={Link} to="/account">Back</Button>
                  <Button style={{width: "15%"}} disabled>Next</Button>
                </ButtonGroup>
              </Card>
            </div>

          </MobileView>
           
        <br/>
        <br/>
        <br/>
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

  .bar-chart.mobile{
    left: 4%
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

export default connect(mapStateToProps, null)(Chart50);