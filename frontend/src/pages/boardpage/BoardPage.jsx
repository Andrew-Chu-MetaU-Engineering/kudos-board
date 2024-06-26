import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import Card from "./Card";
import AddCardModal from "./AddCardModal";
import GifSearch from "./GifSearch";
import CommentsModal from "./CommentsModal";
import "./BoardPage.css";

function BoardPage() {
  const DATABASE_BASE_URL = import.meta.env.VITE_DB_BASE_URL;
  const BOARDS_URL = new URL("boards", DATABASE_BASE_URL);
  const CARDS_URL = new URL("cards", DATABASE_BASE_URL);

  const { boardId } = useParams();
  const [board, setBoard] = useState(null);
  const [displayAddCardModal, setDisplayAddCardModal] = useState(false);
  const [displayCommentsModal, setDisplayCommentsModal] = useState(false);
  const [displayCommentsCardId, setDisplayCommentsCardId] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetchBoard();
  }, []);

  async function fetchBoard() {
    try {
      const response = await fetch(new URL(`boards/${boardId}`, BOARDS_URL));
      if (!response.ok) {
        throw new Error(`HTTP error. Status ${response.status}`);
      }
      const board = await response.json();
      setBoard(board);
    } catch (error) {
      console.error("Error fetching board:", error);
    }
  }

  function handleAddCard() {
    setDisplayAddCardModal(true);
  }

  async function handleDeleteCard(e, id) {
    e.stopPropagation();
    try {
      const response = await fetch(new URL(`cards/${id}`, CARDS_URL), {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error. Status ${response.status}`);
      }

      fetchBoard();
    } catch (error) {
      console.error("Error deleting board:", error);
    }
  }

  async function handleCardCreation(e) {
    e.preventDefault();

    try {
      const form = e.target;
      const formData = new FormData(form);
      const response = await fetch(CARDS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.get("title"),
          description: formData.get("description"),
          imageUrl: formData.get("imageUrl"),
          author: formData.get("author"),
          boardId: boardId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error. Status ${response.status}`);
      }

      fetchBoard();
      setDisplayAddCardModal(false);
      setImageUrl("");
    } catch (error) {
      console.error("Error creating board:", error);
    }
  }

  async function handleUpvoteCard(e, cardId) {
    e.preventDefault();
    e.stopPropagation();

    try {
      const response = await fetch(
        new URL(`/cards/${cardId}/upvote`, CARDS_URL),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error. Status ${response.status}`);
      }

      fetchBoard();
    } catch (error) {
      console.error("Error creating board:", error);
    }
  }

  function openCommentsModal(id) {
    setDisplayCommentsModal(true);
    setDisplayCommentsCardId(id);
  }

  return (
    <>
      <div id="back-add-buttons">
        <Button
          component={RouterLink}
          to={"/"}
          startIcon={<NavigateBeforeIcon />}
          variant="outlined"
        >
          Back
        </Button>{" "}
        <Fab onClick={handleAddCard} color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </div>

      <section id="card-wrapper">

      {board &&
        board.cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleDeleteCard={handleDeleteCard}
            handleUpvoteCard={handleUpvoteCard}
            openCommentsModal={openCommentsModal}
          />
        ))}
      </section>

      {displayCommentsCardId && (
        <CommentsModal
          displayCommentsModal={displayCommentsModal}
          setDisplayCommentsModal={setDisplayCommentsModal}
          displayCommentsCardId={displayCommentsCardId}
        />
      )}
      <AddCardModal
        handleCardCreation={handleCardCreation}
        displayAddCardModal={displayAddCardModal}
        setDisplayAddCardModal={setDisplayAddCardModal}
        imageUrl={imageUrl}
      >
        <GifSearch setImageUrl={setImageUrl} />
      </AddCardModal>
    </>
  );
}

export default BoardPage;
