import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import CardModal from "./CardModal";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Card from "./Card";

function BoardPage() {
  const DATABASE_BASE_URL = new URL("http://localhost:5000");
  const BOARDS_URL = new URL("boards", DATABASE_BASE_URL);
  const CARDS_URL = new URL("cards", DATABASE_BASE_URL);

  const { boardId } = useParams();
  const [board, setBoard] = useState(null);
  const [displayCardModal, setDisplayCardModal] = useState(false);

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
    setDisplayCardModal(true);
  }

  async function handleDeleteCard(id) {
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
      setDisplayCardModal(false);
    } catch (error) {
      console.error("Error creating board:", error);
    }
  }

  async function handleUpvoteCard(e, cardId) {
    e.preventDefault();

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

  return (
    <>
      <Button
        component={RouterLink}
        to={"/"}
        startIcon={<NavigateBeforeIcon />}
        variant="outlined"
      >
        Back
      </Button>

      {board &&
        board.cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleDeleteCard={handleDeleteCard}
            handleUpvoteCard={handleUpvoteCard}
          />
        ))}

      <CardModal
        handleCardCreation={handleCardCreation}
        displayCardModal={displayCardModal}
        setDisplayCardModal={setDisplayCardModal}
      />

      <Fab onClick={handleAddCard} color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </>
  );
}

export default BoardPage;
