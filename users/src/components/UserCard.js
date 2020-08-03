import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

//context
import { UserContext } from "../context/UserContext";

const UserCard = (props) => {
  const { user } = props;
  const { name, bio, id } = user;
  const { setInfo } = useContext(UserContext);
  const history = useHistory();

  const editUser = () => {
    const userInfo = {
      id: id,
      name: name,
      bio: bio,
    };
    setInfo(userInfo);

    history.push(`/edit/${id}`);
  };

  const deleteUser = () => {
    axios
      .delete(`http://localhost:8000/api/users/${id}`)
      .then((res) => console.log())
      .catch((err) => console.log(err))
      .finally(history.push("/"));
  };

  return (
    <div>
      <h2>{name}</h2>
      <p>{bio}</p>
      <button onClick={() => editUser()}>Edit</button>
      <button onClick={() => deleteUser()}>Delete</button>
    </div>
  );
};

export default UserCard;
