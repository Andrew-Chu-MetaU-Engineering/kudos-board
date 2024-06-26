import { useEffect, useState } from "react";
import BoardCard from "./BoardCard";
import OptionsBanner from "./OptionsBanner";
import BoardModal from "./BoardModal";
import "./HomePage.css";

export default function HomePage() {
  const BOARDS_URL = new URL("boards", import.meta.env.VITE_DB_BASE_URL);

  const [boards, setBoards] = useState([]);
  const [filterOption, setFilterOption] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [displayBoardModal, setDisplayBoardModal] = useState(false);

  useEffect(() => {
    fetchBoards();
  }, [filterOption, searchQuery]);

  async function fetchBoards() {
    try {
      let url = new URL(BOARDS_URL);
      if (["celebration", "thank-you", "inspiration"].includes(filterOption)) {
        url.searchParams.append("category", filterOption);
      } else if (filterOption === "recent") {
        url.searchParams.append("recent", true);
      }

      if (searchQuery.length > 0) {
        url.searchParams.append("query", searchQuery);
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error. Status ${response.status}`);
      }
      const data = await response.json();
      setBoards(data);
    } catch (error) {
      console.error("Error fetching boards:", error);
    }
  }

  function handleSearchQuery(e) {
    setSearchQuery(e.target.value);
  }

  function handleFilterChange(e) {
    setFilterOption(e.target.value);
  }

  function handleAddBoard() {
    setDisplayBoardModal(true);
  }

  async function handleDeleteBoard(id) {
    try {
      const response = await fetch(new URL(`boards/${id}`, BOARDS_URL), {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error. Status ${response.status}`);
      }

      fetchBoards();
    } catch (error) {
      console.error("Error deleting board:", error);
    }
  }

  async function handleBoardCreation(e) {
    e.preventDefault();

    try {
      const form = e.target;
      const formData = new FormData(form);
      const response = await fetch(BOARDS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.get("title"),
          description: formData.get("description"),
          imageUrl: formData.get("imageUrl"),
          author: formData.get("author"),
          category: formData.get("category"),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error. Status ${response.status}`);
      }

      fetchBoards();
      setDisplayBoardModal(false);
    } catch (error) {
      console.error("Error creating board:", error);
    }
  }

  return (
    <section id="home">
      <OptionsBanner
        filterOption={filterOption}
        handleFilterChange={handleFilterChange}
        searchQuery={searchQuery}
        handleSearchQuery={handleSearchQuery}
        handleAddBoard={handleAddBoard}
      />

      <section id="boards">
        {boards.map((board) => (
          <BoardCard
            key={board.id}
            board={board}
            handleDeleteBoard={handleDeleteBoard}
            className="card"
          />
        ))}
      </section>

      <BoardModal
        handleBoardCreation={handleBoardCreation}
        displayBoardModal={displayBoardModal}
        setDisplayBoardModal={setDisplayBoardModal}
      />
    </section>
  );
}
