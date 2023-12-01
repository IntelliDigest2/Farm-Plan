import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import "../../../../../../SubComponents/Button.css";
import { useTranslation, Trans } from 'react-i18next';

import { recommend } from "../../../../../../../store/actions/marketplaceActions/mealPlanData";
import { getRestaurantData } from "../../../../../../../store/actions/marketplaceActions/restaurantData"
import MenuBox from "../../../../Business/Restaurant/MenuBox";


function EatingOut(props) {

  //console.log("city", props.profile.city)

  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term


  // set get restarant in users location state
  const [res, setRes] = useState("");

  //trigger this when editing/deleting items
  const [update, setUpdate] = useState(0);
  const forceUpdate = () => {
    setUpdate(update + 1);
  };


  //this sends data request with current user location
  useEffect(() => {
    const data = {
      //decided to group year and month together, should this be changed?
      city: props.profile.city,
    };
    props.getRestaurantData(data);
  }, [update]);

  const updateResData = async () => {
    //clears the meals array before each update- IMPORTANT
    setRes([]);

    //sets a new meal object in the array for every document with this date attached
    props.Res.forEach((doc) => {
      var mealID = doc.id;
      var restaurant_name = doc.restaurantName;
      var meal_name = doc.meal;
      var mealDescription = doc.mealDescription;
      var mealPrice = doc.mealPrice;
      var mealCurrency = doc.mealCurrency;
      var ingredients = doc.ingredients;
      var city = doc.city;
      var email = doc.email;
      // var mobile = doc.mobile;
      // var region = doc.region;
      var restaurantID = doc.restaurantID;

      setRes((res) => [
        ...res,
        {
          mealID: mealID,
          meal_name: meal_name,
          restaurant_name: restaurant_name,
          mealDescription: mealDescription,
          mealPrice: mealPrice,
          mealCurrency: mealCurrency,
          ingredients: ingredients,
          city: city,
          email: email,
          // mobile: mobile,
          // region: region,
          restaurantID: restaurantID,
        },
      ]);
    });
  };

  useEffect(() => {
    updateResData()
    console.log("print res list", res)
  }, [props.Res, props.profile, searchTerm]); 

  const handleSubmit = () => {
    const data = {
      name: name,
      email: email,
      location: location,
    };
    props.recommend(data);
  };

  // Function to filter restaurants based on search term
const filterRestaurants = () => {
  if (!searchTerm) {
    return res; // Return all restaurants if no search term
  }

  // Filter restaurants based on search term
  return res.filter((restaurant) => {
    const lowercaseName = restaurant.restaurantName ? restaurant.restaurantName.toLowerCase() : "";
    const lowercaseCity = restaurant.city ? restaurant.city.toLowerCase() : "";
    const lowercaseMeal = restaurant.meal ? restaurant.meal.toLowerCase() : "";
    const lowercaseDescription = restaurant.mealDescription ? restaurant.mealDescription.toLowerCase() : "";


    return (
      lowercaseName.includes(searchTerm.toLowerCase()) ||
      lowercaseCity.includes(searchTerm.toLowerCase()) ||
      lowercaseMeal.includes(searchTerm.toLowerCase()) ||
      lowercaseDescription.includes(searchTerm.toLowerCase())

    );
  });
};


  return (
    <>
     <div className="search-bar">
        <input
          type="text"
          placeholder="Enter search item"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {filterRestaurants().length === 0 ? (
        <>
          <div className="basic-title-left">
            
            <>
        <div className="basic-title-left">
          <div className="mb-3">
            {t('description.we_have_not_restaurant')}
          </div>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
              props.handleFormClose();
            }}
          >
          <Form.Group>
            <Form.Label>{t('description.restaurant_name')}</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{t('description.location')}</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setLocation(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{t('description.email_address')}</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Button className="green-btn" type="submit">
            {t('description.button_submit')}
          </Button>
        </Form>
      </div>
      </>
          </div>
        </>
      ) : (
        <>
          <MenuBox menu={filterRestaurants()} forceUpdate={forceUpdate} />
        </>
      )}

    </>
   
  );
}

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
    Res: state.restaurant.res,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    recommend: (data) => dispatch(recommend(data)),
    getRestaurantData: (data) => dispatch(getRestaurantData(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EatingOut);
