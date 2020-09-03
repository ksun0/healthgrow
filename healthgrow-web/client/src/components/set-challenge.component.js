import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

const hostname = String(window.location.href).includes("localhost") ? 'http://localhost:5000' : String(window.location.href).substring(0, String(window.location.href).indexOf("/", 8));

class SetChallenge extends Component {
    constructor(props) {
        super(props);
        this.onChangeModel = this.onChangeModel.bind(this);
        this.onChangeField = this.onChangeField.bind(this);
        this.onChangeOperator = this.onChangeOperator.bind(this);
        this.onChangeCondition = this.onChangeCondition.bind(this);
        this.onChangePointValue = this.onChangePointValue.bind(this);
        this.onChangeStart = this.onChangeStart.bind(this);
        this.onChangeEnd = this.onChangeEnd.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
          model: 'Workout',
          field: '',
          operator: '=',
          condition: 0,
          models: ['Workout', 'Journal', 'Meal', 'Mood'],
          operators: ['=', '<', '>'],
          pointValue: 0,
          start: new Date(),
          end: new Date()
        };
      }

      onChangeModel(e) {
        this.setState({
          model: e.target.value
        });
      }

      onChangeField(e) {
        this.setState({
          field: e.target.value
        });
      }

      onChangeOperator(e) {
        this.setState({
          operator: e.target.value
        });
      }

      onChangeCondition(e) {
        this.setState({
          condition: e.target.value
        });
      }

      onChangePointValue(e) {
        this.setState({
          pointValue: e.target.value
        });
      }
      onChangeStart(e) {
        this.setState({
          start: e.target.value
        });
      }
      onChangeEnd(e) {
        this.setState({
          end: e.target.value
        });
      }
      onSubmit(e) {
        e.preventDefault();
        const newChallenge = {
          model: this.state.model,
          field: this.state.field,
          operator: this.state.operator,
          condition: this.state.condition,
          pointValue: this.state.pointValue,
          timeBegin: this.state.start,
          timeExpire: this.state.end
        };
        console.log(newChallenge);

        axios.post(`${hostname}/api/challenges/add`, newChallenge)
        .then(function(res) {
          //window.location = '/dashboard';
        }    
      ).catch(function(err) {
        console.log("error");
      });

        this.setState({
          email: ''
        })
      }

  render() {
    if (this.props.is_admin == 1) {
    return (
        <div>
        <h3>Set Daily Challenge</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Model: </label>
            <select ref="modelInput"
                required
                className="form-control"
                value={this.state.model}
                onChange={this.onChangeModel}>
                {
                  this.state.models.map(function(e) {
                    return <option 
                      key={e}
                      value={e}>{e}
                      </option>;
                  })
                }
            </select>
          </div>
          <div className="form-group">
            <label>Field: </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.field}
                onChange={this.onChangeField}
                />
          </div>
          <div className="form-group"> 
            <label>Operator: </label>
            <select ref="operatorInput"
                required
                className="form-control"
                value={this.state.operator}
                onChange={this.onChangeOperator}>
                {
                  this.state.operators.map(function(e) {
                    return <option 
                      key={e}
                      value={e}>{e}
                      </option>;
                  })
                }
            </select>
          </div>
          <div className="form-group">
            <label>Condition: </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.condition}
                onChange={this.onChangeCondition}
                />
          </div>
          <div className="form-group">
            <label>Point Value: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.pointValue}
                onChange={this.onChangePointValue}
                />
          </div>
          <div className="form-group">
            <label>Begin Time: </label>
            <input  type="date"
                required
                className="form-control"
                value={this.state.start}
                onChange={this.onChangeStart}
                />
          </div>
          <div className="form-group">
            <label>End Time: </label>
            <input  type="date"
                required
                className="form-control"
                value={this.state.end}
                onChange={this.onChangeEnd}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Set" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )} else {
      window.location = '/';
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

export default connect(mapStateToProps, mapDispatchToProps)(SetChallenge);
