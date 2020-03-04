import React from "react";
import ReactDOM from "react-dom";
import { Container, Header, List } from "semantic-ui-react";

import "./styles.css";

import ApplicationPreviewList from "./../ApplicationPreviewList";
import InvitationPreviewList from "./../InvitationPreviewList";

import SearchStudentForm from "./../SearchStudentForm";
import InviteStudentForm from "./../InviteStudentForm";
import Menu from "./../Menu";

import { addInvitations } from "../../actions/addInvitation";

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
	        applications: [ // TODO: FETCH
                { studentName: "Tom", studentId: "1", applicationStatus: "Accepted" },
                { studentName: "Christopher Breaux", studentId: "2", applicationStatus: "Rejected" },
                { studentName: "Elizabeth Grant", studentId: "3", applicationStatus: "Pending" }
            ],
	        invitations: [ //TODO FETCH
            	{ studentName: "Rosalia Tobella", studentId: "1", invitationStatus: "Pending" }, 
            	{ studentName: "Tyler Okonma", studentId: "2", invitationStatus: "Pending" },
            	{ studentName: "Kanye West", studentId: "3", invitationStatus: "Pending" }
            ]
        }

        this.state.filteredApplications = Array.from(this.state.applications);
        this.state.filteredInvitations = Array.from(this.state.invitations);
    }

    handleSearchInput = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    render() {
        const {studentId} = this.props;

        return (
            <div className="team_application_invitation_view">
                <h1 className="search_form_title">Team Applications</h1>
                <ApplicationPreviewList applications={this.state.filteredApplications} /> 

                <h1 className="search_form_title">Team Invitations</h1>
                <div className="search_student_form">       
                <InviteStudentForm
                    studentName={this.state.studentName}
                    handleSearch={this.handleSearchInput}
                    addInvitations={() => addInvitations(this)}
                />
                </div>
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
            </div>
        );
    }
}

export default TeamApplicationInvitation;
