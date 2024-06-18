import { useEffect, useState } from "react";
import BoardCard from "./BoardCard";
import OptionsBanner from "./OptionsBanner";
import BoardModal from "./BoardModal";

export default function App() {
  const [boardData, setBoardData] = useState([
    // placeholder data
    {
      id: 0,
      title: "a",
      description: "celebration board",
      category: "celebration",
      image: "image0",
      author: "author0",
    },
    {
      id: 1,
      title: "b",
      description: "thank you board",
      category: "thank-you",
      image: "image1",
      author: "author1",
    },
    {
      id: 2,
      title: "c",
      description: "inspiration board",
      category: "inspiration",
      image: "image2",
      author: "author2",
    },
    {
      id: 3,
      title: "d",
      description: "thank you board 2",
      category: "thank-you",
      image: "image3",
      author: "author3",
    },
  ]);
  const [searchedBoards, setSearchedBoards] = useState(boardData);
  const [displayedBoards, setDisplayedBoards] = useState(searchedBoards);
  const [filterOption, setFilterOption] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [displayBoardModal, setDisplayBoardModal] = useState(false);

  useEffect(() => {
    console.log(boardData);
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
    setDisplayBoardModal(true);
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
  function handleBoardCreation(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    setBoardData([...boardData, { ...formData }]); // TODO unique key prop!
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
