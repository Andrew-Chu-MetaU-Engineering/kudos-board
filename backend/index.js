const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const cors = require("cors");
const express = require("express");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/boards", async (req, res) => {
  const boards = await prisma.board.findMany({
    where: {
      title: {
        contains: req.query.search,
        mode: "insensitive",
      },
      category: {
        equals: req.query.category,
      },
    },
  });
  res.status(200).json(boards);
});

app.get("/boards/:id", async (req, res) => {
  const { id } = req.params;
  const boards = await prisma.board.findUnique({
    where: { id: parseInt(id) },
  });
  res.status(200).json(boards);
});

app.post("/boards", async (req, res) => {
  const { title, description, category, imageUrl } = req.body;
  const newBoard = await prisma.board.create({
    data: {
      title,
      description,
      category,
      imageUrl,
    },
  });
  res.status(201).json(newBoard);
});

app.delete("/boards/:id", async (req, res) => {
  const { id } = req.params;
  const deletedBoard = await prisma.board.delete({
    where: { id: parseInt(id) },
  });
  res.json(deletedBoard);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
