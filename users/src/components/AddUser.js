import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const AddUser = () => {
  const history = useHistory();

  const initialValue = {
    name: "",
    bio: "",
  };

  const [formValues, setValues] = useState(initialValue);

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setValues({
      ...formValues,
      [name]: value,
    });
  };

  const submitUser = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:8000/api/users/", formValues)
      .then((res) => history.push("/users"))
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={submitUser}>
      <label htmlFor="addName">
        Name: &nbsp;
        <input
          id="addName"
          type="text"
          name="name"
          value={formValues.name}
          onChange={changeHandler}
        />
      </label>
      <label htmlFor="addBio">
        Bio: &nbsp;
        <input
          id="addBio"
          type="text"
          name="bio"
          value={formValues.bio}
          onChange={changeHandler}
        />
      </label>
      <button>Add User</button>
    </form>
  );
};

export default AddUser;
