import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

import UserCard from "./UserCard";

const Users = ({ queryKey }) => {
  const userInfo = useQuery(queryKey, () => {
    return axios
      .get("http://localhost:8000/api/users")
      .then((res) => res.data)
      .catch((err) => console.log(err));
  });

  return userInfo.isLoading ? (
    "Loading..."
  ) : userInfo.isError ? (
    userInfo.error.message
  ) : (
    <div>
      <h1>User List</h1>
      {userInfo.data.map((user) => {
        return <UserCard key={user.id} user={user} />;
      })}
    </div>
  );
};

export default Users;
