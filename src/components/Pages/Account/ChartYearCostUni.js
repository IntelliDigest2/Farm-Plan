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

class Chart47 extends Component {

    state = {
        uid: this.props.auth.uid,
        janCostUni: 0,
        febCostUni: 0,
        marCostUni: 0,
        aprCostUni: 0,
        mayCostUni: 0,
        junCostUni: 0,
        julCostUni: 0,
        augCostUni: 0,
        sepCostUni: 0,
        octCostUni: 0,
        novCostUni: 0,
        decCostUni: 0,
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

                  if (year === time && month === "Jan" && isSurplus === "Edible" && st === "Waste Academic"){
                    this.setState( (prevState) => ({
                      janCostUni: prevState.janCostUni += newCost
                    }));
                  } else if (year === time && month === "Feb" && isSurplus === "Edible" && st === "Waste Academic"){
                    this.setState( (prevState) => ({
                      febCostUni: prevState.febCostUni += newCost
                    }));
                  } else if (year === time && month === "Mar" && isSurplus === "Edible" && st === "Waste Academic"){
                    this.setState( (prevState) => ({
                      marCostUni: prevState.marCostUni += newCost
                    }));
                  } else if (year === time && month === "Apr" && isSurplus === "Edible" && st === "Waste Academic"){
                    this.setState( (prevState) => ({
                      aprCostUni: prevState.aprCostUni += newCost
                    }));
                  } else if (year === time && month === "May" && isSurplus === "Edible" && st === "Waste Academic"){
                    this.setState( (prevState) => ({
                      mayCostUni: prevState.mayCostUni += newCost
                    }));
                  } else if (year === time && month === "Jun" && isSurplus === "Edible" && st === "Waste Academic"){
                    this.setState( (prevState) => ({
                      junCostUni: prevState.junCostUni += newCost
                    }));
                  } else if (year === time && month === "Jul" && isSurplus === "Edible" && st === "Waste Academic"){
                    this.setState( (prevState) => ({
                      julCostUni: prevState.julCostUni += newCost
                    }));
                  } else if (year === time && month === "Aug" && isSurplus === "Edible" && st === "Waste Academic"){
                    this.setState( (prevState) => ({
                      augCostUni: prevState.augCostUni += newCost
                    }));
                  } else if (year === time && month === "Sep" && isSurplus === "Edible" && st === "Waste Academic"){
                    this.setState( (prevState) => ({
                      sepCostUni: prevState.sepCostUni += newCost
                    }));
                  } else if (year === time && month === "Oct" && isSurplus === "Edible" && st === "Waste Academic"){
                    this.setState( (prevState) => ({
                      octCostUni: prevState.octCostUni += newCost
                    }));
                  } else if (year === time && month === "Nov" && isSurplus === "Edible" && st === "Waste Academic"){
                    this.setState( (prevState) => ({
                      novCostUni: prevState.novCostUni += newCost
                    }));
                  } else if (year === time && month === "Dec" && isSurplus === "Edible" && st === "Waste Academic"){
                    this.setState( (prevState) => ({
                      decCostUni: prevState.decCostUni += newCost
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

                        <div style={{height: "120%", marginBottom: "2.5%", marginLeft: "10%"}}>
                          <Chart className="bar-chart"
                              width={'78vw'}
                              height={'600px'}
                              chartType="ColumnChart"
                              loader={<div>Loading Chart</div>}
                              data={[
                                  ['Month', 'Food Wastage Cost'],
                                  ['January', this.state.janCostUni],
                                  ['February', this.state.febCostUni],
                                  ['March', this.state.marCostUni],
                                  ['April', this.state.aprCostUni],
                                  ['May', this.state.mayCostUni],
                                  ['June', this.state.junCostUni],
                                  ['July', this.state.julCostUni],
                                  ['August', this.state.augCostUni],
                                  ['September', this.state.sepCostUni],
                                  ['October', this.state.octCostUni],
                                  ['November', this.state.novCostUni],
                                  ['December', this.state.decCostUni],
                              ]}
                              options={{
                                  title: 'This year\'s Food Wastage Cost Performance (' + time + ', Academic)',
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

                    <div style={{height: "40px", marginBottom: "10%"}}>
                        <Card  style={{width: '78vw', height: '35px', marginBottom: "10%", marginLeft: '10%', padding: "2.5% 5% 2.5% 5%", justifyContent: "center"}}>
                        <ButtonGroup>
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthCostUni">View Previous (Monthly GHG)</Button>
                            <Button style={{width: "7.5%"}} className="custom-btn" as={Link} to="/account">Back</Button>
                            <Button style={{width: "15%"}} disabled>View Next</Button>
                        </ButtonGroup>
                        </Card>
                    </div>

                </BrowserView>

                <MobileView>

                        <div style={{height: "120%", marginBottom: "2.5%", marginLeft: "5.5%"}}>
                          <Chart className="bar-chart"
                              width={'90vw'}
                              height={'600px'}
                              chartType="ColumnChart"
                              loader={<div>Loading Chart</div>}
                              data={[
                                  ['Month', 'GHG '],
                                  ['Jan', this.state.janCostUni],
                                  ['Feb', this.state.febCostUni],
                                  ['Mar', this.state.marCostUni],
                                  ['Apr', this.state.aprCostUni],
                                  ['May', this.state.mayCostUni],
                                  ['Jun', this.state.junCostUni],
                                  ['Jul', this.state.julCostUni],
                                  ['Aug', this.state.augCostUni],
                                  ['Sep', this.state.sepCostUni],
                                  ['Oct', this.state.octCostUni],
                                  ['Nov', this.state.novCostUni],
                                  ['Dec', this.state.decCostUni],
                              ]}
                              options={{
                                  title: 'Food Wastage Cost Performance (' + time + ')',
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

                    <div style={{height: "95px", marginBottom: "15%"}}>
                        <Card  style={{width: '90vw', height: '95px', marginBottom: "15%", marginLeft: '5.5%', padding: "2.5% 5% 2.5% 5%", justifyContent: "center"}}>
                        <ButtonGroup>
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthCostUni">Prev</Button>
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

export default connect(mapStateToProps, null)(Chart47);
