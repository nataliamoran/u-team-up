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

    sendMessage = (message, username) => {
        this.state.student.messages.push({
            teamUniversity: this.state.team.university,
            teamCourse: this.state.team.course,
            messageText: message
        });
        this.setState({
            student: this.state.student
        });
        const profile_data = {
            messages: this.state.student.messages,
            token: this.props.state.identity.token
        };
        updateProfileData(profile_data, username);
    };


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
                const profile_data = {
                    applications: this.state.student.applications,
                    _id: username,
                    token: this.props.state.identity.token
                };

                updateProfileData(profile_data, username);
                this.sendMessage("Congratulations! Your application was accepted.", username);
            }).catch((error) => {
            console.error(error)
        });


    };

    acceptApplication = (application) => {
        const updatedApplications = this.state.team.applications.filter(a => a !== application);
        const updatedTeam = this.state.team;
        updatedTeam.applications = updatedApplications;
        updatedTeam.members.push(application.student._id);
        this.setState({
            team: updatedTeam
        });
        let data = {
            applications: this.state.team.applications,
            members: this.state.team.members,
            token: this.props.state.identity.token
        };
        updateTeamDataInDB(data, this.state.team._id);
        this.updateApplicationStatusInUserDB(application, application.student._id, "Accepted");
    };

    rejectApplication = (application) => {
        // TODO remove application from profile applications
        const updatedApplications = this.state.team.applications.filter(a => a !== application);
        const updatedTeam = this.state.team;
        updatedTeam.applications = updatedApplications;
        this.setState({
            team: updatedTeam
        })
        let data = {
            applications: this.state.team.applications,
            token: this.props.state.identity.token
        };
        updateTeamDataInDB(data, this.state.team._id);
        this.updateApplicationStatusInUserDB(application, application.student._id, "Rejected");
        this.sendMessage("Sorry, your application was rejected.");
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
                                                        onClick={this.acceptApplication.bind(this, application)}
                                                    >
                                                        Accept
                                                    </Button>

                                                </TableCell>
                                                <TableCell component="td" scope="row" className="button_cell">


                                                    <Button
                                                        variant="outlined"
                                                        color="primary"
                                                        className="reject__button"
                                                        onClick={this.rejectApplication.bind(this, application)}
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
