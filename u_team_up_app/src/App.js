import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';


import SearchTeam from './react-components/SearchTeam';
import SearchStudent from './react-components/SearchStudent';
import Team from './react-components/Team';
import TeamAppointment from './react-components/TeamAppointment';
import Navigator from './react-components/Navigator';
import StudentAppointment from './react-components/StudentAppointment';
import TeamApplicationInvitation from './react-components/TeamApplicationInvitation';

class App extends React.Component {

    state = {
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
    }

    render() {
        return (
            <BrowserRouter>
                <Navigator globalState={ this.state }>
                    <Switch>
                        <Route exact path='/' render={() =>
                            (<SearchTeam state={this.state}/>)}/>
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
                      <Route exact path='/team/1/application' render={() =>
                            (<TeamApplicationInvitation state={this.state}/>)}/>

                    </Switch>
                </Navigator>
            </BrowserRouter>
        );
    }
}

export default App;
