import React, { useState, useEffect } from "react";
import Html5QrcodePlugin from "./Html5QrcodeScanner";
import ResultContainerPlugin from "./ResultContainerPlugin";
import "./QRCode.css";
import { backdropClasses } from "@mui/material";
import { Form, InputGroup, Button, Alert } from "react-bootstrap";
import "../Button.css"
import { addToShoppingList } from "../../../store/actions/marketplaceActions/shoppingListData";
import { connect } from "react-redux";



function Scanner(props) {
  const [decodedResults, setDecodedResults] = useState([]);
  const [mealName, setMealName] = useState("");
  const [mealType, setMealType] = useState("");
  const [error, setError] = useState(null)
  const [ingredients, setIngredients] = useState([]);
  const [ingredientList, setIngredientList] = useState([]);
  const [show, setShow] = useState(true);

 
  const onNewScanResult = (decodedText, decodedResult) => {

    fetch(`https://world.openfoodfacts.org/api/v0/product/${decodedResult.decodedText}.json`)
    .then(response => response.json())
    .then(data => {
      setIngredientList(data.product.ingredients)
      setMealName(data.product.brands)

      // console.log(data.product.ingredients_hierarchy)

    }).catch((err) => {
      console.log(err.message)
      setError(err.message)
     });


  };

  const defaultLocal = {
    food: "",
    quantity: 0,
    measure: "g",
    foodId: "",
  };

  const [local, setLocal] = useState(defaultLocal);
  

  const handleIngredient = (e) => {
    setLocal((local.food = e.target.value));
    setIngredients((ingredients) => [...ingredients, local]);
    setLocal(defaultLocal);
  };

  useEffect(() => {
    console.log("ingredients", ingredients);
  }, [ingredients]);


  //fired when click "done"
  const handleSubmit = () => {
    const data = {
      //month and day are used for the MealPlan db, year and week for the shopping list.
      year: props.value.format("YYYY"),
      month: props.value.format("YYYYMM"),
      week: props.value.format("w"),
      day: props.value.format("DD"),
      upload: {
        meal: mealName,
        ingredients: ingredients,
      },
    };


    props.addToShoppingList(data);
  };

  return (
    <>
      <Html5QrcodePlugin
        fps={10}
        qrbox={250}
        disableFlip={false}
        qrCodeSuccessCallback={onNewScanResult}

      />
      <p style={{fontSize: '20px', fontWeight: 'bold', color: 'green'}}>{mealName}</p>

      <Alert variant="success">
        <Alert.Heading>Missing some items in your meal plan?</Alert.Heading>
        <p>
          The scanner allows you to add more items to your meal plan
        </p>
      </Alert>

        <Form
           onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
            //props.handleFormClose();
          }}
        >
      
        <Form.Group>
        <li>{ingredientList && ingredientList.map(data => 
        <div><p>
          <Form.Label>{data?.id}</Form.Label>
          <Button
            type="text"
            id="add ingredient"
            value={data?.id}
            onClick={(e) => {
              handleIngredient(e, "value");
            }}
            required
          >
          Add
        </Button>
        </p></div>)}</li>
        </Form.Group>

      <div style={{ alignItems: "center" }}>
        <Button className="blue-btn shadow-none" type="submit">
          Done
        </Button>
      </div>        
      </Form>
      {error && <div><p>Oops..Could not fetch food item, pls try another barcode..😭</p></div>}
     
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToShoppingList: (data) => dispatch(addToShoppingList(data)),
  };
};

export default connect(null, mapDispatchToProps)(Scanner);
