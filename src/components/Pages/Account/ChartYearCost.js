import React, {Component} from 'react'
import { Chart } from "react-google-charts"
import styled from "styled-components"
import { BrowserView, MobileView } from 'react-device-detect'
import moment from 'moment'
import { connect } from 'react-redux'
import { fs } from '../../../config/fbConfig'

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

                var newCost = 0;

                if (curr === "GBP (£)"){
                    newCost = Number(cost*1)
                } else if (curr === "USD ($)"){
                    newCost = Number((cost/1.404).toFixed(2))
                } else if (curr === "EUR (€)"){
                    newCost = Number((cost/1.161).toFixed(2))
                }

                var carbCon = doc.data().CARBSCONTENT
                var proCon = doc.data().PROTEINCONTENT
                var fatCon = doc.data().FATCONTENT
                var fibCon = doc.data().FIBRECONTENT

                if (year === time && month === "Jan" && (carbCon >= 0 && carbCon <= 100) && (proCon >= 0 && proCon <= 100) && (fatCon >= 0 && fatCon <= 100) && (fibCon >= 0 && fibCon <= 100)){
                    this.setState( (prevState) => ({
                      janCost: prevState.janCost += newCost
                    }));
                  } else if (year === time && month === "Feb" && (carbCon >= 0 && carbCon <= 100) && (proCon >= 0 && proCon <= 100) && (fatCon >= 0 && fatCon <= 100) && (fibCon >= 0 && fibCon <= 100)){
                    this.setState( (prevState) => ({
                      febCost: prevState.febCost += newCost
                    }));
                  } else if (year === time && month === "Mar" && (carbCon >= 0 && carbCon <= 100) && (proCon >= 0 && proCon <= 100) && (fatCon >= 0 && fatCon <= 100) && (fibCon >= 0 && fibCon <= 100)){
                    this.setState( (prevState) => ({
                      marCost: prevState.marCost += newCost
                    }));
                  } else if (year === time && month === "Apr" && (carbCon >= 0 && carbCon <= 100) && (proCon >= 0 && proCon <= 100) && (fatCon >= 0 && fatCon <= 100) && (fibCon >= 0 && fibCon <= 100)){
                    this.setState( (prevState) => ({
                      aprCost: prevState.aprCost += newCost
                    }));
                  } else if (year === time && month === "May" && (carbCon >= 0 && carbCon <= 100) && (proCon >= 0 && proCon <= 100) && (fatCon >= 0 && fatCon <= 100) && (fibCon >= 0 && fibCon <= 100)){
                    this.setState( (prevState) => ({
                      mayCost: prevState.mayCost += newCost
                    }));
                  } else if (year === time && month === "Jun" && (carbCon >= 0 && carbCon <= 100) && (proCon >= 0 && proCon <= 100) && (fatCon >= 0 && fatCon <= 100) && (fibCon >= 0 && fibCon <= 100)){
                    this.setState( (prevState) => ({
                      junCost: prevState.junCost += newCost
                    }));
                  } else if (year === time && month === "Jul" && (carbCon >= 0 && carbCon <= 100) && (proCon >= 0 && proCon <= 100) && (fatCon >= 0 && fatCon <= 100) && (fibCon >= 0 && fibCon <= 100)){
                    this.setState( (prevState) => ({
                      julCost: prevState.julCost += newCost
                    }));
                  } else if (year === time && month === "Aug" && (carbCon >= 0 && carbCon <= 100) && (proCon >= 0 && proCon <= 100) && (fatCon >= 0 && fatCon <= 100) && (fibCon >= 0 && fibCon <= 100)){
                    this.setState( (prevState) => ({
                      augCost: prevState.augCost += newCost
                    }));
                  } else if (year === time && month === "Sep" && (carbCon >= 0 && carbCon <= 100) && (proCon >= 0 && proCon <= 100) && (fatCon >= 0 && fatCon <= 100) && (fibCon >= 0 && fibCon <= 100)){
                    this.setState( (prevState) => ({
                      sepCost: prevState.sepCost += newCost
                    }));
                  } else if (year === time && month === "Oct" && (carbCon >= 0 && carbCon <= 100) && (proCon >= 0 && proCon <= 100) && (fatCon >= 0 && fatCon <= 100) && (fibCon >= 0 && fibCon <= 100)){
                    this.setState( (prevState) => ({
                      octCost: prevState.octCost += newCost
                    }));
                  } else if (year === time && month === "Nov" && (carbCon >= 0 && carbCon <= 100) && (proCon >= 0 && proCon <= 100) && (fatCon >= 0 && fatCon <= 100) && (fibCon >= 0 && fibCon <= 100)){
                    this.setState( (prevState) => ({
                      novCost: prevState.novCost += newCost
                    }));
                  } else if (year === time && month === "Dec" && (carbCon >= 0 && carbCon <= 100) && (proCon >= 0 && proCon <= 100) && (fatCon >= 0 && fatCon <= 100) && (fibCon >= 0 && fibCon <= 100)){
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
                    <ChartStyle>
                        <Chart className="bar-chart"
                            width={'85%'}
                            height={'85%'}
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
                                chartArea: {width: '60%'},
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

export default connect(mapStateToProps, null)(Chart9);
