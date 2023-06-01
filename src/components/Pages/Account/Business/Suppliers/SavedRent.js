import React, { useState, useEffect } from "react";

import { useTranslation, Trans } from 'react-i18next';


import RentBox from "./RentBox";
import { connect } from "react-redux";
import { getRent} from "../../../../../store/actions/supplierActions/supplierData";
const SavedRent = (props) => {

  const { t } = useTranslation();

  const [sRent, setSRent] = useState([]);



  //trigger this when editing/deleting items
  const [update, setUpdate] = useState(0);
  const forceUpdate = () => {
    setUpdate(update + 1);
  };

  //this sends data request
  useEffect(() => {
    props.getRent();
  }, [update]);

  

  const updateSRent = async () => {
    //clears the meals array before each update- IMPORTANT
    setSRent([]);

    //sets a new meal object in the array for every document with this date attached
    props.Rent.forEach((doc) => {
      var productName = doc.productName;
      var productDescription = doc.productDescription;
      var id = doc.id;
      var companyID = doc.companyID;
      var imageURL = doc.imageURL
      var productCurrency = doc.productCurrency;
      var productPrice = doc.productPrice;
      var productMeasure = doc.productMeasure;
      var productQty = doc.productQty

      setSRent((sRent) => [
        ...sRent,
        {
          productName: productName,
          productDescription: productDescription,
          productCurrency: productCurrency,
          id: id,
          companyID: companyID,
          imageURL: imageURL,
          productPrice: productPrice,
          productMeasure: productMeasure,
          productQty: productQty,
        },
      ]);
    });
  };

  useEffect(() => {
    // const sorted = sMeals.sort((a, b) => a.meal.localeCompare(b.meal));
    updateSRent();
    console.log("Saved Meals", sRent);
    // .then(setSMeals(sorted));
    // console.log(props.data);
  }, [props.Rent]);

  return (
    <>
     {sRent.length ? (
      <>
       <div className="row">
       <div className="col-8 basic-title-left mb-3">My available products listing</div>
     </div>
     <div className="meals">
       <RentBox
         forceUpdate={forceUpdate}
         onChange={props.onChange}
         rent={sRent}
       />
     </div>
     </>
    ):(
      <div className="empty basic-title-left">
          <p> No item yet 🙂 add a product from the stock tab </p>
        </div>
    )}
     
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    Rent: state.supplier.savedRent,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRent: (saved) => dispatch(getRent(saved)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedRent);
