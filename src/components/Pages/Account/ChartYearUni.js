import React, {Component} from 'react'
import { BrowserView, MobileView } from 'react-device-detect'
import {Chart} from "react-google-charts"
import styled from "styled-components"
import { Button, ButtonGroup } from 'react-bootstrap';
import "../Pages.css"
import "../../../App.css";
import {Link} from "react-router-dom"
import {Card} from "react-bootstrap"

import moment from "moment"

import { connect } from 'react-redux';
import {fs} from "../../../config/fbConfig"

const time = moment().format("YYYY")

class Chart41 extends Component {

  state = {
    uid: this.props.auth.uid,
    janWeightUni: 0,
    febWeightUni: 0,
    marWeightUni: 0,
    aprWeightUni: 0,
    mayWeightUni: 0,
    junWeightUni: 0,
    julWeightUni: 0,
    augWeightUni: 0,
    sepWeightUni: 0,
    octWeightUni: 0,
    novWeightUni: 0,
    decWeightUni: 0,
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

            if (year === time && month === "Jan" && st === "Waste Academic"){
              this.setState( (prevState) => ({
                janWeightUni: prevState.janWeightUni += newWeight
              }));
            } else if (year === time && month === "Feb" && st === "Waste Academic"){
              this.setState( (prevState) => ({
                febWeightUni: prevState.febWeightUni += newWeight
              }));
            } else if (year === time && month === "Mar" && st === "Waste Academic"){
              this.setState( (prevState) => ({
                marWeightUni: prevState.marWeightUni += newWeight
              }));
            } else if (year === time && month === "Apr" && st === "Waste Academic"){
              this.setState( (prevState) => ({
                aprWeightUni: prevState.aprWeightUni += newWeight
              }));
            } else if (year === time && month === "May" && st === "Waste Academic"){
              this.setState( (prevState) => ({
                mayWeightUni: prevState.mayWeightUni += newWeight
              }));
            } else if (year === time && month === "Jun" && st === "Waste Academic"){
              this.setState( (prevState) => ({
                junWeightUni: prevState.junWeightUni += newWeight
              }));
            } else if (year === time && month === "Jul" && st === "Waste Academic"){
              this.setState( (prevState) => ({
                julWeightUni: prevState.julWeightUni += newWeight
              }));
            } else if (year === time && month === "Aug" && st === "Waste Academic"){
              this.setState( (prevState) => ({
                augWeightUni: prevState.augWeightUni += newWeight
              }));
            } else if (year === time && month === "Sep" && st === "Waste Academic"){
              this.setState( (prevState) => ({
                sepWeightUni: prevState.sepWeightUni += newWeight
              }));
            } else if (year === time && month === "Oct" && st === "Waste Academic"){
              this.setState( (prevState) => ({
                octWeightUni: prevState.octWeightUni += newWeight
              }));
            } else if (year === time && month === "Nov" && st === "Waste Academic"){
              this.setState( (prevState) => ({
                novWeightUni: prevState.novWeightUni += newWeight
              }));
            } else if (year === time && month === "Dec" && st === "Waste Academic"){
              this.setState( (prevState) => ({
                decWeightUni: prevState.decWeightUni += newWeight
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

              <div style={{height: "120%", marginBottom: "2.5%", marginLeft: "10%"}}>

                <Chart className='bar-chart'
                  width={'78vw'}
                  height={'600px'}
                  chartType="ColumnChart"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['Month', 'Food Wastage Weight'],
                    ['January', this.state.janWeightUni],
                    ['February', this.state.febWeightUni],
                    ['March', this.state.marWeightUni],
                    ['April', this.state.aprWeightUni],
                    ['May', this.state.mayWeightUni],
                    ['June', this.state.junWeightUni],
                    ['July', this.state.julWeightUni],
                    ['August', this.state.augWeightUni],
                    ['September', this.state.sepWeightUni],
                    ['October', this.state.octWeightUni],
                    ['November', this.state.novWeightUni],
                    ['December', this.state.decWeightUni],
                  ]}
                  options={{
                    // backgroundColor: 'lightgray',
                    title: 'This year\'s Food Wastage Performance (' + time + ', Academic)',
                    chartArea: { width: '75%' },
                    colors: ['#aab41e'],
                    hAxis: {
                      title: 'Month of ' + time,
                      minValue: 0,
                    },
                    vAxis: {
                      title: 'Weight of Food Wastage (kg)',
                    },
                  }}
                  legendToggle
                />

              </div>

            <div style={{height: "40px", marginBottom: "10%"}}>
              <Card  style={{width: '78vw', height: '35px', marginBottom: "10%", marginLeft: '10%', padding: "2.5% 5% 2.5% 5%", justifyContent: "center"}}>
                <ButtonGroup>
                  <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/month">View Previous (Monthly Weight)</Button>
                  <Button style={{width: "7.5%"}} className="custom-btn" as={Link} to="/account">Back</Button>
                  <Button style={{width: "15%"}} disabled>View Next</Button>
                </ButtonGroup>
              </Card>
            </div>

          </BrowserView>
            
          <MobileView>

              <div style={{height: "120%", marginBottom: "2.5%", marginLeft: "5.5%"}}>

                <Chart className='bar-chart'
                  width={'90vw'}
                  height={'600px'}
                  chartType="ColumnChart"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['Month', 'Weight '],
                    ['Jan', this.state.janWeightUni],
                    ['Feb', this.state.febWeightUni],
                    ['Mar', this.state.marWeightUni],
                    ['Apr', this.state.aprWeightUni],
                    ['May', this.state.mayWeightUni],
                    ['Jun', this.state.junWeightUni],
                    ['Jul', this.state.julWeightUni],
                    ['Aug', this.state.augWeightUni],
                    ['Sep', this.state.sepWeightUni],
                    ['Oct', this.state.octWeightUni],
                    ['Nov', this.state.novWeightUni],
                    ['Dec', this.state.decWeightUni],
                  ]}
                  options={{
                    // backgroundColor: 'lightgray',
                    title: 'Food Wastage Performance (' + time + ', Uni)',
                    chartArea: { width: '62.5%' },
                    legend: 'none',
                    colors: ['#aab41e'],
                    hAxis: {
                      title: 'Month of ' + time,
                      minValue: 0,
                    },
                    vAxis: {
                      title: 'Weight of Food Wastage (kg)',
                    },
                  }}
                  legendToggle
                />

              </div>

            <div style={{height: "95px", marginBottom: "10%"}}>
              <Card  style={{width: '90vw', height: '95px', marginBottom: "10%", marginLeft: '5.5%', padding: "2.5% 5% 2.5% 5%", justifyContent: "center"}}>
                <ButtonGroup>
                  <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/month">Prev</Button>
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

export default connect(mapStateToProps, null)(Chart41);
