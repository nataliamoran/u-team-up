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
                               render={() => <TeamAppointment teamId={1} otherSchedule={ [] } /> }/>
                    </Switch>
                </BrowserRouter>
            </div>

        );
    }
}

export default App;
