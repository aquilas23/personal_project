import React, { Component } from "react";

import "./AllTask.css";
import { connect } from "react-redux";

class AllTask extends Component {
  constructor() {
    super();
    this.state = {
      wasEditClicked: false,
      content: "",
    };
  }
  handleUpdate = () => {
    this.setState({ wasEditClicked: false });
    return this.props.updatetask(this.props.task.task_id, this.state.content);
  };

  render() {
    return (
      <>
        {this.props.user.is_admin ? (
          <>
            <div key={this.props.task.id} className="task-box">
        <p className="each-task">{this.props.task.task_id}- {this.props.task.task_content}</p>
            </div>
          </>
        ) : this.state.wasEditClicked ? (
          <>
            <div key={this.props.task.id} className="task-box">
              <input
                className="each-task"
                onChange={(e) => this.setState({ content: e.target.value })}
              />
            </div>
            <div>
              <button
                onClick={() => {
                  this.setState({ wasEditClicked: false });
                }}
              >
                Cancel
              </button>
              <button onClick={this.handleUpdate}>Update</button>
            </div>
          </>
        ) : (
          <>
            <div key={this.props.task.id} className="task-box">
              <p className="each-task">{this.props.task.task_content} </p>
            </div>
            <div>
              <button
                onClick={() => this.props.deletetask(this.props.task.task_id)}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  this.setState({ wasEditClicked: true });
                }}
              >
                Edit
              </button>
            </div>
          </>
        )}
      </>
    );
  }
}

export default connect((state) => state, {})(AllTask);
