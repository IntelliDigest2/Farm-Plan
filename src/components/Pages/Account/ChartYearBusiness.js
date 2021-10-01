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

class Chart59 extends Component {

  state = {
    uid: this.props.auth.uid,
    janWeightBusiness: 0,
    febWeightBusiness: 0,
    marWeightBusiness: 0,
    aprWeightBusiness: 0,
    mayWeightBusiness: 0,
    junWeightBusiness: 0,
    julWeightBusiness: 0,
    augWeightBusiness: 0,
    sepWeightBusiness: 0,
    octWeightBusiness: 0,
    novWeightBusiness: 0,
    decWeightBusiness: 0,
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

            if (year === time && month === "Jan" && st === "Waste Business"){
              this.setState( (prevState) => ({
                janWeightBusiness: prevState.janWeightBusiness += newWeight
              }));
            } else if (year === time && month === "Feb" && st === "Waste Business"){
              this.setState( (prevState) => ({
                febWeightBusiness: prevState.febWeightBusiness += newWeight
              }));
            } else if (year === time && month === "Mar" && st === "Waste Business"){
              this.setState( (prevState) => ({
                marWeightBusiness: prevState.marWeightBusiness += newWeight
              }));
            } else if (year === time && month === "Apr" && st === "Waste Business"){
              this.setState( (prevState) => ({
                aprWeightBusiness: prevState.aprWeightBusiness += newWeight
              }));
            } else if (year === time && month === "May" && st === "Waste Business"){
              this.setState( (prevState) => ({
                mayWeightBusiness: prevState.mayWeightBusiness += newWeight
              }));
            } else if (year === time && month === "Jun" && st === "Waste Business"){
              this.setState( (prevState) => ({
                junWeightBusiness: prevState.junWeightBusiness += newWeight
              }));
            } else if (year === time && month === "Jul" && st === "Waste Business"){
              this.setState( (prevState) => ({
                julWeightBusiness: prevState.julWeightBusiness += newWeight
              }));
            } else if (year === time && month === "Aug" && st === "Waste Business"){
              this.setState( (prevState) => ({
                augWeightBusiness: prevState.augWeightBusiness += newWeight
              }));
            } else if (year === time && month === "Sep" && st === "Waste Business"){
              this.setState( (prevState) => ({
                sepWeightBusiness: prevState.sepWeightBusiness += newWeight
              }));
            } else if (year === time && month === "Oct" && st === "Waste Business"){
              this.setState( (prevState) => ({
                octWeightBusiness: prevState.octWeightBusiness += newWeight
              }));
            } else if (year === time && month === "Nov" && st === "Waste Business"){
              this.setState( (prevState) => ({
                novWeightBusiness: prevState.novWeightBusiness += newWeight
              }));
            } else if (year === time && month === "Dec" && st === "Waste Business"){
              this.setState( (prevState) => ({
                decWeightBusiness: prevState.decWeightBusiness += newWeight
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
                  ['Month', 'Food Wastage Weight'],
                  ['January', this.state.janWeightBusiness],
                  ['February', this.state.febWeightBusiness],
                  ['March', this.state.marWeightBusiness],
                  ['April', this.state.aprWeightBusiness],
                  ['May', this.state.mayWeightBusiness],
                  ['June', this.state.junWeightBusiness],
                  ['July', this.state.julWeightBusiness],
                  ['August', this.state.augWeightBusiness],
                  ['September', this.state.sepWeightBusiness],
                  ['October', this.state.octWeightBusiness],
                  ['November', this.state.novWeightBusiness],
                  ['December', this.state.decWeightBusiness],
                ]}
                options={{
                  // backgroundColor: 'lightgray',
                  title: 'This year\'s Food Wastage Performance (' + time + ')',
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
            {/* </ChartStyle> */}

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
            {/* <ChartStyle> */}
            <div style={{height: "120%", marginBottom: "2.5%", marginLeft: "5.5%"}}>

              <Chart className='bar-chart'
                width={'90vw'}
                height={'600px'}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ['Month', 'Weight '],
                  ['Jan', this.state.janWeightBusiness],
                  ['Feb', this.state.febWeightBusiness],
                  ['Mar', this.state.marWeightBusiness],
                  ['Apr', this.state.aprWeightBusiness],
                  ['May', this.state.mayWeightBusiness],
                  ['Jun', this.state.junWeightBusiness],
                  ['Jul', this.state.julWeightBusiness],
                  ['Aug', this.state.augWeightBusiness],
                  ['Sep', this.state.sepWeightBusiness],
                  ['Oct', this.state.octWeightBusiness],
                  ['Nov', this.state.novWeightBusiness],
                  ['Dec', this.state.decWeightBusiness],
                ]}
                options={{
                  // backgroundColor: 'lightgray',
                  title: 'Food Wastage Performance (' + time + ')',
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
            {/* </ChartStyle> */}

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

export default connect(mapStateToProps, null)(Chart59);