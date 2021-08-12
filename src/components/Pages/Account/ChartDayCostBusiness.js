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

const time = moment().format("ddd MMM Do YYYY")

class Chart26 extends Component {

    state = {
        uid: this.props.auth.uid,
        totalWasteCost: 0,
        totalSurplusCost: 0,
    }

    fetchData = async () => {
        fs.collection('data').doc(this.state.uid).collection('writtenFoodWasteData')
          .get()
          .then( snapshot => {
              snapshot.forEach(doc => {

                  var fd = doc.data().FULLDATE
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

                  if (fd === time && isSurplus !== "Surplus"){
                      this.setState( (prevState) => ({
                          totalWasteCost: prevState.totalWasteCost += newCost
                      }));
                  } else if (fd === time && isSurplus === "Surplus"){
                    this.setState( (prevState) => ({
                        totalSurplusCost: prevState.totalSurplusCost += newCost
                    }));
                  }

              })
          })
          .catch(error => console.log(error))
    }

    componentDidMount(){
        this.fetchData();
    }

    render() {

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
                            ['Food Waste/Surplus', 'Food Cost', {role: 'style'}],
                            ['Waste', this.state.totalWasteCost, '#aab41e'],
                            ['Surplus', this.state.totalSurplusCost, 'rgb(13, 27, 92)'],
                        ]}
                        options={{
                            title: 'Today\'s Food Cost Performance (' + time + ')',
                            chartArea: {width: '50%'},
                            // colors: ['#aab41e', 'rgb(13, 27, 92)'],
                            legend: 'none',
                            hAxis: {
                                title: 'Food Waste/Surplus',
                                minValue: 0,
                            },
                            vAxis: {
                                title: 'Cost of Food (GBP (£))'
                            }
                        }}
                    />
                </div>
                {/* </ChartStyle> */}

                <div style={{height: "40px", marginBottom: "10%"}}>
                    <Card  style={{width: '78vw', height: '35px', marginBottom: "10%", marginLeft: '10%', padding: "2.5% 5% 2.5% 5%", justifyContent: "center"}}>
                    <ButtonGroup>
                        <Button style={{width: "15%"}} disabled>View Previous</Button>
                        <Button style={{width: "7.5%"}} className="custom-btn" as={Link} to="/account">Back</Button>
                        <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/weekCost">View Next (Weekly Cost)</Button>
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
                            ['Food Waste/Surplus', 'Cost ', {role: 'style'}],
                            ['Waste', this.state.totalWasteCost, '#aab41e'],
                            ['Surplus', this.state.totalSurplusCost, 'rgb(13, 27, 92)'],
                        ]}
                        options={{
                            title: 'Today\'s Food Cost Performance (' + time + ')',
                            chartArea: {width: '50%'},
                            // colors: ['#aab41e', 'rgb(13, 27, 92)'],
                            legend: "none",
                            hAxis: {
                                title: 'Food Waste/Surplus',
                                minValue: 0,
                            },
                            vAxis: {
                                title: 'Cost of Food (GBP (£))'
                            }
                        }}
                    />
                </div>
                {/* </ChartStyle> */}

                <div style={{height: "95px", marginBottom: "15%"}}>
                    <Card  style={{width: '78vw', height: '95px', marginBottom: "15%", marginLeft: '10%', padding: "2.5% 5% 2.5% 5%", justifyContent: "center"}}>
                        <ButtonGroup>
                            <Button style={{width: "15%"}} disabled>View Previous</Button>
                            <Button style={{width: "7.5%"}} className="custom-btn" as={Link} to="/account">Back</Button>
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/weekCost">View Next</Button>
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

export default connect(mapStateToProps, null)(Chart26);