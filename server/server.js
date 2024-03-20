const express = require("express");
const cors = require("cors");
const Pusher = require("pusher");
const pusher = new Pusher({
    appId: '1765387',
    key: 'd6574b51b1d1e9d01b5d',
    secret: '7a26751ead58d1435b12',
    cluster: 'mt1',
    encrypted: true
  });
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.post("/pusher/auth", (req, res) => {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  // This authenticates every user. Don't do this in production!
  const authResponse = pusher.authorizeChannel(socketId, channel);
  res.send(authResponse);
});

const port = process.env.PORT || 5000;
app.listen(port);