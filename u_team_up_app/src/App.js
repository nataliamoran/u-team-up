import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';

import Login from './react-components/Login';
import SignUp from './react-components/SignUp';
import SearchTeam from './react-components/SearchTeam';
import SearchStudent from './react-components/SearchStudent';
import Team from './react-components/Team';
import TeamAppointment from './react-components/TeamAppointment';
import Navigator from './react-components/Navigator';
import StudentProfile from './react-components/StudentProfile';
import StudentAppointment from './react-components/StudentAppointment';
import TeamApplicationInvitation from './react-components/TeamApplicationInvitation';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            auth: {
                user: "user",
                user2: "user2",
                admin: "admin",
            },
            loginStatus: 'guest', // guest, user, admin
            identity: {
                type: 'guest',
                username: '',
                uid: '',
            },
        };

        this.setIdentity = this.setIdentity.bind(this);
    }

    // @param: identity: const Object
    setIdentity(identity) {
        this.setState({ identity, loginStatus: identity.type });
    }
    
    render() {
        return (
            <BrowserRouter>
                <Navigator globalState={ this.state }>
                    <Switch>
                        <Route exact path='/' render={() =>
                            (<SearchTeam state={this.state}/>)}/>
                        <Route exact path='/login' render={
                            () => <Login loginCallback={ this.setIdentity }/>
                        }/>
                        <Route exact path='/signup' render={() =>
                            (<SignUp state={this.state}/>)}/>
                        <Route exact path='/student-profile' render={() =>
                            (<StudentProfile state={this.state}/>)}/>
                        <Route exact path='/search-student' render={() =>
                            (<SearchStudent state={this.state}/>)}/>
                        <Route exact path='/team/:id/appointment' render={
                            ({ match }) =>
                                <TeamAppointment teamId={ match.params.id } />
                        }/>
                        <Route exact path='/team/:id' render={
                            ({ match }) =>
                                <Team globalState={this.state} teamId={ match.params.id } />}/>
                        <Route exact path='/appointments' render={() =>
                                            <StudentAppointment
                                                 studentId={1}
                                                 otherSchedule={
                                                     [{
                                                         name: 'Some Meeting',
                                                         start: new Date(2020, 1, 25, 15, 45),
                                                         end: new Date(2020, 1, 25, 16, 20)
                                                     },
                                                      {
                                                          name: 'Something else',
                                                          start: new Date(2020, 1, 28, 11, 0),
                                                          end: new Date(2020, 1, 28, 14, 0)
                                                      },
                                                      {
                                                          name: 'Something else',
                                                          start: new Date(2020, 3, 28, 11, 0),
                                                          end: new Date(2020, 3, 28, 14, 0)
                                                      }
                                                     ] } />}/>
                      <Route exact path='/team/:id/application' render={() =>
                            (<TeamApplicationInvitation state={this.state}/>)}/>

                    </Switch>
                </Navigator>
            </BrowserRouter>
        );
    }
}

export default App;
