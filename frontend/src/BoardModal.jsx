import PropTypes from "prop-types";
import {
  Button,
  Modal,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

import "./BoardModal.css";

export default function BoardModal({
  handleBoardCreation,
  displayBoardModal,
  setDisplayBoardModal,
}) {
  return (
    <Modal
      open={displayBoardModal}
      onClose={() => setDisplayBoardModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form id="modal-form" onSubmit={handleBoardCreation}>
        <TextField required name="title" label="Title" />
        <TextField required name="description" label="Description" />
        <TextField required name="imageUrl" label="Image" />
        <TextField name="author" label="Author" />

        <FormControl fullWidth>
          <InputLabel>Category *</InputLabel>
          <Select required name="category" defaultValue="">
            <MenuItem value="celebration">Celebration</MenuItem>
            <MenuItem value="thank-you">Thank You</MenuItem>
            <MenuItem value="inspiration">Inspiration</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="outlined">
          Create Board
        </Button>
      </form>
    </Modal>
  );
}

BoardModal.propTypes = {
  handleBoardCreation: PropTypes.func.isRequired,
  displayBoardModal: PropTypes.bool.isRequired,
  setDisplayBoardModal: PropTypes.func.isRequired,
};
