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

//returns array of users
server.get("/api/users", (req, res) => {
  try {
    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved." });
  }
});

//retus the user object with specified id
server.get("/api/users/:id", (req, res) => {
  const userId = req.params;

  users.find();
});

server.listen(PORT, () => {
  console.log("Server listening on port ", PORT);
});
