import React, { useState, useEffect } from "react";
import Html5QrcodePlugin from "./Html5QrcodeScanner";
import ResultContainerPlugin from "./ResultContainerPlugin";
import "./QRCode.css";
import { backdropClasses } from "@mui/material";
import { Form, InputGroup, Button, Alert, Table } from "react-bootstrap";
import "../Button.css"
import { addToShoppingList } from "../../../store/actions/marketplaceActions/shoppingListData";
import { connect } from "react-redux";
import { createMealPlanData } from "../../../store/actions/marketplaceActions/mealPlanData";

function Scanner(props) {
  const [decodedResults, setDecodedResults] = useState([]);
  const [mealName, setMealName] = useState("");
  const [error, setError] = useState(null)
  const [ingredients, setIngredients] = useState([]);
  const [ingredientList, setIngredientList] = useState([]);

 
  const onNewScanResult = (decodedText, decodedResult) => {

    fetch(`https://api.barcodelookup.com/v3/products?barcode=${decodedResult.decodedText}&formatted=y&key=89fvqetm4ulqciauxieiosj3zbodet`)
    .then(response => response.json())
    .then(data => {
      setIngredientList(data.products.ingredients)
      setMealName(data.products.title)
      
      console.log(data.products.title)

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

  //trigger this when editing/deleting items
  const [update, setUpdate] = useState(0);
  const forceUpdate = () => {
    setUpdate(update + 1);
  };

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

    props.createMealPlanData(data);
    forceUpdate();
    props.addToShoppingList(data);
  };

  return (
    <>
      <Html5QrcodePlugin
        fps={200}
        qrbox={250}
        disableFlip={false}
        //useBarCodeDetectorIfSupported={true}
        experimentalFeatures={{useBarCodeDetectorIfSupported: true}}
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
        <li>
        <div><p>
          <Table striped>
      <thead>
        
      </thead>
      <tbody>
        <tr>
          <td>{ingredientList}</td>
          <td>
          <Button
            type="text"
            id="add ingredient"
            style={{display: 'flex', justifyContent: 'right'}}
            color="primary"
            className="float-right"
            value={ingredientList}
            onClick={(e) => {
              handleIngredient(e, "value");
              e.currentTarget.disabled = true;
            }}
            required
          >
          Add
        </Button>
          </td>
        </tr>
      </tbody>
    </Table>
          {/* <Form.Label>{data?.id}</Form.Label>
          <Button
            type="text"
            id="add ingredient"
            value={data?.id}
            onClick={(e) => {
              handleIngredient(e, "value");
              e.currentTarget.disabled = true;
            }}
            required
          >
          Add
        </Button> */}
        </p></div></li>
        </Form.Group>

      <div style={{ alignItems: "center" }}>
        <Button className="blue-btn shadow-none" type="submit">
          Save
        </Button>
      </div>        
      </Form>
      {error && <div><p>Oops..Could not fetch food item, pls try another barcode..😭</p></div>}
     
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    createMealPlanData: (mealPlan) => dispatch(createMealPlanData(mealPlan)),
    addToShoppingList: (data) => dispatch(addToShoppingList(data)),
  };
};

export default connect(null, mapDispatchToProps)(Scanner);
