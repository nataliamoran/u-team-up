import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';


import SearchTeam from './react-components/SearchTeam';
import SearchStudent from './react-components/SearchStudent';
import Team from './react-components/Team';
import TeamAppointment from './react-components/TeamAppointment';
import Navigator from './react-components/Navigator';
import StudentAppointment from './react-components/StudentAppointment';

class App extends React.Component {

    state = {
        auth: {
            user: "user",
            user2: "user2",
            admin: "admin",
        },
        loginStatus: 'guest', // guest, user, admin
        teams: {
            '1': {
                id: "1",
                university: "UofT",
                course: "CSC309",
                description: "A+ group looking for a JS Jedi",
                members: [
                    {name: "Tom", photo: "./static/boy.png"},
                    {name: "Kate", photo: "./static/girl.png"}
                ]
            },
        }
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
                                <TeamAppointment
                                    teamId={ match.params.id }
                                    otherSchedule={
                                        [{
                                            name: 'Some Meeting',
                                            start: new Date(2020, 1, 20, 14, 30),
                                            end: new Date(2020, 1, 20, 15, 20)
                                        },
                                         {
                                             name: 'Something else',
                                             start: new Date(2020, 1, 22, 13, 0),
                                             end: new Date(2020, 1, 22, 14, 0)
                                         }
                                        ] } />
                        }/>
                        <Route exact path='/team/:id' render={
                            ({ match }) =>
                                <Team state={this.state} team={ this.state.teams[match.params.id] } />}/>
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
                    </Switch>
                </Navigator>
            </BrowserRouter>
        );
    }
}

export default App;
