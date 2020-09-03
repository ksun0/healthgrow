import React, { Component } from "react";
import axios from "axios";
import {connect} from 'react-redux';

const hostname = String(window.location.href).includes("localhost") ? 'http://localhost:5000' : String(window.location.href).substring(0, String(window.location.href).indexOf("/", 8));

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      logged_in: 0,
      is_admin: 0,
      curr_user: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleLogout(event) {
    this.props.onLogout();
  }

  handleSubmit(event) {
    const { email, password } = this.state;
    axios.get(`${hostname}/api/users/`)
    .then(response => {
      this.setState({ users: response.data });
      var temp = this.state.users.filter(u => u.email == email && u.password == password)
      if (temp.length > 0) {
        this.setState({
            logged_in: 1,
            curr_user: temp[0].email
          });
        if (temp[0].isadmin == true) {
          this.setState({
              is_admin: 1
            });
          } else {
            this.setState({
              is_admin: 0
            });
          }
          this.props.onLogin(this.state.is_admin, this.state.curr_user);
          //window.location = '/dashboard';
      } else {
        this.setState({
            logged_in: -1
          });
          //window.location = '/';  
      }
    }).catch(error => {
        console.log("login error", error);
      });

    
    event.preventDefault();
  }

  render() {
    if (this.props.logged_in == 0) {
      return (
        <div>
          <h3>User Login</h3>
          <form onSubmit={this.handleSubmit}>
          
          <label>Email: </label>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
          </div>
  
          <label> Password: </label>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
          </div>
            <button type="submit">Login</button>
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <h3>Logout</h3>
          <form onSubmit={this.handleLogout}>
            <button type="submit">Logout</button>
          </form>
        </div>
      );
    }
    
  }
}

const mapStateToProps = (state) => {
  return {
    logged_in: state.logged_in,
    is_admin: state.is_admin,
    user: state.user
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLogin: (a, u) => dispatch({type: 'LOGIN', admin: a, user: u}), //must pass is_admin and username as a/u?
    onLogout: () => dispatch({type: 'LOGOUT'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);