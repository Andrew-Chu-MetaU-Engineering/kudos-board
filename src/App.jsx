import { useState } from "react";
import BoardCard from "./BoardCard";
import OptionsBanner from "./OptionsBanner";

export default function App() {
  const [boardData, setBoardData] = useState({
    boards: [ // placeholder data
      { id: 0, title: "a", description: "whywhywhy", category: "celebration" },
      { id: 1, title: "b", description: "sosososo", category: "thank-you" },
      { id: 2, title: "c", description: "whywhywhy", category: "celebration" },
      { id: 3, title: "d", description: "sosososo", category: "thank-you" },
    ],
  });

  const [filterOption, setFilterOption] = useState("all");

  function handleFilterChange(e) {
    setFilterOption(e.target.value);
    console.log(e.target.value);
  }

  function handleOpenBoard(id) {
    return () => {
      // TODO implement board page
      console.log("open", id);
    };
  }

  function handleDeleteBoard(id) {
    return () => {
      setBoardData({
        ...boardData,
        boards: boardData.boards.filter((board) => board.id != id),
      });
    };
  }

  return (
    <>
      <OptionsBanner
        filterOption={filterOption}
        handleFilterChange={handleFilterChange}
      />
      {boardData.boards.map((board) => (
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
