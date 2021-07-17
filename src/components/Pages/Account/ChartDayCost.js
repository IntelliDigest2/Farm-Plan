import React, {Component} from 'react'
import { Chart } from "react-google-charts"
import styled from "styled-components"
import { BrowserView, MobileView } from 'react-device-detect'
import moment from 'moment'
import { connect } from 'react-redux'
import { fs } from '../../../config/fbConfig'

const time = moment().format("ddd MMM Do YYYY")

class Chart12 extends Component {

    state = {
        uid: this.props.auth.uid,
        // totalCarbsCost: 0,
        // totalProteinCost: 0,
        // totalFatCost: 0,
        // totalFibreCost: 0,
        totalBreakfastCost: 0,
        totalLunchCost: 0,
        totalDinnerCost: 0,
    }

    fetchData = async () => {
        fs.collection('data').doc(this.state.uid).collection('writtenFoodWasteData')
          .get()
          .then( snapshot => {

            snapshot.forEach(doc => {

                var fd = doc.data().FULLDATE
                var cost = doc.data().COST
                var curr = doc.data().CURRENCY
                var meal = doc.data().MEAL
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

                // if (fd === time && (carbCon >= 0 && carbCon <= 100) && (proCon >= 0 && proCon <= 100) && (fatCon >= 0 && fatCon <= 100) && (fibCon >= 0 && fibCon <= 100)){
                //     this.setState( (prevState) => ({
                //         totalCarbsCost: prevState.totalCarbsCost += Number((newCost*(carbCon/100)).toFixed(2)),
                //         totalProteinCost: prevState.totalProteinCost += Number((newCost*(proCon/100)).toFixed(2)),
                //         totalFatCost: prevState.totalFatCost += Number((newCost*(fatCon/100)).toFixed(2)),
                //         totalFibreCost: prevState.totalFibreCost += Number((newCost*(fibCon/100)).toFixed(2)),
                //     }))
                // }

                if (fd === time && meal === "Breakfast" && isSurplus === "Edible"){
                    this.setState( (prevState) => ({
                        totalBreakfastCost: prevState.totalBreakfastCost += newCost
                    }));
                } else if (fd === time && meal === "Lunch" && isSurplus === "Edible"){
                    this.setState( (prevState) => ({
                        totalLunchCost: prevState.totalLunchCost += newCost
                    }));
                } else if (fd === time && meal === "Dinner" && isSurplus === "Edible"){
                    this.setState( (prevState) => ({
                        totalDinnerCost: prevState.totalDinnerCost += newCost
                    }));
                }

                else if (fd === time && meal === "Breakfast" && isSurplus === "Surplus"){
                    this.setState( (prevState) => ({
                        totalBreakfastCost: prevState.totalBreakfastCost -= newCost
                    }));
                } else if (fd === time && meal === "Lunch" && isSurplus === "Surplus"){
                    this.setState( (prevState) => ({
                        totalLunchCost: prevState.totalLunchCost -= newCost
                    }));
                } else if (fd === time && meal === "Dinner" && isSurplus === "Surplus"){
                    this.setState( (prevState) => ({
                        totalDinnerCost: prevState.totalDinnerCost -= newCost
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
                    <ChartStyle>
                        <Chart className="bar-chart"
                            width={'85%'}
                            height={'85%'}
                            chartType="ColumnChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['Meal of the Day', 'Food Wastage Cost'],
                                ['Breakfast', this.state.totalBreakfastCost],
                                ['Lunch', this.state.totalLunchCost],
                                ['Dinner', this.state.totalDinnerCost],
                            ]}
                            options={{
                                title: 'Today\'s Food Wastage Cost Performance (' + time + ')',
                                chartArea: {width: '50%'},
                                colors: ['#aab41e'],
                                hAxis: {
                                    title: 'Meal of the Day',
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'Cost of Food Wastage (GBP (£))'
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
                                ['Meal of the Day', 'Cost '],
                                ['Breakfast', this.state.totalBreakfastCost],
                                ['Lunch', this.state.totalLunchCost],
                                ['Dinner', this.state.totalDinnerCost],
                            ]}
                            options={{
                                title: 'Today\'s Food Wastage Cost Performance (' + time + ')',
                                chartArea: {width: '50%'},
                                colors: ['#aab41e'],
                                legend: "none",
                                hAxis: {
                                    title: 'Meal of the Day',
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'Cost of Food Wastage (GBP (£))'
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

export default connect(mapStateToProps, null)(Chart12);