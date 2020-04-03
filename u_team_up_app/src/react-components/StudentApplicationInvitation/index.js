import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";

class StudentApplicationInvitation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            teamId: "",
            teamName: "",
            applicationStatus: "",
            invitationStatus: "",
            applications: [
                // TODO: FETCH
                {
                    teamName: "UofT CSC309 team1",
                    teamId: "1",
                    applicationStatus: "Accepted"
                },
                {
                    teamName: "UofT CSC309 team2",
                    teamId: "2",
                    applicationStatus: "Rejected"
                },
                {
                    teamName: "UofT CSC401 team1",
                    teamId: "3",
                    applicationStatus: "Pending"
                }
            ],
            invitations: [
                //TODO FETCH
                { teamName: "UofT CSC308 team2", teamId: "2" },
                { teamName: "UofT CSC308 team3", teamId: "4" },
                { teamName: "UofT CSC308 team4", teamId: "5" }
            ]
        };
    }

    withdrawTeam = appliedTeam => {
        this.state.applications = this.state.applications.filter(
            team => team !== appliedTeam
        );
        this.setState({
            applications: this.state.applications
        });
    };

    render() {
        return (
            <div>
                <div className="application__left_div">
                    <div className="student_application">
                        <br />
                        <h2>Current Applications</h2>
                        <Link to="/">
                            <button className="app_inv__button">+ NEW</button>
                        </Link>
                        {this.state.applications.map(appliedTeam => (
                            <div
                                className="student_application_div"
                                key={appliedTeam}
                            >
                                {appliedTeam.teamName +
                                    " " +
                                    appliedTeam.applicationStatus +
                                    " "}
                                {appliedTeam.applicationStatus === "Pending" &&
                                <button
                                    onClick={this.withdrawTeam.bind(
                                        this,
                                        appliedTeam
                                    )}
                                >
                                    Withdraw
                                </button>}
                            </div>
                        ))}
                        <br />

                    </div>
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
