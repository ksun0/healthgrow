import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

const hostname = String(window.location.href).includes("localhost") ? 'http://localhost:5000' : String(window.location.href).substring(0, String(window.location.href).indexOf("/", 8));

class EditGarden extends Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeLevel = this.onChangeLevel.bind(this);
    this.onChangeImg = this.onChangeImg.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: '',
      level: '',
      img: Buffer.from(""),
      temp: 0,
    }
  }

  componentDidMount() {
    axios.get(`${hostname}/api/gardens/`+this.props.match.params.id)
      .then(response => {
        this.setState({
          title: response.data.title,
          level: response.data.level,
          img: response.data.img,
        })   
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeLevel(e) {
    this.setState({
      level: e.target.value
    });
  }

  onChangeImg(e) {
    this.setState({
      img: e.target.files[0],
      temp: 1
    });
    console.log(this.state.img)
    let reader = new FileReader();
    reader.onload = () => this.setState({ file: reader.result })
    reader.readAsDataURL(e.target.files[0]);
  }

  onSubmit(e) {
    e.preventDefault();
    var garden = {
      title: '',
      level: -1,
      img: Buffer.from(''),
    };
    if (this.state.temp == 0) {
      garden = {
        title: this.state.title,
        level: this.state.level,
        img: this.state.img,
      };
    } else {
      garden = {
        title: this.state.title,
        level: this.state.level,
        img: this.state.file,
      };
    }

    
    console.log(this.state.img)

    axios.post(`${hostname}/api/gardens/update/`+this.props.match.params.id, garden).then(function(res)
        {
          //window.location = '/dashboard';
        }      
      ).catch(function(err) {
        console.log("error");
      });
  }

  render() {
    return (
      <div>
        <h3>Edit Garden</h3>
        <form onSubmit={this.onSubmit}>
        <div className="form-group">
            <label>Title: </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.title}
                onChange={this.onChangeTitle}
                />
          </div>
          <div className="form-group">
            <label>Level: </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.level}
                onChange={this.onChangeLevel}
                />
          </div>
          <div className="form-group"> 
            <label>Select an Image: </label>
            <br></br>
            <input  type="file"
                accept="image/*"
                onChange={this.onChangeImg}
                />
          </div>

          <div className="form-group">
            <input type="submit" value="Edit Garden" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(EditGarden);