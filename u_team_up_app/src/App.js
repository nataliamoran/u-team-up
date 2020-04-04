import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import "./App.css";

import Login from "./react-components/Login";
import SignUp from "./react-components/SignUp";
import Logout from './react-components/Logout';
import SearchTeam from "./react-components/SearchTeam";
import SearchStudent from "./react-components/SearchStudent";
import Team from "./react-components/Team";
import TeamAppointment from "./react-components/TeamAppointment";
import Navigator from "./react-components/Navigator";
import StudentProfile from "./react-components/StudentProfile";
import StudentAppointment from "./react-components/StudentAppointment";
import TeamApplicationInvitation from "./react-components/TeamApplicationInvitation";
import AdminDashboard from "./react-components/AdminDashboard";
import StudentApplication from "./react-components/StudentApplication";
import MessageBox from "./react-components/MessageBox";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loginStatus: window.localStorage.getItem('type') || 'guest', // guest, user, admin
            identity: {
                type: window.localStorage.getItem('type') || 'guest',
                username: window.localStorage.getItem('username') || '',
                get uid() { return this.username; },
                token: window.localStorage.getItem('token') || '',
            },
        };

        this.setIdentity = this.setIdentity.bind(this);
        this.logout = this.logout.bind(this);
    }

    // @param: identity: const Object
    setIdentity(identity) {
        this.setState({ identity, loginStatus: identity.type });
        window.localStorage.setItem('token', identity.token);
        window.localStorage.setItem('username', identity.username);
        window.localStorage.setItem('type', identity.type);
    }

    logout() {
        this.setIdentity({ type: 'guest',
                           username: '',
                           uid: '',
                           token: '', });
    }

    render() {
        return (
            <BrowserRouter>
                <Navigator globalState={this.state} logoutCallback={this.logout}>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={() => <SearchTeam state={this.state} />}
                        />
                        <Route
                            exact
                            path="/login"
                            render={() => (
                                <Login globalState={this.state} loginCallback={this.setIdentity} />
                            )}
                        />
                        <Route exact path='/logout'
                               render={() => <Logout logoutCallback={this.logout} globalState={this.state} /> }/>
                        <Route
                            exact
                            path="/signup"
                            render={() => (
                                <SignUp loginCallback={this.setIdentity} />
                            )}
                        />
                        <Route
                            exact
                            path="/student-profile/:id"
                            render={({ match }) => (
                                <StudentProfile
                                    globalState={this.state}
                                    id={match.params.id}
                                />
                            )}
                        />
                        <Route
                            exact
                            path="/student-profile"
                            render={() => (
                                <StudentProfile globalState={this.state} />
                            )}
                        />
                        <Route
                            exact
                            path="/search-student"
                            render={() => <SearchStudent state={this.state} />}
                        />
                        <Route
                            exact
                            path="/team/:id/appointment"
                            render={({ match }) => (
                                <TeamAppointment
                                    teamId={match.params.id}
                                    globalState={this.state}
                                />
                            )}
                        />
                        <Route
                            exact
                            path="/team/:id"
                            render={({ match }) => (
                                <Team
                                    globalState={this.state}
                                    teamId={match.params.id}
                                />
                            )}
                        />
                        <Route
                            exact
                            path="/appointments"
                            render={() => (
                                <StudentAppointment
                                    globalState={this.state}
                                    studentId="1"
                                />
                            )}
                        />
                        <Route
                            exact
                            path="/team/:id/application"
                            render={({ match }) => (
                                <TeamApplicationInvitation
                                    teamId={match.params.id}
                                    state={this.state}
                                />
                            )}
                        />
                        <Route
                            exact
                            path="/adminDashboard"
                            render={() => <AdminDashboard globalState={this.state} />}
                        />
                        <Route
                            exact
                            path="/student-app-inv"
                            render={() => (
                                <StudentApplication
                                    state={this.state}
                                />
                            )}
                        />
                        <Route
                            exact
                            path="/inbox"
                            render={() => (
                                <MessageBox globalState={this.state} />
                            )}
                        />
                    </Switch>
                </Navigator>
            </BrowserRouter>
        );
    }
}

export default App;
