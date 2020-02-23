import React from 'react';

import Calendar from '../Calendar';
import Header from '../Header';
import { Link } from 'react-router-dom';

const debug = console.log;


class TeamAppointment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            teamId: props.teamId || '', // teamId: String
            appointmentTime: {
                start: null,
                end: null
            }, // {start: Date, end: Date}
            otherSchedule: props.otherSchedule || [], // [{start: Date, end: Date}, ...]
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
    }
    
    render() {
        return (
            <div className="team_appointment">
                <Header type='main' 
                        title='Your Appointment' />
                <Header type='secondary'
                        title='Project Team ID:'
                        data={
                            <Link to={ `/team/${this.state.teamId}` }>
                                { this.state.teamId }
                            </Link>
                        } />
                <div className="body">
                    <Calendar highlight={ this.state.appointmentTime }
                              schedule={ this.state.otherSchedule }
                              addEventCallback={ this.addEvent } />
                </div>
            </div>
        );
    }
};

export default TeamAppointment;
