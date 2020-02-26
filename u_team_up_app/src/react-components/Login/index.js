import React from "react";
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

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        if ((e.target.username.value === this.state.users[0].username &&
            e.target.password.value === this.state.users[0].password) ||
            (e.target.username.value === this.state.users[1].username &&
            e.target.password.value === this.state.users[1].password)){
            alert('Correct password')
        } else {
            alert('Wrong password')
        }

        e.preventDefault();
    }

    render() {
        return (
            <div>
            <title>UTeamUp Login</title>
            <div className="login__content">
              <h1>UTeamUp</h1>
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

export default Login;
