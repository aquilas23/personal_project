import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "./AddTask.css";
import { connect } from "react-redux";

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName:"",
      content: ""

    };
  }
  handleInputContent = (val) => {
    this.setState({ content: val });
  };
  handleInputFullName = (val) => {
    this.setState({ fullName: val });
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
        <h3>Add Project</h3>
        {/* < input 
        placeholder='fullName'
        value={this.state.FullName}
        onChange={(e) => this.handleInputFullName(e.target.value)}

        /> */}
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
