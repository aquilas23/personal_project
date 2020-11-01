import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { getUser } from "../../ducks/reducer";
import "./Auth.css";

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      verPassword: "",
      registerView: false,
    };
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleToggle = () => {
    this.setState({ registerView: !this.state.registerView });
  };

  handleRegister = () => {
    const { email, password, verPassword } = this.state;

    if (password && password === verPassword) {
      axios
        .post("/api/register", { email, password })
        .then((res) => {
          this.props.getUser(res.data);
          this.props.history.push("/dash");
        })
        .catch((err) => console.log(err));
    } else {
      alert("passwords don't match");
    }
  };

  handleLogin = (e) => {
    const { email, password } = this.state;
    axios
      .post("/api/login", { email, password })
      .then((res) => {
        this.props.getUser(res.data);
        this.props.history.push("/dash");
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="auth-view">
        <div className="authentication-info">
          <h1> WEB PORTAL </h1>
          {this.state.registerView ? <></> : <></>}
         
          <div className="textbox">
          <i className="fa fa-user" aria-hidden="true"></i>
            <input
              value={this.state.email}
              name="email"
              placeholder="Email"
              onChange={(e) => this.handleInput(e)}
            />
          </div>

          <div className="textbox">
          <i className="fa fa-lock" aria-hidden="true"></i>
            <input
              type="password"
              value={this.state.password}
              name="password"
              placeholder="Password"
              onChange={(e) => this.handleInput(e)}
            />
          </div>

          {this.state.registerView ? (
            <>
              <div className="textbox">
              <i className="fa fa-lock" aria-hidden="true"></i>
                <input
                  type="password"
                  value={this.state.verPassword}
                  name="verPassword"
                  placeholder="Verify Password"
                  onChange={(e) => this.handleInput(e)}
                />
              </div>

              <button className="btn" onClick={this.handleRegister}>
                Register
              </button>
              <p>
                Have an account?{" "}
                <span onClick={this.handleToggle}>Login Here</span>
              </p>
            </>
          ) : (
            <>
              <button className="btn" onClick={this.handleLogin}>Login</button>
              <p>
                Don't have an account?{" "}
                <span onClick={this.handleToggle}>Register Here</span>
              </p>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default connect (null, {getUser})(Auth);
