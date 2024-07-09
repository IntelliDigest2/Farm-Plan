import React, { useState } from "react";
import { connect } from "react-redux";
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
import { PageWrap } from "../../../../components/SubComponents/PageWrap";

const TrackFoodWaste = () => {
  const [location, setLocation] = useState("all");

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  // Dummy data for waste monitoring
  const dummyData = [
    { location: "School A", waste: 50 },
    { location: "School B", waste: 40 },
    { location: "Hospital X", waste: 30 },
    { location: "Hospital Y", waste: 20 },
    { location: "Care Home Z", waste: 10 },
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
            Environment - Waste Monitoring
          </Typography>

          <FormControl fullWidth style={{ marginBottom: 20 }}>
            <InputLabel>Location</InputLabel>
            <Select value={location} onChange={handleLocationChange}>
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
                  <TableCell>Waste (kg)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>{data.location}</TableCell>
                    <TableCell>{data.waste}</TableCell>
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

export default connect(mapStateToProps, null)(TrackFoodWaste);
