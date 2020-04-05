import React from "react";

import "./styles.css";
import {uid} from "react-uid";
import Table from "@material-ui/core/Table/Table";
import TableBody from "@material-ui/core/TableBody/TableBody";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button/Button";
import {TEAMS_BACKEND, USER_BACKEND} from "../../config";
import {updateTeamDataInDB} from "../../actions/teamScripts";
import {updateProfileData} from "../../actions/profileScripts";

class TeamApplicationInvitation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            team: null,
            student: null
        };
    }


    componentDidMount() {
        const url = TEAMS_BACKEND + "/" + this.props.teamId;
        console.log("TEAM ID");
        console.log(this.props.teamId);
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    team: json
                });
            }).catch((error) => {
            console.error(error)
        });
    }

    updateApplicationStatusInUserDB = (application, username, status) => {
        const studentUrl = USER_BACKEND + username;

        fetch(studentUrl)
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    student: json
                });
                this.state.student.applications.map(a => a.teamId === this.state.team._id ?
                    a.status = status
                    :
                    null);
                let profile_data;
                if(status.toLowerCase() === "accepted"){
                    this.state.student.teams.push(this.state.team._id);
                    profile_data = {
                        applications: this.state.student.applications,
                        teams: this.state.student.teams,
                        _id: username,
                        teamUniversity: this.state.team.university,
                        teamCourse: this.state.team.course,
                        applicationStatus: status,
                        token: this.props.state.identity.token
                    };
                } else {
                    profile_data = {
                        applications: this.state.student.applications,
                        _id: username,
                        teamUniversity: this.state.team.university,
                        teamCourse: this.state.team.course,
                        applicationStatus: status,
                        token: this.props.state.identity.token
                    };
                }
                updateProfileData(profile_data, username);
            }).catch((error) => {
            console.error(error)
        });


    };

    updateTeamAndUserApplicationsInDB = (application, accept) => {
        const updatedApplications = this.state.team.applications.filter(a => a !== application);
        const updatedTeam = this.state.team;
        updatedTeam.applications = updatedApplications;
        if(accept){
            updatedTeam.members.push(application.student._id);
        }
        this.setState({
            team: updatedTeam
        });
        let data;
        if(accept){
            data = {
                applications: this.state.team.applications,
                members: this.state.team.members,
                token: this.props.state.identity.token
            };
        } else {
            data = {
                applications: this.state.team.applications,
                token: this.props.state.identity.token
            };
        }
        updateTeamDataInDB(data, this.state.team._id);
        if(accept){
            this.updateApplicationStatusInUserDB(application, application.student._id, "accepted");
        } else {
            this.updateApplicationStatusInUserDB(application, application.student._id, "rejected");
        }
    };

    seeApplication = (application) => {
        this.state.team.applications.map(a => a === application ? a.open = !a.open : null);
        this.setState({
            team: this.state.team
        });
    };

    render() {
        return (
            this.state.team ?
                <div className="team_application_invitation_view">
                    <h1 className="search_form_title">Team Applications</h1>
                    <div className="team_application_view">
                        {this.state.team.applications.map(application => (
                            <div key={uid(
                                application
                            )}>

                                <div className="team_applications__wrapper">
                                    <Table className="application-preview__table">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell component="td" scope="row"
                                                           className="application__name_cell">
                                                    <Link className="application__link" to={`/student-profile`}>
                                                        {application.student.fullname ?
                                                            application.student.fullname : application.student._id}
                                                    </Link>
                                                </TableCell>
                                                <TableCell component="td" scope="row" className="button_cell">
                                                    <Button
                                                        variant="outlined"
                                                        color="primary"
                                                        className="see__button"
                                                        onClick={this.seeApplication.bind(this, application)}
                                                    >
                                                        {application.open ? "Hide" : "Open"}
                                                    </Button>
                                                </TableCell>
                                                <TableCell component="td" scope="row" className="button_cell">
                                                    <Button
                                                        variant="outlined"
                                                        color="primary"
                                                        className="accept__button"
                                                        onClick={this.updateTeamAndUserApplicationsInDB.bind(this, application, true)}
                                                    >
                                                        Accept
                                                    </Button>

                                                </TableCell>
                                                <TableCell component="td" scope="row" className="button_cell">


                                                    <Button
                                                        variant="outlined"
                                                        color="primary"
                                                        className="reject__button"
                                                        onClick={this.updateTeamAndUserApplicationsInDB.bind(this, application, false)}
                                                    >
                                                        Reject
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                    {application.open ?
                                        Object.keys(application.application).map((key, index) => (
                                            <div className="application" key={index}>
                                                <span className="application_question">{key + " "}</span>
                                                <span
                                                    className="application_answer">{application.application[key]}</span>
                                            </div>
                                        ))
                                        :
                                        null}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                :
                null
        );
    }
}

export default TeamApplicationInvitation;
