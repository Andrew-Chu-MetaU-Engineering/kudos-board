import PropTypes from "prop-types";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function BoardCard({
  board,
  handleOpenBoard,
  handleDeleteBoard,
}) {
  const { id, title, description } = board;

  return (
    <Card>
      <CardMedia // TODO edit and specify attributes
        component="img"
        alt="TODO"
        height="140"
        width="140"
        image="https://placehold.co/400"
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
        <Button size="small" onClick={() => handleOpenBoard(id)}>
          View Board
        </Button>
        <Button size="small" onClick={() => handleDeleteBoard(id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

BoardCard.propTypes = {
  board: PropTypes.object.isRequired,
  handleOpenBoard: PropTypes.func.isRequired,
  handleDeleteBoard: PropTypes.func.isRequired,
};
