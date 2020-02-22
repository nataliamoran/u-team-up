import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';


import SearchTeam from './react-components/SearchTeam';
import Team from './react-components/Team';
import TeamAppointment from './react-components/TeamAppointment';

class App extends React.Component {

    state = {
        user: "user",
        user2: "user2",
        admin: "admin"
    }

    render() {
        return (

            <div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' render={() =>
                            (<SearchTeam state={this.state}/>)}/>
                        <Route exact path='/team' render={() =>
                            (<Team state={this.state}/>)}/>
                        <Route exact path='/team/appointment'
                               render={() => <TeamAppointment
                                                 teamId={1}
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
                                                      },
                                                     ] } /> }/>
                    </Switch>
                </BrowserRouter>
            </div>

        );
    }
}

export default App;
