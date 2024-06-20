import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";

function BoardPage() {
  const DATABASE_BASE_URL = new URL("http://localhost:5000");
  const BOARDS_URL = new URL("boards", DATABASE_BASE_URL);
  const CARDS_URL = new URL("cards", DATABASE_BASE_URL);

  const { boardId } = useParams();
  const [board, setBoard] = useState(null);

  useEffect(() => {
    fetchBoard();
  }, [board]);

  async function fetchBoard() {
    try {
      const response = await fetch(new URL(`boards/${boardId}`, BOARDS_URL));
      if (!response.ok) {
        throw new Error(`HTTP error. Status ${response.status}`);
      }
      const board = await response.json();
      setBoard(board);
    } catch (error) {
      console.error("Error fetching boards:", error);
    }
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

  return (
    <>
      {board &&
        board.cards.map((card) => (
          <Card key={card.id} card={card} handleDeleteCard={handleDeleteCard} />
        ))}
    </>
  );
}

export default BoardPage;
