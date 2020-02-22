import React from 'react';

import Calendar from '../Calendar';

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
                <div className="header">
                    <h1>Your Appointment</h1>
                    <p>Project Team ID: { this.state.teamId }</p>
                </div>
                <div className="body">
                    <Calendar highlight={ this.state.appointmentTime }
                              schedule={ this.state.otherSchedule } />
                </div>
            </div>
        );
    }
};

export default TeamAppointment;
