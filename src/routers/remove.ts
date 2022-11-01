import { Router } from "express";
import { prisma } from "../db/client";
import axios from "axios";

const router = Router();

router.get("/", (req, res) => {
  res.send("A channel ID must be specified.");
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const channel = await prisma.channel.findFirst({
    where: { id },
  });

  if (!channel) return res.send("Channel does not exist.");

  await prisma.channel.delete({
    where: { id },
  });

  return res.send("Channel successfully removed!");
});

export default router;
