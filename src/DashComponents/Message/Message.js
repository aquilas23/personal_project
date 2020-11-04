import React, { Component } from 'react';
import "./Message.css";
import axios from 'axios';
import {Link} from 'react-router-dom'

export default class Message extends Component {
      state ={
        name: '',
        company:'',
        email:'',
        phone:'',
        message:'',
        smsSent: false
      }

      handleName= (e) => {
        this.setState({
         name: e.target.value
        })
      };
      handleCompany= (e) => {
        this.setState({
         company: e.target.value
        })
      };
      handleEmail= (e) => {
        this.setState({
         email: e.target.value
        })
      };
      
      handlePhone= (e) => {
        this.setState({
         phone: e.target.value
        })
      };
      handleMessage= (e) => {
        this.setState({
         message: e.target.value
        })
      };

      formSubmit =(e)=>{
        e.preventDefault();
        let data ={
        name: this.state.name,
        company:this.state.company,
        email:this.state.email,
        phone:this.state.phone,
        message:this.state.message
        }

        axios.post('/api/message', data)
        .then(res =>{
          this.setState({
            smsSent:true,
          },this.resetForm())
          }).catch(()=> {
            
            console('message not sent');
            this.props.history.push('/dash')
        })
      }
      resetForm =() => {
        this.setState({
          name: '',
        company:'',
        email:'',
        phone:'',
        message:''
        })
        setTimeout(() =>{
          this.setState({
            smsSent:false,
          })
        }, 3000)
      }


    render() {
        return (
            <div className="container">
    <div >
      <div className="company-info">
        <ul>
          <li><i className="fa fa-road"></i> 17186 Joplin Ave Lakeville MN 55044</li>
          <li><i className="fa fa-phone"></i> (555) 555-5555</li>
          <li><i className="fa fa-envelope"></i> stgaquilas@gmail.com</li>
        </ul>
      </div>
      <div className="contact">
        <h3>Email Us</h3>
        <form onSubmit={this.formSubmit}>
          <p>
            <label>Name</label>
            <input type="text" name="name"
            value={this.state.name}
            onChange={this.handleName}
            />
          </p>
          <p>
            <label>Company</label>
            <input type="text" name="company"
            value={this.state.company}
            onChange={this.handleCompany}/>
          </p>
          <p>
            <label>Email Address</label>
            <input type="email" name="email"
            value={this.state.email}
            onChange={this.handleEmail}/>
          </p>
          <p>
            <label>Phone Number</label>
            <input type="text" name="phone"
            value={this.state.phone}
            onChange={this.handlePhone}/>
          </p>
          <p >
            <label>Message</label>
            <textarea name="message" rows="5"
            value={this.state.message}
            onChange={this.handleMessage}></textarea>
          </p>

          <div className={this.state.smsSent ? 'msgAppear' : 'msg'}>Message Sent</div>
          <p className="submit">
           <button type="submit">Submit</button>
           <Link to="/dash"><button type="submit">Go Back Home</button></Link>
          </p>
        </form>
      </div>
    </div>
  </div>
        )
    }
}
