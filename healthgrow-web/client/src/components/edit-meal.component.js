import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

const hostname = String(window.location.href).includes("localhost") ? 'http://localhost:5000' : String(window.location.href).substring(0, String(window.location.href).indexOf("/", 8));

class EditMeal extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeType= this.onChangeType.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: '',
      type: '',
      text: '',
      emails: []
    }
  }

  componentDidMount() {
    axios.get(`${hostname}/api/meals/`+this.props.match.params.id)
      .then(response => {
        this.setState({
          email: response.data.email,
          type: response.data.type,
          text: response.data.text
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get(`${hostname}/api/users/`)
      .then(response => {
        this.setState({ emails: response.data.map(user => user.email) });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangeType(e) {
    this.setState({
      type: e.target.value
    });
  }

  onChangeText(e) {
    this.setState({
      text: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const meal = {
      email: this.state.email,
      type: this.state.type,
      text: this.state.text
    };

    console.log(meal);

    axios.post(`${hostname}/api/meals/update/`+this.props.match.params.id, meal).then(function(res)
        {
          //window.location = '/dashboard';
        }      
      ).catch(function(err) {
        console.log("error");
      });
  }

  render() {
    if (this.props.logged_in == 1) {
    return (
        <div>
      <h3>u actually can't edit meals sry</h3>
        </div>)

    } else {
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

export default connect(mapStateToProps, mapDispatchToProps)(EditMeal);
