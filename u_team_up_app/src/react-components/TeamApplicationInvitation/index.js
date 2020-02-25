import React from "react";
import ReactDOM from "react-dom";
import { Container, Header, List } from "semantic-ui-react";

import "./styles.css";

import ApplicationPreviewList from "./../ApplicationPreviewList";
import InvitationPreviewList from "./../InvitationPreviewList";

import SearchStudentForm from "./../SearchStudentForm";
import Menu from "./../Menu";

import { filterStudents } from "../../actions/searchStudent";

class TeamApplicationInvitation extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
        	teamId: "1",
            studentName: "",
	        studentUniversity: "",
	        studentCourse: "",
	        studentID: "", 
	        applicationStatus: "",
	        invitationStatus: "",
	        applications: [ // TODO: FETCH
                { studentName: "Tom", studentID: "1", applicationStatus: "Accepted" },
                { studentName: "Christopher Breaux", studentID: "2", applicationStatus: "Rejected" },
                { studentName: "Elizabeth Grant", studentID: "3", applicationStatus: "Pending" }
            ],
	        invitations: [ //TODO FETCH
            	{ studentName: "Rosalia Tobella", studentID: "1", invitationStatus: "Pending" }, 
            	{ studentName: "Tyler Okonma", studentID: "2", invitationStatus: "Pending" },
            	{ studentName: "Kanye West", studentID: "3", invitationStatus: "Invite" }
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
                <SearchStudentForm
                    studentName={this.state.studentName}
                    handleSearch={this.handleSearchInput}
                    filterStudents={() => filterStudents(this)}
                />
                </div>

                <InvitationPreviewList invitations={this.state.filteredInvitations} />
            </div>
        );
    }
}

export default TeamApplicationInvitation;
