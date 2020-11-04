import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import STG from "./STG.jpg";
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
      <div className="logo"><Link to="/dash">
            <img src={STG} alt="STG" />
           </Link> 
           </div>
        <section className="sideMenu">
          <Link to="/chat">
            <nav className="btn-active">
              <i className="fa fa-comment"></i>Chat
            </nav>
          </Link>
         
          <Link to="/profile">
            <nav className="btn-active">
              <i className="fa fa-cog"></i>Settings
            </nav>
          </Link>
          <Link to="/profile">
            <nav className="btn-active">
              <i className="fa fa-tv" ></i>Demo
            </nav>
          </Link>
          <Link to="/message">
            <nav className="btn-active">
              <i className="fa fa-paper-plane"></i>SMS
            </nav>
          </Link>
          <Link to="/">
            <nav className="btn-active" onClick={this.handleLogout}>
              <i className="fa fa-sign-out"></i>Logout
            </nav>
          </Link>
        </section>
      </>
    );
  }
}
