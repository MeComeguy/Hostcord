const express = require('express');
const axios = require('axios');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const http = require('http');
const { Server } = require('socket.io');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const app = express();
const port = 5000;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
  fetchAllMembers: true,
});

const token = process.env.TOKEN; // token
lient.login(token);

const generateUniqueId = require('generate-unique-id');
client.on('messageCreate', async (message) => {
  if (!message.author.bot) {
    const channelId = process.env.CHANNEL_ID;
    if (message.channel.id === channelId) {
      if (message.attachments.size > 0) {
        const attachment = message.attachments.first();
        if (attachment.contentType && attachment.contentType.startsWith("image/")) {
          const id = generateUniqueId({
            length: 6,
          });
          message.channel.send("Your image has been uploaded! Check your DM to get the link.");
          await downloadFile(attachment.proxyURL, id + ".png")
          message.author.send("Your file has been uploaded link : " + "http://localhost:5000/" + id + ".png")
          saveFileInfoToJSON(message.author.id, id, ".png");
        } else {
          message.channel.send("Your file should be an image with a valid image extension (.png, .jpg, etc.).");
        }
      } else {
        message.channel.send("You didn't attach any files with your message!");
      }
    }
  }
});

const { mkdir } = require("fs/promises");
const { Readable } = require('stream');
const { finished } = require('stream/promises');
const path = require("path");
const downloadFile = (async (url, fileName) => {
  const res = await fetch(url);
  if (!fs.existsSync("downloads")) await mkdir("downloads");
  const destination = path.resolve("./downloads", fileName);
  const fileStream = fs.createWriteStream(destination, { flags: 'wx' });
  await finished(Readable.fromWeb(res.body).pipe(fileStream));
});
const saveFileInfoToJSON = (userId, fileId, extension) => {
  const data = {
    userId,
    fileId: fileId + extension
  };

  const filePath = './fileInfo.json';
  
  if (fs.existsSync(filePath)) {
    const existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    existingData.push(data);
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
  } else {
    fs.writeFileSync(filePath, JSON.stringify([data], null, 2));
  }
};
const imagesDir = path.join(__dirname, 'downloads');

app.use(express.static(imagesDir));

app.get('/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(imagesDir, filename);

  console.log('Serving file:', filePath);

  res.sendFile(filePath, err => {
      if (err) {
          console.error('File not found:', err);
          res.status(404).send('File not found');
      }
  });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});