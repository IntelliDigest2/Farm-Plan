import React, { useState, useEffect, useCallback, useRef } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { Chart } from "react-google-charts";
import styled from "styled-components";
import { Button, ButtonGroup } from "react-bootstrap";
import "../../../../Pages.css";
import "../../../../../../App.css";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

import { connect } from "react-redux";
import { fs } from "../../../../../../config/fbConfig";
import { getFirestoreData } from "../../../../../../store/actions/dataActions";

const time = new Date();

const Chart1 = (props) => {
  const [janWeight, setJanWeight] = useState(0);
  const [febWeight, setFebWeight] = useState(0);
  const [marWeight, setMarWeight] = useState(0);
  const [aprWeight, setAprWeight] = useState(0);
  const [mayWeight, setMayWeight] = useState(0);
  const [junWeight, setJunWeight] = useState(0);
  const [julWeight, setJulWeight] = useState(0);
  const [augWeight, setAugWeight] = useState(0);
  const [sepWeight, setSepWeight] = useState(0);
  const [octWeight, setOctWeight] = useState(0);
  const [novWeight, setNovWeight] = useState(0);
  const [decWeight, setDecWeight] = useState(0);

  function fetchData() {
    //TODO get this working by converting to function instead of class
    var data = {
      masterCollection: "data",
      collection: "writtenFoodWasteData",
      uid: props.auth.uid,
    };
    props.getFirestoreData(data);
  }

  const updateChart = async () => {
    props.data.forEach((doc) => {
      try {
        var date = new Date(doc.date.seconds * 1000);
        var year = date.getFullYear();
        var month = date.getMonth();
      } catch (err) {
        console.log(err);
      }
      var weight = doc.foodWasteWeight;
      var wu = doc.weightType;

      var newWeight = 0;

      if (wu === "kg" || wu === "l") {
        newWeight = Number(weight * 1);
        // console.log(newWeight);
      } else if (wu === "g" || wu === "ml") {
        newWeight = Number((weight * 0.001).toFixed(3));
        // console.log(newWeight);
      } else if (wu === "oz") {
        newWeight = Number((weight * 0.028).toFixed(3));
        // console.log(newWeight);
      } else if (wu === "lbs") {
        newWeight = Number((weight * 0.454).toFixed(3));
        // console.log(newWeight);
      }

      if (year === time.getFullYear()) {
        switch (month) {
          case 0:
            setJanWeight((janWeight) => janWeight + newWeight);
            break;
          case 1:
            setFebWeight((febWeight) => febWeight + newWeight);
            break;
          case 2:
            setMarWeight((marWeight) => marWeight + newWeight);
            break;
          case 3:
            setAprWeight((aprWeight) => aprWeight + newWeight);
            break;
          case 4:
            setMayWeight((mayWeight) => mayWeight + newWeight);
            break;
          case 5:
            setJunWeight((junWeight) => junWeight + newWeight);
            break;
          case 6:
            setJulWeight((julWeight) => julWeight + newWeight);
            break;
          case 7:
            setAugWeight((augWeight) => augWeight + newWeight);
            break;
          case 8:
            setSepWeight((sepWeight) => sepWeight + newWeight);
            break;
          case 9:
            setOctWeight((octWeight) => octWeight + newWeight);
            break;
          case 10:
            setNovWeight((novWeight) => novWeight + newWeight);
            break;
          case 11:
            setDecWeight((decWeight) => decWeight + newWeight);
            break;
          default:
            break;
        }
      }
    });
  };

  //Called once at first render if props.data is empty
  useEffect(() => {
    if (props.data.length <= 0) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Called whenever props.data updates
  useEffect(() => {
    updateChart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data]);

  return (
    <React.Fragment className="row">
      <br />
      <br />
      <br />
      <BrowserView>
        {/* <ChartStyle> */}
        <div
          style={{ height: "120%", marginBottom: "2.5%", marginLeft: "10%" }}
        >
          <Chart
            className="bar-chart"
            width={"78vw"}
            height={"600px"}
            chartType="ColumnChart"
            loader={<div>Loading Chart</div>}
            data={[
              ["Month", "Food Wastage Weight"],
              ["January", janWeight],
              ["February", febWeight],
              ["March", marWeight],
              ["April", aprWeight],
              ["May", mayWeight],
              ["June", junWeight],
              ["July", julWeight],
              ["August", augWeight],
              ["September", sepWeight],
              ["October", octWeight],
              ["November", novWeight],
              ["December", decWeight],
            ]}
            options={{
              // backgroundColor: 'lightgray',
              title: "This year's Food Wastage Performance (" + time + ")",
              chartArea: { width: "75%" },
              colors: ["#aab41e"],
              hAxis: {
                title: "Month of " + time,
                minValue: 0,
              },
              vAxis: {
                title: "Weight of Food Wastage (kg)",
              },
            }}
            legendToggle
          />
        </div>
        {/* </ChartStyle> */}

        <div style={{ height: "40px", marginBottom: "10%" }}>
          <Card
            style={{
              width: "78vw",
              height: "35px",
              marginBottom: "10%",
              marginLeft: "10%",
              padding: "2.5% 5% 2.5% 5%",
              justifyContent: "center",
            }}
          >
            <ButtonGroup>
              <Button
                style={{ width: "15%" }}
                className="custom-btn"
                as={Link}
                to="/chart/month"
              >
                View Previous (Monthly Weight)
              </Button>
              <Button
                style={{ width: "7.5%" }}
                className="custom-btn"
                as={Link}
                to="/account"
              >
                Back
              </Button>
              <Button style={{ width: "15%" }} disabled>
                View Next
              </Button>
            </ButtonGroup>
          </Card>
        </div>
      </BrowserView>

      <MobileView>
        {/* <ChartStyle> */}
        <div
          style={{ height: "120%", marginBottom: "2.5%", marginLeft: "5.5%" }}
        >
          <Chart
            className="bar-chart"
            width={"90vw"}
            height={"600px"}
            chartType="ColumnChart"
            loader={<div>Loading Chart</div>}
            data={[
              ["Month", "Weight "],
              ["January", janWeight],
              ["February", febWeight],
              ["March", marWeight],
              ["April", aprWeight],
              ["May", mayWeight],
              ["June", junWeight],
              ["July", julWeight],
              ["August", augWeight],
              ["September", sepWeight],
              ["October", octWeight],
              ["November", novWeight],
              ["December", decWeight],
            ]}
            options={{
              // backgroundColor: 'lightgray',
              title: "Food Wastage Performance (" + time + ")",
              chartArea: { width: "62.5%" },
              legend: "none",
              colors: ["#aab41e"],
              hAxis: {
                title: "Month of " + time,
                minValue: 0,
              },
              vAxis: {
                title: "Weight of Food Wastage (kg)",
              },
            }}
            legendToggle
          />
        </div>
        {/* </ChartStyle> */}

        <div style={{ height: "95px", marginBottom: "10%" }}>
          <Card
            style={{
              width: "90vw",
              height: "95px",
              marginBottom: "10%",
              marginLeft: "5.5%",
              padding: "2.5% 5% 2.5% 5%",
              justifyContent: "center",
            }}
          >
            <ButtonGroup>
              <Button
                style={{ width: "15%" }}
                className="custom-btn"
                as={Link}
                to="/chart/month"
              >
                Prev
              </Button>
              <Button
                style={{ width: "7.5%" }}
                className="custom-btn"
                as={Link}
                to="/account"
              >
                Back
              </Button>
              <Button style={{ width: "15%" }} disabled>
                Next
              </Button>
            </ButtonGroup>
          </Card>
        </div>
      </MobileView>
      <br />
      <br />
      <br />
    </React.Fragment>
  );
};

const ChartStyle = styled.div`
  .bar-chart {
    position: absolute;
    left: 50%;
    right: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .bar-chart.mobile {
    left: 4%;
  }

  .area-chart {
    padding: 10px;
  }
`;

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
  data: state.data.getData,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getFirestoreData: (product) => dispatch(getFirestoreData(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chart1);
