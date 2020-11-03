import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import AllTask from "../AllTask/AllTask";
import { Link } from "react-router-dom";
import "./Dash.css";
import Header from "../Header/Header";

class Dash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  componentDidMount() {
    this.getUsertasks();
    if (!this.props.user.email) {
      this.props.history.push("/");
    }
  }

  getUsertasks = () => {
    axios
      .get(`/api/tasks`)
      .then((res) => this.setState({ tasks: res.data }))
      .catch((err) => console.log(err));
  };

  deletetask = (id) => {
    axios
      .delete(`/api/task/${id}`)
      .then(() => {
        this.getUsertasks();
      })
      .catch((err) => console.log(err));
  };
  updatetask = (id, content) => {
    axios
      .put(`/api/task/${id}`, { content })
      .then(() => {
        this.getUsertasks();
      })
      .catch((err) => console.log(err));
  };

  render() {
    console.log(this.state.tasks);
    const mappedtasks = this.state.tasks.map((task) => (
      <div key={task.task_id} className="task-box">
        <AllTask deletetask={this.deletetask} updatetask={this.updatetask} task={task}/> </div>
    ));
    return (
    <section className="dash-all">
        <Header />
        <header>
          <div className="area">
            <Link to="/AddTask">
              <nav className="new-task">
                <i className="fa fa-edit" aria-hidden="true"></i>+ Add new Project
              </nav>
            </Link>
            <nav className="sms">
              {" "}
              <i className="fa fa-bell" aria-hidden="true"></i>
              <spam className="circle">5</spam>
            </nav>
            <nav className="profile-img">
              {" "}
              <i className="fa fa-caret-down" aria-hidden="true"></i>{" "}
              <div className="img"></div>
            </nav>
          </div>
        </header>
        <section className="content-area">
          <div className="heading-dash">
            <h1> Dashboard</h1>
            <p>Welcome to your personal task managment dashboard</p>
          </div>
          <div className="cards">
            <div className="card-3">
              <>
                <div className="user-img"></div>
              </>
              <spam className="user-name">Aquilas Aguiya </spam>
              <spam className="user-title">Full-Stack Developer</spam>
              <hr />
              <div className="user-education">Education </div>
              <div className="education">
                <p className="user-experience">Queens College</p>
                <p className="user-experience">Dev Mountain</p>
              </div>
            </div>
            <div className="card-3">
           
              <div className="user-pro">Task Overview and Deadline </div>
              <p className="date">December 31, 2020</p>
              <p className="user-work">create a production web Application</p>
              <p className="user-work">create a production web Application</p>
              <p className="user-work">create a production web Application</p>
              <p className="user-work">create a production web Application</p>
            </div>

            <div className="card-3">
              <p className="contacts"> Contacts Info</p>
              <p className="cs">Customer Service</p>
              <p className="num">
                {" "}
                <i class="fa fa-phone" aria-hidden="true"></i> +1 646-552-5187{" "}
              </p>
              <p className="email">
                <i class="fa fa-envelope-square"></i> Contact@gmail.com
              </p>
              <p className="cs">HR </p>
              <p className="num">
                {" "}
                <i class="fa fa-phone" aria-hidden="true"></i> +1 (646) 552-5187{" "}
              </p>
              <p className="email">
                {" "}
                <i class="fa fa-envelope-square"></i> Contact@gmail.com
              </p>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>ORDER</th>
                <th>Name</th>
                <th className="content-box">CONTENT</th>
                <th>DEADLINE</th>
              </tr>
            </thead>

            <tbody>
              <td> #123456</td>
              <td> Aquilas Aguiya </td>
              <td>
                <div className="tasks">{mappedtasks}</div>
              </td>
              <td> December 31, 2020</td>
            </tbody>
          </table>
        </section>
        <div></div>
      </section>
    );
  }
}
const mapStateToProps = (reduxState) => {
  return reduxState;
};

export default connect(mapStateToProps, {})(Dash);
