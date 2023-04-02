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
      var id = doc.id;
      var restaurantName = doc.restaurantName;
      var meal = doc.meal;
      var mealDescription = doc.mealDescription;
      var mealPrice = doc.mealPrice;
      var ingredients = doc.ingredients;
      var city = doc.city;
      var email = doc.email;
      var mobile = doc.mobile;
      var region = doc.region;
      var restaurantID = doc.restaurantID;

      setRes((res) => [
        ...res,
        {
          id: id,
          meal: meal,
          restaurantName: restaurantName,
          mealDescription: mealDescription,
          mealPrice: mealPrice,
          ingredients: ingredients,
          city: city,
          email: email,
          mobile: mobile,
          region: region,
          restaurantID: restaurantID,
        },
      ]);
    });
  };

  useEffect(() => {
    updateResData()
    console.log("print res list", res)
  }, [props.Res, props.profile]); 

  const handleSubmit = () => {
    const data = {
      name: name,
      email: email,
      location: location,
    };
    props.recommend(data);
  };

  return (
    <>
    { res == '' ? 
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
    : res ?
      <>
      <MenuBox menu={res} forceUpdate={forceUpdate}/>
      {/* <div className="basic-title-left">
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
      </div> */}
    </>
    :  
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
    </>}
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
