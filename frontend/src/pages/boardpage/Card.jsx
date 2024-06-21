import PropTypes from "prop-types";

import MuiCard from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from "@mui/icons-material/Delete";

function Card({ card, handleDeleteCard, handleUpvoteCard, openCommentsModal }) {
  const { id, title, description, imageUrl, author, upvotes } = card;

  return (
    <>
      <MuiCard onClick={() => openCommentsModal(id)}>
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
          <Typography variant="body1" color="text.secondary">
            {author}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={(e) => handleUpvoteCard(e, id)}
            startIcon={<ThumbUpIcon />}
            variant="contained"
          >
            {upvotes}
          </Button>

          <Button
            size="small"
            onClick={(e) => handleDeleteCard(e, id)}
            startIcon={<DeleteIcon />}
            variant="outlined"
          >
            Delete
          </Button>
        </CardActions>
      </MuiCard>{" "}
    </>
  );
}

export default Card;

Card.propTypes = {
  card: PropTypes.object.isRequired,
  handleDeleteCard: PropTypes.func.isRequired,
  handleUpvoteCard: PropTypes.func.isRequired,
  openCommentsModal: PropTypes.func.isRequired,
};
