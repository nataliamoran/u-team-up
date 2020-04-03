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
        const url = USER_BACKEND + this.props.username;

        fetch(url)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    team: json
                });
                console.log(this.state);
            })
            .catch(error => {
                console.error(error);
            });
    }

    deleteApplicationFromTeamDB = application => {
        const teamUrl = TEAMS_BACKEND + "/" + this.props.teamId;

        fetch(teamUrl)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    team: json
                });
                this.state.team.applications.map(a => a.username);
                let team_data = {
                    applications: this.state.team.applications,
                    token: this.props.state.identity.token
                };
                updateTeamDataInDB(team_data, this.state.team._id);
            })
            .catch(error => {
                console.error(error);
            });
    };

    withdrawTeam = application => {
        const updatedApplications = this.state.applications.filter(
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
        updateProfileData(profile_data, this.state.student.username);
        this.deleteApplicationFromTeamDB(application);
    };

    render() {
        return (
            <div>
                <div className="application__left_div">
                    <br />
                    <h2>Current Applications</h2>
                    <Link to="/">
                        <button className="app_inv__button">+ NEW</button>
                    </Link>
                    {this.state.applications.map(application => (
                        <div key={uid(application)}>
                            <div className="student_applications__wrapper">
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell
                                                component="td"
                                                scope="row"
                                                className="application__name_cell"
                                            >
                                                <Link
                                                    className="team_link"
                                                    to={`/team/:team._id`}
                                                >
                                                    {`${application.team.university} +
                                                      ${application.team.course} +
                                                      ${application.team.description}
                                            `}
                                                </Link>
                                            </TableCell>

                                            <TableCell
                                                component="td"
                                                scope="row"
                                                className="button_cell"
                                            >
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    className="withdraw_button"
                                                    onClick={this.withdrawTeam.bind(
                                                        this,
                                                        application
                                                    )}
                                                >
                                                    Withdraw
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    ))}
                </div>
                <br />

                <div className="application__right_div">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <Link to="/">Main</Link>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Link to="./../student-profile">
                                        Your Profile
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default StudentApplicationInvitation;
