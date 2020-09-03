import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

const hostname = String(window.location.href).includes("localhost") ? 'http://localhost:5000' : String(window.location.href).substring(0, String(window.location.href).indexOf("/", 8));

class CreateGarden extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeLevel = this.onChangeLevel.bind(this);
        this.onChangeImg = this.onChangeImg.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
          title: '',
          img: Buffer.from(""),
          level: -1
        };
      }

      onChangeTitle(e) {
        this.setState({
          title: e.target.value
        });
        console.log(this.state.title)
      }

      onChangeLevel(e) {
        this.setState({
          level: e.target.value
        });
        console.log(this.state.level)
      }

      onChangeImg(e) {
        this.setState({
          img: e.target.files[0]
        });
        console.log(this.state.img)
        let reader = new FileReader();
        reader.onload = () => this.setState({ file: reader.result })
        reader.readAsDataURL(e.target.files[0]);
        console.log(URL.createObjectURL(e.target.files[0]))
      }

      onSubmit(e) {
        e.preventDefault();
        const newGarden = {
          title: this.state.title,
          img: this.state.file,
          level: this.state.level,
        };
        console.log(newGarden);

        axios.post(`${hostname}/api/gardens/add`, newGarden)
        .then(res => console.log(res.data));
        
        this.setState({
            title: '',
            img: Buffer.from(""),
            level: -1
        })
      }

  render() {
    if (this.props.is_admin == 1) { 
    return (
        <div>
        <h3>Create New Garden</h3>
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
            <label>Level: </label>
            <input  type="number"
                required
                className="form-control"
                value={this.state.level}
                onChange={this.onChangeLevel}
                />
          </div>

          <div className="form-group"> 
            <label>Select Image for Garden: </label>
            <br></br>
            <input  type="file"
                accept="image/*"
                required
                onChange={this.onChangeImg}
                />
          </div>

          <div className="form-group">
            <input type="submit" value="Create Garden" className="btn btn-primary" />
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateGarden);