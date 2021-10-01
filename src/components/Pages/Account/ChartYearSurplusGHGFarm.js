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

class Chart80 extends Component {

  state = {
    uid: this.props.auth.uid,
    janSurplusFarm: 0,
    febSurplusFarm: 0,
    marSurplusFarm: 0,
    aprSurplusFarm: 0,
    maySurplusFarm: 0,
    junSurplusFarm: 0,
    julSurplusFarm: 0,
    augSurplusFarm: 0,
    sepSurplusFarm: 0,
    octSurplusFarm: 0,
    novSurplusFarm: 0,
    decSurplusFarm: 0,
  }

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

            if (year === time && month === "Jan" && st === "Surplus Farm" && (los === "Surplus Food" || los === "Surplus Local Produce")){
              this.setState( (prevState) => ({
                janSurplusFarm: prevState.janSurplusFarm += newWeight
              }));
            } else if (year === time && month === "Feb" && st === "Surplus Farm" && (los === "Surplus Food" || los === "Surplus Local Produce")){
              this.setState( (prevState) => ({
                febSurplusFarm: prevState.febSurplusFarm += newWeight
              }));
            } else if (year === time && month === "Mar" && st === "Surplus Farm" && (los === "Surplus Food" || los === "Surplus Local Produce")){
              this.setState( (prevState) => ({
                marSurplusFarm: prevState.marSurplusFarm += newWeight
              }));
            } else if (year === time && month === "Apr" && st === "Surplus Farm" && (los === "Surplus Food" || los === "Surplus Local Produce")){
              this.setState( (prevState) => ({
                aprSurplusFarm: prevState.aprSurplusFarm += newWeight
              }));
            } else if (year === time && month === "May" && st === "Surplus Farm" && (los === "Surplus Food" || los === "Surplus Local Produce")){
              this.setState( (prevState) => ({
                maySurplusFarm: prevState.maySurplusFarm += newWeight
              }));
            } else if (year === time && month === "Jun" && st === "Surplus Farm" && (los === "Surplus Food" || los === "Surplus Local Produce")){
              this.setState( (prevState) => ({
                junSurplusFarm: prevState.junSurplusFarm += newWeight
              }));
            } else if (year === time && month === "Jul" && st === "Surplus Farm" && (los === "Surplus Food" || los === "Surplus Local Produce")){
              this.setState( (prevState) => ({
                julSurplusFarm: prevState.julSurplusFarm += newWeight
              }));
            } else if (year === time && month === "Aug" && st === "Surplus Farm" && (los === "Surplus Food" || los === "Surplus Local Produce")){
              this.setState( (prevState) => ({
                augSurplusFarm: prevState.augSurplusFarm += newWeight
              }));
            } else if (year === time && month === "Sep" && st === "Surplus Farm" && (los === "Surplus Food" || los === "Surplus Local Produce")){
              this.setState( (prevState) => ({
                sepSurplusFarm: prevState.sepSurplusFarm += newWeight
              }));
            } else if (year === time && month === "Oct" && st === "Surplus Farm" && (los === "Surplus Food" || los === "Surplus Local Produce")){
              this.setState( (prevState) => ({
                octSurplusFarm: prevState.octSurplusFarm += newWeight
              }));
            } else if (year === time && month === "Nov" && st === "Surplus Farm" && (los === "Surplus Food" || los === "Surplus Local Produce")){
              this.setState( (prevState) => ({
                novSurplusFarm: prevState.novSurplusFarm += newWeight
              }));
            } else if (year === time && month === "Dec" && st === "Surplus Farm" && (los === "Surplus Food" || los === "Surplus Local Produce")){
              this.setState( (prevState) => ({
                decSurplusFarm: prevState.decSurplusFarm += newWeight
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
                  ['January', this.state.janSurplusFarm],
                  ['February', this.state.febSurplusFarm],
                  ['March', this.state.marSurplusFarm],
                  ['April', this.state.aprSurplusFarm],
                  ['May', this.state.maySurplusFarm],
                  ['June', this.state.junSurplusFarm],
                  ['July', this.state.julSurplusFarm],
                  ['August', this.state.augSurplusFarm],
                  ['September', this.state.sepSurplusFarm],
                  ['October', this.state.octSurplusFarm],
                  ['November', this.state.novSurplusFarm],
                  ['December', this.state.decSurplusFarm],
                ]}
                options={{
                  // backgroundColor: 'lightgray',
                  title: 'This year\'s Food Surplus Weight Saved Performance (' + time + ', Farm)',
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
                  <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthSurplusFarm">View Previous (Monthly Surplus Weight)</Button>
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
                    ['Jan', this.state.janSurplusFarm],
                    ['Feb', this.state.febSurplusFarm],
                    ['Mar', this.state.marSurplusFarm],
                    ['Apr', this.state.aprSurplusFarm],
                    ['May', this.state.maySurplusFarm],
                    ['Jun', this.state.junSurplusFarm],
                    ['Jul', this.state.julSurplusFarm],
                    ['Aug', this.state.augSurplusFarm],
                    ['Sep', this.state.sepSurplusFarm],
                    ['Oct', this.state.octSurplusFarm],
                    ['Nov', this.state.novSurplusFarm],
                    ['Dec', this.state.decSurplusFarm],
                ]}
                options={{
                  // backgroundColor: 'lightgray',
                  title: 'Food Surplus Weight Saved Performance (' + time + ', Farm)',
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
                  <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthSurplusFarm">Prev</Button>
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

export default connect(mapStateToProps, null)(Chart80);