import React from 'react';

import Calendar from '../Calendar';
import Header from '../Header';
import { Link } from 'react-router-dom';

const debug = console.log;


class TeamAppointment extends React.Component {
    // @param props: {teamId: string, globalState}
    constructor(props) {
        super(props);

        this.state = {
            teamId: props.teamId || '', // teamId: String
            appointmentTime: {
                start: null,
                end: null
            }, // {start: Date, end: Date}
            otherSchedule: [ // TODO: FETCH
                {
                    name: 'Some Meeting',
                    start: new Date(2020, 1, 20, 14, 30),
                    end: new Date(2020, 1, 20, 15, 20)
                },
                {
                    name: 'Something else',
                    start: new Date(2020, 1, 22, 13, 0),
                    end: new Date(2020, 1, 22, 14, 0)
                }
            ], // [{start: Date, end: Date, name: string}, ...]
        };

        this.addEvent = this.addEvent.bind(this);
    }

    // @param: ev: {start: Date, end: Date, name: string}
    addEvent(ev) {
        debug('ta-addevent');
        const { otherSchedule } = this.state;

        otherSchedule.push(ev);
        debug(otherSchedule);

        this.setState({ otherSchedule });

        // TODO: UPLOAD
    }
    
    render() {
        const authorized = this.props.globalState.identity.type === 'user';
        
        return (
            <div className="team_appointment">
                <Header type='main' 
                        title='Team Appointment' />
                { authorized ? [
                    <Header type='secondary'
                            title='Project Team ID:'
                            data={
                                <Link to={ `/team/${this.state.teamId}` }>
                                    { this.state.teamId }
                                </Link>
                            } />,
                    <div className="body">
                        <Calendar highlight={ this.state.appointmentTime }
                                  schedule={ this.state.otherSchedule }
                                  addEventCallback={ this.addEvent } />
                    </div>
                ] : 'You are not allowed to visit this page. Please log in or sign up.'
                }
            </div>
        );
    }
};

export default TeamAppointment;
