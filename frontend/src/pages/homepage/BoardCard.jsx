import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import "./BoardCard.css"

export default function BoardCard({ board, handleDeleteBoard }) {
  const { id, title, description, imageUrl, author } = board;

  return (
    <Card className="card">
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
      <CardActions className="actions">
        <Button component={RouterLink} to={`/board/${id}`} variant="contained">
          View Board
        </Button>
        <Button
          size="small"
          onClick={() => handleDeleteBoard(id)}
          startIcon={<DeleteIcon />}
          variant="outlined"
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

BoardCard.propTypes = {
  board: PropTypes.object.isRequired,
  handleDeleteBoard: PropTypes.func.isRequired,
};
