import React, {Component, useState, useEffect} from 'react'
import {Chart} from "react-google-charts"
import styled from "styled-components"
// import chartData from "../../../data/chart-data.json";
// import { Row, Col } from 'react-bootstrap';
import {BrowserView, MobileView} from "react-device-detect"
import moment from "moment"

import { connect } from 'react-redux';
import {fs} from "../../../config/fbConfig"

const time = moment().format("ddd MMM Do YYYY")

class Chart31 extends Component {

    state = {
        uid: this.props.auth.uid,
        totalEdibleWeight: 0,
        totalInedibleWeight: 0
    }

    fetchData = async () => {

        fs.collection('data').doc(this.state.uid).collection('writtenFoodSurplusData')
          .get()
          .then( snapshot => {
            // var tempFwTypes = []
            // var tempFullDates = []
            snapshot.forEach(doc => {
    
              // var fwt = doc.data().FWTYPE
              var fd = doc.data().FULLDATE
              var weight = doc.data().weight
              var wu = doc.data().WEIGHTUNIT
              var eoi = doc.data().EDIBLEORINEDIBLE
    
              var newWeight = 0
    
              if (wu === "kg" || wu === "l"){
                newWeight = Number(weight * 1)
              } else if (wu === "g" || wu === "ml"){
                newWeight = Number((weight * 0.001).toFixed(3))
              } else if (wu === "oz"){
                newWeight = Number((weight * 0.028).toFixed(3))
              } else if (wu === "lbs"){
                newWeight = Number((weight * 0.454).toFixed(3))
              }
    
              if (fd === time && eoi === "Edible"){
                this.setState( (prevState) => ({
                  totalEdibleWeight: prevState.totalEdibleWeight += newWeight
                }));
              } else if (fd === time && eoi === "Inedible"){
                this.setState( (prevState) => ({
                  totalInedibleWeight: prevState.totalInedibleWeight += newWeight
                }));
              } 
    
            })
            // console.log(tempFwTypes)
            // console.log(tempFullDates)
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
                    <ChartStyle>
                        <Chart className="bar-chart"
                            width={'85%'}
                            height={'85%'}
                            chartType="ColumnChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['Food Loss Type', 'Food Loss Weight'],
                                ['Edible', this.state.totalEdibleWeight],
                                ['Inedible', this.state.totalInedibleWeight],
                            ]}
                            options={{
                                title: 'Today\'s Food Loss Weight Performance (' + time + ')',
                                chartArea: {width: '50%'},
                                colors: ['#aab41e'],
                                hAxis: {
                                    title: 'Food Loss Type',
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'Weight of Food Loss (kg)'
                                }
                            }}
                            legendToggle
                        />
                    </ChartStyle>
                </BrowserView>

                <MobileView>
                    <ChartStyle>
                        <Chart className="bar-chart"
                            width={'85%'}
                            height={'85%'}
                            chartType="ColumnChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['Food Loss Type', 'Weight '],
                                ['Edible', this.state.totalEdibleWeight],
                                ['Inedible', this.state.totalInedibleWeight],
                            ]}
                            options={{
                                title: 'Today\'s Food Loss Weight Performance (' + time + ')',
                                chartArea: {width: '50%'},
                                colors: ['#aab41e'],
                                legend: "none",
                                hAxis: {
                                    title: 'Food Loss Type',
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'Weight of Food Loss (kg)'
                                }
                            }}
                        />
                    </ChartStyle>
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

export default connect(mapStateToProps, null)(Chart31);