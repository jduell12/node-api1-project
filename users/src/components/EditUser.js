import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

//context
import { UserContext } from "../context/UserContext";

const EditUser = () => {
  const { userInfo } = useContext(UserContext);
  const history = useHistory();

  const initialForm = {
    id: "",
    name: "",
    bio: "",
  };

  const [formValue, setValue] = useState(initialForm);

  useEffect(() => {
    setValue(userInfo);
  }, [userInfo]);

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setValue({
      ...formValue,
      [name]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    axios
      .put(`http://localhost:8000/api/users/${userInfo.id}`, formValue)
      .then((res) => {
        return history.push(`/users`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="nameInput">
        Name: &nbsp;
        <input
          id="nameInput"
          type="text"
          name="name"
          value={formValue.name}
          onChange={changeHandler}
        />
      </label>
      <label htmlFor="bioInput">
        Bio: &nbsp;
        <input
          id="bioInput"
          type="text"
          name="bio"
          value={formValue.bio}
          onChange={changeHandler}
        />
      </label>
      <button>Edit User</button>
    </form>
  );
};

export default EditUser;
