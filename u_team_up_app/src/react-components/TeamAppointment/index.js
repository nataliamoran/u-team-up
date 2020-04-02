import React from 'react';

import Calendar from '../Calendar';
import Header from '../Header';
import { Link } from 'react-router-dom';
import {updateTeamDataInDB} from "../../actions/teamScripts";
import {TEAMS_BACKEND, USER_BACKEND} from "../../config";
import {uid} from "react-uid";
import TextField from "@material-ui/core/TextField/TextField";
import {updateProfileData} from "../../actions/profileScripts";

const debug = console.log;


class TeamAppointment extends React.Component {
    // @param props: {teamId: string, globalState}
    constructor(props) {
        super(props);

        this.state = {
            dataLoaded: false,
            teamId: props.teamId || '', // teamId: String
            appointmentTime: {
                start: null,
                end: null
            }, // {start: Date, end: Date}
            team: null,
            otherSchedule: [], // [{start: Date, end: Date, name: string}, ...]
        };

        this.addEvent = this.addEvent.bind(this);
    }

    getEventsFromJson = (eventsFromDB) => {
        const events = [];
        eventsFromDB.map(event => (
            <div key={uid(
                event
            )}>
                {events.push({
                    name: event.name,
                    start: new Date(event.start),
                    end: new Date(event.end)
                })}
            </div>
        ));
        return events;
    };

    componentDidMount() {
        const url = TEAMS_BACKEND + "/" + this.props.teamId;

        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                const events = this.getEventsFromJson(json.events);
                this.setState({
                    team: json,
                    otherSchedule: events,
                    dataLoaded: true
                });
                console.log(this.state);
            }).catch((error) => {
            console.error(error)
        });
    }

    // @param: ev: {start: Date, end: Date, name: string}
    addEvent(ev) {
        debug('ta-addevent');
        const { otherSchedule } = this.state;

        otherSchedule.push(ev);
        debug(otherSchedule);

        this.setState({ otherSchedule });

        // TODO: UPLOAD
        let data = {
            events: otherSchedule,
            token: this.props.globalState.identity.token
        };
        updateTeamDataInDB(data, this.state.teamId);

        let memberUrl;
        let memberData;

        this.state.team.members.map( memberUsername => (
            <div key={uid(
                memberUsername
            )}>
                {memberUrl = USER_BACKEND + memberUsername}
                {
                    fetch(memberUrl)
                        .then((response) => response.json())
                        .then((json) => {
                            const memberEvents = json.events;
                            const memberMessages = json.messages;
                            memberEvents.push(ev);
                            memberData = {
                                events: memberEvents,
                                teamUniversity: this.state.team.university,
                                teamCourse: this.state.team.course,
                                event: ev,
                                token: this.props.globalState.identity.token
                            };
                            updateProfileData(memberData, memberUsername);

                        }).catch((error) => {
                        console.error(error)
                    })
                }

            </div>
            )
        )

    }
    
    render() {
        const authorized = this.props.globalState.identity.type === 'user';
        
        return (
            this.state.dataLoaded ?
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
                :
                null
        );
    }
};

export default TeamAppointment;
