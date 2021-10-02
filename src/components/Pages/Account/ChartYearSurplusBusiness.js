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

class Chart68 extends Component {

  state = {
    uid: this.props.auth.uid,
    janSurplusBusiness: 0,
    febSurplusBusiness: 0,
    marSurplusBusiness: 0,
    aprSurplusBusiness: 0,
    maySurplusBusiness: 0,
    junSurplusBusiness: 0,
    julSurplusBusiness: 0,
    augSurplusBusiness: 0,
    sepSurplusBusiness: 0,
    octSurplusBusiness: 0,
    novSurplusBusiness: 0,
    decSurplusBusiness: 0,
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

            if (year === time && month === "Jan" && st === "Surplus Business" && (los === "Surplus Food" || los === "Surplus Local Produce")){
              this.setState( (prevState) => ({
                janSurplusBusiness: prevState.janSurplusBusiness += newWeight
              }));
            } else if (year === time && month === "Feb" && st === "Surplus Business" && (los === "Surplus Food" || los === "Surplus Local Produce")){
              this.setState( (prevState) => ({
                febSurplusBusiness: prevState.febSurplusBusiness += newWeight
              }));
            } else if (year === time && month === "Mar" && st === "Surplus Business" && (los === "Surplus Food" || los === "Surplus Local Produce")){
              this.setState( (prevState) => ({
                marSurplusBusiness: prevState.marSurplusBusiness += newWeight
              }));
            } else if (year === time && month === "Apr" && st === "Surplus Business" && (los === "Surplus Food" || los === "Surplus Local Produce")){
              this.setState( (prevState) => ({
                aprSurplusBusiness: prevState.aprSurplusBusiness += newWeight
              }));
            } else if (year === time && month === "May" && st === "Surplus Business" && (los === "Surplus Food" || los === "Surplus Local Produce")){
              this.setState( (prevState) => ({
                maySurplusBusiness: prevState.maySurplusBusiness += newWeight
              }));
            } else if (year === time && month === "Jun" && st === "Surplus Business" && (los === "Surplus Food" || los === "Surplus Local Produce")){
              this.setState( (prevState) => ({
                junSurplusBusiness: prevState.junSurplusBusiness += newWeight
              }));
            } else if (year === time && month === "Jul" && st === "Surplus Business" && (los === "Surplus Food" || los === "Surplus Local Produce")){
              this.setState( (prevState) => ({
                julSurplusBusiness: prevState.julSurplusBusiness += newWeight
              }));
            } else if (year === time && month === "Aug" && st === "Surplus Business" && (los === "Surplus Food" || los === "Surplus Local Produce")){
              this.setState( (prevState) => ({
                augSurplusBusiness: prevState.augSurplusBusiness += newWeight
              }));
            } else if (year === time && month === "Sep" && st === "Surplus Business" && (los === "Surplus Food" || los === "Surplus Local Produce")){
              this.setState( (prevState) => ({
                sepSurplusBusiness: prevState.sepSurplusBusiness += newWeight
              }));
            } else if (year === time && month === "Oct" && st === "Surplus Business" && (los === "Surplus Food" || los === "Surplus Local Produce")){
              this.setState( (prevState) => ({
                octSurplusBusiness: prevState.octSurplusBusiness += newWeight
              }));
            } else if (year === time && month === "Nov" && st === "Surplus Business" && (los === "Surplus Food" || los === "Surplus Local Produce")){
              this.setState( (prevState) => ({
                novSurplusBusiness: prevState.novSurplusBusiness += newWeight
              }));
            } else if (year === time && month === "Dec" && st === "Surplus Business" && (los === "Surplus Food" || los === "Surplus Local Produce")){
              this.setState( (prevState) => ({
                decSurplusBusiness: prevState.decSurplusBusiness += newWeight
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
                  ['January', this.state.janSurplusBusiness],
                  ['February', this.state.febSurplusBusiness],
                  ['March', this.state.marSurplusBusiness],
                  ['April', this.state.aprSurplusBusiness],
                  ['May', this.state.maySurplusBusiness],
                  ['June', this.state.junSurplusBusiness],
                  ['July', this.state.julSurplusBusiness],
                  ['August', this.state.augSurplusBusiness],
                  ['September', this.state.sepSurplusBusiness],
                  ['October', this.state.octSurplusBusiness],
                  ['November', this.state.novSurplusBusiness],
                  ['December', this.state.decSurplusBusiness],
                ]}
                options={{
                  // backgroundColor: 'lightgray',
                  title: 'This year\'s Food Surplus Weight Saved Performance (' + time + ', Business)',
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
                  <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthSurplusBusiness">View Previous (Monthly Surplus Weight)</Button>
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
                    ['Jan', this.state.janSurplusBusiness],
                    ['Feb', this.state.febSurplusBusiness],
                    ['Mar', this.state.marSurplusBusiness],
                    ['Apr', this.state.aprSurplusBusiness],
                    ['May', this.state.maySurplusBusiness],
                    ['Jun', this.state.junSurplusBusiness],
                    ['Jul', this.state.julSurplusBusiness],
                    ['Aug', this.state.augSurplusBusiness],
                    ['Sep', this.state.sepSurplusBusiness],
                    ['Oct', this.state.octSurplusBusiness],
                    ['Nov', this.state.novSurplusBusiness],
                    ['Dec', this.state.decSurplusBusiness],
                ]}
                options={{
                  // backgroundColor: 'lightgray',
                  title: 'Food Surplus Weight Saved Performance (' + time + ', Business)',
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
                  <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthSurplusBusiness">Prev</Button>
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

export default connect(mapStateToProps, null)(Chart68);