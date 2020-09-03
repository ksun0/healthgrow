import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

const hostname = String(window.location.href).includes("localhost") ? 'http://localhost:5000' : String(window.location.href).substring(0, String(window.location.href).indexOf("/", 8));

class EditJournal extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: '',
      title: '',
      text: '',
      emails: []
    }
  }

  componentDidMount() {
    axios.get(`${hostname}/api/journals/`+this.props.match.params.id)
      .then(response => {
        this.setState({
          email: response.data.email,
          title: response.data.title,
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

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeText(e) {
    this.setState({
      text: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const journal = {
      email: this.state.email,
      title: this.state.title,
      text: this.state.text
    };

    console.log(journal);

    axios.post(`${hostname}/api/journals/update/`+this.props.match.params.id, journal).then(function(res)
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
        <h3>Edit Journal</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Email: </label>
            <select ref="userInput"
                className="form-control"
                value={this.state.email}
                onChange={this.onChangeEmail}>
                {
                  this.state.emails.map(function(email) {
                    return <option 
                      key={email}
                      value={email}>{email}
                      </option>;
                  })
                }
            </select>
          </div>
          <div className="form-group"> 
            <label>Title: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.title}
                onChange={this.onChangeTitle}
                />
          </div>
          <div className="form-group">
            <label>Text: </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.text}
                onChange={this.onChangeText}
                />
          </div>

          <div className="form-group">
            <input type="submit" value="Edit Journal" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )} else if (this.props.logged_in == 1) {
      return (
        <div>
          <h3>Edit Journal</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group"> 
              <label>Title: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.title}
                  onChange={this.onChangeTitle}
                  />
            </div>
            <div className="form-group">
              <label>Text: </label>
              <input 
                  type="text" 
                  className="form-control"
                  value={this.state.text}
                  onChange={this.onChangeText}
                  />
            </div>
  
            <div className="form-group">
              <input type="submit" value="Edit Journal" className="btn btn-primary" />
            </div>
          </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditJournal);
