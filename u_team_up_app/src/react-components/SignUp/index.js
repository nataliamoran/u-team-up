import React from "react";
import "./styles.css";
import { withRouter } from "react-router-dom";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { SERVER_URL } from '../../config';


const debug = console.log;

class Signup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            uid: "4",
            username: "",
            university: "",
            email: "",
            password: "",
            confirmedPassword: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.loginCallback = this.props.loginCallback;
    }

    handleSubmit(e) {
        const { username, university, email, password, confirmedPassword } = this.state;

        if (!username || !password || !confirmedPassword) {
            NotificationManager.error('Field cannot be empty')
        } else if (password !== confirmedPassword) {
            NotificationManager.error('Password do not match')
        } else {
            debug(username, password);
            fetch(`${SERVER_URL}auth/signup`,
                  { method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                  })
                .then(async res => {
                    if (! res.ok) { throw await res.json(); }
                    this.props.history.goBack();
                })
                .catch(e => {
                    debug(e);
                    NotificationManager.error('Error: ' + JSON.stringify(e));
                });
        }

        e.preventDefault();
    }

    handleChange(e) {
            this.setState({
                [e.target.name]: e.target.value
            });
        }

    render() {
        return (
            <div>
                <div className="signup__content">
                    <h1>Create an account</h1>

                    <form
                        className="signup"
                        method="post"
                        onSubmit={this.handleSubmit}
                    >
                        <label className="signup__label">Username</label>
                        <br />
                        <input
                            className="signup__input"
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                        <br />
                        <br />

                        <label className="signup__label">Password</label>
                        <br />
                        <input
                            className="signup__input"
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        <br />
                        <br />

                        <label className="signup__label">
                            Confirm Password
                        </label>
                        <br />
                        <input
                            className="signup__input"
                            type="password"
                            name="confirmedPassword"
                            value={this.state.confirmedPassword}
                            onChange={this.handleChange}
                        />
                        <br />
                        <br />
                        <br />
                        <br />

                        <button className="signup__button" type="submit">
                            SignUp
                        </button>
                        <NotificationContainer/>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(Signup);
