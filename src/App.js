import React from 'react';
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom';
import Users from './users/users';
import AddUser from './users/addUser';
import EditUser from './users/editUser';

function App() {
  return (
      <Router>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/"} className="nav-link">
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/addUser"} className="nav-link">
                Add User
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path="/" component={Users} />
            <Route exact path="/addUser" component={AddUser} />
            <Route path="/editUser/:id" component={EditUser} />
          </Switch>
        </div>
      </Router>
  );
}

export default App;
