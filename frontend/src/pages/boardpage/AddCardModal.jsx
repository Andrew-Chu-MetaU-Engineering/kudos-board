import PropTypes from "prop-types";
import { Button, Modal, TextField } from "@mui/material";

import "./AddCardModal.css";

export default function AddCardModal({
  handleCardCreation,
  displayAddCardModal,
  setDisplayAddCardModal,
  imageUrl,
  children,
}) {
  return (
    <Modal
      open={displayAddCardModal}
      onClose={() => setDisplayAddCardModal(false)}
    >
      <form id="modal-form" onSubmit={handleCardCreation}>
        <TextField required name="title" label="Title" />
        <TextField required name="description" label="Description" />
        <TextField name="author" label="Author" />

        {children}

        <TextField required name="imageUrl" label="GIF" value={imageUrl} />

        <Button type="submit" variant="contained">
          Create Card
        </Button>
      </form>
    </Modal>
  );
}

AddCardModal.propTypes = {
  handleCardCreation: PropTypes.func.isRequired,
  displayAddCardModal: PropTypes.bool.isRequired,
  setDisplayAddCardModal: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};
