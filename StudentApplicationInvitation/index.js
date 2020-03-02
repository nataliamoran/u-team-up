import React from "react";
import "./styles.css";
import ApplicationPreviewList from "./../ApplicationPreviewList";
import InvitationPreviewList from "./../InvitationPreviewList";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

class StudentApplicationInvitation extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        	teamId: "",
            studentName: "",
	        applicationStatus: "",
	        invitationStatus: "",
	        applications: [ // TODO: FETCH
                { studentName: "UofT CSC309 team1", studentId: "1", applicationStatus: "Accepted" },
                { studentName: "UofT CSC373 team1", studentId: "2", applicationStatus: "Rejected" },
                { studentName: "UofT CSC401 team1", studentId: "3", applicationStatus: "Pending" }
            ],
	        invitations: [ //TODO FETCH
            	{ studentName: "UofT CSC309 team2", studentId: "2", invitationStatus: "Pending" },
            	{ studentName: "UofT CSC309 team3", studentId: "3", invitationStatus: "Pending" },
            	{ studentName: "UofT CSC309 team4", studentId: "4", invitationStatus: "Accepted" }
            ]
        }

        this.state.filteredApplications = Array.from(this.state.applications);
        this.state.filteredInvitations = Array.from(this.state.invitations);
    }


    render() {
        return (

            <div className="application_invitation_view">
                <h1 className="search_form_title">Current Applications</h1>
                <Link className="add_new__link" to={`/`}>
                    <Button variant="outlined" color="primary"
                            className="add_new__button">+NEW</Button>
                </Link>

                <table className="headers">
                    <tr>
                        <td className="name">
                            <h2>Name</h2>
                        </td>
                        <td className="status">
                            <h2>Status</h2>
                        </td>
                    </tr>
                </table>

                <InvitationPreviewList invitations={this.state.filteredInvitations} />

                <h1 className="search_form_title">Current Invitations</h1>
                <ApplicationPreviewList applications={this.state.filteredApplications} />



            </div>
        );
    }
}

export default StudentApplicationInvitation;
