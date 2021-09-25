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

class Chart45 extends Component {

    state = {
        uid: this.props.auth.uid,
        week1GHGUni: 0,
        week2GHGUni: 0,
        week3GHGUni: 0,
        week4GHGUni: 0,

        monthEnd: ""
    }

    fetchData = async () => {
        fs.collection('data').doc(this.state.uid).collection('writtenFoodWasteData')
          .get()
          .then( snapshot => {

            snapshot.forEach(doc => {

                var month = doc.data().MONTH
                var mdate = doc.data().MDATE
                var ghg = doc.data().GHG
                // var isSurplus = doc.data().EDIBLEORINEDIBLE

                var st = doc.data().SUBMISSIONTYPE

                if (month === time && (mdate === "1st" || mdate === "2nd" || mdate === "3rd" || mdate === "4th" || mdate === "5th" || mdate === "6th" || mdate === "7th") && st === "Waste Academic"){
                  this.setState( (prevState) => ({
                    week1GHGUni: prevState.week1GHGUni += ghg
                  }));
                } else if (month === time && (mdate === "8th" || mdate === "9th" || mdate === "10th" || mdate === "11th" || mdate === "12th" || mdate === "13th" || mdate === "14th") && st === "Waste Academic"){
                  this.setState( (prevState) => ({
                    week2GHGUni: prevState.week2GHGUni += ghg
                  }));
                } else if (month === time && (mdate === "15th" || mdate === "16th" || mdate === "17th" || mdate === "18th" || mdate === "19th" || mdate === "20th" || mdate === "21st") && st === "Waste Academic"){
                  this.setState( (prevState) => ({
                    week3GHGUni: prevState.week3GHGUni += ghg
                  }));
                } else if (month === time && (mdate === "22nd" || mdate === "23rd" || mdate === "24th" || mdate === "25th" || mdate === "26th" || mdate === "27th" || mdate === "28th" || mdate === "29th" || mdate === "30th" || mdate === "31st") && st === "Waste Academic"){
                  this.setState( (prevState) => ({
                    week4GHGUni: prevState.week4GHGUni += ghg
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

                      <div style={{height: "120%", marginBottom: "2.5%", marginLeft: "10%"}}>
                        <Chart className="bar-chart"
                            width={'78vw'}
                            height={'600px'}
                            chartType="ColumnChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['Week/Period', 'Food Wastage GHG'],
                                ['1st-7th', this.state.week1GHGUni],
                                ['8th-14th', this.state.week2GHGUni],
                                ['15th-21st', this.state.week3GHGUni],
                                ['22nd-'+this.state.monthEnd, this.state.week4GHGUni],
                            ]}
                            options={{
                                title: 'This month\'s Food Wastage GHG Performance (' + fullMonth + ', Academic)',
                                chartArea: {width: '50%'},
                                colors: ['#aab41e'],
                                hAxis: {
                                    title: 'Week/Period of ' + fullMonth,
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'GHG Emissions of Food Wastage (kg co2)'
                                }
                            }}
                            legendToggle
                        />
                      </div>

                    <div style={{height: "40px", marginBottom: "10%"}}>
                        <Card  style={{width: '78vw', height: '35px', marginBottom: "10%", marginLeft: '10%', padding: "2.5% 5% 2.5% 5%", justifyContent: "center"}}>
                        <ButtonGroup>
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/weekGHGUni">View Previous (Weekly GHG)</Button>
                            <Button style={{width: "7.5%"}} className="custom-btn" as={Link} to="/account">Back</Button>
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/yearGHGUni">View Next (Yearly GHG)</Button>
                        </ButtonGroup>
                        </Card>
                    </div>

                </BrowserView>

                <MobileView>

                      <div style={{height: "120%", marginBottom: "2.5%", marginLeft: "10%"}}>
                        <Chart className="bar-chart"
                            width={'78vw'}
                            height={'600px'}
                            chartType="ColumnChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['Week/Period', 'GHG '],
                                ['1st-7th', this.state.week1GHGUni],
                                ['8th-14th', this.state.week2GHGUni],
                                ['15th-21st', this.state.week3GHGUni],
                                ['22nd-'+this.state.monthEnd, this.state.week4GHGUni],
                            ]}
                            options={{
                                title: 'Food Wastage GHG Performance (' + fullMonth + ', Uni)',
                                chartArea: {width: '50%'},
                                colors: ['#aab41e'],
                                legend: "none",
                                hAxis: {
                                    title: 'Week/Period of ' + fullMonth,
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'GHG Emissions of Food Wastage (kg co2)'
                                }
                            }}
                        />
                      </div>

                    <div style={{height: "95px", marginBottom: "15%"}}>
                        <Card  style={{width: '78vw', height: '95px', marginBottom: "15%", marginLeft: '10%', padding: "2.5% 5% 2.5% 5%", justifyContent: "center"}}>
                        <ButtonGroup>
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/weekGHGUni">Prev</Button>
                            <Button style={{width: "7.5%"}} className="custom-btn" as={Link} to="/account">Back</Button>
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/yearGHGUni">Next</Button>
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

export default connect(mapStateToProps, null)(Chart45);