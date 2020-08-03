const express = require("express");
const shortid = require("shortid");

const server = express();
server.use(express.json());

const PORT = 8000;

//data for users
let users = [
  {
    id: shortid.generate(),
    name: "Jane Doe",
    bio: "Not Tarzan's wife, another Jane",
  },
];

server.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

server.listen(PORT, () => {
  console.log("Server listening on port ", PORT);
});
