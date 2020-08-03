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
  try {
    const { userId } = req.params;

    let userFound = users.find((user) => user.id === userId);

    if (userFound) {
      res.status(200).json(userFound);
    } else {
      res.status(404).json({
        errorMessage: "The user with the specified ID does not exist.",
      });
    }
  } catch (err) {
    res
      .status(500)
      .json({ errorMessage: "The user information could not be retrieved." });
  }
});

server.listen(PORT, () => {
  console.log("Server listening on port ", PORT);
});
