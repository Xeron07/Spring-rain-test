/** @format */

import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import Home from "./Home";
import About from "./About";
import AddContact from "./AddContact";

class Routing extends Component {
  state = {};
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-sm bg-dark justify-content-center">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Question 1
                </Link>
              </li>
              <li className="nav-item dropdown">
                <button
                  className="nav-link btn btn-primary dropdown-toggle"
                  id="navbardrop"
                  data-toggle="dropdown"
                >
                  Question 2
                </button>
                <div className="dropdown-menu">
                  <Link className="dropdown-item" to="/contact">
                    All Contacts
                  </Link>
                  <Link className="dropdown-item" to="/add-contact">
                    Add Contact
                  </Link>
                </div>
              </li>
            </ul>
          </nav>

          <Switch>
            <Redirect from="/contact" to="/contact/all" />
            <Route exact path="/contact/all">
              <About />
            </Route>
            <Route exact path="/add-contact">
              <AddContact />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Routing;
