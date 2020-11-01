import React, {Component} from 'react';
import axios from 'axios';
import {getUser, clearUser} from '../../ducks/reducer';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import "./Profile.css"

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password:'',
            editView: false
        }
    }

    handleInput = (val) => {
        this.setState({email: val})
    }
    handleInput = (val) => {
        this.setState({password: val})
    }

    handleEditView = () => {
        this.setState({editView: !this.state.editView})
    }

    updateProfile = () => {
        const {username} = this.state;
        axios.put(`/api/user/${this.props.user.user_id}`, {username})
        .then(res => {
            this.props.getUser(res.data[0]);
            this.handleEditView();
            this.setState({username: ''});
        })
        .catch(err => console.log(err));
    }

    handleLogout = () => {
        axios.get('/api/logout')
        .then(() => {
            this.props.clearUser();
            this.props.history.push('/');
        })
        .catch(err => console.log(err))
    }

    render(){
        return (
            
    
        <div className="textboxP">
            <input
              value={this.state.email}
              name="email"
              placeholder="Email"
              onChange={(e) => this.handleInput(e.target.value)}/>
            <input
              type="password"
              value={this.state.password}
              name="password"
              placeholder="Password"
              onChange={(e) => this.handleInput(e.target.value)} />
            <Link to='/dash'><button className="btnP" onClick={this.updateProfile}>Update</button></Link>
        
    </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return reduxState;
  };
  
  export default connect(mapStateToProps, {getUser, clearUser})(Profile);
  