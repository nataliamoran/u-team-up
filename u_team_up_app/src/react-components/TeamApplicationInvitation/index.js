import React from "react";

import "./styles.css";
import {uid} from "react-uid";
import Table from "@material-ui/core/Table/Table";
import TableBody from "@material-ui/core/TableBody/TableBody";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button/Button";
import {TEAMS_BACKEND} from "../../config";
import {updateTeamDataInDB} from "../../actions/teamScripts";

class TeamApplicationInvitation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            teamId: "1",
            studentName: "",
            studentUniversity: "",
            studentCourse: "",
            studentId: "",
            applicationStatus: "",
            invitationStatus: "",
            team: {
                applications: [
                    {
                            username: "Tom",
                            application: [
                                {"How are you?": "Fine"},
                                {"Question 2": "Also fine"}
                            ]
                        },
                        {
                            username: "A very very very long name",
                            application: [
                                {"Test question?": "Test Answer"},
                                {"Test question 2": "Test Answer 2"}
                            ]
                        }
                ]
            },
            // applications: [
            //     // TODO: FETCH
            //     {
            //         username: "Tom",
            //         application: [
            //             {"How are you?": "Fine"},
            //             {"Question 2": "Also fine"}
            //         ]
            //     },
            //     {
            //         username: "A very very very long name",
            //         application: [
            //             {"Test question?": "Test Answer"},
            //             {"Test question 2": "Test Answer 2"}
            //         ]
            //     }
            // ],
            // invitations: [
            //     //TODO FETCH
            //     {
            //         studentName: "Rosalia Tobella",
            //         studentId: "1",
            //         invitationStatus: "Pending"
            //     },
            //     {
            //         studentName: "Tyler Okonma",
            //         studentId: "2",
            //         invitationStatus: "Pending"
            //     },
            //     {
            //         studentName: "Kanye West",
            //         studentId: "3",
            //         invitationStatus: "Pending"
            //     }
            // ]
        };

        // this.state.filteredApplications = Array.from(this.state.applications);
        // this.state.filteredInvitations = Array.from(this.state.invitations);
    }

    // handleSearchInput = event => {
    //     const target = event.target;
    //     const value = target.value;
    //     const name = target.name;
    //
    //     this.setState({
    //         [name]: value
    //     });
    // };

    componentDidMount() {
        // const url = TEAMS_BACKEND + "/" + this.props.teamId;
        //
        // fetch(url)
        //     .then((response) => response.json())
        //     .then((json) => {
        //         console.log("Team JSON");
        //         console.log(json);
        //         this.setState({
        //             team: json
        //         });
        //         console.log(this.state);
        //     }).catch((error) => {
        //     console.error(error)
        // });
    }

    rejectApplication = (application) => {
        // TODO remove application from profile applications
        // const updatedApplications = this.state.team.applications.filter(a => a !== application);
        // const updatedTeam = this.state.team;
        // updatedTeam.applications = updatedApplications;
        // this.setState({
        //     team: updatedTeam
        // })
        // let data = {
        //     applications: this.state.team.applications,
        // };
        // updateTeamDataInDB(data, this.state.team._id);
    };

    render() {
        // const { studentId } = this.props;

        return (
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
                                            <TableCell component="td" scope="row" className="application__name_cell">
                                                <Link className="application__link" to={`/student-profile`}>
                                                    {application.username}
                                                </Link>
                                            </TableCell>
                                            <TableCell component="td" scope="row" className="button_cell">
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    className="see__button"
                                                    // onClick={}
                                                >
                                                    See
                                                </Button>
                                            </TableCell>
                                            <TableCell component="td" scope="row" className="button_cell">
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    className="accept__button"
                                                    // onClick={}
                                                >
                                                    Accept
                                                </Button>

                                            </TableCell>
                                            <TableCell component="td" scope="row" className="button_cell">


                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    className="reject__button"
                                                    onClick={this.rejectApplication(application)}>
                                                    Reject
                                                </Button>

                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    ))}
                </div>

                {/*<h1 className="search_form_title">Team Invitations</h1>*/}
                {/*<div className="search_student_form">*/}
                {/*<InviteStudentForm*/}
                {/*studentName={this.state.studentName}*/}
                {/*handleSearch={this.handleSearchInput}*/}
                {/*addInvitations={() => addInvitations(this)}*/}
                {/*/>*/}
                {/*</div>*/}

                {/*<div className="team_invitation_view">*/}
                {/*<table className="headers">*/}
                {/*<tr>*/}
                {/*<td className="name">*/}
                {/*<h2>Name</h2>*/}
                {/*</td>*/}
                {/*<td className="status">*/}
                {/*<h2>Status</h2>*/}
                {/*</td>*/}
                {/*</tr>*/}
                {/*</table>*/}
                {/*<InvitationPreviewList*/}
                {/*invitations={this.state.filteredInvitations}*/}
                {/*/>*/}
                {/*</div>*/}

            </div>
        );
    }
}

export default TeamApplicationInvitation;
