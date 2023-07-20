import React, { useEffect, useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import "../../../../../../SubComponents/Button.js";
import { Dropdown } from "../../../../../../SubComponents/Dropdown.js";
import DatePicker from "react-datepicker";
import moment from "moment";


import { connect } from "react-redux";
import { addItemData } from "../../../../../../../store/actions/shopActions/shopPlanData.js";
import { submitNotification } from "../../../../../../lib/Notifications.js";
// import { addToInventory } from "../../../../../../../store/actions/marketplaceActions/inventoryData";

const AddItemForm = (props) => {
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [measure, setMeasure] = useState("g");
  const [price, setPrice] = useState(0);
  const [currency, setCurrency] = useState("$");

  const [show, setShow] = useState(true);
  const [image, setImage ] = useState("");
  const [ Url, setUrl ] = useState("");

  useEffect(() => {
    if (Url !== "") {
      handleSubmit();
      props.handleFormClose();

      // console.log("image", Url)

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

  
  //control modal
  const handleForm = () => setShow(true);
  const handleFormClose = () => {
    setShow(false);
  }

  //trigger this when editing/deleting items
  const [update, setUpdate] = useState(0);
  const forceUpdate = () => {
    setUpdate(update + 1);
  };

  //fired when click "done"
  const handleSubmit = () => {
    const data = {
      upload: {
        item: item,
        measure: measure,
        quantity: quantity,
        price: price,
        currency: currency,
        imageURL: Url,
        //quantity: local.quantity
        createdAt: new Date()

      },
    }; 

    props.addItemData(data);
    submitNotification("Success","Item has been added");
    forceUpdate();
  };


  return (
    <div>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            uploadImage(); // Call uploadImage
            // handleSubmit();
          }}
        >

          <div>
            <Form.Group>
              <Form.Label>Item name</Form.Label>
              <Form.Control
                type="text"
                id="item"
                onChange={(e) => {
                  setItem(e.target.value);
                }}                
                value={item}
              />
            </Form.Group>

            <Form.Group>
            <Form.Label>Quantity</Form.Label>
            <InputGroup>
              <Form.Control
                id="quantity"
                type="number"
                min="0"
                step=".5"
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}                 
                value={quantity}
              />
              <Dropdown
                id="measure"
                styling="grey dropdown-input"
                data={measure}
                items={["g", "kg", "/", "mL", "L", "/", "bags","cups", "units", "pcs", "oz", "lbs"]}
                function={(e) => {
                  setMeasure(e);
                }} 
              />
            </InputGroup>
            </Form.Group>

            <Form.Group>
            <Form.Label>Estimated Price Per Unit</Form.Label>
            <InputGroup>
              <Form.Control
                id="price"
                type="number"
                min="0"
                step="1"
                onChange={(e) => {
                  setPrice(e.target.value);
                }} 
                defaultValue={price}
              />
              <Dropdown
                id="currency"
                styling="grey dropdown-input"
                data={currency}
                items={["$", "€", "£"]}
                function={(e) => {
                  setCurrency(e);
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


        </div>
          <div style={{ alignItems: "center" }}>
            <Button className="blue-btn shadow-none mt-3" type="submit">
              Done
            </Button>
          </div>
        </Form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    shopItems: state.shopData.shopItems,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addItemData: (data) => dispatch(addItemData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddItemForm);

