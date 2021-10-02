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

const time = moment().format("MMM")
const fullMonth = moment().format("MMMM")

class Chart60 extends Component {

  state = {
    uid: this.props.auth.uid,
    weeks: [],
    week1WeightBusiness: 0,
    week2WeightBusiness: 0,
    week3WeightBusiness: 0,
    week4WeightBusiness: 0,
    // week5Weight: 0,
    // chartData: [["Week/Period", "Food Wastage Weight"]],
    monthEnd: "",
  }

  fetchData = async () => {

    fs.collection('data').doc(this.state.uid).collection('writtenFoodWasteData')
      .get()
      .then( snapshot => {
        snapshot.forEach(doc => {

          var month = doc.data().MONTH
          var mdate = doc.data().MDATE
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

          if (month === time && (mdate === "1st" || mdate === "2nd" || mdate === "3rd" || mdate === "4th" || mdate === "5th" || mdate === "6th" || mdate === "7th") && st === "Waste Business"){
            this.setState( (prevState) => ({
              week1WeightBusiness: prevState.week1WeightBusiness += newWeight
            }));
          } else if (month === time && (mdate === "8th" || mdate === "9th" || mdate === "10th" || mdate === "11th" || mdate === "12th" || mdate === "13th" || mdate === "14th") && st === "Waste Business"){
            this.setState( (prevState) => ({
              week2WeightBusiness: prevState.week2WeightBusiness += newWeight
            }));
          } else if (month === time && (mdate === "15th" || mdate === "16th" || mdate === "17th" || mdate === "18th" || mdate === "19th" || mdate === "20th" || mdate === "21st") && st === "Waste Business"){
            this.setState( (prevState) => ({
              week3WeightBusiness: prevState.week3WeightBusiness += newWeight
            }));
          } else if (month === time && (mdate === "22nd" || mdate === "23rd" || mdate === "24th" || mdate === "25th" || mdate === "26th" || mdate === "27th" || mdate === "28th" || mdate === "29th" || mdate === "30th" || mdate === "31st") && st === "Waste Business"){
            this.setState( (prevState) => ({
              week4WeightBusiness: prevState.week4WeightBusiness += newWeight
            }));
          } 

        })
      })

  }
  
  componentDidMount(){
    this.fetchData();

    if (time === "Jan" || time === "Mar" || time === "May" || time === "Jul" || time === "Aug" || time === "Oct" || time === "Dec"){
      this.setState({monthEnd: "31st"})
    } else if (time === "Apr" || time === "Jun" || time === "Sep" || time === "Nov"){
      this.setState({monthEnd: "30th"})
    } else if (time === "Feb"){
      this.setState({monthEnd: "28th"})
    }
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
                  ['Week/Period', 'Food Wastage Weight'],
                  ['1st-7th', this.state.week1WeightBusiness],
                  ['8th-14th', this.state.week2WeightBusiness],
                  ['15th-21st', this.state.week3WeightBusiness],
                  ['22nd-'+this.state.monthEnd, this.state.week4WeightBusiness],
                ]}
                options={{
                  // backgroundColor: 'lightgray',
                  title: 'This month\'s Food Wastage Performance (' + fullMonth + ' 2021, Business)',
                  chartArea: { width: '50%' },
                  colors: ['#aab41e'],
                  hAxis: {
                    title: 'Week/Period of ' + fullMonth,
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
                  <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/weekBusiness">View Previous (Weekly Weight)</Button>
                  <Button style={{width: "7.5%"}} className="custom-btn" as={Link} to="/account">Back</Button>
                  <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/yearBusiness">View Next (Yearly Weight)</Button>
                </ButtonGroup>
              </Card>
            </div>

          </BrowserView>

          <MobileView>
            {/* <ChartStyle> */}
            <div style={{height: "120%", marginBottom: "2.5%", marginLeft: "10%"}}>

              <Chart className='bar-chart'
                width={'78vw'}
                height={'600px'}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ['Week/Period', 'Weight '],
                  ['1st-7th', this.state.week1WeightBusiness],
                  ['8th-14th', this.state.week2WeightBusiness],
                  ['15th-21st', this.state.week3WeightBusiness],
                  ['22nd-'+this.state.monthEnd, this.state.week4WeightBusiness],
                ]}
                options={{
                  // backgroundColor: 'lightgray',
                  title: 'Food Wastage Performance (' + fullMonth + ' 2021, Business)',
                  chartArea: { width: '50%' },
                  legend: 'none',
                  colors: ['#aab41e'],
                  hAxis: {
                    title: 'Week/Period of ' + fullMonth,
                    minValue: 0,
                  },
                  vAxis: {
                    title: 'Weight of Food Wastage (kg)',
                  },
                }}
                // legendToggle
              />

            </div>
            {/* </ChartStyle> */}

            <div style={{height: "95px", marginBottom: "10%"}}>
              <Card  style={{width: '78vw', height: '95px', marginBottom: "10%", marginLeft: '10%', padding: "2.5% 5% 2.5% 5%", justifyContent: "center"}}>
                <ButtonGroup>
                  <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/weekBusiness">Prev</Button>
                  <Button style={{width: "7.5%"}} className="custom-btn" as={Link} to="/account">Back</Button>
                  <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/yearBusiness">Next</Button>
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

  .area-chart{
    padding: 10px;
  }
`;

const mapStateToProps = (state) => { 
  return{
      auth: state.firebase.auth,
  }
}

export default connect(mapStateToProps, null)(Chart60);