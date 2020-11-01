import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "./AddTask.css";
import { connect } from "react-redux";

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
    };
  }
  handleInputContent = (val) => {
    this.setState({ content: val });
  };

  createtask = () => {
    axios
      .post("/api/task", {
        id: this.props.user.user_id,
        content: this.state.content,
      })
      .then(() => {
        this.props.history.push("/dash");
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="new-task">
        <h1>New Task</h1>
        <textarea
          value={this.state.content}
          placeholder="Enter Task here"
          onChange={(e) => this.handleInputContent(e.target.value)}
        />

        <button id="task_submit" onClick={this.createtask}>
          Submit
        </button>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return reduxState;
};

export default withRouter(connect(mapStateToProps)(AddTask));
