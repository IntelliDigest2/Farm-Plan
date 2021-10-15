import React, {Component} from 'react'
import { Chart } from "react-google-charts"
import styled from "styled-components"
import { BrowserView, MobileView } from 'react-device-detect'
import moment from 'moment'
import { connect } from 'react-redux'
import { fs } from '../../../../../../config/fbConfig'

import { Button, ButtonGroup } from 'react-bootstrap';
import "../../../../Pages.css"
import "../../../../../../App.css";
import {Link} from "react-router-dom"
import {Card} from "react-bootstrap"

const time = moment().format("YYYY")

class Chart9 extends Component {

    state = {
        uid: this.props.auth.uid,
        janCost: 0,
        febCost: 0,
        marCost: 0,
        aprCost: 0,
        mayCost: 0,
        junCost: 0,
        julCost: 0,
        augCost: 0,
        sepCost: 0,
        octCost: 0,
        novCost: 0,
        decCost: 0,
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

                // var carbCon = doc.data().CARBSCONTENT
                // var proCon = doc.data().PROTEINCONTENT
                // var fatCon = doc.data().FATCONTENT
                // var fibCon = doc.data().FIBRECONTENT

                if (year === time && month === "Jan" && isSurplus === "Edible" && st === "Waste"){
                    this.setState( (prevState) => ({
                      janCost: prevState.janCost += newCost
                    }));
                  } else if (year === time && month === "Feb" && isSurplus === "Edible" && st === "Waste"){
                    this.setState( (prevState) => ({
                      febCost: prevState.febCost += newCost
                    }));
                  } else if (year === time && month === "Mar" && isSurplus === "Edible" && st === "Waste"){
                    this.setState( (prevState) => ({
                      marCost: prevState.marCost += newCost
                    }));
                  } else if (year === time && month === "Apr" && isSurplus === "Edible" && st === "Waste"){
                    this.setState( (prevState) => ({
                      aprCost: prevState.aprCost += newCost
                    }));
                  } else if (year === time && month === "May" && isSurplus === "Edible" && st === "Waste"){
                    this.setState( (prevState) => ({
                      mayCost: prevState.mayCost += newCost
                    }));
                  } else if (year === time && month === "Jun" && isSurplus === "Edible" && st === "Waste"){
                    this.setState( (prevState) => ({
                      junCost: prevState.junCost += newCost
                    }));
                  } else if (year === time && month === "Jul" && isSurplus === "Edible" && st === "Waste"){
                    this.setState( (prevState) => ({
                      julCost: prevState.julCost += newCost
                    }));
                  } else if (year === time && month === "Aug" && isSurplus === "Edible" && st === "Waste"){
                    this.setState( (prevState) => ({
                      augCost: prevState.augCost += newCost
                    }));
                  } else if (year === time && month === "Sep" && isSurplus === "Edible" && st === "Waste"){
                    this.setState( (prevState) => ({
                      sepCost: prevState.sepCost += newCost
                    }));
                  } else if (year === time && month === "Oct" && isSurplus === "Edible" && st === "Waste"){
                    this.setState( (prevState) => ({
                      octCost: prevState.octCost += newCost
                    }));
                  } else if (year === time && month === "Nov" && isSurplus === "Edible" && st === "Waste"){
                    this.setState( (prevState) => ({
                      novCost: prevState.novCost += newCost
                    }));
                  } else if (year === time && month === "Dec" && isSurplus === "Edible" && st === "Waste"){
                    this.setState( (prevState) => ({
                      decCost: prevState.decCost += newCost
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
                                ['January', this.state.janCost],
                                ['February', this.state.febCost],
                                ['March', this.state.marCost],
                                ['April', this.state.aprCost],
                                ['May', this.state.mayCost],
                                ['June', this.state.junCost],
                                ['July', this.state.julCost],
                                ['August', this.state.augCost],
                                ['September', this.state.sepCost],
                                ['October', this.state.octCost],
                                ['November', this.state.novCost],
                                ['December', this.state.decCost],
                            ]}
                            options={{
                                title: 'This year\'s Food Wastage Cost Performance (' + time + ')',
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
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthCost">View Previous (Monthly GHG)</Button>
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
                                ['Jan', this.state.janCost],
                                ['Feb', this.state.febCost],
                                ['Mar', this.state.marCost],
                                ['Apr', this.state.aprCost],
                                ['May', this.state.mayCost],
                                ['Jun', this.state.junCost],
                                ['Jul', this.state.julCost],
                                ['Aug', this.state.augCost],
                                ['Sep', this.state.sepCost],
                                ['Oct', this.state.octCost],
                                ['Nov', this.state.novCost],
                                ['Dec', this.state.decCost],
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
                    {/* </ChartStyle> */}

                    <div style={{height: "95px", marginBottom: "15%"}}>
                        <Card  style={{width: '90vw', height: '95px', marginBottom: "15%", marginLeft: '5.5%', padding: "2.5% 5% 2.5% 5%", justifyContent: "center"}}>
                        <ButtonGroup>
                            <Button style={{width: "15%"}} className="custom-btn" as={Link} to="/chart/monthCost">Prev</Button>
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

export default connect(mapStateToProps, null)(Chart9);
