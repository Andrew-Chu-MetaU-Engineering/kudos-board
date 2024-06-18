import { useEffect, useState } from "react";
import BoardCard from "./BoardCard";
import OptionsBanner from "./OptionsBanner";

export default function App() {
  const [boardData, setBoardData] = useState([
    // placeholder data
    {
      id: 0,
      title: "a",
      description: "celebration board",
      category: "celebration",
    },
    {
      id: 1,
      title: "b",
      description: "thank you board",
      category: "thank-you",
    },
    {
      id: 2,
      title: "c",
      description: "inspiration board",
      category: "inspiration",
    },
    {
      id: 3,
      title: "d",
      description: "thank you board 2",
      category: "thank-you",
    },
  ]);
  const [searchedBoards, setSearchedBoards] = useState(boardData);
  const [displayedBoards, setDisplayedBoards] = useState(searchedBoards);
  const [filterOption, setFilterOption] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (searchQuery) {
      setSearchedBoards(
        boardData.filter((board) =>
          board.title.toLocaleLowerCase().includes(searchQuery)
        )
      );
    } else {
      setSearchedBoards(boardData);
    }
  }, [searchQuery, boardData]);

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
    // TODO implement add board modal
  }

  function handleOpenBoard(id) {
    return () => {
      // TODO implement board page
    };
  }

  function handleDeleteBoard(id) {
    return () => {
      console.log("delete", id);
      setBoardData(boardData.filter((board) => board.id !== id));
      setDisplayedBoards(displayedBoards.filter((board) => board.id !== id));
    };
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
    </>
  );
}
