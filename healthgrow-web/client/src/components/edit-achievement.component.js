import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

const hostname = String(window.location.href).includes("localhost") ? 'http://localhost:5000' : String(window.location.href).substring(0, String(window.location.href).indexOf("/", 8));

class EditAchievement extends Component {
  constructor(props) {
    super(props);

    this.onChangeModel = this.onChangeModel.bind(this);
    this.onChangeField = this.onChangeField.bind(this);
    this.onChangeOperator= this.onChangeOperator.bind(this);
    this.onChangeCondition = this.onChangeCondition.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      model: '',
      field: '',
      operator: '',
      condition: 0,
      models: ['Workout', 'Journal', 'Meal', 'Mood'],
      operators: ['=', '<', '>']
    }
  }

  componentDidMount() {
    axios.get(`${hostname}/api/achievements/`+this.props.match.params.id)
      .then(response => {
        this.setState({
          model: response.data.model,
          field: response.data.field,
          operator: response.data.operator,
          condition: response.data.condition
        })   
      })
      .catch(function (error) {
        console.log(error);
      })
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

  onSubmit(e) {
    e.preventDefault();

    const achievement = {
        model: this.state.model,
        field: this.state.field,
        operator: this.state.operator,
        condition: this.state.condition
      };

    console.log(achievement);

    axios.post(`${hostname}/api/achievements/update/`+this.props.match.params.id, achievement).then(function(res)
        {
          //window.location = '/dashboard';
        }      
      ).catch(function(err) {
        console.log("error");
      });
  }

  render() {
    if (this.props.is_admin == 1) {
    return (
      <div>
        <h3>Edit Achievement</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Model: </label>
            <select ref="modelInput"
                className="form-control"
                value={this.state.model}
                onChange={this.onChangeModel}>
                {
                  this.state.models.map(function(model) {
                    return <option 
                      key={model}
                      value={model}>{model}
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
                className="form-control"
                value={this.state.operator}
                onChange={this.onChangeOperator}>
                {
                  this.state.operators.map(function(operator) {
                    return <option 
                      key={operator}
                      value={operator}>{operator}
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
            <input type="submit" value="Edit Achievement" className="btn btn-primary" />
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

export default connect(mapStateToProps, mapDispatchToProps)(EditAchievement);