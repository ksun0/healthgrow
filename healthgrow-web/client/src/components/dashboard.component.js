import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Element } from 'react-faux-dom';
import axios from 'axios';
import * as d3 from "d3"; 
import { LineChart } from '@opd/g2plot-react';
// import { Tabs, Tab } from 'react-bootstrap';
// import Button from 'react-bootstrap/Button';
import '../App.css'; 
import {connect} from 'react-redux';

const hostname = String(window.location.href).includes("localhost") ? 'http://localhost:5000' : String(window.location.href).substring(0, String(window.location.href).indexOf("/", 8));


const AdminChallenge = props => (
  <tr>
    <td>{props.challenge.model}</td>
    <td>{props.challenge.field}</td>
    <td>{props.challenge.operator}</td>
    <td>{props.challenge.condition}</td>
    <td>{props.challenge.pointValue}</td>
    <td>{props.challenge.timeBegin}</td>
    <td>
      <Link to={"/show-challenge/"+props.challenge._id}>show</Link> | <a href="#" onClick={() => { props.deleteChallenge(props.challenge._id) }}>delete</a>
    </td>
  </tr>
)

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
      <td>
        <Link to={"/edit-workout/"+props.workout._id}>edit</Link> | <a href="#" onClick={() => { props.deleteWorkout(props.workout._id) }}>delete</a>
      </td>
    </tr>
  )

  const Journal = props => (
    <tr>
      <td>{props.journal.email}</td>
      <td>{props.journal.title}</td>
      <td>{props.journal.text}</td>
      <td>
        <Link to={"/edit-journal/"+props.journal._id}>edit</Link> | <a href="#" onClick={() => { props.deleteJournal(props.journal._id) }}>delete</a>
      </td>
    </tr>
  )

  const User = props => (
    <tr>
      <td>{props.user.email}</td>
      <td>{props.user.password}</td>
      <td>{props.user.name}</td>
      <td>{props.points}</td>
      <td>{props.user.isadmin ? 'true' : 'false'}</td>
      <td>
        <Link to={"/edit-user/"+props.user._id}>edit</Link> | <a href="#" onClick={() => { props.deleteUser(props.user._id) }}>delete</a>
      </td>
    </tr>
  )

  const Mood = props => (
    <tr>
      <td>{props.mood.email}</td>
      <td>{props.mood.rating}</td>
      <td>{props.mood.text}</td>
      <td>
        <a href="#" onClick={() => { props.deleteMood(props.mood._id) }}>delete</a>
      </td>
    </tr>
  )

  const Meal = props => (
    <tr>
      <td>{props.meal.email}</td>
      <td>{props.meal.type}</td>
      <td>{props.meal.mealStr}</td>
      <td>
        <a href="#" onClick={() => { props.deleteMeal(props.meal._id) }}>delete</a>
      </td>

    </tr>
  )

  const AdminAchievement = props => (
    <tr>
      <td>{props.achievement.model}</td>
      <td>{props.achievement.field}</td>
      <td>{props.achievement.operator}</td>
      <td>{props.achievement.condition}</td>
      <td>
      <Link to={"/show-achievement/"+props.achievement._id}>show</Link> | <Link to={"/edit-achievement/"+props.achievement._id}>edit</Link> | <a href="#" onClick={() => { props.deleteAchievement(props.achievement._id) }}>delete</a>
      </td>
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

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.deleteChallenge = this.deleteChallenge.bind(this);
        this.deleteWorkout = this.deleteWorkout.bind(this);
        this.deleteJournal = this.deleteJournal.bind(this);
        this.deleteGarden = this.deleteGarden.bind(this);
        this.deleteMood= this.deleteMood.bind(this);
        this.deleteMeal = this.deleteMeal.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.deleteAchievement = this.deleteAchievement.bind(this);
        this.onChangeUserSearch = this.onChangeUserSearch.bind(this);
        this.loadTimeSeries = this.loadTimeSeries.bind(this);
        this.state = {
          challenges: [],
          allworkouts: [], 
          alljournals: [], 
          allmoods: [],
          allmeals: [],
          moods: [],
          meals: [],
          allusers: [],
          allgardens: [],
          achievements: [],
          usersearch: "",
          workouts: [], 
          journals: [], 
          gardens: [],
          users: [], 
          data: [],
          key: 'users',
          workoutdata: []
        };
      }

      onChangeUserSearch(e) {
        this.setState({
          usersearch: e.target.value
        }, function() { // execute after state is updated (also checkout componentDidUpdate)
          this.setState({
            workouts: this.state.allworkouts.filter(workout =>
              workout.email.toLowerCase().includes(this.state.usersearch.toLowerCase())
            ),
            journals: this.state.alljournals.filter(journal =>
              journal.email.toLowerCase().includes(this.state.usersearch.toLowerCase())
            ),
            moods: this.state.allmoods.filter(mood =>
              mood.email.toLowerCase().includes(this.state.usersearch.toLowerCase())
            ),
            meals: this.state.allmeals.filter(meal =>
              meal.email.toLowerCase().includes(this.state.usersearch.toLowerCase())
            ),
            users: this.state.allusers.filter(user =>
              user.email.toLowerCase().includes(this.state.usersearch.toLowerCase())
            )
           }, function () {
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
           });
           
        }
        );
      }

      componentDidMount() {
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
             allmoods: response.data,
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

      deleteGarden(id) {
        axios.delete('http://localhost:5000/gardens/'+id)
          .then(res => console.log(res.data));
        this.setState({
          gardens: this.state.gardens.filter(el => el._id !== id)
        })
      }

      deleteMeal(id) {
        axios.delete(`${hostname}/api/meals/`+id)
          .then(res => console.log(res.data));
        this.setState({
          meals: this.state.meals.filter(el => el._id !== id)
        })
      }

      deleteMood(id) {
        axios.delete(`${hostname}/api/moods/`+id)
          .then(res => console.log(res.data));
        this.setState({
          moods: this.state.moods.filter(el => el._id !== id)
        })
      }

      deleteChallenge(id) {
        axios.delete(`${hostname}/api/challenges/`+id)
          .then(res => console.log(res.data));
        this.setState({
          challenges: this.state.challenges.filter(el => el._id !== id)
        })
      }

      deleteWorkout(id) {
        axios.delete(`${hostname}/api/workouts/`+id)
          .then(res => console.log(res.data));
        this.setState({
          workouts: this.state.workouts.filter(el => el._id !== id)
        })
      }

      deleteJournal(id) {
        axios.delete(`${hostname}/api/journals/`+id)
          .then(res => console.log(res.data));
        this.setState({
          journals: this.state.journals.filter(el => el._id !== id)
        })
      }
      deleteUser(id) {
        axios.delete(`${hostname}/api/users/`+id)
          .then(res => console.log(res.data));
        this.setState({
          users: this.state.users.filter(el => el._id !== id)
        })
      }
      deleteAchievement(id) {
        axios.delete(`${hostname}/api/achievements/`+id)
          .then(res => console.log(res.data));
        this.setState({
          achievements: this.state.achievements.filter(el => el._id !== id)
        })
      }

  loadTimeSeries() {
      if (this.state.workouts.length === 0) {
        return <div> No Workouts </div>
    } else {
        var config = {
            height: 400,
            title: {
                visible: true,
                text: 'Workout Progress',
            },
            description: {
                visible: true,
                text: 'Weight Over Time for Various Workouts',
            },
            padding: 'auto',
            forceFit: true,
            xField: 'updatedAt',
            yField: 'weight',
            label: {
                visible: true,
                type: 'point',
            },
            point: {
                visible: true,
                size: 5,
            },
            xAxis: {
                tickCount: 10,
                label: {
                  formatter: v => `${v}`.split("T")[0],
                },
            },
            data: this.state.workouts,
            legend: {
              position: 'right-top',
            },
            seriesField: 'workout',
            responsive: true,
        }
        return <LineChart {...config} />
    }  
  }

  render() {
    if (this.props.logged_in == 1) {
      if (this.props.is_admin == 1) {
        return (
            <div>
          
              <form>
              <div className="form-group"> 
                <label><h3>User Search</h3></label>
                <input  type="text"
                    className="form-control"
                    onChange={this.onChangeUserSearch}
                    />
              </div>
            </form>
            <h3>Users</h3>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Name</th>
                  <th>Points</th>
                  <th>Is Admin</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>

          
                { this.userList() }
              </tbody>
            </table>
            <h3>Logged Workouts</h3>
            
            {this.loadTimeSeries()}
            {this.drawChart()}
          
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Email</th>
                  <th>Workout</th>
                  <th>Reps</th>
                  <th>Weight</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                { this.workoutList() }
              </tbody>
            </table>
            <h3>Logged Journals</h3>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Email</th>
                  <th>Title</th>
                  <th>Text</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                { this.journalList() }
              </tbody>
            </table>

            <h3>Logged Moods</h3>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Email</th>
                  <th>Rating</th>
                  <th>Text</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                { this.moodList() }
              </tbody>
            </table>

            <h3>Logged Meals</h3>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Email</th>
                  <th>Type</th>
                  <th>Foods</th> 
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                { this.mealList() }
              </tbody>
            </table>

            <h3>Achievements</h3>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Model</th>
                  <th>Field</th>
                  <th>Operator</th>
                  <th>Condition</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                { this.adminAchievementList() }
              </tbody>
            </table>

            <h3>Daily Challenges </h3>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Model</th>
                  <th>Field</th>
                  <th>Operator</th>
                  <th>Condition</th>
                  <th>Point Value</th>
                  <th>Start Time</th>
                  <th>Actions</th>
              </tr>
              </thead>
              <tbody>
                  { this.adminChallengeList() }
              </tbody>
            </table>

            {/* <h3>Gardens</h3>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Title</th>
                  <th>Level</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                { this.gardenList() }
              </tbody>
            </table> */}
          </div>
        )
      } else {
        //is user
        return (
          <div>


        <h3>Today's Daily Challenges</h3>
        <table className="table">
            <thead className="thead-light">
              <tr>
                  <th>Model</th>
                  <th>Operator</th>
                  <th>Field</th>
                  <th>Condition</th>
                  <th>Point Value</th>
                  <th>Start Time</th>
            </tr>
            </thead>
            <tbody>
                { this.dailyChallengeList() }
            </tbody>
          </table>
        
          <h3>Logged Workouts</h3>
          
          {/* {this.drawChart()} */}
        
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Email</th>
                <th>Workout</th>
                <th>Reps</th>
                <th>Weight</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              { this.workoutList() }
            </tbody>
          </table>
          
          <h3>Logged Journals</h3>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Email</th>
                <th>Title</th>
                <th>Text</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              { this.journalList() }
            </tbody>
          </table>

          <h3>Logged Moods</h3>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Email</th>
                  <th>Rating</th>
                  <th>Text</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                { this.moodList() }
              </tbody>
            </table>

          <h3>Logged Meals</h3>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Email</th>
                  <th>Type</th>
                  <th>Foods</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                { this.mealList() }
              </tbody>
            </table>


          <h3>Achievements</h3>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Model</th>
                <th>Field</th>
                <th>Operator</th>
                <th>Condition</th>
                {/* {(() => { 
                  if (this.props.is_admin == 1) { 
                    return (<th>Actions</th>);
                  }
                })()} */}
              </tr>
            </thead>
            <tbody>
              { this.achievementList() }
            </tbody>
          </table>

          <h3>Completed Daily Challenges (Total Points: {this.calcPoint(this.props.user)})</h3>
          <table className="table">
            <thead className="thead-light">
              <tr>
                  <th>Model</th>
                  <th>Operator</th>
                  <th>Field</th>
                  <th>Condition</th>
                  <th>Point Value</th>
                  <th>Start Time</th>
            </tr>
            </thead>
            <tbody>
                { this.challengeList() }
            </tbody>
          </table>
          </div>
        )
      }
    } else {
      window.location = '/'
    }
  }

  challengeList() {
      return this.state.challenges.filter(challenge => this.completedchallenge(challenge)).map(currentchallenge => {
        return <Challenge challenge={currentchallenge} deleteChallenge={this.deleteChallenge} key={currentchallenge._id}/>;
      })
  }

  adminChallengeList() {
    if (this.props.is_admin == 1) {
      return this.state.challenges.map(currentchallenge => {
        return <AdminChallenge challenge={currentchallenge} deleteChallenge={this.deleteChallenge} key={currentchallenge._id}/>;
      })
    } 
  }

  dailyChallengeList() {
    return this.state.challenges.filter(challenge => Date.now() - Date.parse(challenge.timeBegin) < 86400000).map(currentchallenge => {
      return <Challenge challenge={currentchallenge} deleteChallenge={this.deleteChallenge} key={currentchallenge._id}/>;
    })
  }

  

  calcPoint(user) {
    var arr = this.state.challenges.filter(challenge => this.completedchallengeCalc(challenge, user));
    var total = 0;
    for (var i = 0; i < arr.length; i++) {
      total = total + arr[i].pointValue;
      console.log("here");
    }
    return total;
  }

  completedchallengeCalc(challenge, user) {
    const model = challenge.model;
    const operator = challenge.operator;
    const condition = challenge.condition;
    var total = -1;
  if (model == 'Workout') {
      total = this.state.allworkouts.filter(temp => (temp.email == user) && 
                                                      Date.parse(temp.createdAt) - Date.parse(challenge.timeBegin) < 86400000 &&
                                                      Date.parse(temp.createdAt) - Date.parse(challenge.timeBegin) >= 0).length;                           
      
  } else if (model == 'Meal') {
      total = this.state.allmeals.filter(temp => (temp.email == user) && 
                                                      Date.parse(temp.createdAt) - Date.parse(challenge.timeBegin) < 86400000 &&
                                                      Date.parse(temp.createdAt) - Date.parse(challenge.timeBegin) >= 0).length;
  } else if (model == 'Journal') {
      total = this.state.alljournals.filter(temp => (temp.email == user) && 
                                                      Date.parse(temp.createdAt) - Date.parse(challenge.timeBegin) < 86400000 &&
                                                      Date.parse(temp.createdAt) - Date.parse(challenge.timeBegin) >= 0).length;

  } else if (model == 'Mood') {
      total = this.state.allmoods.filter(temp => (temp.email == user) && 
                                                      Date.parse(temp.createdAt) - Date.parse(challenge.timeBegin) < 86400000 &&
                                                      Date.parse(temp.createdAt) - Date.parse(challenge.timeBegin) >= 0).length;
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
    console.log('got mysteriously here');
  }  

  completedchallenge(challenge) {
    const model = challenge.model;
    const operator = challenge.operator;
    const condition = challenge.condition;
    var total = -1;
  if (model == 'Workout') {
      total = this.state.allworkouts.filter(temp => (temp.email == this.props.user) && 
                                                      Date.parse(temp.createdAt) - Date.parse(challenge.timeBegin) < 86400000 &&
                                                      Date.parse(temp.createdAt) - Date.parse(challenge.timeBegin) >= 0).length;                           
      
  } else if (model == 'Meal') {
      total = this.state.allmeals.filter(temp => (temp.email == this.props.user) && 
                                                      Date.parse(temp.createdAt) - Date.parse(challenge.timeBegin) < 86400000 &&
                                                      Date.parse(temp.createdAt) - Date.parse(challenge.timeBegin) >= 0).length;
  } else if (model == 'Journal') {
      total = this.state.alljournals.filter(temp => (temp.email == this.props.user) && 
                                                      Date.parse(temp.createdAt) - Date.parse(challenge.timeBegin) < 86400000 &&
                                                      Date.parse(temp.createdAt) - Date.parse(challenge.timeBegin) >= 0).length;

  } else if (model == 'Mood') {
      total = this.state.allmoods.filter(temp => (temp.email == this.props.user) && 
                                                      Date.parse(temp.createdAt) - Date.parse(challenge.timeBegin) < 86400000 &&
                                                      Date.parse(temp.createdAt) - Date.parse(challenge.timeBegin) >= 0).length;
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
    console.log('got mysteriously here');
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

  // gardenList() {
  //   if (this.props.is_admin == 1) {
  //     return this.state.gardens.map(currentgarden => {
  //       return <Garden garden={currentgarden} deleteGarden={this.deleteGarden} key={currentgarden._id}/>;
  //     })
  //   } else {

  //   }
  // }

  plot(chart, width, height) {  
    // create scales!
    const xScale = d3.scaleBand()
        .domain(this.state.data.map(d => d.name))
        .range([0, width]);
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(this.state.data, d => d.value)])
        .range([height, 0]);
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    chart.selectAll('.bar')
        .data(this.state.data)
        .enter()
        .append('rect')
        .classed('bar', true)
        .attr('x', d => xScale(d.name))
        .attr('y', d => yScale(d.value))
        .attr('height', d => (height - yScale(d.value)))
        .attr('width', d => xScale.bandwidth())
        .style('fill', (d, i) => colorScale(i));

    chart.selectAll('.bar-label')
        .data(this.state.data)
        .enter()
        .append('text')
        .classed('bar-label', true)
        .attr('x', d => xScale(d.name) + xScale.bandwidth()/2)
        .attr('dx', 0)
        .attr('y', d => yScale(d.value))
        .attr('dy', -6)
        .text(d => d.value);

    const xAxis = d3.axisBottom()
        .scale(xScale);
        
    chart.append('g')
        .classed('x axis', true)
        .attr('transform', `translate(0,${height})`)
        .call(xAxis);

    const yAxis = d3.axisLeft()
        .ticks(5)
        .scale(yScale);

    chart.append('g')
        .classed('y axis', true)
        .attr('transform', 'translate(0,0)')
        .call(yAxis);

    chart.select('.x.axis')
        .append('text')
        .attr('x',  width/2)
        .attr('y', 60)
        .attr('fill', '#000')
        .style('font-size', '20px')
        .style('text-anchor', 'middle')
        .text('Name');    
        
    chart.select('.y.axis')
        .append('text')
        .attr('x', 0)
        .attr('y', 0)
        .attr('transform', `translate(-50, ${height/2}) rotate(-90)`)
        .attr('fill', '#000')
        .style('font-size', '20px')
        .style('text-anchor', 'middle')
        .text('Total');   
        
    const yGridlines = d3.axisLeft()
        .scale(yScale)
        .ticks(5)
        .tickSize(-width,0,0)
        .tickFormat('')

    chart.append('g')
        .call(yGridlines)
        .classed('gridline', true);
}

drawChart() {
    const width = 800;
    const height = 450;

    const el = new Element('div');
    const svg = d3.select(el)
        .append('svg')
        .attr('id', 'chart')
        .attr('width', width)
        .attr('height', height);

    const margin = {
        top: 60,
        bottom: 100,
        left: 80,
        right: 40
    };

    const chart = svg.append('g')
        .classed('display', true)
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom
    this.plot(chart, chartWidth, chartHeight);

    return el.toReact();
}

  uniqueWorkouts() {
    var counts = {};
    for (var i = 0; i < this.state.workouts.length; i++) {
        counts[this.state.workouts[i].workout] = 1 + (counts[this.state.workouts[i].workout] || 0);
    }
    // return Object.keys(counts).length;
    return Object.keys(counts).reduce((sum,key)=>sum+parseFloat(counts[key]||0),0);
  }

  repsSum() {
    var sum = 0;
    this.state.workouts.forEach(currentworkout => {
      sum += currentworkout.reps;
    });
    return sum;
  }

  weightSum() {
    var sum = 0;
    this.state.workouts.forEach(currentworkout => {

      sum += currentworkout.weight;
      
    });
    return sum;
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
        return <User user={currentuser} points={this.calcPoint(currentuser.email)} deleteUser={this.deleteUser} key={currentuser._id}/>;
      })
    }
  }

  adminAchievementList() {
    if (this.props.is_admin == 1) {
      return this.state.achievements.map(currentachievement => {
        return <AdminAchievement achievement={currentachievement} deleteAchievement={this.deleteAchievement} key={currentachievement._id}/>;
      })
    } 
  }

  achievementList() {
      return this.state.achievements.filter(currentachievement => this.achieved(currentachievement)).map(currentachievement => {
        return <Achievement achievement={currentachievement} key={currentachievement._id}/>;
      })
  }

  achieved(achievement) {
    const model = achievement.model;
    const field = achievement.field;
    const operator = achievement.operator;
    const condition = achievement.condition;
    var total = -1;
    if (model == 'Journal') {
      total = this.state.alljournals.filter(temp =>
        temp.email.toLowerCase().includes(this.props.user)).length;
    } else if (model == 'Mood') {
      total = this.state.allmoods.filter(temp =>
        temp.email.toLowerCase().includes(this.props.user)).length;
    } else if (model == 'Workout') {
      total = this.state.allworkouts.filter(temp =>
        temp.email.toLowerCase().includes(this.props.user)).length;
    } else if (model == 'Meal') {
      total = this.state.allmeals.filter(temp =>
        temp.email.toLowerCase().includes(this.props.user)).length;
    }
    if (field == 'total') {
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);