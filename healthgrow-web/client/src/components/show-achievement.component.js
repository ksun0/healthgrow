import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Element } from 'react-faux-dom';
import axios from 'axios';
import * as d3 from "d3"; 
import '../App.css'; 
import {connect} from 'react-redux';

const hostname = String(window.location.href).includes("localhost") ? 'http://localhost:5000' : String(window.location.href).substring(0, String(window.location.href).indexOf("/", 8));

const Challenge = props => (
    <tr>
    <td>{props.challenge.model}</td>
    <td>{props.challenge.field}</td>
    <td>{props.challenge.operator}</td>
    <td>{props.challenge.condition}</td>
    <td>{props.challenge.pointValue}</td>
    <td>{props.challenge.timeBegin}</td>      
    </tr>
)

const Workout = props => (
    <tr>
    <td>{props.workout.email}</td>
    <td>{props.workout.workout}</td>
    <td>{props.workout.reps}</td>
    <td>{props.workout.weight}</td>
    </tr>
)

const Journal = props => (
    <tr>
    <td>{props.journal.email}</td>
    <td>{props.journal.title}</td>
    <td>{props.journal.text}</td>
    </tr>
)

const User = props => (
    <tr>
    <td>{props.user.email}</td>
    <td>{props.user.password}</td>
    <td>{props.user.name}</td>
    <td>{props.user.isadmin ? 'true' : 'false'}</td>
    </tr>
)

const Mood = props => (
    <tr>
    <td>{props.mood.email}</td>
    <td>{props.mood.rating}</td>
    <td>{props.mood.text}</td>
    </tr>
)

const Meal = props => (
    <tr>
    <td>{props.meal.email}</td>
    <td>{props.meal.type}</td>
    </tr>
)

const Achievement = props => (
    <tr>
    <td>{props.achievement.model}</td>
    <td>{props.achievement.field}</td>
    <td>{props.achievement.operator}</td>
    <td>{props.achievement.condition}</td> 
    </tr>
)

class ShowAchievement extends Component {
  constructor(props) {
    super(props);


    this.state = {
      model: '',
      field: '',
      operator: '',
      condition: 0,
      models: ['Workout', 'Journal', 'Meal', 'Mood'],
      operators: ['=', '<', '>'],

        challenges: [],
        allworkouts: [], 
        alljournals: [], 
        moods: [],
        meals: [],
        allusers: [],
        allgardens: [],
        achievements: [],
        workouts: [], 
        journals: [], 
        users: [], 
        data: []
    }
  }

  

  componentDidMount() {
    axios.get(`${hostname}/api/achievements/`+this.props.match.params.id)
      .then(response => {
        this.setState({
          model: response.data.model,
          field: response.data.field,
          operator: response.data.operator,
          condition: response.data.condition,
        }) 
        console.log('got here')  
      })
      .catch(function (error) {
        console.log(error);
      })

      axios.get(`${hostname}/api/challenges/`)
      .then(response => {
        this.setState({ challenges: response.data });
      })
      .catch((error) => {
         console.log(error);
      })

     axios.get(`${hostname}/api/workouts/`)
      .then(response => {
        this.setState({ 
          allworkouts: response.data, 
          workouts: response.data
         });

        this.setState({
         data: [
           {
             name: 'Total Workouts',
             value: this.uniqueWorkouts()
           },
               {
                 name: 'Total Reps',
                 value: this.repsSum()
               },
               {
                 name: 'Total Weight',
                 value: this.weightSum()
               }
               
             ]
        });
        
      })
      .catch((error) => {
         console.log(error);
      })

      axios.get(`${hostname}/api/journals/`)
      .then(response => {
        this.setState({ 
          alljournals: response.data,
          journals: response.data
          });
      })
      .catch((error) => {
         console.log(error);
      })

      axios.get(`${hostname}/api/meals/`)
      .then(response => {
        this.setState({ 
          allmeals: response.data,
          meals: response.data
          });
      })
      .catch((error) => {
         console.log(error);
      })

      axios.get(`${hostname}/api/moods/`)
      .then(response => {
        this.setState({ 
          moods: response.data
          });
      })
      .catch((error) => {
         console.log(error);
      })

      axios.get(`${hostname}/api/users/`)
      .then(response => {
        this.setState({ 
          allusers: response.data,
          users: response.data 
         });
      })
      .catch((error) => {
         console.log(error);
      })

      axios.get(`${hostname}/api/gardens/`)
      .then(response => {
        this.setState({ 
          allgardens: response.data,
          gardens: response.data
          });
      })
      .catch((error) => {
         console.log(error);
      })

      axios.get(`${hostname}/api/achievements/`)
      .then(response => {
        this.setState({ 
          achievements: response.data 
         });
      })
      .catch((error) => {
         console.log(error);
      })          
  }


