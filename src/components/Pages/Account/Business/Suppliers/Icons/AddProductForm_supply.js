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
import { submitNotification } from "../../../../../lib/Notifications";

function AddProductForm_supply(props) {

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productCurrency, setProductCurrency] = useState("$");
  const [productQty, setProductQty] = useState("");
  const [productMeasure, setProductMeasure] = useState("g");
  const [image, setImage ] = useState("");
  const [ Url, setUrl ] = useState("");

  useEffect(() => {
    if (Url !== "") {
      handleSubmit();
    }
  }, [Url]);
  
  //upload immage to cloudinary
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "product_upload");
    formData.append("cloud_name", "dghm4xm7k");
    formData.append("resize", "fill");
    formData.append("width", "500");
    formData.append("height", "500");
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dghm4xm7k/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const responseData = await response.json();
      setUrl(responseData.url);
    } catch (error) {
      console.log(error);
    }
  };
  

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
      upload: {
        productName: productName,
        productDescription: productDescription,
        productPrice: productPrice,
        productCurrency: productCurrency,
        productQty: productQty,
        imageURL: Url,
        // mealType: mealType,
        productMeasure: productMeasure,
        companyName: props.profile.companyName,
        city: props.profile.city,
        region: props.profile.region,
        mobile: props.profile.mobile,
        email: props.profile.email,
        createdAt: new Date()
      },
    };
    props.createProduct(data);
    forceUpdate();
    submitNotification("Success", `${productName}` + " has been added!");

    // if (save) {
    //   props.createMenu(data);
    // }
    // props.addToShoppingList(data);
  };

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        uploadImage(); // Call uploadImage
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
              setProductMeasure(e.target.value);
            }}
          />
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type="file"
          placeholder="Upload Image"
          defaultValue={""}
          required
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />
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
