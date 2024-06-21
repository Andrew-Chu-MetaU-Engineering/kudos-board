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
    include: { likes: true },
  });
  res.status(200).json(card);
});

router.post("/", async (req, res) => {
  const { title, description, imageUrl, boardId } = req.body;
  const newCard = await prisma.card.create({
    data: {
      title,
      description,
      imageUrl,
      boardId: parseInt(boardId),
    },
  });
  res.status(201).json(newCard);
});

router.post("/:cardId/like", async (req, res) => {
  const newLike = await prisma.like.create({
    data: {
      card: {
        connect: {
          id: parseInt(req.params.cardId),
        },
      },
      user: req.body.userId,
    },
  });
  res.status(201).json(newLike);
});

router.delete("/:id", async (req, res) => {
  const deletedCard = await prisma.card.delete({
    where: { id: parseInt(req.params.id) },
  });
  res.json(deletedCard);
});

module.exports = router;
