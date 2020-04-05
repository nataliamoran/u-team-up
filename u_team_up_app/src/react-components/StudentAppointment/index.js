import React from "react";

import Calendar from "../Calendar";
import Header from "../Header";

import { SERVER_URL } from "../../config";
import { request } from "../../actions/url";

const debug = console.log;

class StudentAppointment extends React.Component {
    // @param props: {globalState: object}
    constructor(props) {
        super(props);

        this.state = {
            studentId:
                props.globalState.loginStatus === "user"
                    ? props.globalState.identity.uid
                    : "",
            appointmentTime: {
                start: null,
                end: null
            }, // {start: Date, end: Date}
            otherSchedule: []
        };
    }

    componentDidMount() {
        this.getEvents()
            .then(events => {
                debug("Events:", events);
                this.setState({ otherSchedule: events });
            })
            .catch(() => {});
    }

    async getEvents() {
        const { username } = this.props.globalState.identity;
        const profile = await request.get(`${SERVER_URL}api/user`, {
            username
        });
        const teams = await Promise.all(
            profile.teams.map(id => request.get(`${SERVER_URL}api/teams/${id}`))
        );

        return teams
            .map(t =>
                t.events.map(e => ({
                    start: new Date(e.start),
                    end: new Date(e.end),
                    name: `[${t.course}] ${e.name}`
                }))
            )
            .reduce((a, b) => a.concat(b), []);
    }

    render() {
        const authorized = this.props.globalState.identity.type === "user";

        return (
            <div className="student_appointment">
                <Header type="main" title="Your Appointments" />
                {authorized ? (
                    <div className="body">
                        <Calendar schedule={this.state.otherSchedule} />
                    </div>
                ) : (
                    "You are not allowed to visit this page. Please log in or sign up."
                )}
            </div>
        );
    }
}

export default StudentAppointment;
