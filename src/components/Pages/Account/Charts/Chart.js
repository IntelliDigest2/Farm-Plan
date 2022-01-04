import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { Tabs, Tab, Container } from "react-bootstrap";
import styled from "styled-components";
import "../UserAccount.css";

import { connect } from "react-redux";
import { fs } from "../../../../config/fbConfig";

import moment from "moment";

const time = moment().format("W");

function MyChart(props) {
  return (
    <Container className={ChartStyle}>
      <Chart
        chartType="ColumnChart"
        width="100%"
        height="400px"
        data={props.data}
        loader={<div>Loading Chart</div>}
        options={props.options}
      />
    </Container>
  );
}

/*const data = await response
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var week = doc.data().WEEK;
          var day = doc.data().WDAY;
          //var month = doc.data().MONTH;
          //var mdate = doc.data().MDATE;
          var weight = doc.data().weight;
          var wu = doc.data().WEIGHTUNIT;

          var st = doc.data().SUBMISSIONTYPE;

          var newWeight = 0;

          if (wu === "kg" || wu === "l") {
            newWeight = Number(weight * 1);
          } else if (wu === "g" || wu === "ml") {
            newWeight = Number((weight * 0.001).toFixed(3));
          } else if (wu === "oz") {
            newWeight = Number((weight * 0.028).toFixed(3));
          } else if (wu === "lbs") {
            newWeight = Number((weight * 0.454).toFixed(3));
          }

          if (week === time && day === "Mon" && st === "Waste") {
            setMon((prevMon) => (prevMon += newWeight));
          } else if (week === time && day === "Tue" && st === "Waste") {
            setTue((prevTue) => (prevTue += newWeight));
          } else if (week === time && day === "Wed" && st === "Waste") {
            setWed((prevWed) => (prevWed += newWeight));
          } else if (week === time && day === "Thur" && st === "Waste") {
            setThur((prevThur) => (prevThur += newWeight));
          } else if (week === time && day === "Fri" && st === "Waste") {
            setFri((prevFri) => (prevFri += newWeight));
            console.log("friday");
          } else if (week === time && day === "Sat" && st === "Waste") {
            setSat((prevSat) => (prevSat += newWeight));
          } else if (week === time && day === "Sun" && st === "Waste") {
            setSun((prevSun) => (prevSun += newWeight));
          }
        });
      }) */
function WeekWeight(props) {
  //this creates the state
  const [chart, setChart] = useState([]);
  const [mon, setMon] = useState(0);
  const [tue, setTue] = useState(0);
  const [wed, setWed] = useState(0);
  const [thur, setThur] = useState(0);
  const [fri, setFri] = useState(0);
  const [sat, setSat] = useState(0);
  const [sun, setSun] = useState(0);

  //this defines fetchCharts method, maybe bring out method into chartfunction specific folder so that this can be generalised.
  const fetchCharts = async () => {
    const response = fs.collection("data");

    const data = await response.get();

    data.docs.forEach((item) => {
      setChart([...chart, item.data()]);
    }); //still here, trying to work out .then to modify data for chart.
  };

  //this sends data request
  useEffect(() => {
    fetchCharts();
  }, []);

  return (
    <MyChart
      data={[
        ["Day", "Weight "],
        ["Mon", mon],
        ["Tue", tue],
        ["Wed", wed],
        ["Thu", thur],
        ["Fri", fri],
        ["Sat", sat],
        ["Sun", sun],
      ]}
      options={{
        title: "This week's Food Waste Performance",
        legend: "none",
        colors: ["#aab41e"],
        hAxis: { title: "Day", minValue: 0 },
        vAxis: { title: "Weight of Food Wastage (kg)" },
      }}
    />
  );
}

function ChartView() {
  return (
    //tabbed window with daily weekly monthly yearly
    <Tabs defaultActiveKey="daily" id="food-waste-weight" className="mb-3">
      <Tab eventKey="daily" title="Daily">
        <WeekWeight />
      </Tab>
      <Tab eventKey="weekly" title="Weekly">
        <WeekWeight />
      </Tab>
      <Tab eventKey="monthly" title="Monthly">
        <WeekWeight />
      </Tab>
    </Tabs>
  );
}

const ChartStyle = styled.div`
  .bar-chart {
    position: absolute;
    left: 50%;
    right: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .area-chart {
    padding: 10px;
  }
`;

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps, null)(WeekWeight);
