const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const express = require("express");
const router = express.Router();

router.use("/", (req, res, next) => {
  next();
});

router.get("/", async (req, res) => {
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
      cards: {
        orderBy: {
          upvotes: "desc"
        }
      },
    },
  });
  res.status(200).json(boards);
});

router.get("/:id", async (req, res) => {
  const board = await prisma.board.findUnique({
    where: { id: parseInt(req.params.id) },
    include: { cards: {
      orderBy: {
        upvotes: "desc"
      }
    }},
  });
  res.status(200).json(board);
});

router.post("/", async (req, res) => {
  const { title, description, author, imageUrl, category } = req.body;
  const newBoard = await prisma.board.create({
    data: {
      title,
      description,
      author,
      imageUrl,
      category,
    },
  });
  res.status(201).json(newBoard);
});

router.delete("/:id", async (req, res) => {
  const deletedBoard = await prisma.board.delete({
    where: { id: parseInt(req.params.id) },
  });
  res.json(deletedBoard);
});

module.exports = router;
