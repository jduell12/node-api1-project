import React, { useState } from "react";
import { Switch, Route, useHistory, Link } from "react-router-dom";

//component
import Users from "./components/Users";
import Edit from "./components/EditUser";
import Add from "./components/AddUser";

//context
import { UserContext } from "./context/UserContext";

function App() {
  const history = useHistory();

  const [userInfo, setInfo] = useState({
    id: "",
    name: "",
    bio: "",
  });

  return (
    <div>
      <Switch>
        <UserContext.Provider value={{ userInfo, setInfo }}>
          <Route exact path="/users">
            <Users queryKey={"user"} />
          </Route>
          <Route exact path="/edit/:id">
            <Edit />
          </Route>
          <Route exact path="/add">
            <Add />
          </Route>
          <Route exact path="/">
            <div>
              <h1>Get Users</h1>
              <button onClick={() => history.push(`/users/`)}>Get Users</button>
            </div>
          </Route>
        </UserContext.Provider>
      </Switch>
      <button onClick={() => history.push("/add")}>Add User</button>
      <Link to="/">Home</Link>
      <ReactQueryDevtools />
    </div>
  );
}

export default App;
