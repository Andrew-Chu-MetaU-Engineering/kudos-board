import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/homepage/HomePage";
import BoardPage from "./pages/boardpage/BoardPage";
import "./App.css";

export default function App() {
  return (
    <section id="app">
      <header>
        <h1>Kudos Board</h1>
      </header>

      <section id="body">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/board/:boardId" element={<BoardPage />} />
          </Routes>
        </Router>
      </section>

      <footer>
        <div>
          <h2>Kudos Board</h2>
          <h3>Made by andrewchu</h3>
          <h4>Created 2024</h4>
        </div>
      </footer>
    </section>
  );
}
