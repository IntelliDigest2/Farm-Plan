import React, { useState } from "react";
import { connect } from "react-redux";
import { PageWrap } from "../../../../components/SubComponents/PageWrap";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const ConsumpReport = () => {
  const [location, setLocation] = useState("all");

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  // Dummy data for consumption reporting
  const dummyData = [
    { location: "School A", meal: "Chicken Salad", consumption: 200 },
    { location: "School B", meal: "Veggie Burger", consumption: 150 },
    { location: "Hospital X", meal: "Grilled Fish", consumption: 100 },
    { location: "Hospital Y", meal: "Fruit Salad", consumption: 50 },
    { location: "Care Home Z", meal: "Pasta", consumption: 75 },
  ];

  // Filter data based on selected location
  const filteredData =
    location === "all"
      ? dummyData
      : dummyData.filter((data) => data.location === location);
  return (
    <>
      <PageWrap goTo="/account">
        <Container>
          <Typography variant="h4" gutterBottom>
            Health - Consumption Reporting
          </Typography>

          <FormControl fullWidth style={{ marginBottom: 20 }}>
            <InputLabel>Location</InputLabel>
            <Select sx={{
              
            }} value={location} onChange={handleLocationChange}>
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="School A">School A</MenuItem>
              <MenuItem value="School B">School B</MenuItem>
              <MenuItem value="Hospital X">Hospital X</MenuItem>
              <MenuItem value="Hospital Y">Hospital Y</MenuItem>
              <MenuItem value="Care Home Z">Care Home Z</MenuItem>
            </Select>
          </FormControl>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Location</TableCell>
                  <TableCell>Meal</TableCell>
                  <TableCell>Consumption (units)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>{data.location}</TableCell>
                    <TableCell>{data.meal}</TableCell>
                    <TableCell>{data.consumption}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </PageWrap>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps, null)(ConsumpReport);
