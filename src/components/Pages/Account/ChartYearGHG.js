import React, {Component} from 'react'
import { Chart } from "react-google-charts"
import styled from "styled-components"
import { BrowserView, MobileView } from 'react-device-detect'
import moment from 'moment'
import { connect } from 'react-redux'
import { fs } from '../../../config/fbConfig'

const time = moment().format("YYYY")

class Chart5 extends Component {

    state = {
        uid: this.props.auth.uid,
        janGHG: 0,
        febGHG: 0,
        marGHG: 0,
        aprGHG: 0,
        mayGHG: 0,
        junGHG: 0,
        julGHG: 0,
        augGHG: 0,
        sepGHG: 0,
        octGHG: 0,
        novGHG: 0,
        decGHG: 0,
    }

    fetchData = async () => {
        fs.collection('data').doc(this.state.uid).collection('writtenFoodWasteData')
          .get()
          .then( snapshot => {

            snapshot.forEach(doc => {

                var year = doc.data().YEAR
                var month = doc.data().MONTH
                var ghg = doc.data().GHG

                var carbCon = doc.data().CARBSCONTENT
                var proCon = doc.data().PROTEINCONTENT
                var fatCon = doc.data().FATCONTENT
                var fibCon = doc.data().FIBRECONTENT

                if (year === time && month === "Jan" && (carbCon >= 0 && carbCon <= 100) && (proCon >= 0 && proCon <= 100) && (fatCon >= 0 && fatCon <= 100) && (fibCon >= 0 && fibCon <= 100)){
                    this.setState( (prevState) => ({
                      janGHG: prevState.janGHG += ghg
                    }));
                  } else if (year === time && month === "Feb" && (carbCon >= 0 && carbCon <= 100) && (proCon >= 0 && proCon <= 100) && (fatCon >= 0 && fatCon <= 100) && (fibCon >= 0 && fibCon <= 100)){
                    this.setState( (prevState) => ({
                      febGHG: prevState.febGHG += ghg
                    }));
                  } else if (year === time && month === "Mar" && (carbCon >= 0 && carbCon <= 100) && (proCon >= 0 && proCon <= 100) && (fatCon >= 0 && fatCon <= 100) && (fibCon >= 0 && fibCon <= 100)){
                    this.setState( (prevState) => ({
                      marGHG: prevState.marGHG += ghg
                    }));
                  } else if (year === time && month === "Apr" && (carbCon >= 0 && carbCon <= 100) && (proCon >= 0 && proCon <= 100) && (fatCon >= 0 && fatCon <= 100) && (fibCon >= 0 && fibCon <= 100)){
                    this.setState( (prevState) => ({
                      aprGHG: prevState.aprGHG += ghg
                    }));
                  } else if (year === time && month === "May" && (carbCon >= 0 && carbCon <= 100) && (proCon >= 0 && proCon <= 100) && (fatCon >= 0 && fatCon <= 100) && (fibCon >= 0 && fibCon <= 100)){
                    this.setState( (prevState) => ({
                      mayGHG: prevState.mayGHG += ghg
                    }));
                  } else if (year === time && month === "Jun" && (carbCon >= 0 && carbCon <= 100) && (proCon >= 0 && proCon <= 100) && (fatCon >= 0 && fatCon <= 100) && (fibCon >= 0 && fibCon <= 100)){
                    this.setState( (prevState) => ({
                      junGHG: prevState.junGHG += ghg
                    }));
                  } else if (year === time && month === "Jul" && (carbCon >= 0 && carbCon <= 100) && (proCon >= 0 && proCon <= 100) && (fatCon >= 0 && fatCon <= 100) && (fibCon >= 0 && fibCon <= 100)){
                    this.setState( (prevState) => ({
                      julGHG: prevState.julGHG += ghg
                    }));
                  } else if (year === time && month === "Aug" && (carbCon >= 0 && carbCon <= 100) && (proCon >= 0 && proCon <= 100) && (fatCon >= 0 && fatCon <= 100) && (fibCon >= 0 && fibCon <= 100)){
                    this.setState( (prevState) => ({
                      augGHG: prevState.augGHG += ghg
                    }));
                  } else if (year === time && month === "Sep" && (carbCon >= 0 && carbCon <= 100) && (proCon >= 0 && proCon <= 100) && (fatCon >= 0 && fatCon <= 100) && (fibCon >= 0 && fibCon <= 100)){
                    this.setState( (prevState) => ({
                      sepGHG: prevState.sepGHG += ghg
                    }));
                  } else if (year === time && month === "Oct" && (carbCon >= 0 && carbCon <= 100) && (proCon >= 0 && proCon <= 100) && (fatCon >= 0 && fatCon <= 100) && (fibCon >= 0 && fibCon <= 100)){
                    this.setState( (prevState) => ({
                      octGHG: prevState.octGHG += ghg
                    }));
                  } else if (year === time && month === "Nov" && (carbCon >= 0 && carbCon <= 100) && (proCon >= 0 && proCon <= 100) && (fatCon >= 0 && fatCon <= 100) && (fibCon >= 0 && fibCon <= 100)){
                    this.setState( (prevState) => ({
                      novGHG: prevState.novGHG += ghg
                    }));
                  } else if (year === time && month === "Dec" && (carbCon >= 0 && carbCon <= 100) && (proCon >= 0 && proCon <= 100) && (fatCon >= 0 && fatCon <= 100) && (fibCon >= 0 && fibCon <= 100)){
                    this.setState( (prevState) => ({
                      decGHG: prevState.decGHG += ghg
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
                                ['Month', 'Food Wastage GHG'],
                                ['January', this.state.janGHG],
                                ['February', this.state.febGHG],
                                ['March', this.state.marGHG],
                                ['April', this.state.aprGHG],
                                ['May', this.state.mayGHG],
                                ['June', this.state.junGHG],
                                ['July', this.state.julGHG],
                                ['August', this.state.augGHG],
                                ['September', this.state.sepGHG],
                                ['October', this.state.octGHG],
                                ['November', this.state.novGHG],
                                ['December', this.state.decGHG],
                            ]}
                            options={{
                                title: 'This year\'s Food Wastage GHG Performance (' + time + ')',
                                chartArea: {width: '75%'},
                                colors: ['#aab41e'],
                                hAxis: {
                                    title: 'Month of ' + time,
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'GHG Emissions of Food Wastage (kg co2)'
                                }
                            }}
                            legendToggle
                        />
                    </ChartStyle>
                </BrowserView>

                <MobileView>
                    <ChartStyle>
                        <Chart className="bar-chart"
                            width={'95%'}
                            height={'85%'}
                            chartType="ColumnChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['Month', 'GHG '],
                                ['Jan', this.state.janGHG],
                                ['Feb', this.state.febGHG],
                                ['Mar', this.state.marGHG],
                                ['Apr', this.state.aprGHG],
                                ['May', this.state.mayGHG],
                                ['Jun', this.state.junGHG],
                                ['Jul', this.state.julGHG],
                                ['Aug', this.state.augGHG],
                                ['Sep', this.state.sepGHG],
                                ['Oct', this.state.octGHG],
                                ['Nov', this.state.novGHG],
                                ['Dec', this.state.decGHG],
                            ]}
                            options={{
                                title: 'Food Wastage GHG Performance (' + time + ')',
                                chartArea: {width: '60%'},
                                colors: ['#aab41e'],
                                legend: "none",
                                hAxis: {
                                    title: 'Month of ' + time,
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'GHG Emissions of Food Wastage (kg co2)'
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

export default connect(mapStateToProps, null)(Chart5);
