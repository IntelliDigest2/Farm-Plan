import React, { useState } from "react";

import "../../SubComponents/Button.css";
import { PageWrap } from "../../SubComponents/PageWrap";
import { Dropdown } from "../../SubComponents/Dropdown";
import { PopUp } from "../../SubComponents/PopUp";
import SellerAuth from "./SellerAuth";

import { Form, Button, InputGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { createMarketplaceData } from "../../../../store/actions/dataActions";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import styled from "styled-components";
// import { getFirebase} from 'react-redux-firebase'
// import DisplayError from '../pages/DisplayError'
import moment from "moment";
// import { fs } from "../../../../config/fbConfig";
// import { Autocomplete } from "@material-ui/lab";
// import { TextField } from "@material-ui/core";

//const time = moment().format("MMMM Do YYYY, h:mm:ss a");

const dailyTabTime = moment().format("ddd MMM Do YYYY");

//for autocomplete, have the food options be every item that they have sold in the past (getFirebase, forEach doc etcetc)

const AddProductsFarm = (props) => {
  //I'm going to change autocomplete function here to mui rather than bootstrap (theirs is better)
  const [food, setFood] = useState("");
  const [category, setCategory] = useState("Vegetables");

  const [weight, setWeight] = useState(0);
  const [unit, setUnit] = useState("kg");

  //followed by an option to give the food composition, carbs, protein, fibre, fat etc, not a priority.
  const [producedLocally, setProducedLocally] = useState(false);

  const [price, setPrice] = useState(0.0);
  const [currency, setCurrency] = useState("GBP (£)");

  const [expires, setExpires] = useState(dailyTabTime);
  const [comment, setComment] = useState(false);
  //image upload
  // set a "my products" list to update whenever someone uploads an item, so they can see all of their available listings (and sold products?)
  //put ghg things in a separate lil box so it's obvious that they are not form items
  //on hover make it have a little detail about why we include the info.
  const [ghg, setGhg] = useState([0, "kgCO2", 1.54, "£"]);

  //pop up
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function HandleSubmit() {
    var data = {
      uid: props.auth.uid,
      upload: {
        food: food,
        category: category,
        weight: [weight, unit],
        producedLocally: producedLocally,
        price: [price, currency],
        expires: expires,
        comment: comment,
      },
    };
    if (food !== "" && weight !== 0) {
      props.createMarketplaceData(data);
      handleClickOpen();
    } else {
      console.log("error");
    }
  }

  //data for dropdown
  const dropdown = {
    categories: [
      "Dairy",
      "Drinks",
      "Fish and Seafood",
      "Fruits",
      "Grains, Bean and Nuts",
      "Meat and Poultry",
      "Pet Foods",
      "Vegetables",
    ],
    measurements: ["kg", "g", "/", "oz", "lbs", "/", "l", "ml"],
    currencies: ["GBP (£)", "USD ($)", "EUR (€)"],
  };

  if (!props.profile.isSeller) {
    return <SellerAuth />;
  } else {
    return (
      <>
        <PageWrap goTo="/account" header="Sell Products" subtitle="Add an Item">
          <Form
            className="form-layout"
            style={{ padding: "10px" }}
            onSubmit={(e) => {
              e.preventDefault();
              HandleSubmit();
            }}
          >
            <Form.Group>
              <Form.Label>Food Name</Form.Label>
              <Form.Control
                type="text"
                id="food"
                onChange={(e) => setFood(e.target.value)}
                value={food}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Food Category</Form.Label>
              <Dropdown
                id="category"
                styling="green"
                data={category}
                function={(e) => {
                  setCategory(e);
                }}
                items={dropdown.categories}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Weight</Form.Label>
              <InputGroup>
                <Form.Control
                  type="number"
                  id="weight"
                  onChange={(e) => setWeight(e.target.value)}
                  value={weight}
                  required
                />
                <Dropdown
                  id="unit"
                  styling="green dropdown-input-right"
                  data={unit}
                  function={(e) => {
                    setUnit(e);
                  }}
                  items={dropdown.measurements}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group>
              <Form.Label>Price</Form.Label>
              <InputGroup>
                <Dropdown
                  id="currency"
                  styling="green dropdown-input-left"
                  data={currency}
                  function={(e) => {
                    setCurrency(e);
                  }}
                  items={dropdown.currencies}
                />
                <Form.Control
                  type="number"
                  id="price"
                  required
                  step={0.1}
                  precision={2}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  value={price}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group>
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                id="expires"
                type="date"
                value={expires}
                required
                onChange={(e) => {
                  setExpires(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group>
              <Form.Check
                type="checkbox"
                id="producedLocally"
                label="This item was produced locally."
                onClick={(e) => setProducedLocally(true)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                as="textarea"
                rows={6}
                placeholder="Any Comments?"
                id="comment"
                name="comment"
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
            </Form.Group>

            <Button type="submit" className="sub-btn blue">
              Submit
            </Button>
          </Form>
        </PageWrap>
        <PopUp
          open={open}
          onClose={handleClose}
          text="View my products"
          to="/view-products"
        >
          Item Successfully Submitted!
        </PopUp>
      </>
    );
  }
};

const foodOptions = [
  { title: "Cereal" },
  { title: "Bacon" },
  { title: "Baked Beans" },
  { title: "Porridge" },
  { title: "Pancake" },
  { title: "Beef" },
  { title: "Chicken" },
  { title: "Pork" },
  { title: "Apple" },
  { title: "Banana" },
  { title: "Orange" },
  { title: "Pear" },
  { title: "Grapes" },
  { title: "Chocolate" },
  { title: "Crisps" },
  { title: "Pasta" },
  { title: "Bolognese" },
  { title: "Potato" },
  { title: "Chips" },
  { title: "Milk" },
  { title: "Fruit Juice" },
  { title: "Onion" },
];

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    data: state.firestore.ordered.data,
    profile: state.firebase.profile,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createMarketplaceData: (product) =>
      dispatch(createMarketplaceData(product)),
  };
};

const ExpDate = styled.div`
  .exp-date {
    display: flex;
    flex-direction: column;
    width: 6.5rem;
    height: 6.5rem;
    border: 1px solid #ececec;
    background-color: rgb(15, 62, 115);
    color: white;
    border-radius: 12px;
    align-items: center;
    justify-content: center;
  }

  .exp-date__month {
    font-size: 0.75rem;
    font-weight: bold;
    margin-bottom: -0.5rem;
  }

  .exp-date__year {
    font-size: 0.75rem;
  }

  .exp-date__day {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

const DDMenuStyle = styled.div`
  .dd {
    background-color: white;
    color: grey;
    border-color: grey;
  }
`;

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    if (!props.auth.uid) return [];
    return [
      {
        collection: "data",
        doc: props.auth.uid,
      },
    ];
  })
)(AddProductsFarm);
