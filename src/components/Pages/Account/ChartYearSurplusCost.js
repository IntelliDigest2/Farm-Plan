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

class Chart21 extends Component {

    state = {
        uid: this.props.auth.uid,
        janSurplusCost: 0,
        febSurplusCost: 0,
        marSurplusCost: 0,
        aprSurplusCost: 0,
        maySurplusCost: 0,
        junSurplusCost: 0,
        julSurplusCost: 0,
        augSurplusCost: 0,
        sepSurplusCost: 0,
        octSurplusCost: 0,
        novSurplusCost: 0,
        decSurplusCost: 0,
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

                // var carbCon = doc.data().CARBSCONTENT
                // var proCon = doc.data().PROTEINCONTENT
                // var fatCon = doc.data().FATCONTENT
                // var fibCon = doc.data().FIBRECONTENT

                // if (year === time && month === "Jan" && isSurplus === "Edible"){
                //     this.setState( (prevState) => ({
                //       janCost: prevState.janCost += newCost
                //     }));
                //   } else if (year === time && month === "Feb" && isSurplus === "Edible"){
                //     this.setState( (prevState) => ({
                //       febCost: prevState.febCost += newCost
                //     }));
                //   } else if (year === time && month === "Mar" && isSurplus === "Edible"){
                //     this.setState( (prevState) => ({
                //       marCost: prevState.marCost += newCost
                //     }));
                //   } else if (year === time && month === "Apr" && isSurplus === "Edible"){
                //     this.setState( (prevState) => ({
                //       aprCost: prevState.aprCost += newCost
                //     }));
                //   } else if (year === time && month === "May" && isSurplus === "Edible"){
                //     this.setState( (prevState) => ({
                //       mayCost: prevState.mayCost += newCost
                //     }));
                //   } else if (year === time && month === "Jun" && isSurplus === "Edible"){
                //     this.setState( (prevState) => ({
                //       junCost: prevState.junCost += newCost
                //     }));
                //   } else if (year === time && month === "Jul" && isSurplus === "Edible"){
                //     this.setState( (prevState) => ({
                //       julCost: prevState.julCost += newCost
                //     }));
                //   } else if (year === time && month === "Aug" && isSurplus === "Edible"){
                //     this.setState( (prevState) => ({
                //       augCost: prevState.augCost += newCost
                //     }));
                //   } else if (year === time && month === "Sep" && isSurplus === "Edible"){
                //     this.setState( (prevState) => ({
                //       sepCost: prevState.sepCost += newCost
                //     }));
                //   } else if (year === time && month === "Oct" && isSurplus === "Edible"){
                //     this.setState( (prevState) => ({
                //       octCost: prevState.octCost += newCost
                //     }));
                //   } else if (year === time && month === "Nov" && isSurplus === "Edible"){
                //     this.setState( (prevState) => ({
                //       novCost: prevState.novCost += newCost
                //     }));
                //   } else if (year === time && month === "Dec" && isSurplus === "Edible"){
                //     this.setState( (prevState) => ({
                //       decCost: prevState.decCost += newCost
                //     }));
                //   }

                  if (year === time && month === "Jan" && st === "Surplus" && los === "Surplus"){
                    this.setState( (prevState) => ({
                      janSurplusCost: prevState.janSurplusCost += newCost
                    }));
                  } else if (year === time && month === "Feb" && st === "Surplus" && los === "Surplus"){
                    this.setState( (prevState) => ({
                      febSurplusCost: prevState.febSurplusCost += newCost
                    }));
                  } else if (year === time && month === "Mar" && st === "Surplus" && los === "Surplus"){
                    this.setState( (prevState) => ({
                      marSurplusCost: prevState.marSurplusCost += newCost
                    }));
                  } else if (year === time && month === "Apr" && st === "Surplus" && los === "Surplus"){
                    this.setState( (prevState) => ({
                      aprSurplusCost: prevState.aprSurplusCost += newCost
                    }));
                  } else if (year === time && month === "May" && st === "Surplus" && los === "Surplus"){
                    this.setState( (prevState) => ({
                      maySurplusCost: prevState.maySurplusCost += newCost
                    }));
                  } else if (year === time && month === "Jun" && st === "Surplus" && los === "Surplus"){
                    this.setState( (prevState) => ({
                      junSurplusCost: prevState.junSurplusCost += newCost
                    }));
                  } else if (year === time && month === "Jul" && st === "Surplus" && los === "Surplus"){
                    this.setState( (prevState) => ({
                      julSurplusCost: prevState.julSurplusCost += newCost
                    }));
                  } else if (year === time && month === "Aug" && st === "Surplus" && los === "Surplus"){
                    this.setState( (prevState) => ({
                      augSurplusCost: prevState.augSurplusCost += newCost
                    }));
                  } else if (year === time && month === "Sep" && st === "Surplus" && los === "Surplus"){
                    this.setState( (prevState) => ({
                      sepSurplusCost: prevState.sepSurplusCost += newCost
                    }));
                  } else if (year === time && month === "Oct" && st === "Surplus" && los === "Surplus"){
                    this.setState( (prevState) => ({
                      octSurplusCost: prevState.octSurplusCost += newCost
                    }));
                  } else if (year === time && month === "Nov" && st === "Surplus" && los === "Surplus"){
                    this.setState( (prevState) => ({
                      novSurplusCost: prevState.novSurplusCost += newCost
                    }));
                  } else if (year === time && month === "Dec" && st === "Surplus" && los === "Surplus"){
                    this.setState( (prevState) => ({
                      decSurplusCost: prevState.decSurplusCost += newCost
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
                                ['Month', 'Food Surplus Costs Saved'],
                                ['January', this.state.janSurplusCost],
                                ['February', this.state.febSurplusCost],
                                ['March', this.state.marSurplusCost],
                                ['April', this.state.aprSurplusCost],
                                ['May', this.state.maySurplusCost],
                                ['June', this.state.junSurplusCost],
                                ['July', this.state.julSurplusCost],
                                ['August', this.state.augSurplusCost],
                                ['September', this.state.sepSurplusCost],
                                ['October', this.state.octSurplusCost],
                                ['November', this.state.novSurplusCost],
                                ['December', this.state.decSurplusCost],
                            ]}
                            options={{
                                title: 'This year\'s Food Surplus Costs Saved Performance (' + time + ')',
                                chartArea: {width: '75%'},
                                colors: ['rgb(13, 27, 92)'],
                                hAxis: {
                                    title: 'Month of ' + time,
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
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthSurplusCost">View Previous (Monthly Surplus Cost)</Button>
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
                                ['Month', 'Costs Saved '],
                                ['Jan', this.state.janSurplusCost],
                                ['Feb', this.state.febSurplusCost],
                                ['Mar', this.state.marSurplusCost],
                                ['Apr', this.state.aprSurplusCost],
                                ['May', this.state.maySurplusCost],
                                ['Jun', this.state.junSurplusCost],
                                ['Jul', this.state.julSurplusCost],
                                ['Aug', this.state.augSurplusCost],
                                ['Sep', this.state.sepSurplusCost],
                                ['Oct', this.state.octSurplusCost],
                                ['Nov', this.state.novSurplusCost],
                                ['Dec', this.state.decSurplusCost],
                            ]}
                            options={{
                                title: 'Food Surplus Costs Saved Performance (' + time + ')',
                                chartArea: {width: '62.5%'},
                                colors: ['rgb(13, 27, 92)'],
                                legend: "none",
                                hAxis: {
                                    title: 'Month of ' + time,
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
                        <Card  style={{width: '90vw', height: '95px', marginBottom: "15%", marginLeft: '5.5%', padding: "2.5% 5% 2.5% 5%", justifyContent: "center"}}>
                        <ButtonGroup>
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthSurplusCost">Prev</Button>
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

export default connect(mapStateToProps, null)(Chart21);
