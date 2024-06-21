import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, TextField } from "@mui/material";

import "./CommentsModal.css";

export default function CommentsModal({
  displayCommentsModal,
  setDisplayCommentsModal,
  displayCommentsCardId: id,
}) {
  const CARDS_URL = new URL("cards", import.meta.env.VITE_DB_BASE_URL);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, [comments]);

  async function fetchComments() {
    try {
      const response = await fetch(new URL(`cards/${id}/comment`, CARDS_URL));
      if (!response.ok) {
        throw new Error(`HTTP error. Status ${response.status}`);
      }
      const data = await response.json();
      setComments(data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }

  async function handleCommentCreation(e) {
    e.preventDefault();
    try {
      const form = e.target;
      const formData = new FormData(form);
      const response = await fetch(new URL(`cards/${id}/comment`, CARDS_URL), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: formData.get("comment"),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error. Status ${response.status}`);
      }

      fetchComments();
    } catch (error) {
      console.error("Error creating comment:", error);
    }
    e.target.reset();
  }

  return (
    <Modal
      open={displayCommentsModal}
      onClose={() => {
        setDisplayCommentsModal(false);
        setComments([]);
      }}
    >
      <form
        id="modal-form"
        onSubmit={(e) => {
          handleCommentCreation(e);
        }}
      >
        <h3>Comments</h3>
        <ul>
          {comments &&
            comments.map((comment, index) => <li key={index}>{comment}</li>)}
        </ul>
        <TextField required name="comment" label="Comment" />
        <Button type="submit" variant="outlined">
          Add Comment
        </Button>
      </form>
    </Modal>
  );
}

CommentsModal.propTypes = {
  displayCommentsModal: PropTypes.bool.isRequired,
  setDisplayCommentsModal: PropTypes.func.isRequired,
  displayCommentsCardId: PropTypes.number.isRequired,
};
