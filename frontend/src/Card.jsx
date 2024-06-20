import PropTypes from "prop-types";

import MuiCard from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function Card({ card }) {
  const { title, description, imageUrl } = card;
  return (
    <MuiCard>
      <CardMedia // TODO edit and specify attributes
        component="img"
        alt="TODO"
        height="140"
        width="140"
        image={imageUrl}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Upvote</Button>
        <Button size="small">Delete</Button>
      </CardActions>
    </MuiCard>
  );
}

export default Card;

Card.propTypes = {
  card: PropTypes.object.isRequired,
};
