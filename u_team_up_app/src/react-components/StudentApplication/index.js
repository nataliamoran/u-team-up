import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button/Button";
import Table from "@material-ui/core/Table/Table";
import TableBody from "@material-ui/core/TableBody/TableBody";
import TableRow from "@material-ui/core/TableRow/TableRow";
import { uid } from "react-uid";
import TableCell from "@material-ui/core/TableCell/TableCell";
import { TEAMS_BACKEND, USER_BACKEND } from "../../config";
import { updateTeamDataInDB } from "../../actions/teamScripts";
import { updateProfileData } from "../../actions/profileScripts";

class StudentApplicationInvitation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            student: null,
            team: null,
            applications: [],
            applicationStatus: ""
        };
    }

    componentDidMount() {
        const url = USER_BACKEND + this.props.state.identity.username;

        fetch(url)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    student: json
                });
                console.log(this.state);
            })
            .catch(error => {
                console.error(error);
            });
    }

    withdrawTeam = application => {
        // Remove application from User DB
        const updatedApplications = this.state.student.applications.filter(
            a => a !== application
        );
        const updatedStudent = this.state.student;
        updatedStudent.applications = updatedApplications;
        this.setState({
            student: updatedStudent
        });
        let profile_data = {
            applications: this.state.student.applications,
            token: this.props.state.identity.token
        };
        updateProfileData(profile_data, this.props.state.identity.username);

        // Remove application from Team DB
        const url = TEAMS_BACKEND + "/" + application.teamId;
        fetch(url)
            .then(response => response.json())
            .then(json => {
                const team = json;
                const updatedApplications = team.applications.filter(
                    a => a.student._id !== this.props.state.identity.username
                );
                const teamData = {
                    applications: updatedApplications,
                    token: this.props.state.identity.token
                };
                updateTeamDataInDB(teamData, application.teamId);
            })
            .catch(error => {
                console.error(error);
            });
    };

    render() {
        let withdrawButton;
        let noApplicationsNote;

        if (
            this.state.student &&
            this.state.student.applications.length === 0
        ) {
            noApplicationsNote = <h2>Currently there are no applications</h2>;
        }

        const showWithdrawButton = application => {
            if (application.status === "pending") {
                withdrawButton = (
                    <Button
                        variant="outlined"
                        color="primary"
                        className="withdraw_button"
                        onClick={this.withdrawTeam.bind(this, application)}
                    >
                        Withdraw
                    </Button>
                );
            } else {
                withdrawButton = null;
            }
        };

        return this.state.student ? (
            <div>
                <div className="application__left_div">
                    <br />
                    <h2 className="search_form_title">your applications</h2>

                    {this.state.student.applications
                        .slice(0)
                        .reverse()
                        .map(application => (
                            <div key={uid(application)}>
                                {console.log("APPLICATION")}
                                {console.log(application)}
                                <div className="student_applications__wrapper">
                                    <Table className="student-application-preview__table">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell
                                                    component="td"
                                                    scope="row"
                                                    className="application__name_cell"
                                                >
                                                    <Link
                                                        className="application__link"
                                                        to={
                                                            "/team/" +
                                                            application.teamId
                                                        }
                                                    >
                                                        {application.teamUniversity +
                                                            " " +
                                                            application.teamCourse}
                                                    </Link>
                                                    <div>
                                                        {"status: " +
                                                            application.status}
                                                    </div>
                                                </TableCell>

                                                <TableCell
                                                    component="td"
                                                    scope="row"
                                                    className="button_cell"
                                                >
                                                    {showWithdrawButton(
                                                        application
                                                    )}
                                                    {withdrawButton}
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                        ))}
                    <div className="no-applications-note">
                        {noApplicationsNote}
                    </div>
                </div>
            </div>
        ) : null;
    }
}

export default StudentApplicationInvitation;
