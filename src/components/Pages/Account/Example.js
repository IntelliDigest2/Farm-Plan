import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  createExample,
  getExample,
} from "../../../store/actions/exampleAction";

function Example(props) {
  const [example, setExample] = useState("");
  const [added, setAdded] = useState(0);
  const [displayData, setDisplayData] = useState([]);

  const handleSubmit = () => {
    var data = {
      example: example,
    };
    props.createExample(data);
    setAdded(added + 1);
  };

  useEffect(() => {
    props.getExample();
    console.log(props.data);
  }, [added]);

  const updateDisplayData = async () => {
    //clears the array before each update- IMPORTANT
    setDisplayData([]);

    //sets a new  object in the array for every document in the collection
    props.data.forEach((doc) => {
      //id is the docref for deletion
      var example = doc.example;

      setDisplayData((displayData) => [
        ...displayData,
        {
          example: example,
        },
      ]);
    });
  };

  //fires update local state whenever redux state changes
  useEffect(() => {
    updateDisplayData();
    console.log(props.data);
  }, [props.data]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          id="example-form"
          onChange={(e) => setExample(e.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>
      {displayData && (
        <ul>
          {displayData.map((item, index) => (
            <li key={index}>{item.example}</li>
          ))}
        </ul>
      )}
    </>
  );
}

//takes in the state of the store and maps to an object
const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
    data: state.data.getData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createExample: (data) => dispatch(createExample(data)),
    getExample: (data) => dispatch(getExample(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Example);
