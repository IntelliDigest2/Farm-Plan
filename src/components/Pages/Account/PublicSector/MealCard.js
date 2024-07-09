import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function MealCard({ meal, handleDeleteMeal }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="194"
        image="/eat.png"
        alt="Paella dish"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {meal.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="edit"
          sx={{ backgroundColor: "#AFBA15", marginRight: "5px" }}
        >
          <EditIcon
            sx={{
              color: "white",
              "&:hover": {
                color: "#AFBA15",
              },
            }}
          />
        </IconButton>

        <IconButton
          onClick={handleDeleteMeal}
          aria-label="delete"
          sx={{ backgroundColor: "#AFBA15" }}
        >
          <DeleteIcon
            sx={{
              color: "white",
              "&:hover": {
                color: "#AFBA15",
              },
            }}
          />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          {meal.mealRecipe.method.map((item, index) => (
            <Typography paragraph key={index}>
              {item}
            </Typography>
          ))}
        </CardContent>
      </Collapse> */}
    </Card>
  );
}
