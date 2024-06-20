const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const cors = require("cors");
const express = require("express");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/boards", async (req, res) => {
  const { query, category, recent } = req.query;
  const boards = await prisma.board.findMany({
    where: {
      title: {
        contains: query,
        mode: "insensitive",
      },
      category: {
        equals: category,
      },
    },
    ...(recent && {
      orderBy: {
        createdAt: "desc",
      },
    }),
    include: {
      cards: true,
    },
  });
  res.status(200).json(boards);
});

app.get("/boards/:id", async (req, res) => {
  const boards = await prisma.board.findUnique({
    where: { id: parseInt(req.params.id) },
    include: { cards: true },
  });
  res.status(200).json(boards);
});

app.post("/boards", async (req, res) => {
  const { title, description, category, imageUrl } = req.body; // TODO optional author field
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
  const deletedBoard = await prisma.board.delete({
    where: { id: parseInt(req.params.id) },
  });
  res.json(deletedBoard);
});

app.get("/cards", async (req, res) => {
  const cards = await prisma.card.findMany();
  res.status(200).json(cards);
});

app.post("/cards", async (req, res) => {
  const { title, description, imageUrl, boardId } = req.body;
  const newCard = await prisma.card.create({
    data: {
      title,
      description,
      imageUrl,
      board: {
        connect: {
          id: boardId,
        },
      },
    },
  });
  res.status(201).json(newCard);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
