import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { withCookies } from 'react-cookie';
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
import StudentApplicationInvitation from "./react-components/StudentApplicationInvitation";
import MessageBox from "./react-components/MessageBox";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loginStatus: props.cookies.get('type') || 'guest', // guest, user, admin
            identity: {
                type: props.cookies.get('type') || 'guest',
                username: props.cookies.get('username') || '',
                get uid() { return this.username; },
                token: props.cookies.get('token') || '',
            },
        };

        this.setIdentity = this.setIdentity.bind(this);
    }

    // @param: identity: const Object
    setIdentity(identity) {
        this.setState({ identity, loginStatus: identity.type });
        this.props.cookies.set('token', identity.token);
        this.props.cookies.set('username', identity.username);
        this.props.cookies.set('type', identity.type);
    }

    render() {
        return (
            <BrowserRouter>
                <Navigator globalState={this.state}>
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
                                <Login loginCallback={this.setIdentity} />
                            )}
                        />
                        <Route exact path='/logout'
                               render={() => <Logout loginCallback={this.setIdentity}/> }/>
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
                            render={() => (
                                <TeamApplicationInvitation state={this.state} />
                            )}
                        />
                        <Route
                            exact
                            path="/adminDashboard"
                            render={() => <AdminDashboard state={this.state} />}
                        />
                        <Route
                            exact
                            path="/student-app-inv"
                            render={() => (
                                <StudentApplicationInvitation
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

export default withCookies(App);
