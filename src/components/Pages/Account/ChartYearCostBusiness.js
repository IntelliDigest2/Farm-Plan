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

const time = moment().format("YYYY")

class Chart65 extends Component {

    state = {
        uid: this.props.auth.uid,
        janCostBusiness: 0,
        febCostBusiness: 0,
        marCostBusiness: 0,
        aprCostBusiness: 0,
        mayCostBusiness: 0,
        junCostBusiness: 0,
        julCostBusiness: 0,
        augCostBusiness: 0,
        sepCostBusiness: 0,
        octCostBusiness: 0,
        novCostBusiness: 0,
        decCostBusiness: 0,
    }

    fetchData = async () => {
        fs.collection('data').doc(this.state.uid).collection('writtenFoodWasteData')
          .get()
          .then( snapshot => {

            snapshot.forEach(doc => {

                var year = doc.data().YEAR
                var month = doc.data().MONTH
                var cost = doc.data().COST
                var curr = doc.data().CURRENCY
                var isSurplus = doc.data().EDIBLEORINEDIBLE

                var st = doc.data().SUBMISSIONTYPE

                var newCost = 0;

                if (curr === "GBP (£)"){
                    newCost = Number(cost*1)
                } else if (curr === "USD ($)"){
                    newCost = Number((cost/1.404).toFixed(2))
                } else if (curr === "EUR (€)"){
                    newCost = Number((cost/1.161).toFixed(2))
                }

                if (year === time && month === "Jan" && isSurplus === "Edible" && st === "Waste Business"){
                    this.setState( (prevState) => ({
                      janCostBusiness: prevState.janCostBusiness += newCost
                    }));
                  } else if (year === time && month === "Feb" && isSurplus === "Edible" && st === "Waste Business"){
                    this.setState( (prevState) => ({
                      febCostBusiness: prevState.febCostBusiness += newCost
                    }));
                  } else if (year === time && month === "Mar" && isSurplus === "Edible" && st === "Waste Business"){
                    this.setState( (prevState) => ({
                      marCostBusiness: prevState.marCostBusiness += newCost
                    }));
                  } else if (year === time && month === "Apr" && isSurplus === "Edible" && st === "Waste Business"){
                    this.setState( (prevState) => ({
                      aprCostBusiness: prevState.aprCostBusiness += newCost
                    }));
                  } else if (year === time && month === "May" && isSurplus === "Edible" && st === "Waste Business"){
                    this.setState( (prevState) => ({
                      mayCostBusiness: prevState.mayCostBusiness += newCost
                    }));
                  } else if (year === time && month === "Jun" && isSurplus === "Edible" && st === "Waste Business"){
                    this.setState( (prevState) => ({
                      junCostBusiness: prevState.junCostBusiness += newCost
                    }));
                  } else if (year === time && month === "Jul" && isSurplus === "Edible" && st === "Waste Business"){
                    this.setState( (prevState) => ({
                      julCostBusiness: prevState.julCostBusiness += newCost
                    }));
                  } else if (year === time && month === "Aug" && isSurplus === "Edible" && st === "Waste Business"){
                    this.setState( (prevState) => ({
                      augCostBusiness: prevState.augCostBusiness += newCost
                    }));
                  } else if (year === time && month === "Sep" && isSurplus === "Edible" && st === "Waste Business"){
                    this.setState( (prevState) => ({
                      sepCostBusiness: prevState.sepCostBusiness += newCost
                    }));
                  } else if (year === time && month === "Oct" && isSurplus === "Edible" && st === "Waste Business"){
                    this.setState( (prevState) => ({
                      octCostBusiness: prevState.octCostBusiness += newCost
                    }));
                  } else if (year === time && month === "Nov" && isSurplus === "Edible" && st === "Waste Business"){
                    this.setState( (prevState) => ({
                      novCostBusiness: prevState.novCostBusiness += newCost
                    }));
                  } else if (year === time && month === "Dec" && isSurplus === "Edible" && st === "Waste Business"){
                    this.setState( (prevState) => ({
                      decCostBusiness: prevState.decCostBusiness += newCost
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
                                ['Month', 'Food Wastage Cost'],
                                ['January', this.state.janCostBusiness],
                                ['February', this.state.febCostBusiness],
                                ['March', this.state.marCostBusiness],
                                ['April', this.state.aprCostBusiness],
                                ['May', this.state.mayCostBusiness],
                                ['June', this.state.junCostBusiness],
                                ['July', this.state.julCostBusiness],
                                ['August', this.state.augCostBusiness],
                                ['September', this.state.sepCostBusiness],
                                ['October', this.state.octCostBusiness],
                                ['November', this.state.novCostBusiness],
                                ['December', this.state.decCostBusiness],
                            ]}
                            options={{
                                title: 'This year\'s Food Wastage Cost Performance (' + time + ', Business)',
                                chartArea: {width: '75%'},
                                colors: ['#aab41e'],
                                hAxis: {
                                    title: 'Month of ' + time,
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
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthCostBusiness">View Previous (Monthly GHG)</Button>
                            <Button style={{width: "7.5%"}} className="custom-btn" as={Link} to="/account">Back</Button>
                            <Button style={{width: "15%"}} disabled>View Next</Button>
                        </ButtonGroup>
                        </Card>
                    </div>

                </BrowserView>

                <MobileView>
                    {/* <ChartStyle> */}
                    <div style={{height: "120%", marginBottom: "2.5%", marginLeft: "5.5%"}}>
                        <Chart className="bar-chart"
                            width={'90vw'}
                            height={'600px'}
                            chartType="ColumnChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['Month', 'GHG '],
                                ['Jan', this.state.janCostBusiness],
                                ['Feb', this.state.febCostBusiness],
                                ['Mar', this.state.marCostBusiness],
                                ['Apr', this.state.aprCostBusiness],
                                ['May', this.state.mayCostBusiness],
                                ['Jun', this.state.junCostBusiness],
                                ['Jul', this.state.julCostBusiness],
                                ['Aug', this.state.augCostBusiness],
                                ['Sep', this.state.sepCostBusiness],
                                ['Oct', this.state.octCostBusiness],
                                ['Nov', this.state.novCostBusiness],
                                ['Dec', this.state.decCostBusiness],
                            ]}
                            options={{
                                title: 'Food Wastage Cost Performance (' + time + ', Business)',
                                chartArea: {width: '62.5%'},
                                colors: ['#aab41e'],
                                legend: "none",
                                hAxis: {
                                    title: 'Month of ' + time,
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
                        <Card  style={{width: '90vw', height: '95px', marginBottom: "15%", marginLeft: '5.5%', padding: "2.5% 5% 2.5% 5%", justifyContent: "center"}}>
                        <ButtonGroup>
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthCostBusiness">Prev</Button>
                            <Button style={{width: "7.5%"}} className="custom-btn" as={Link} to="/account">Back</Button>
                            <Button style={{width: "15%"}} disabled>Next</Button>
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

export default connect(mapStateToProps, null)(Chart65);
