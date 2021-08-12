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

class Chart11 extends Component {

    state = {
        uid: this.props.auth.uid,
        mondayCost: 0,
        tuesdayCost: 0,
        wednesdayCost: 0,
        thursdayCost: 0,
        fridayCost: 0,
        saturdayCost: 0,
        sundayCost: 0,
        prevOption: ""
    }

    fetchData = async () => {
        fs.collection('data').doc(this.state.uid).collection('writtenFoodWasteData')
          .get()
          .then( snapshot => {

            snapshot.forEach(doc => {

                var week = doc.data().WEEK
                var day = doc.data().WDAY
                var cost = doc.data().COST
                var curr = doc.data().CURRENCY
                var isSurplus = doc.data().EDIBLEORINEDIBLE

                var newCost = 0;

                if (curr === "GBP (£)"){
                    newCost = Number(cost*1)
                } else if (curr === "USD ($)"){
                    newCost = Number((cost/1.404).toFixed(2))
                } else if (curr === "EUR (€)"){
                    newCost = Number((cost/1.161).toFixed(2))
                }

                // var carbCon = doc.data().CARBSCONTENT
                // var proCon = doc.data().PROTEINCONTENT
                // var fatCon = doc.data().FATCONTENT
                // var fibCon = doc.data().FIBRECONTENT

                if (week === time && day === "Mon" && isSurplus === "Edible"){
                    this.setState( (prevState) => ({
                        mondayCost: prevState.mondayCost += newCost
                    }));
                } else if (week === time && day === "Tue" && isSurplus === "Edible"){
                    this.setState( (prevState) => ({
                        tuesdayCost: prevState.tuesdayCost += newCost
                    }));
                } else if (week === time && day === "Wed" && isSurplus === "Edible"){
                    this.setState( (prevState) => ({
                        wednesdayCost: prevState.wednesdayCost += newCost
                    }));
                } else if (week === time && day === "Thu" && isSurplus === "Edible"){
                    this.setState( (prevState) => ({
                        thursdayCost: prevState.thursdayCost += newCost
                    }));
                } else if (week === time && day === "Fri" && isSurplus === "Edible"){
                    this.setState( (prevState) => ({
                        fridayCost: prevState.fridayCost += newCost
                    }));
                } else if (week === time && day === "Sat" && isSurplus === "Edible"){
                    this.setState( (prevState) => ({
                        saturdayCost: prevState.saturdayCost += newCost
                    }));
                } else if (week === time && day === "Sun" && isSurplus === "Edible"){
                    this.setState( (prevState) => ({
                        sundayCost: prevState.sundayCost += newCost
                    }));
                }

            })

          })
          .catch(error => console.log(error))
    }

    getPrevOption(){

        const { auth, profile } = this.props;
  
        if (profile.buildingFunction === "Households"){
          this.setState({prevOption: "/chart/dayCost"})
        } else if (profile.buildingFunction !== "Households" && profile.buildingFunction !== "Farm"){
          this.setState({prevOption: "/chart/dayBusinessCost"})
        }
  
      }

    componentDidMount(){
        this.getPrevOption();

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
                    {/* <ChartStyle> */}
                    <div style={{height: "120%", marginBottom: "2.5%", marginLeft: "10%"}}>
                        <Chart className="bar-chart"
                            width={'78vw'}
                            height={'600px'}
                            chartType="ColumnChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['Day', 'Food Wastage Cost'],
                                ['Monday', this.state.mondayCost],
                                ['Tuesday', this.state.tuesdayCost],
                                ['Wednesday', this.state.wednesdayCost],
                                ['Thursday', this.state.thursdayCost],
                                ['Friday', this.state.fridayCost],
                                ['Saturday', this.state.saturdayCost],
                                ['Sunday', this.state.sundayCost],
                            ]}
                            options={{
                                title: 'This week\'s Food Wastage Cost Performance (' + time + ')',
                                chartArea: {width: '50%'},
                                colors: ['#aab41e'],
                                hAxis: {
                                    title: 'Day of the Week',
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'Cost of Food Wastage (GBP (£))'
                                }
                            }}
                            legendToggle
                        />
                    </div>
                    {/* </ChartStyle> */}

                    <div style={{height: "40px", marginBottom: "10%"}}>
                        <Card  style={{width: '78vw', height: '35px', marginBottom: "10%", marginLeft: '10%', padding: "2.5% 5% 2.5% 5%", justifyContent: "center"}}>
                        <ButtonGroup>
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to={this.state.prevOption}>View Previous (Daily Cost)</Button>
                            <Button style={{width: "7.5%"}} className="custom-btn" as={Link} to="/account">Back</Button>
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthCost">View Next (Monthly Cost)</Button>
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
                                ['Day', 'Cost '],
                                ['Mon', this.state.mondayCost],
                                ['Tue', this.state.tuesdayCost],
                                ['Wed', this.state.wednesdayCost],
                                ['Thu', this.state.thursdayCost],
                                ['Fri', this.state.fridayCost],
                                ['Sat', this.state.saturdayCost],
                                ['Sun', this.state.sundayCost],
                            ]}
                            options={{
                                title: 'This week\'s Food Wastage Cost Performance',
                                chartArea: {width: '50%'},
                                colors: ['#aab41e'],
                                legend: "none",
                                hAxis: {
                                    title: 'Day of the Week',
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'Cost of Food Wastage (GBP (£))'
                                }
                            }}
                        />
                    </div>
                    {/* </ChartStyle> */}

                    <div style={{height: "95px", marginBottom: "15%"}}>
                        <Card  style={{width: '78vw', height: '95px', marginBottom: "15%", marginLeft: '10%', padding: "2.5% 5% 2.5% 5%", justifyContent: "center"}}>
                        <ButtonGroup>
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to={this.state.prevOption}>View Previous</Button>
                            <Button style={{width: "7.5%"}} className="custom-btn" as={Link} to="/account">Back</Button>
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthCost">View Next</Button>
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

export default connect(mapStateToProps, null)(Chart11);
