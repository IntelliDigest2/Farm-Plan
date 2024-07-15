import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "react-leaflet-markercluster/dist/styles.min.css";
import "./Map.css";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { PageWrap } from "../../SubComponents/PageWrap";


import {
  getMapData,
  updateMapDataWithBuildingFunction,
} from "../../../store/actions/dataActions";
import { firestoreConnect } from "react-redux-firebase";
import { Box, Container, Stack } from "@mui/material";
import MultipleSelect from "../../SubComponents/MultipleSelect";
import { Button } from "react-bootstrap";

//Map component
const Map = (props) => {
  console.log(props);
  const categoryOptions = [
    " Recreational Centers",
    "Material/Supply",
    "Purchase Admin",
    "Machinery/Supply",
    "Household",
    "Shop/Supermarket",
    "Hotels",
    "Hospitals",
    "Restaurants",
    "Offices",
    "Consultant",
    "Schools",
    "Personal",
    "Farm",
    "Households",
    "Admin",
    "Public",
  ];

  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);

  const [locationstate, setLocation] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    setLocation([]);
    if (props.data !== null && props.data !== undefined) {
      extractFilters(props.data);
      updateMap();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data]);

  // Extract unique locations and categories
  const extractFilters = (data) => {
    const locationSet = new Set();
    const categorySet = new Set();

    Object.values(data).forEach((doc) => {
      locationSet.add(doc.location);
      categorySet.add(doc.buildingFunction);
    });

    setLocations([...locationSet]);
    setCategories([...categorySet]);
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Filter locations based on search input
  const filteredLocations = locations.filter((location) =>
    location.toLowerCase().includes(searchInput.toLowerCase())
  );

  const updateMap = async () => {
    var mapData = Object.values(props.data);

    var locationArray = [];

    mapData.forEach((doc) => {
      var index = locationArray.findIndex((x) => x.location === doc.location);

      // If location does not exist, create a new object
      if (index === -1) {
        const newObj = {
          foodWasteWeight: doc.foodWasteWeight ?? 0,
          location: doc.location ?? "",
          coords: doc.coords ?? [0, 0],
          users: 1,
        };

        if (doc.buildingFunction) {
          newObj[doc.buildingFunction] = 1;
        }

        locationArray.push(newObj);
      } else {
        if (doc.foodWasteWeight !== undefined) {
          locationArray[index].foodWasteWeight += doc.foodWasteWeight;
        }
        locationArray[index].users += 1;

        if (
          doc.buildingFunction &&
          locationArray[index][doc.buildingFunction] !== undefined
        ) {
          locationArray[index][doc.buildingFunction] += 1;
        } else if (doc.buildingFunction) {
          locationArray[index][doc.buildingFunction] = 1;
        }
      }
    });

    locationArray.forEach((doc) => {
      try {
        var obj = {
          lat: doc.coords[0],
          lng: doc.coords[1],
          location: doc.location,
          users: doc.users,
          foodWasteWeight: doc.foodWasteWeight,
          ...Object.keys(doc).reduce((acc, key) => {
            if (
              key !== "coords" &&
              key !== "location" &&
              key !== "users" &&
              key !== "foodWasteWeight"
            ) {
              acc[key] = doc[key];
            }
            return acc;
          }, {}),
        };
        setLocation((oldArray) => [...oldArray, obj]);
      } catch (err) {
        // console.log(err);
      }
    });

    // console.log("Location data:", locationArray);
  };

  const filterData = () => {
    return locationstate.filter((doc) => {
      const matchesLocation =
        selectedLocation.length === 0 ||
        selectedLocation.includes(doc.location);
      const matchesCategory =
        selectedCategory.length === 0 ||
        selectedCategory.some((category) => doc.hasOwnProperty(category));
      return matchesLocation && matchesCategory;
    });
  };

  //Marker colours
  //const large = { color: "#ffffff", fillColor: "#ec7063", fillOpacity: 0.5 };
  const medium = { color: "#ffffff", fillColor: "#f5b041", fillOpacity: 0.5 };
  const small = { color: "#ffffff", fillColor: "#58d68d", fillOpacity: 0.5 };
  // }
  //Map Marker
  function MapMarker(props) {
    // Handle Marker Color based on users
    var color;
    if (props.users <= 10) {
      color = small;
    } else {
      color = medium;
    }

    // If only 1 user, or many users
    var _users = "User";
    if (props.users > 1) _users = "Users";

    // Generate building function counts
    const buildingFunctionCounts = Object.keys(props)
      .filter(
        (key) =>
          !["lat", "lng", "location", "users", "foodWasteWeight"].includes(key)
      )
      .map((key) => `${key}: ${props[key]}`)
      .join("<br />");

    return (
      <CircleMarker
        center={[props.lat, props.lng]}
        pathOptions={color}
        radius={18}
      >
        <Tooltip>
          {props.location}: {props.users} {_users} <br />
          <div dangerouslySetInnerHTML={{ __html: buildingFunctionCounts }} />
        </Tooltip>
      </CircleMarker>
    );
  }

  //Cluster Marker
  const createClusterCustomIcon = function (cluster) {
    var children = cluster.getAllChildMarkers();
    var sum = 0;

    children.forEach((child) => {
      sum += child._tooltip.options.children[2];
    });

    //Color based on no of users
    var c = " ";
    if (sum < 10) {
      c += "small";
      // } else if (sum < 100) {
      //   c += "medium";
    } else {
      c += "medium";
    }

    return L.divIcon({
      html: `<b>${sum}</b>`,
      className: "marker-cluster-custom" + c,
      iconSize: L.point(40, 40, true),
    });
  };

  const handleUpdate = () => {
    console.log("Dispatching updateMapDataWithBuildingFunction");
    props.updateMapDataWithBuildingFunction();
  };

  const resetFilters = () => {
    setSelectedLocation([]);
    setSelectedCategory([]);
  };

  //Redirect if not logged in
  if (!props.auth.uid) return <Redirect to="/login" />;
  return (
    <PageWrap header="Users Map" goTo="/account">
      <div style={{ position: "relative" }}>
        <MapContainer
          className="map-data"
          center={[0, 0]}
          zoom={1.4}
          minZoom={1.4}
          maxZoom={12}
          scrollWheelZoom={true}
          maxBounds={[
            [84.865782, -179.632962],
            [-84.865782, 199.335822],
          ]}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> IntelliDigest - iTracker'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkerClusterGroup
            iconCreateFunction={createClusterCustomIcon}
            polygonOptions={{
              weight: 2,
              opacity: 1,
              fillOpacity: 0.5,
              smoothFactor: 20,
            }}
            showCoverageOnHover={true}
            maxClusterRadius={50}
          >
            {filterData().map((doc, index) => (
              <MapMarker
                key={index}
                lat={doc.lat}
                lng={doc.lng}
                foodWasteWeight={doc.foodWasteWeight}
                location={doc.location}
                users={doc.users}
                {...Object.keys(doc)
                  .filter(
                    (key) =>
                      ![
                        "lat",
                        "lng",
                        "location",
                        "users",
                        "foodWasteWeight",
                      ].includes(key)
                  )
                  .reduce((acc, key) => {
                    acc[key] = doc[key];
                    return acc;
                  }, {})}
              />
            ))}
          </MarkerClusterGroup>
        </MapContainer>
        <Container
          sx={{
            display: "flex",
            width: "20%",
          }}
          className="mapContainer"
        >
          {/* <SearchBar value={searchInput} onChange={handleSearchInputChange} /> */}
          <MultipleSelect
            name={"Location"}
            options={locations}
            selectedOptions={selectedLocation}
            onChange={setSelectedLocation}
          />
          <MultipleSelect
            name={"Category"}
            options={categoryOptions}
            selectedOptions={selectedCategory}
            onChange={setSelectedCategory}
          />
          {/* <Select
            styles={{
              width: "100px",
            }}
            name="Location"
            options={locations.map((location) => ({
              value: location,
              label: location,
            }))}
            value={selectedLocation}
            onChange={setSelectedLocation}
            placeholder="Search and select locations"
            noOptionsMessage={() => "We cannot find WFT user in this city"}
          /> */}
          {/* <Select
            isMulti
            name="Category"
            options={categoryOptions.map((category) => ({
              value: category,
              label: category,
            }))}
            value={selectedCategory}
            onChange={setSelectedCategory}
            placeholder="Search and select categories"
          /> */}
          <Button
            style={{ backgroundColor: "#AFBA15", border: "none" }}
            onClick={resetFilters}
          >
            Reset
          </Button>
        </Container>
      </div>
    </PageWrap>
  );
};

const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Search Location"
      style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    // data: state.data.getData,
    data: state.firestore.data.mapData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMapData: (product) => dispatch(getMapData(product)),
    updateMapDataWithBuildingFunction: () =>
      dispatch(updateMapDataWithBuildingFunction()),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    if (!props.auth) return [];
    return [
      {
        collection: "mapData",
        storeAs: "mapData",
      },
    ];
  })
)(Map);
