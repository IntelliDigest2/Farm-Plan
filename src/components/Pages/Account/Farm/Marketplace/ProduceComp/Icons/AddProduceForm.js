import React, { useEffect, useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import "../../../../../../SubComponents/Button.js";
import { Dropdown } from "../../../../../../SubComponents/Dropdown";
import DatePicker from "react-datepicker";
import moment from "moment";


import { connect } from "react-redux";
import { addProduceData } from "../../../../../../../store/actions/marketplaceActions/farmPlanData.js";
import { submitNotification } from "../../../../../../lib/Notifications.js";
// import { addToInventory } from "../../../../../../../store/actions/marketplaceActions/inventoryData";

const AddProduceForm = (props) => {
  const [produceName, setProduceName] = useState("");
  const [farmType, setFarmType] = useState("Horticulture");
  const [quantity, setQuantity] = useState(0);
  const [measure, setMeasure] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("");

  const [show, setShow] = useState(true);
  const [produceDate, setProduceDate] = useState(new Date());


  const defaultLocal = {
    item: "",
    quantity: 0,
    measure: "units", 
    price: "",
    currency: "$"
  };
  const [local, setLocal] = useState(defaultLocal);
  const handleLocal = (e) => {
    if (e.target.textContent) {
      setLocal({ ...local, [e.target.id]: e.target.textContent });
    } else {
      setLocal({ ...local, [e.target.id]: e.target.value });
    }
  };

  const ChooseFarmType = () => {
    switch (farmType){
      default:
      case "Horticulture":
      return (
        <div>
            <Form.Group>
              <Form.Label>Crop name</Form.Label>
              <Form.Control
                type="text"
                id="item"
                onChange={(e) => handleLocal(e)}
                value={local.item}
              />
            </Form.Group>

            <Form.Group>
            <Form.Label>Quantity of crops</Form.Label>
            <InputGroup>
              <Form.Control
                id="quantity"
                type="number"
                min="0"
                step=".5"
                onChange={(e) => handleLocal(e)}
                value={local.quantity}
              />
              <Dropdown
                id="measure"
                styling="grey dropdown-input"
                data={local.measure}
                items={["g", "kg", "/", "mL", "L", "/", "bags","cups", "units", "pcs", "oz", "lbs"]}
                function={(e) => {
                  setLocal({ ...local, measure: e });
                }}
              />
            </InputGroup>
            </Form.Group>

            <Form.Group>
            <Form.Label>Estimated Price</Form.Label>
            <InputGroup>
              <Form.Control
                id="price"
                type="number"
                min="0"
                step="1"
                onChange={(e) => handleLocal(e)}
                value={local.price}
              />
              <Dropdown
                id="currency"
                styling="grey dropdown-input"
                data={local.currency}
                items={["$", "€", "£"]}
                function={(e) => {
                  setLocal({ ...local, currency: e });
                }}
              />
            </InputGroup>
            </Form.Group>

            <Form.Group>
              <Form.Label>Harvest Date</Form.Label>
              <DatePicker 
                selected={produceDate} 
                onChange={(date) => setProduceDate(date)} 
                dateFormat="dd/mm/yyyy"  
              />
            </Form.Group>

        </div>
      );
      case "Aquaculture":
        return (
          <div>
            <Form.Group>
              <Form.Label>Name of Specie</Form.Label>
              <Form.Control
                type="text"
                id="item"
                onChange={(e) => handleLocal(e)}
                value={local.item}
              />
            </Form.Group>

            <Form.Group>
            <Form.Label>Number of specie</Form.Label>
            <InputGroup>
              <Form.Control
                id="quantity"
                type="number"
                min="0"
                step="1"
                onChange={(e) => handleLocal(e)}
                value={local.quantity}
              />
              <Dropdown
                id="measure"
                styling="grey dropdown-input"
                data={local.measure}
                items={["units", "pcs"]}
                function={(e) => {
                  setLocal({ ...local, measure: e });
                }}
              />
            </InputGroup>
            </Form.Group>

            <Form.Group>
            <Form.Label>Estimated Price</Form.Label>
            <InputGroup>
              <Form.Control
                id="price"
                type="number"
                min="0"
                step="1"
                onChange={(e) => handleLocal(e)}
                value={local.price}
              />
              <Dropdown
                id="currency"
                styling="grey dropdown-input"
                data={local.currency}
                items={["$", "€", "£"]}
                function={(e) => {
                  setLocal({ ...local, currency: e });
                }}
              />
            </InputGroup>
            </Form.Group>

            <Form.Group>
              <Form.Label>Yield Date</Form.Label>
              <DatePicker 
                selected={produceDate} 
                onChange={(date) => setProduceDate(date)} 
                dateFormat="dd/mm/yyyy"  
              />
            </Form.Group>
          </div>
        );
      case "Livestock":
        return (
          <div>
            <Form.Group>
              <Form.Label>Name of Specie</Form.Label>
              <Form.Control
                type="text"
                id="item"
                onChange={(e) => handleLocal(e)}
                value={local.item}
              />
            </Form.Group>

            <Form.Group>
            <Form.Label>Number of Specie</Form.Label>
            <InputGroup>
              <Form.Control
                id="quantity"
                type="number"
                min="0"
                step="1"
                onChange={(e) => handleLocal(e)}
                value={local.quantity}
              />
              <Dropdown
                id="measure"
                styling="grey dropdown-input"
                data={local.measure}
                items={["g", "kg", "/", "units", "pcs", "oz", "lbs"]}
                function={(e) => {
                  setLocal({ ...local, measure: e });
                }}
              />
            </InputGroup>
            </Form.Group>

            <Form.Group>
            <Form.Label>Estimated Price</Form.Label>
            <InputGroup>
              <Form.Control
                id="price"
                type="number"
                min="0"
                step="1"
                onChange={(e) => handleLocal(e)}
                value={local.price}
              />
              <Dropdown
                id="currency"
                styling="grey dropdown-input"
                data={local.currency}
                items={["$", "€", "£"]}
                function={(e) => {
                  setLocal({ ...local, currency: e });
                }}
              />
            </InputGroup>
            </Form.Group>

            <Form.Group>
              <Form.Label>Yield Date</Form.Label>
              <DatePicker 
                selected={produceDate} 
                onChange={(date) => setProduceDate(date)} 
                dateFormat="dd/mm/yyyy"  
              />
            </Form.Group>
          </div>
        );
    }
  }

  
  
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
        farmType: farmType,
        item: local.item,
        measure: local.measure,
        quantity: local.quantity,
        price: local.price,
        currency: local.currency,
        //quantity: local.quantity
        date: moment(produceDate).format("DD/MM/yyyy")
      },
    }; 

    props.addProduceData(data);
    submitNotification("Success","Item has been added");
    forceUpdate();
  };


  return (
    <div>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
            // props.setUpdate(props.update + 1);
            props.handleFormClose();
          }}
        >

      <Form.Group>
        <Form.Label>Farming Type</Form.Label>
        <InputGroup>
          <Dropdown
              id="measure"
              styling="grey dropdown-input"
              data={farmType}
              items={["Horticulture", "Aquaculture", "Livestock"]}
              function={(e) => {
                setFarmType(e);
              }}
            />
        </InputGroup>
      </Form.Group>

        {ChooseFarmType()}

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
    produce: state.farmData.produce,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addProduceData: (data) => dispatch(addProduceData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProduceForm);

