import React from "react";

import { withRouter } from 'react-router-dom';
import "./styles.css";

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: "",
            users: [ // TODO: FETCH
                {username:"user", password:"user"},
                {username: "user2", password: "user2"}
            ],
        }

        this.loginCallback = this.props.loginCallback

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();

        const { username, password } = this.state;
        const matchUsers = this.state.users.filter(u => u.username === username);
        
        if (matchUsers.length === 0) {
            alert('Username does not exist')
        } else {
            if (matchUsers[0].password === password) { // TODO: UPLOAD
                const identity = {
                    type: 'user',
                    username: matchUsers[0].username,
                    uid: '', // TODO: what will be the id?
                };
                this.loginCallback(identity);

                this.props.history.goBack();
            } else {
                alert('Wrong password')

            }
        }
    }

    render() {
        return (
            <div>
            <title>UTeamUp Login</title>
            <div className="login__content">
              <h1>UTeamUp!</h1>
              <form className="login" method="post" onSubmit={this.handleSubmit}>

              <label htmlFor="username">USERNAME</label>
              <br />
              <input
                  className="login__input"
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
              />
              <br /><br />

              <label htmlFor="password">PASSWORD</label>
              <br />
              <input
                  className="login__input"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
              />
              <br /><br />

              <button
                  className="login__button"
                  type="submit"
                  >
                  Login
              </button>

              </form>
              <p>Don't have an account?</p>
              <p>Click to <a href="./../SignUp">SignUp</a>!</p>
            </div>
            </div>
    );
    }
}

export default withRouter(Login);
