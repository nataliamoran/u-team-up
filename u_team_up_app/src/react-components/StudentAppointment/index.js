import React from 'react';

import Calendar from '../Calendar';
import Header from '../Header';

class StudentAppointment extends React.Component {
    // @param props: {globalState: object}
    constructor(props) {
        super(props);

        this.state = {
            studentId: props.globalState.loginStatus === 'user' ? props.globalState.identity.uid : '',
            appointmentTime: {
                start: null,
                end: null
            }, // {start: Date, end: Date}
            otherSchedule: // TODO: FETCH
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
            ],
        };

        this.addEvent = this.addEvent.bind(this);
    }

    // @param: ev: {start: Date, end: Date, name: string}
    addEvent(ev) {
        const { otherSchedule } = this.state;

        otherSchedule.push(ev);

        this.setState({ otherSchedule });

        // TODO: UPLOAD
    }

    render() {
        const authorized = this.props.globalState.identity.type === 'user';
        
        return (
            <div className="student_appointment">
                <Header type='main' 
                        title='Your Appointments' />
                { authorized ? 
                   <div className="body">
                       <Calendar highlight={ this.state.appointmentTime }
                                 schedule={ this.state.otherSchedule }
                                 addEventCallback={ this.addEvent } />
                   </div> : 'You are not allowed to visit this page. Please log in or sign up.'
                }
            </div>);
    }
};

export default StudentAppointment;
