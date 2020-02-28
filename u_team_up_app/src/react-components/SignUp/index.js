import React from "react";
import "./styles.css";

class Signup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            university: "",
            email: "",
            password: "",
            confirmedPassword: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
        const {password, confirmedPassword} = this.state
        if (password !== confirmedPassword) {
            alert('Passwords do not match')
        } else {
            alert('Registered!');
        }

        e.preventDefault();
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div>
            <title>Signup</title>

                <div className="signup__content">
                  <h1>Create an account</h1>

                  <form className="signup" action="./../SearchTeam" method="post" onSubmit={this.handleSubmit}>
                    <label htmlFor="username">USERNAME</label>
                    <br />
                    <input
                        className="signup__input"
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    <br /><br />

                    <label htmlFor="uni">UNIVERSITY</label>
                    <br />
                    <input
                        className="signup__input"
                        type="text"
                        name="university"
                        value={this.state.university}
                        onChange={this.handleChange}
                    />
                    <br /><br />

                    <label htmlFor="email">UNIVERSITY EMAIL</label>
                    <br />
                    <input
                        className="signup__input"
                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    <br /><br />

                    <label htmlFor="password">PASSWORD</label>
                    <br />
                    <input
                        className="signup__input"
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    <br /><br />

                    <label htmlFor="confirm_password">CONFIRM PASSWORD</label>
                    <br />
                    <input
                        className="signup__input"
                        type="password"
                        name="confirmedPassword"
                        value={this.state.confirmedPassword}
                        onChange={this.handleChange}
                    />
                    <br /><br />
                    <br /><br />

                    <button
                        className="signup__button"
                        type="submit"
                        >
                        SignUp
                    </button>
                  </form>
                </div>
            </div>
    );
    }
}

export default Signup;
