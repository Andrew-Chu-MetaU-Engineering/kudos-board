import { useEffect, useState } from "react";
import BoardCard from "./BoardCard";
import OptionsBanner from "./OptionsBanner";
import BoardModal from "./BoardModal";

export default function App() {
  const [boards, setBoards] = useState([]);
  const [searchedBoards, setSearchedBoards] = useState(boards);
  const [displayedBoards, setDisplayedBoards] = useState(searchedBoards);
  const [filterOption, setFilterOption] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [displayBoardModal, setDisplayBoardModal] = useState(false);
  const databaseAPI = "http://localhost:5000";

  useEffect(() => {
    fetchBoards();
  }, []);

  async function fetchBoards() {
    try {
      const response = await fetch(`${databaseAPI}/boards`);
      if (!response.ok) {
        throw new Error(`HTTP error. Status ${response.status}`);
      }
      const data = await response.json();
      setBoards(data);
    } catch (error) {
      console.error("Error fetching boards:", error);
    }
  }

  useEffect(() => {
    console.log(boards);
    if (searchQuery) {
      setSearchedBoards(
        boards.filter((board) =>
          board.title.toLocaleLowerCase().includes(searchQuery)
        )
      );
    } else {
      setSearchedBoards(boards);
    }
  }, [searchQuery, boards]);

  useEffect(() => {
    if (["celebration", "thank-you", "inspiration"].includes(filterOption)) {
      setDisplayedBoards(
        searchedBoards.filter((board) => board.category === filterOption)
      );
    } else if (filterOption === "recent") {
      // TODO implement recent sorting
    } else {
      setDisplayedBoards(searchedBoards);
    }
  }, [filterOption, searchedBoards]);

  function handleSearchQuery(e) {
    setSearchQuery(e.target.value);
  }

  function handleFilterChange(e) {
    setFilterOption(e.target.value);
  }

  function handleAddBoard() {
    setDisplayBoardModal(true);
  }

  function handleOpenBoard(id) {
    return () => {
      // TODO implement board page
    };
  }

  function handleDeleteBoard(id) {
    return async () => {
      try {
        const response = await fetch(`${databaseAPI}/boards/${id}`, {
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
    };
  }

  async function handleBoardCreation(e) {
    e.preventDefault();

    try {
      const form = e.target;
      const formData = new FormData(form);
      const response = await fetch(`${databaseAPI}/boards`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.get("title"),
          description: formData.get("description"),
          imageUrl: formData.get("description"),
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
    <>
      <OptionsBanner
        filterOption={filterOption}
        handleFilterChange={handleFilterChange}
        searchQuery={searchQuery}
        handleSearchQuery={handleSearchQuery}
        handleAddBoard={handleAddBoard}
      />

      {displayedBoards.map((board) => (
        <BoardCard
          key={board.id}
          board={board}
          handleOpenBoard={handleOpenBoard}
          handleDeleteBoard={handleDeleteBoard}
        />
      ))}

      {displayBoardModal && (
        <BoardModal
          handleBoardCreation={handleBoardCreation}
          displayBoardModal={displayBoardModal}
          setDisplayBoardModal={setDisplayBoardModal}
        />
      )}
    </>
  );
}
