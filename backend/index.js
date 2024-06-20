const cors = require("cors");
const express = require("express");
const app = express();

app.use(express.json());
app.use(cors());

const boardsRoute = require("./routes/boards");
const cardsRoute = require("./routes/cards");

app.get("/", (req, res, next) => {
  res.send("Kudosboards API");
  next();
});

app.use("/boards", boardsRoute);
app.use("/cards", cardsRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
