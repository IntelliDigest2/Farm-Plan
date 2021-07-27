import React, {Component} from 'react'
import { Chart } from "react-google-charts"
import styled from "styled-components"
import { BrowserView, MobileView } from 'react-device-detect'
import moment from 'moment'
import { connect } from 'react-redux'
import { fs } from '../../../config/fbConfig'

const time = moment().format("ddd MMM Do YYYY")

class Chart25 extends Component {

    state = {
        uid: this.props.auth.uid,
        totalWasteWeight: 0,
        totalSurplusWeight: 0,
    }

    fetchData = async () => {
        fs.collection('data').doc(this.state.uid).collection('writtenFoodWasteData')
          .get()
          .then( snapshot => {
              snapshot.forEach(doc => {

                  var fd = doc.data().FULLDATE
                  var weight = doc.data().weight
                  var wu = doc.data().WEIGHTUNIT
                  var isSurplus = doc.data().EDIBLEORINEDIBLE

                  var newWeight = 0;

                  if (wu === "kg" || wu === "l"){
                    newWeight = Number(weight * 1)
                  } else if (wu === "g" || wu === "ml"){
                    newWeight = Number((weight * 0.001).toFixed(3))
                  } else if (wu === "oz"){
                    newWeight = Number((weight * 0.028).toFixed(3))
                  } else if (wu === "lbs"){
                    newWeight = Number((weight * 0.454).toFixed(3))
                  }

                  if (fd === time && isSurplus !== "Surplus"){
                      this.setState( (prevState) => ({
                          totalWasteWeight: prevState.totalWasteWeight += newWeight
                      }));
                  } else if (fd === time && isSurplus === "Surplus"){
                    this.setState( (prevState) => ({
                        totalSurplusWeight: prevState.totalSurplusWeight += newWeight
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
                            ['Food Waste/Surplus', 'Food Weight', {role: 'style'}],
                            ['Waste', this.state.totalWasteWeight, '#aab41e'],
                            ['Surplus', this.state.totalSurplusWeight, 'rgb(13, 27, 92)'],
                        ]}
                        options={{
                            title: 'Today\'s Food Weight Performance (' + time + ')',
                            chartArea: {width: '50%'},
                            // colors: ['#aab41e', 'rgb(13, 27, 92)'],
                            legend: 'none',
                            hAxis: {
                                title: 'Food Waste/Surplus',
                                minValue: 0,
                            },
                            vAxis: {
                                title: 'Weight of Food (kg)'
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
                            ['Food Waste/Surplus', 'Weight ', {role: 'style'}],
                            ['Waste', this.state.totalWasteWeight, '#aab41e'],
                            ['Surplus', this.state.totalSurplusWeight, 'rgb(13, 27, 92)'],
                        ]}
                        options={{
                            title: 'Today\'s Food Weight Performance (' + time + ')',
                            chartArea: {width: '50%'},
                            // colors: ['#aab41e', 'rgb(13, 27, 92)'],
                            legend: "none",
                            hAxis: {
                                title: 'Food Waste/Surplus',
                                minValue: 0,
                            },
                            vAxis: {
                                title: 'Weight of Food (kg)'
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

export default connect(mapStateToProps, null)(Chart25);