import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import "../../../../../../SubComponents/Button.css";
import { useTranslation, Trans } from 'react-i18next';

import { recommend } from "../../../../../../../store/actions/marketplaceActions/mealPlanData";

function EatingOut(props) {

  const { t } = useTranslation();

  const [restaurant, setRestaurant] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = () => {
    const data = {
      restaurant: restaurant,
      email: email,
      location: location,
    };
    props.recommend(data);
  };

  return (
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
              onChange={(e) => setRestaurant(e.target.value)}
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
  );
}

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    recommend: (data) => dispatch(recommend(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EatingOut);