  render() {
      if (this.props.is_admin == 1) {
        return (
            <div>
              <h3>Achievement: {this.state.model} {this.state.field} {this.state.operator} {this.state.condition}</h3>
            
            <h3>Users that completed the achievement</h3>
                  <table className="table">
                    <thead className="thead-light">
                      <tr>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Name</th>
                        <th>Is Admin</th>
                      </tr>
                    </thead>
                    <tbody>
                      { this.userListRender() }
                    </tbody>
                  </table>
                  </div>
          )
      } else {
          window.location = '/'
      }
    
  }
  
  moodList() {
    if (this.props.is_admin == 1) {
      return this.state.moods.map(currentmood => {
        return <Mood mood={currentmood} deleteMood={this.deleteMood} key={currentmood._id}/>;
      })
    } else {
      return this.state.moods.filter(currentmood => currentmood.email == this.props.user).map(currentmood => {
        return <Mood mood={currentmood} deleteMood={this.deleteMood} key={currentmood._id}/>; 
      })

    }
  }

  mealList() {
    if (this.props.is_admin == 1) {
      return this.state.meals.map(currentmeal => {
        return <Meal meal={currentmeal} deleteMeal={this.deleteMeal} key={currentmeal._id}/>;
      })
    } else {
        return this.state.meals.filter(currentmeal => currentmeal.email == this.props.user).map(currentmeal => {
          return <Meal meal={currentmeal} deleteMeal={this.deleteMeal} key={currentmeal._id}/>;
        })
    }
  }

  workoutList() {
    if (this.props.is_admin == 1) {
      return this.state.workouts.map(currentworkout => {
        return <Workout workout={currentworkout} deleteWorkout={this.deleteWorkout} key={currentworkout._id}/>; 
      })
    } else {
      return this.state.workouts.filter(currentworkout => currentworkout.email == this.props.user).map(currentworkout => {
          return <Workout workout={currentworkout} deleteWorkout={this.deleteWorkout} key={currentworkout._id}/>; 
        })
    }
  }

  journalList() {
    if (this.props.is_admin == 1) {
      return this.state.journals.map(currentjournal => {
        return <Journal journal={currentjournal} deleteJournal={this.deleteJournal} key={currentjournal._id}/>;
      })
    } else {
      return this.state.journals.filter(currentjournal => currentjournal.email == this.props.user).map(currentjournal => {
        return <Journal journal={currentjournal} deleteJournal={this.deleteJournal} key={currentjournal._id}/>;
      })
    }
  }

  userList() {
    if (this.props.is_admin == 1) {
      return this.state.users.map(currentuser => {
        return <User user={currentuser} deleteUser={this.deleteUser} key={currentuser._id}/>;
      })
    }
  }

  userListRender() {
      return this.state.users.filter(user => this.achieved(user)).map(currentuser => {
        return <User user={currentuser} deleteUser={this.deleteUser} key={currentuser._id}/>;
      })

  }

  achievementList() {
    if (this.props.is_admin == 1) {
      return this.state.achievements.map(currentachievement => {
        return <Achievement achievement={currentachievement} deleteAchievement={this.deleteAchievement} key={currentachievement._id}/>;
      })
    } else {
      return this.state.achievements.filter(currentachievement => this.achieved(currentachievement)).map(currentachievement => {
        return <Achievement achievement={currentachievement} key={currentachievement._id}/>;
      })
    }
  }

  achieved(user) {
    const model = this.state.model;
    const operator = this.state.operator;
    const condition = this.state.condition;
    var total = -1;
    if (model == 'Journal') {
      total = this.state.alljournals.filter(temp =>
        temp.email.toLowerCase().includes(user.email)).length;
    } else if (model == 'Mood') {
      total = this.state.moods.filter(temp =>
        temp.email.toLowerCase().includes(user.email)).length;
    } else if (model == 'Workout') {
      total = this.state.allworkouts.filter(temp =>
        temp.email.toLowerCase().includes(user.email)).length;
    } else if (model == 'Meal') {
      total = this.state.meals.filter(temp =>
        temp.email.toLowerCase().includes(user.email)).length;
    }
      if (operator == '>') {
        if (total > condition) {
          return true;
        } else {
          return false;
        }
      } else if (operator == '=') {
        if (total == condition) {
          return true;
        } else {
          return false;
        }
      } else if (operator == "<") {
        if (total < condition) {
          return true;
        } else {
          return false;
        }
      }
    return false;
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(ShowAchievement);