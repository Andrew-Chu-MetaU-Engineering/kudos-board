import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/homepage/HomePage";
import BoardPage from "./pages/boardpage/BoardPage";

export default function App() {
  return (
    <>
      <header>
        <h1>Kudos Board</h1>
      </header>

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/board/:boardId" element={<BoardPage />} />
        </Routes>
      </Router>

      <footer>
        <h2>Kudos Board Footer</h2>
      </footer>
    </>
  );
}
