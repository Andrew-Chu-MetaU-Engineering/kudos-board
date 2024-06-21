import PropTypes from "prop-types";
import { Button, Modal, TextField } from "@mui/material";

import "./CardModal.css";

export default function CardModal({
  handleCardCreation,
  displayCardModal,
  setDisplayCardModal,
}) {
  return (
    <Modal open={displayCardModal} onClose={() => setDisplayCardModal(false)}>
      <form id="modal-form" onSubmit={handleCardCreation}>
        <TextField required name="title" label="Title" />
        <TextField required name="description" label="Description" />
        <TextField required name="imageUrl" label="Image" />
        <TextField name="author" label="Author" />

        <Button type="submit" variant="outlined">
          Create Card 
        </Button>
      </form>
    </Modal>
  );
}

CardModal.propTypes = {
  handleCardCreation: PropTypes.func.isRequired,
  displayCardModal: PropTypes.bool.isRequired,
  setDisplayCardModal: PropTypes.func.isRequired,
};
