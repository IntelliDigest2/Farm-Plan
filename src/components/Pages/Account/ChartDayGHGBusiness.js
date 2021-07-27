import React, {Component} from 'react'
import { Chart } from "react-google-charts"
import styled from "styled-components"
import { BrowserView, MobileView } from 'react-device-detect'
import moment from 'moment'
import { connect } from 'react-redux'
import { fs } from '../../../config/fbConfig'

const time = moment().format("ddd MMM Do YYYY")

class Chart27 extends Component {

    state = {
        uid: this.props.auth.uid,
        totalWasteGHG: 0,
        totalSurplusGHG: 0,
    }

    fetchData = async () => {
        fs.collection('data').doc(this.state.uid).collection('writtenFoodWasteData')
          .get()
          .then( snapshot => {
              snapshot.forEach(doc => {

                  var fd = doc.data().FULLDATE
                  var ghg = doc.data().GHG
                  var isSurplus = doc.data().EDIBLEORINEDIBLE

                  if (fd === time && isSurplus !== "Surplus"){
                      this.setState( (prevState) => ({
                          totalWasteGHG: prevState.totalWasteGHG += ghg
                      }));
                  } else if (fd === time && isSurplus === "Surplus"){
                    this.setState( (prevState) => ({
                        totalSurplusGHG: prevState.totalSurplusGHG += ghg
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
                            ['Food Waste/Surplus', 'Food GHG', {role: 'style'}],
                            ['Waste', this.state.totalWasteGHG, '#aab41e'],
                            ['Surplus', this.state.totalSurplusGHG, 'rgb(13, 27, 92)'],
                        ]}
                        options={{
                            title: 'Today\'s Food GHG Performance (' + time + ')',
                            chartArea: {width: '50%'},
                            // colors: ['#aab41e', 'rgb(13, 27, 92)'],
                            legend: 'none',
                            hAxis: {
                                title: 'Food Waste/Surplus',
                                minValue: 0,
                            },
                            vAxis: {
                                title: 'GHG of Food (kg co2)'
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
                            ['Food Waste/Surplus', 'GHG ', {role: 'style'}],
                            ['Waste', this.state.totalWasteGHG, '#aab41e'],
                            ['Surplus', this.state.totalSurplusGHG, 'rgb(13, 27, 92)'],
                        ]}
                        options={{
                            title: 'Today\'s Food GHG Performance (' + time + ')',
                            chartArea: {width: '50%'},
                            // colors: ['#aab41e', 'rgb(13, 27, 92)'],
                            legend: "none",
                            hAxis: {
                                title: 'Food Waste/Surplus',
                                minValue: 0,
                            },
                            vAxis: {
                                title: 'GHG of Food (kg co2)'
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

export default connect(mapStateToProps, null)(Chart27);