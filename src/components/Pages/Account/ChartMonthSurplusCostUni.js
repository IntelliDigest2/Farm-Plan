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

const time = moment().format("MMM")
const fullMonth = moment().format("MMMM")

class Chart57 extends Component {

    state = {
        uid: this.props.auth.uid,
        week1SurplusCostUni: 0,
        week2SurplusCostUni: 0,
        week3SurplusCostUni: 0,
        week4SurplusCostUni: 0,
        monthEnd: ""
    }

    fetchData = async () => {
        fs.collection('data').doc(this.state.uid).collection('writtenFoodWasteData')
          .get()
          .then( snapshot => {

            snapshot.forEach(doc => {

                var month = doc.data().MONTH
                var mdate = doc.data().MDATE
                var cost = doc.data().COST
                var curr = doc.data().CURRENCY
                // var isSurplus = doc.data().EDIBLEORINEDIBLE

                var st = doc.data().SUBMISSIONTYPE
                var los = doc.data().LOCALORNOT

                var newCost = 0;

                if (curr === "GBP (£)"){
                    newCost = Number(cost*1)
                } else if (curr === "USD ($)"){
                    newCost = Number((cost/1.404).toFixed(2))
                } else if (curr === "EUR (€)"){
                    newCost = Number((cost/1.161).toFixed(2))
                }

                if (month === time && (mdate === "1st" || mdate === "2nd" || mdate === "3rd" || mdate === "4th" || mdate === "5th" || mdate === "6th" || mdate === "7th") && st === "Surplus Academic" && los === "Surplus"){
                  this.setState( (prevState) => ({
                    week1SurplusCostUni: prevState.week1SurplusCostUni += newCost
                  }));
                } else if (month === time && (mdate === "8th" || mdate === "9th" || mdate === "10th" || mdate === "11th" || mdate === "12th" || mdate === "13th" || mdate === "14th") && st === "Surplus Academic" && los === "Surplus"){
                  this.setState( (prevState) => ({
                    week2SurplusCostUni: prevState.week2SurplusCostUni += newCost
                  }));
                } else if (month === time && (mdate === "15th" || mdate === "16th" || mdate === "17th" || mdate === "18th" || mdate === "19th" || mdate === "20th" || mdate === "21st") && st === "Surplus Academic" && los === "Surplus"){
                  this.setState( (prevState) => ({
                    week3SurplusCostUni: prevState.week3SurplusCostUni += newCost
                  }));
                } else if (month === time && (mdate === "22nd" || mdate === "23rd" || mdate === "24th" || mdate === "25th" || mdate === "26th" || mdate === "27th" || mdate === "28th" || mdate === "29th" || mdate === "30th" || mdate === "31st") && st === "Surplus Academic" && los === "Surplus"){
                  this.setState( (prevState) => ({
                    week4SurplusCostUni: prevState.week4SurplusCostUni += newCost
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
                                ['Week/Period', 'Food Surplus Costs Saved'],
                                ['1st-7th', this.state.week1SurplusCostUni],
                                ['8th-14th', this.state.week2SurplusCostUni],
                                ['15th-21st', this.state.week3SurplusCostUni],
                                ['22nd-'+this.state.monthEnd, this.state.week4SurplusCostUni],
                            ]}
                            options={{
                                title: 'This month\'s Food Surplus Costs Saved Performance (' + fullMonth + ', Academic)',
                                chartArea: {width: '50%'},
                                colors: ['rgb(13, 27, 92)'],
                                hAxis: {
                                    title: 'Week/Period of ' + fullMonth,
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
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/weekSurplusCostUni">View Previous (Weekly Surplus Cost)</Button>
                            <Button style={{width: "7.5%"}} className="custom-btn" as={Link} to="/account">Back</Button>
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/yearSurplusCostUni">View Next (Yearly Surplus Cost)</Button>
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
                                ['Week/Period', 'Costs Saved '],
                                ['1st-7th', this.state.week1SurplusCostUni],
                                ['8th-14th', this.state.week2SurplusCostUni],
                                ['15th-21st', this.state.week3SurplusCostUni],
                                ['22nd-'+this.state.monthEnd, this.state.week4SurplusCostUni],
                            ]}
                            options={{
                                title: 'Food Surplus Costs Saved Performance (' + fullMonth + ', Uni)',
                                chartArea: {width: '50%'},
                                colors: ['rgb(13, 27, 92)'],
                                legend: "none",
                                hAxis: {
                                    title: 'Week/Period of ' + fullMonth,
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
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/weekSurplusCostUni">Prev</Button>
                            <Button style={{width: "7.5%"}} className="custom-btn" as={Link} to="/account">Back</Button>
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/yearSurplusCostUni">Next</Button>
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

export default connect(mapStateToProps, null)(Chart57);