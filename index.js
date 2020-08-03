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

//creates user using information sent inside request body and returns the created user
server.post("/api/users", (req, res) => {
  try {
    const userInfo = req.body;

    if (!userInfo.name || !userInfo.bio) {
      res
        .status(400)
        .json({ errorMessage: "Please proivide name and bio for the user." });
    } else {
      userInfo.id = shortid.generate();
      users.push(userInfo);
      res.status(201).json(userInfo);
    }
  } catch (err) {
    res.status(500).json({
      errorMessage: "There was an error while saving the user to the database",
    });
  }
});

//updates the user with the specified id using data from the request body and returns the modified user
server.put("/api/users/:id", (req, res) => {
  try {
    const editUser = req.body;
    const { id } = req.params;
    editUser.id = id;

    let found = users.find((user) => user.id === id);

    if (!found) {
      res.status(404).json({
        errorMessage: "The user with the specified ID does not exist.",
      });
    } else {
      if (!editUser.name || !editUser.bio) {
        res
          .status(400)
          .json({ errorMessage: "Please provide name and bio for the user" });
      } else {
        users = users.filter((user) => user.id !== id);
        users.push(editUser);
        res.status(200).json(editUser);
      }
    }
  } catch (err) {
    res
      .status(500)
      .json({ errorMessage: "The user information could not be modified." });
  }
});

server.listen(PORT, () => {
  console.log("Server listening on port ", PORT);
});
