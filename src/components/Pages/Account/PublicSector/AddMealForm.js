import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import InputField from "./InputField";

const AddMealForm = ({
  open,
  handleClose,
  meal,
  handleChange,
  handleAddMeal,
  handleAddField,
  handleRemoveField,
}) => {
  return (
    <>
      <Dialog
        sx={{
          "& .MuiDialog-paper": {
            width: "60%", // Change this value to adjust the width
            maxWidth: "80vw", // Add a max-width to ensure responsiveness
          },
        }}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle
          sx={{
            color: "white",
            backgroundColor: "#AFBA15",
          }}
        >
          Meal
        </DialogTitle>
        <DialogContent sx={{ margin: "20px" }}>
          <InputField
            name={"name"}
            label={"Dish Name"}
            value={meal.name}
            onChange={handleChange}
          />

          {meal.mealRecipe.allergy.map((allergy, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <InputField
                name={"Allergy"}
                label={`Allergy ${index + 1}`}
                value={allergy}
                onChange={(e) => handleChange(e, index, "allergy")}
              />
              <IconButton
                sx={{
                  marginLeft: "5px",
                  backgroundColor: "#AFBA15",
                  color: "white",
                }}
                onClick={() => handleRemoveField(index, "allergy")}
              >
                <Remove />
              </IconButton>
            </div>
          ))}
          <Button
            sx={{
              backgroundColor: "#AFBA15",
              color: "white",
            }}
            onClick={() => handleAddField("allergy")}
          >
            <Add /> Add Allergy
          </Button>

          <InputField
            name={"portionSize"}
            label={"Portion Size (g)"}
            value={meal.nutritionalComposition.portionSize}
            onChange={handleChange}
          />
          <InputField
            name={"energyKCal"}
            label={"EnergyKCal (g)"}
            value={meal.nutritionalComposition.energyKCal}
            onChange={handleChange}
          />
          <InputField
            name={"fat"}
            label={"Fat (g)"}
            value={meal.nutritionalComposition.fat}
            onChange={handleChange}
          />
          <InputField
            name={"satFat"}
            label={"SatFat (g)"}
            value={meal.nutritionalComposition.satFat}
            onChange={handleChange}
          />
          <InputField
            name={"carb"}
            label={"Carb (g)"}
            value={meal.nutritionalComposition.carb}
            onChange={handleChange}
          />
          <InputField
            name={"fibre"}
            label={"Fibre (g)"}
            value={meal.nutritionalComposition.fibre}
            onChange={handleChange}
          />
          <InputField
            name={"sodium"}
            label={"Sodium (g)"}
            value={meal.nutritionalComposition.sodium}
            onChange={handleChange}
          />
          <InputField
            name={"sugar"}
            label={"Sugar (g)"}
            value={meal.nutritionalComposition.sugar}
            onChange={handleChange}
          />
          <InputField
            name={"protein"}
            label={"Protein (g)"}
            value={meal.nutritionalComposition.protein}
            onChange={handleChange}
          />
          <InputField
            name={"calcium"}
            label={"Calcium (g)"}
            value={meal.nutritionalComposition.calcium}
            onChange={handleChange}
          />
          {/* Repeat TextField components for other nutritionalComposition fields */}

          {meal.mealRecipe.recipe.map((ingredient, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center" }}>
              <InputField
                name={"Recipe"}
                label={`Ingredient ${index + 1}`}
                value={ingredient}
                onChange={(e) => handleChange(e, index, "recipe")}
              />
              <IconButton
                sx={{
                  backgroundColor: "#AFBA15",
                  color: "white",
                  marginLeft: "5px",
                }}
                onClick={() => handleRemoveField(index, "recipe")}
              >
                <Remove />
              </IconButton>
            </div>
          ))}
          <Button
            sx={{
              backgroundColor: "#AFBA15",
              color: "white",
            }}
            onClick={() => handleAddField("recipe")}
          >
            <Add /> Add Ingredient
          </Button>

          {meal.mealRecipe.method.map((step, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center" }}>
              <InputField
                name="Method"
                label={`Step ${index + 1}`}
                value={step}
                onChange={(e) => handleChange(e, index, "method")}
              />
              <IconButton
                sx={{
                  backgroundColor: "#AFBA15",
                  color: "white",
                  marginLeft: "5px",
                }}
                onClick={() => handleRemoveField(index, "method")}
              >
                <Remove />
              </IconButton>
            </div>
          ))}
          <Button
            sx={{
              backgroundColor: "#AFBA15",
              color: "white",
            }}
            onClick={() => handleAddField("method")}
          >
            <Add /> Add Step
          </Button>

          <FormControl fullWidth variant="outlined" margin="dense">
            <Select
              labelId="dietType-label"
              name="dietType"
              value={meal.dietType}
              onChange={handleChange}
              label="Diet Type"
            >
              <MenuItem value="Vegetarian">Vegetarian</MenuItem>
              <MenuItem value="Vegan">Vegan</MenuItem>
              <MenuItem value="None">None</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              backgroundColor: "#AFBA15",
              color: "white",
            }}
            onClick={handleClose}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            sx={{
              backgroundColor: "#AFBA15",
              color: "white",
            }}
            onClick={handleAddMeal}
            color="primary"
          >
            Add Meal
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddMealForm;
