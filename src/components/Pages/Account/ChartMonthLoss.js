import React, {Component} from 'react'
import { BrowserView, MobileView } from 'react-device-detect'
import {Chart} from "react-google-charts"
import styled from "styled-components"
// import { Row, Col } from 'react-bootstrap';

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

class Chart29 extends Component {

    state = {
        uid: this.props.auth.uid,
        week1Weight: 0,
        week2Weight: 0,
        week3Weight: 0,
        week4Weight: 0,
        monthEnd: ""
    }

    fetchData = async () => {
        fs.collection('data').doc(this.state.uid).collection('writtenFoodSurplusData')
        .get()
        .then( snapshot => {
          snapshot.forEach(doc => {
  
            var month = doc.data().MONTH
            var mdate = doc.data().MDATE
            var weight = doc.data().weight
            var wu = doc.data().WEIGHTUNIT
            // var isSurplus = doc.data().EDIBLEORINEDIBLE
  
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

            if (month === time && (mdate === "1st" || mdate === "2nd" || mdate === "3rd" || mdate === "4th" || mdate === "5th" || mdate === "6th" || mdate === "7th")){
                this.setState( (prevState) => ({
                  week1Weight: prevState.week1Weight += newWeight
                }));
              } else if (month === time && (mdate === "8th" || mdate === "9th" || mdate === "10th" || mdate === "11th" || mdate === "12th" || mdate === "13th" || mdate === "14th")){
                this.setState( (prevState) => ({
                  week2Weight: prevState.week2Weight += newWeight
                }));
              } else if (month === time && (mdate === "15th" || mdate === "16th" || mdate === "17th" || mdate === "18th" || mdate === "19th" || mdate === "20th" || mdate === "21st")){
                this.setState( (prevState) => ({
                  week3Weight: prevState.week3Weight += newWeight
                }));
              } else if (month === time && (mdate === "22nd" || mdate === "23rd" || mdate === "24th" || mdate === "25th" || mdate === "26th" || mdate === "27th" || mdate === "28th" || mdate === "29th" || mdate === "30th" || mdate === "31st")){
                this.setState( (prevState) => ({
                  week4Weight: prevState.week4Weight += newWeight
                }));
              }

            })
        })
        .catch(error => console.log(error))
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
                            ['Week/Period', 'Food Loss Weight'],
                            ['1st-7th', this.state.week1Weight],
                            ['8th-14th', this.state.week2Weight],
                            ['15th-21st', this.state.week3Weight],
                            ['22nd-'+this.state.monthEnd, this.state.week4Weight],
                        ]}
                        options={{
                            title: 'This month\'s Food Loss Weight Performance (' + fullMonth + ' 2021)',
                            chartArea: {width: '50%'},
                            colors: ['#aab41e'],
                            hAxis: {
                                title: 'Week/Period of ' + fullMonth,
                                minValue: 0,
                            },
                            vAxis: {
                                title: 'Weight of Food Loss (kg)'
                            }
                        }}
                        legendToggle
                    />
                  </div>
                {/* </ChartStyle> */}

                <div style={{height: "40px", marginBottom: "10%"}}>
                  <Card  style={{width: '78vw', height: '35px', marginBottom: "10%", marginLeft: '10%', padding: "2.5% 5% 2.5% 5%", justifyContent: "center"}}>
                    <ButtonGroup>
                      <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/weekLoss">View Previous (Weekly Loss Weight)</Button>
                      <Button style={{width: "7.5%"}} className="custom-btn" as={Link} to="/account">Back</Button>
                      <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/yearLoss">View Next (Yearly Loss Weight)</Button>
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
                            ['Week/Period', 'Weight '],
                            ['1st-7th', this.state.week1Weight],
                            ['8th-14th', this.state.week2Weight],
                            ['15th-21st', this.state.week3Weight],
                            ['22nd-'+this.state.monthEnd, this.state.week4Weight],
                        ]}
                        options={{
                            title: 'Food Loss Weight Performance (' + fullMonth + ' 2021)',
                            chartArea: {width: '50%'},
                            colors: ['#aab41e'],
                            legend: "none",
                            hAxis: {
                                title: 'Week/Period of ' + fullMonth,
                                minValue: 0,
                            },
                            vAxis: {
                                title: 'Weight of Food Loss (kg)'
                            }
                        }}
                    />
                  </div>
                {/* </ChartStyle> */}

                <div style={{height: "95px", marginBottom: "10%"}}>
                  <Card  style={{width: '78vw', height: '95px', marginBottom: "10%", marginLeft: '10%', padding: "2.5% 5% 2.5% 5%", justifyContent: "center"}}>
                    <ButtonGroup>
                      <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/weekLoss">Prev</Button>
                      <Button style={{width: "7.5%"}} className="custom-btn" as={Link} to="/account">Back</Button>
                      <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/yearLoss">Next</Button>
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
  }
}

export default connect(mapStateToProps, null)(Chart29);