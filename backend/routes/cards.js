const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const express = require("express");
const router = express.Router();

router.use("/", (req, res, next) => {
  next();
});

router.get("/", async (req, res) => {
  const cards = await prisma.card.findMany();
  res.status(200).json(cards);
});

router.get("/:id", async (req, res) => {
  const card = await prisma.card.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  res.status(200).json(card);
});

router.post("/", async (req, res) => {
  const { title, description, imageUrl, author, boardId } = req.body;
  const newCard = await prisma.card.create({
    data: {
      title,
      description,
      imageUrl,
      author,
      boardId: parseInt(boardId),
    },
  });
  res.status(201).json(newCard);
});

router.put("/:cardId/upvote", async (req, res) => {
  const upvoteCard = await prisma.card.update({
    where: {
      id: parseInt(req.params.cardId),
    },
    data: {
      upvotes: {
        increment: 1,
      },
    },
  });
  res.status(204).json(upvoteCard);
});

router.get("/:cardId/comment", async (req, res) => {
  const card = await prisma.card.findUnique({
    where: { id: parseInt(req.params.cardId) },
    select: {
      comments: true,
    },
  });
  res.status(200).json(card);
});

router.put("/:cardId/comment", async (req, res) => {
  const commentCard = await prisma.card.update({
    where: {
      id: parseInt(req.params.cardId),
    },
    data: {
      comments: {
        push: req.body.comment,
      },
    },
  });
  res.status(204).json(commentCard);
});

router.delete("/:id", async (req, res) => {
  const deletedCard = await prisma.card.delete({
    where: { id: parseInt(req.params.id) },
  });
  res.status(204).json(deletedCard);
});

module.exports = router;
