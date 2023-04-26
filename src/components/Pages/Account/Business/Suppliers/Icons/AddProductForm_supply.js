import React, { useState, useEffect } from "react";
import { Dropdown } from "../../../../../SubComponents/Dropdown";
import MenuSection from "../../../Personal/Marketplace/MealPlanComp/Search/menuSection";
import MealType from "../../../Personal/Marketplace/MealPlanComp/Search/mealType";
import { Form, InputGroup, Button } from "react-bootstrap";
import FoodItemSearch from "../../../Personal/Marketplace/MealPlanComp/Icons/InputRecipe/FoodItemSearch";
import "../../../../../SubComponents/Button.css";

import { connect } from "react-redux";
import { foodIdAPI, nutritionAPI } from "../../../Personal/Marketplace/MealPlanComp/Icons/InputRecipe/NutritionApi";
import SaveMealIcon from "../../../Personal/Marketplace/MealPlanComp/Icons/SaveMealIcon";
import { createProduct } from "../../../../../../store/actions/supplierActions/supplierData";

function AddProductForm_supply(props) {

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productCurrency, setProductCurrency] = useState("$");
  const [productQty, setProductQty] = useState("");
  const [productMeasure, setProductMeasure] = useState("g");

    // const [mealType, setMealType] = useState("");
  const [err, setErr] = useState("");
  
  //trigger this when editing/deleting items
  const [update, setUpdate] = useState(0);
  const forceUpdate = () => {
    setUpdate(update + 1);
  };

  //fired when click "done"
  const handleSubmit = () => {
    const data = {
      // month and day are used for the MealPlan db, year and week for the shopping list.
      // year: props.value.format("YYYY"),
      // month: props.value.format("YYYYMM"),
      // week: props.value.format("w"),
      // day: props.value.format("DD"),
      upload: {
        productName: productName,
        productDescription: productDescription,
        productPrice: productPrice,
        productCurrency: productCurrency,
        productQty: productQty,
        // mealType: mealType,
        productMeasure: productMeasure,
        companyName: props.profile.companyName,
        city: props.profile.city,
        region: props.profile.region,
        mobile: props.profile.mobile,
        email: props.profile.email
      },
    };

    props.createProduct(data);
    forceUpdate();

    // if (save) {
    //   props.createMenu(data);
    // }
    // props.addToShoppingList(data);
  };

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
        // props.handleFormClose();
      }}
    >
      {/* <button
        onClick={() => {
          nutritionAPI(local);
        }}
      >
        send test
      </button> */}

      <Form.Group>
        <Form.Label>Product name</Form.Label>
        <Form.Control
          type="text"
          id="mealName"
          onChange={(e) => {
            setProductName(e.target.value);
          }}
          required
        />

      <Form.Label>Product description</Form.Label>
        <Form.Control
          type="text"
          id="mealDescription"
          onChange={(e) => {
            setProductDescription(e.target.value);
          }}
        />  

        <Form.Label>Product price</Form.Label>
          <InputGroup>
              <Form.Control
                id="mealPrice"
                type="number"
                min="0"
                step="1"
                onChange={(e) => {
                  setProductPrice(e.target.value);
                }}
                defaultValue={productPrice}
              />
              <Dropdown
                id="currency"
                styling="grey dropdown-input"
                data={productCurrency}
                items={["$", "€", "£"]}
                function={(e) => {
                  setProductCurrency(e)
                  }
                }
              />
            </InputGroup>
      </Form.Group>

      <Form.Group>
        <Form.Label>Weight/Volume</Form.Label>
        <InputGroup>
          <Form.Control
            id="quantity"
            type="number"
            min="0"
            step=".1"
            onChange={(e) => {
              setProductQty(e.target.value);
            }}
            value={productQty}
          />
          <Dropdown
            id="measure"
            styling="grey dropdown-input"
            data={productMeasure}
            items={["g", "kg", "/", "mL", "L", "/", "tsp", "tbsp", "cups"]}
            function={(e) => {
              setProductMeasure(e);
            }}
          />
        </InputGroup>
      </Form.Group>

      <div style={{ alignItems: "center" }}>
        <Button className="blue-btn shadow-none" type="submit">
        {/* <Button className="blue-btn shadow-none" type="submit"> */}
          Done
        </Button>
      </div>
    </Form>
  );
}

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createProduct: (data) => dispatch(createProduct(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProductForm_supply);
