import React, { useState, useEffect } from "react";

import { useTranslation, Trans } from 'react-i18next';


import SalesBox from "./SalesBox";
import { connect } from "react-redux";
import { getSales} from "../../../../../store/actions/supplierActions/supplierData";
const SavedSales = (props) => {

  const { t } = useTranslation();

  const [sSales, setSSales] = useState([]);



  //trigger this when editing/deleting items
  const [update, setUpdate] = useState(0);
  const forceUpdate = () => {
    setUpdate(update + 1);
  };

  //this sends data request
  useEffect(() => {
    props.getSales();
  }, [update]);

  

  const updateSSales = async () => {
    //clears the meals array before each update- IMPORTANT
    setSSales([]);

    //sets a new meal object in the array for every document with this date attached
    props.Sales.forEach((doc) => {
      var productName = doc.productName;
      var productDescription = doc.productDescription;
      var id = doc.id;
      var companyID = doc.companyID;
      var imageURL = doc.imageURL
      var productCurrency = doc.productCurrency;
      var productPrice = doc.productPrice;
      var productMeasure = doc.productMeasure;
      var productQty = doc.productQty

      setSSales((sSales) => [
        ...sSales,
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
    updateSSales();
    console.log("Saved Meals", sSales);
    // .then(setSMeals(sorted));
    // console.log(props.data);
  }, [props.Sales]);

  return (
    <>
    {sSales.length ? (
      <>
       <div className="row">
       <div className="col-8 basic-title-left mb-3">My available products listing</div>
     </div>
     <div className="meals">
       <SalesBox
         forceUpdate={forceUpdate}
         onChange={props.onChange}
         sales={sSales}
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
    Sales: state.supplier.savedSales,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSales: (saved) => dispatch(getSales(saved)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedSales);
