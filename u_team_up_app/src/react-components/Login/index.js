import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import "./styles.css";
import { SERVER_URL } from "../../config";
import {
    NotificationContainer,
    NotificationManager
} from "react-notifications";

import { request } from "../../actions/url";

const debug = console.log;

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        };

        this.loginCallback = this.props.loginCallback;

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        const { username, password } = this.state;

        request
            .post(`${SERVER_URL}auth/login`, { username, password })
            .then(({ username, token, type }) => {
                const identity = {
                    type,
                    username,
                    uid: username,
                    token
                };
                this.loginCallback(identity);
                debug("logged in");

                this.props.history.goBack();
            })
            .catch(e => {
                debug(e);
                NotificationManager.error("Error: " + e.error);
            });
    }

    render() {
        return (
            <div>
                <div className="login__content">
                    <h1>UTeamUp!</h1>
                    <form
                        className="login"
                        method="post"
                        onSubmit={this.handleSubmit}
                    >
                        <label className="login__label">Username</label>
                        <br />
                        <input
                            className="login__input"
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                        <br />
                        <br />

                        <label className="login__label">Password</label>
                        <br />
                        <input
                            className="login__input"
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        <br />
                        <br />

                        <button className="login__button" type="submit">
                            Login
                        </button>
                        <NotificationContainer />
                    </form>
                    <p>Don't have an account?</p>
                    <p>
                        Click to{" "}
                        <Link className="signup__link" to={"./../SignUp"}>
                            SignUp
                        </Link>
                        !
                    </p>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);
