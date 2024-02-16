// here we just want a form that contains the same shit that AddMealModal contains
import React, { useState, useEffect } from "react";
import "../../../../../../SubComponents/Button.css";
import { Form, InputGroup, Button } from "react-bootstrap";

import { recipeSearch, nextPage } from "./search";
import RecipeList from "./RecipeList";
import MenuSection from "../../Personal/Marketplace/MealPlanComp/Search/menuSection";
import MealType from "./mealType"
import CuisineType from "./cuisineType";
import InfoModal from "./InfoModal";
import NextBack from "./Next";

export default function RecipeSearch(props) {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  //sends to api
  const [query, setQuery] = useState("");
  // const [mealType, setMealType] = useState("");
  const [menuSection, setMenuSection] = useState("");

  const [cuisineType, setCuisineType] = useState("");
  //sent back from api
  const [recipes, setRecipes] = useState({});
  const [links, setLinks] = useState("");
  //handles next and back
  const [page, setPage] = useState("");
  // contains list of pages already visited - needed for 'previous' button to function
  const [arrPages, setArrPages] = useState([]);
  // keeps track of page number
  const [pageNumber, setPageNumber] = useState(0);

  // checks if link is already added to array and
  // if not then it adds the link to the array
  function addPageToArray(page) {
    if (arrPages.includes(page)) {
      console.log("Page already in array!");
      return;
    }
    setArrPages((prevArrPages) => [...prevArrPages, page]);
    // console.log("This is the pages array ", arrPages);
  }

  useEffect(() => {
    recipeSearch(
      query,
      // mealType,
      menuSection,
      cuisineType,
      setRecipes,
      setLinks,
      addPageToArray
    );
    // console.log("recipes", recipes);
    // console.log("Next Page", links);
  // }, [query, mealType, cuisineType]);
}, [query, menuSection, cuisineType]);


  useEffect(() => {
    page && nextPage(page, setLinks, setRecipes);
    // console.log("next page", page);
  }, [page]);

  // changes the page number by offset and sets the page variable to the correct link
  function changePage(offset) {
    if (offset > 0) {
      // visiting new page i.e. new link needed
      setPageNumber((oldValue) => oldValue + offset);
      setPage(links.next.href);
      addPageToArray(links.next.href);
    } else if (offset < 0) {
      // visiting previous page i.e. link saved in arrPages
      setPageNumber((oldValue) => (oldValue === 0 ? 0 : oldValue - 1));
      if (pageNumber != 0) setPage(arrPages[pageNumber]);
    }
  }

  return (
    <>
      <div className="basic-title-left">Search Recipes</div>
      <InfoModal show={show} setShow={setShow} />
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          setQuery(search);
        }}
      >
        <Form.Group>
          <InputGroup>
            <Form.Control
              className="shadow-none"
              type="text"
              id="query"
              defaultValue={query}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <Button type="submit" className="green-btn shadow-none">
              Search
            </Button>
          </InputGroup>
        </Form.Group>
        <div className="refine-search">
          <p>Meal Type:</p>
          <div>
            {/* <MealType setMealType={setMealType} /> */}
            <MenuSection setMenuSection={setMenuSection} />

          </div>
        </div>
        <div className="refine-search">
          <p>Origin:</p>
          <div>
            <CuisineType setCuisineType={setCuisineType} />
          </div>
        </div>
      </Form>
      <RecipeList
        recipes={recipes}
        query={query}
        value={props.value}
        onChange={props.onChange}
      />
      <NextBack links={links} pageNumber={pageNumber} changePage={changePage} />
    </>
  );
}




// //ADDMEALMODAL SHIT


// export function AddMealModal({ show, setShow, value }) {
//   const [eatingOut, setEatingOut] = useState("unconfirmed");

//   //control barcode scanner
//   const [scan, setScan] = useState(false);
//   const [expand, setExpand] = useState("+ scan from barcode");
//   //scanning items will add item as a meal in meal plan including nutrition info and ingrs if information available
//   const handleSetScan = () => {
//     setScan(!scan);
//     if (scan) {
//       setExpand("+ scan from barcode");
//     } else {
//       setExpand("- input manually");
//     }
//   };

//   //control modal
//   const handleForm = () => setShow(true);
//   const handleFormClose = () => {
//     setShow(false);
//     setEatingOut("unconfirmed");
//   };

//   return (
//     <>
//       <Tooltip title="add" arrow>
//         <div className="button">
//           <AddButton onClick={handleForm} />
//         </div>
//       </Tooltip>
//       <Modal
//         show={show}
//         onHide={handleFormClose}
//         size="lg"
//         aria-labelledby="add meal"
//         centered
//       >
//         <Modal.Header closeButton>
//           <Modal.Title id="add-meal" className="basic-title-left basic-lg">
//             Add new meal for {value.format("DD/MM")}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <InOrOut
//             eatingOut={eatingOut}
//             setEatingOut={setEatingOut}
//             handleFormClose={handleFormClose}
//           >
//             <button
//               className="btn success shadow-none qrcode-btn"
//               onClick={() => handleSetScan()}
//             >
//               {expand}
//             </button>
//             {scan ? (
//               <Scanner />
//             ) : (
//               <AddMealForm value={value} handleFormClose={handleFormClose} />
//             )}
//           </InOrOut>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// }


