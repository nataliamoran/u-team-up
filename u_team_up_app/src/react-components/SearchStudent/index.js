import React from "react";

import "./styles.css";
import SearchStudentForm from "./../SearchStudentForm";
import TeamMemberPreviewList from "../TeamMemberPreviewList";
import {
    NotificationContainer,
    NotificationManager
} from "react-notifications";
import { request } from "../../actions/url";
import { SERVER_URL } from "../../config";

class SearchStudent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            studentName: "",
            studentUniversity: "",
            newStudentName: "",
            newStudentUniversity: "",
            studentCourse: ""
        };
        this.state.filteredStudents = [];
    }

    componentDidMount() {
        this.filterStudents();
    }

    /* Method to handle the Student Search Form input */
    handleSearchInput = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    /* Method to remove a student */
    removeStudent = student =>
        request
            .delete(`${SERVER_URL}api/user`, {
                username: student._id,
                token: this.props.state.identity.token
            })
            .catch(e => {
                NotificationManager.error(
                    `Error deleting user ${student._id}: ${JSON.stringify(e)}`
                );
                throw e; // skip re-fetching student list
            })
            .then(this.filterStudents)
            .catch(() => {});

    filterStudents = () =>
        request
            .get(`${SERVER_URL}api/users/relaxed-filter`, {
                fullname: this.state.studentName,
                university: this.state.studentUniversity,
                currentCourses: this.state.studentCourse
            })
            .then(res => {
                console.log("Success", res);
                this.setState({ filteredStudents: res.result });
            })
            .catch(e => {
                console.log("Error");
                NotificationManager.error(
                    "There was an error getting the list of students."
                );
            });

    /* Student Search View - Student Mode */
    render() {
        const global = this.props.state;
        const isAdmin = global.identity.type === "admin";
        const appendActions =
            isAdmin &&
            (student => (
                <button
                    className="team_page__button"
                    onClick={() => this.removeStudent(student)}
                >
                    remove
                </button>
            ));

        return (
            <div>
                <div className="search_student_view">
                    <h1 className="search_form_title">
                        {isAdmin ? "manage students" : "find a partner"}
                    </h1>

                    <NotificationContainer />

                    {/* Students Search Form */}
                    <div className="search-form">
                        <SearchStudentForm
                            studentName={this.state.studentName}
                            studentUniversity={this.state.studentUniversity}
                            studentCourse={this.state.studentCourse}
                            handleSearch={this.handleSearchInput}
                            filterStudents={this.filterStudents}
                        />
                    </div>

                    {/* Student Previews Table*/}
                    <div className="search_student_member_view">
                        <TeamMemberPreviewList
                            members={this.state.filteredStudents}
                            append={appendActions}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchStudent;
