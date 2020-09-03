import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import Login from "./components/login.component"
import Navbar from "./components/navbar.component"
import Dashboard from "./components/dashboard.component";
import EditWorkout from "./components/edit-workout.component";
import CreateWorkout from "./components/create-workout.component";
import CreateJournal from "./components/create-journal.component";
import EditJournal from "./components/edit-journal.componenet";
import SetChallenge from "./components/set-challenge.component";
import ShowChallenge from "./components/show-challenge.component";
import ShowAchievement from "./components/show-achievement.component";
import CreateUser from "./components/create-user.component";
import EditUser from "./components/edit-user.component";
import CreateAchievement from "./components/create-achievement.component";
import EditAchievement from "./components/edit-achievement.component";
import CreateGarden from "./components/create-garden.component";
import EditGarden from "./components/edit-garden.component";
import EditMeal from "./components/edit-meal.component";
import EditMood from "./components/edit-mood.component";
import {connect} from 'react-redux';

class App extends Component {
  render() {
    return (
      <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component={Login} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/edit-workout/:id" component={EditWorkout} />
        <Route path="/create" component={CreateWorkout} />
        <Route path="/challenges" component={SetChallenge} />
        <Route path="/journal" component={CreateJournal} />
        <Route path="/edit-journal/:id" component={EditJournal} />
        <Route path="/user" component={CreateUser} />
        <Route path="/edit-user/:id" component={EditUser} />
        <Route path="/edit-meal/:id" component={EditMeal} />
        <Route path="/edit-mood/:id" component={EditMood} />
        <Route path="/achievement" component={CreateAchievement} />
        <Route path="/edit-achievement/:id" component={EditAchievement} />
        <Route path="/garden" component={CreateGarden} />
        <Route path="/edit-garden/:id" component={EditGarden} />
        <Route path="/show-challenge/:id" component={ShowChallenge} />
        <Route path="/show-achievement/:id" component={ShowAchievement} />
      </div>
      </Router>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
