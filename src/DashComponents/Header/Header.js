import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
// import car from "./car.jpg";
import axios from "axios";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
    };
  }

  handleLogout = () => {
    axios
      .get("/api/logout")
      .then(() => {
        this.props.clearUser();
        this.props.history.push("/");
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <>
        <section className="sideMenu">
          <Link to="/dash">{/* <img src={car} alt="car" /> */}</Link>
          <Link to="/chat">
            <nav className="btn-active">
              <i class="fa fa-home"></i>Home
            </nav>
          </Link>
          <Link to="/chat">
            <nav className="btn-active">
              <i className="fa fa-comment"></i>Chat
            </nav>
          </Link>

          <Link to="/chat">
            <nav className="btn-active">
              <i className="fa fa-user-circle"></i>Profile
            </nav>
          </Link>
          <Link to="/profile">
            <nav className="btn-active">
              <i className="fa fa-cog"></i>Settings
            </nav>
          </Link>
          <Link to="/profile">
            <nav className="btn-active">
              <i className="fa fa-tv" aria-hidden="true"></i>Demo
            </nav>
          </Link>
          <Link to="/profile">
            <nav className="btn-active">
              <i className="fa fa-paper-plane"></i>SMS
            </nav>
          </Link>
          <Link to="/profile">
            <nav className="btn-active" onClick={this.handleLogout}>
              <i class="fa fa-sign-out"></i>Logout
            </nav>
          </Link>
        </section>
      </>
    );
  }
}
