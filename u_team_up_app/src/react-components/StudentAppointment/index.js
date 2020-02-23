import React from 'react';

import Calendar from '../Calendar';
import Header from '../Header';

class StudentAppointment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            studentId: props.studentId || '', // teamId: String
            appointmentTime: {
                start: null,
                end: null
            }, // {start: Date, end: Date}
            otherSchedule: props.otherSchedule || [], // [{start: Date, end: Date}, ...]
        };
    }

    render() {
        return (
            <div className="student_appointment">
                <Header type='main' 
 title='Your Appointments' />
                <Header type='secondary'
                    title='Student ID:'
                    data={ this.state.studentId } />
                <div className="body">
                    <Calendar highlight={ this.state.appointmentTime }
                              schedule={ this.state.otherSchedule } />
                </div>
            </div>
        );
    }
};

export default StudentAppointment;
