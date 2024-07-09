import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { PageWrap } from "../../../../components/SubComponents/PageWrap";
import { compose } from "redux";
import { Container, Button, Typography } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import MealCard from "./MealCard";
import AddMealForm from "./AddMealForm";
import {
  addMeals,
  removeMeal,
} from "../../../../store/actions/publicSector/councilActions";
import { firestoreConnect } from "react-redux-firebase";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const MealManagement = (props) => {
  const { profile, governmentUsers } = props;

  const [open, setOpen] = useState(false);
  const [mealList, setMealList] = useState([]);
  const [meal, setMeal] = useState({
    name: "",
    nutritionalComposition: {
      portionSize: "",
      energyKCal: "",
      fat: "",
      satFat: "",
      carb: "",
      fibre: "",
      sodium: "",
      sugar: "",
      protein: "",
      calcium: "",
    },
    mealRecipe: {
      recipe: [""],
      method: [""],
      allergy: [""],
    },
    dietType: "None",
  });
  console.log(mealList);

  useEffect(() => {
    setMealList([]);
    if (
      governmentUsers &&
      profile.uid &&
      governmentUsers[profile.uid] &&
      governmentUsers[profile.uid].meals
    ) {
      extractMeals(governmentUsers[profile.uid].meals);
    }
  }, [governmentUsers, profile.uid]);

  const extractMeals = (data) => {
    const mealSet = new Set();
    data.forEach((meal) => mealSet.add(JSON.stringify(meal)));
    const mealArray = Array.from(mealSet).map((meal) => JSON.parse(meal));
    setMealList(mealArray);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e, index = null, type = null) => {
    const { name, value } = e.target;
    if (type) {
      setMeal((prevMeal) => {
        const updatedTypeArray = [...prevMeal.mealRecipe[type]];
        updatedTypeArray[index] = value;
        return {
          ...prevMeal,
          mealRecipe: {
            ...prevMeal.mealRecipe,
            [type]: updatedTypeArray,
          },
        };
      });
    } else if (name in meal.nutritionalComposition) {
      setMeal((prevMeal) => ({
        ...prevMeal,
        nutritionalComposition: {
          ...prevMeal.nutritionalComposition,
          [name]: value,
        },
      }));
    } else {
      setMeal((prevMeal) => ({
        ...prevMeal,
        [name]: value,
      }));
    }
  };

  const handleAddField = (type) => {
    setMeal((prevMeal) => {
      const updatedTypeArray = [...prevMeal.mealRecipe[type], ""];
      return {
        ...prevMeal,
        mealRecipe: {
          ...prevMeal.mealRecipe,
          [type]: updatedTypeArray,
        },
      };
    });
  };

  const handleRemoveField = (index, type) => {
    setMeal((prevMeal) => {
      const updatedTypeArray = prevMeal.mealRecipe[type].filter(
        (item, idx) => idx !== index
      );
      return {
        ...prevMeal,
        mealRecipe: {
          ...prevMeal.mealRecipe,
          [type]: updatedTypeArray,
        },
      };
    });
  };

  const handleAddMeal = () => {
    const { addMeals, profile } = props;

    addMeals(meal, profile.uid)
      .then(() => {
        // setMealList((prevMealList) => [...prevMealList, meal]);
        console.log("Meal Added");
        handleClose();
      })
      .catch((error) => {
        console.error("Error adding meal:", error);
      });
  };

  const handleDeleteMeal = (mealName) => {
    const { removeMeal, profile } = props;
    removeMeal(mealName, profile.uid)
      .then(() => {
        setMealList((prevMealList) =>
          prevMealList.filter((meal) => meal.name !== mealName)
        );
        console.log("Meal removed successfully:", mealName);
      })
      .catch((error) => {
        console.error("Error removing meal:", error);
      });
  };

  return (
    <>
      <PageWrap goTo="/account">
        <Container>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#AFBA15",
              margin: "20px",
            }}
            onClick={handleClickOpen}
          >
            Add Meal
          </Button>
          <AddMealForm
            open={open}
            handleClose={handleClose}
            meal={meal}
            handleChange={handleChange}
            handleAddMeal={handleAddMeal}
            handleAddField={handleAddField}
            handleRemoveField={handleRemoveField}
          />

          {mealList.length === 0 ? (
            <Typography
              variant="h6"
              align="center"
              color="textSecondary"
              style={{ marginTop: 20 }}
            >
              No Meal
            </Typography>
          ) : (
            <Box sx={{ flexGrow: 1, margin: "10px" }}>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                {mealList.map((meal, index) => (
                  <Grid item xs={2} sm={4} md={4} key={index}>
                    <MealCard
                      meal={meal}
                      handleDeleteMeal={() => handleDeleteMeal(meal.name)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Container>
      </PageWrap>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    governmentUsers: state.firestore.data.government_users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addMeals: (data, uid) => dispatch(addMeals(data, uid)),
    removeMeal: (data, uid) => dispatch(removeMeal(data, uid)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    if (!props.auth || props.auth.isEmpty) return [];
    return [
      {
        collection: "government_users",
        storeAs: "government_users",
      },
    ];
  })
)(MealManagement);
