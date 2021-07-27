import React, {Component} from 'react'
import { Chart } from "react-google-charts"
import styled from "styled-components"
import { BrowserView, MobileView } from 'react-device-detect'
import moment from 'moment'
import { connect } from 'react-redux'
import { fs } from '../../../config/fbConfig'

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
                <ChartStyle>
                    <Chart className="bar-chart"
                        width={'85%'}
                        height={'85%'}
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

export default connect(mapStateToProps, null)(Chart26);