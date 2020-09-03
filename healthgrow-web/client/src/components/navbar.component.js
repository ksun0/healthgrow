import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

class Navbar extends Component {

  adminView() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">HealthGrow</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          </li>
          <li className="navbar-item">
          <Link to="/challenges" className="nav-link">Set Daily Challenge</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">Create User</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Create Workout</Link>
          </li>
          <li className="navbar-item">
          <Link to="/journal" className="nav-link">Create Journal</Link>
          </li>
          <li className="navbar-item">
          <Link to="/achievement" className="nav-link">Create Achievement</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }

  userView() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">HealthGrow</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Create Workout</Link>
          </li>
          <li className="navbar-item">
          <Link to="/journal" className="nav-link">Create Journal</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }

  strangerView() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">HealthGrow</Link>
      </nav>
    )
  }


  render() {
    if (this.props.logged_in == 1) {
      if (this.props.is_admin == 1) {
        //is admin
        return(this.adminView());
      } else {
        //not admin
        return(this.userView());
      }
    } else {
      return(this.strangerView());
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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
