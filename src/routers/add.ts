import { Router } from "express";
import { prisma } from "../db/client";
import axios from "axios";
import { ChannelInfo } from "../types/ChannelInfo";

const router = Router();

router.get("/", (req, res) => {
  res.send("A channel ID must be specified.");
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const channel = await prisma.channel.findFirst({
    where: { id },
  });

  if (channel) return res.send("Channel already exists.");

  const channelInfo = (
    await axios.get(
      `https://www.googleapis.com/youtube/v3/channels?key=${process.env.YT_API_KEY}&id=${id}&part=snippet`
    )
  ).data.items[0].snippet as ChannelInfo;

  await prisma.channel.create({
    data: {
      id,
      username: channelInfo.title,
      avatar: channelInfo.thumbnails.high.url,
    },
  });

  return res.send("Channel added successfully!");
});

export default router;
