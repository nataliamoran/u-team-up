import React from 'react';

import Calendar from '../Calendar';
import Header from '../Header';

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
    }

    render() {
        return (
            <div className="team_appointment">
                <Header type='main' 
 title='Your Appointment' />
                <Header type='secondary'
                    title='Project Team ID:'
                    data={ this.state.teamId } />
                <div className="body">
                    <Calendar highlight={ this.state.appointmentTime }
                              schedule={ this.state.otherSchedule } />
                </div>
            </div>
        );
    }
};

export default TeamAppointment;
