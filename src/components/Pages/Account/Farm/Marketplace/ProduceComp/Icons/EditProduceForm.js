import React, { useState } from "react";
import { Dropdown } from "../../../../../../SubComponents/Dropdown";
import { Form, InputGroup, Button } from "react-bootstrap";
import "../../../../../../SubComponents/Button.css";
import { connect } from "react-redux";
import { editProduceData } from "../../../../../../../store/actions/marketplaceActions/farmPlanData";
import DatePicker from "react-datepicker";
import moment from "moment";
import { submitNotification } from "../../../../../../lib/Notifications";

function EditProduceForm(props) {
  const [produceName, setProduceName] = useState(props.produce.item);
  const [farmType, setFarmType] = useState(props.produce.farmType);
  const [quantity, setQuantity] = useState(props.produce.quantity);
  const [measure, setMeasure] = useState(props.produce.measure);
  const [show, setShow] = useState(true);
  const [produceDate, setProduceDate] = useState(new Date());

 
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
                onChange={(e) => setProduceName(e.target.value)}
                value={produceName}
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
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
              />
              <Dropdown
                id="measure"
                styling="grey dropdown-input"
                data={measure}
                items={["g", "kg", "/", "mL", "L", "/", "bags","cups", "units", "pcs", "oz", "lbs"]}
                function={(e) => {
                  setMeasure(e.target.value);
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
                onChange={(e) => setProduceName(e.target.value)}
                value={produceName}
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
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
              />
              <Dropdown
                id="measure"
                styling="grey dropdown-input"
                data={measure}
                items={["units", "pcs"]}
                function={(e) => {
                  setMeasure(e.target.value);
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
                onChange={(e) => setProduceName(e.target.value)}
                value={produceName}
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
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
              />
              <Dropdown
                id="measure"
                styling="grey dropdown-input"
                data={measure}
                items={["g", "kg", "/", "units", "pcs", "oz", "lbs"]}
                function={(e) => {
                  setMeasure(e.target.value);
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


  const handleSubmit = () => {
    const data = {
      id: props.id,
      upload: {
        item: produceName,
        quantity: quantity,
        measure: measure,
        farmType: farmType,
        date: moment(produceDate).format("DD/MM/yyyy"),
        id: props.id,
      },
    };
      //console.log("edited data", data)
      props.editProduceData(data);
      submitNotification("Success","Item has been Edited");
      props.forceUpdate();
  };

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
        props.handleFormClose();
      }}
    >

      {ChooseFarmType()}

      <div style={{ alignItems: "center" }}>
        <Button className="blue-btn" type="submit">
          Done
        </Button>
      </div>
    </Form>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.data.getData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editProduceData: (data) => dispatch(editProduceData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProduceForm);
