import React from "react";

import "./styles.css";
import {filterUnits} from "../../actions/filterUnits";
import SearchStudentForm from "./../SearchStudentForm";

import TeamMemberPreviewList from "../TeamMemberPreviewList";

class SearchStudent extends React.Component {

    state = {
        studentName: "",
        studentUniversity: "",
        studentCourse: "",
        students: [
            {
                name: "Bob Bobson",
                university: "UofT",
                course: ["CSC309", "CSC369"],
                id: "1",
                photo: "./static/boy.png",
                profileLink: "/student-profile"
            },
            {
                name: "Alice Alison",
                university: "UofT",
                course: ["CSC309", "CSC207"],
                id: "2",
                photo: "./static/alice.png",
                profileLink: "/student-profile"
            }
        ],
        filteredStudents: [
            {
                name: "Bob Bobson",
                university: "UofT",
                course: ["CSC309", "CSC369"],
                id: "1",
                photo: "./static/boy.png",
                profileLink: "/student-profile"
            },
            {
                name: "Alice Alison",
                university: "UofT",
                course: ["CSC309", "CSC207"],
                id: "2",
                photo: "./static/alice.png",
                profileLink: "/student-profile"
            }
        ]
    };

    /* Method to handle the Student Search Form input */
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
            <div>
                <div className="search_student_view">
                    <h1 className="search_form_title">find a partner</h1>

                    {/* Students Search Form */}
                    <div className="search-form">
                        <SearchStudentForm
                            studentName={this.state.studentName}
                            studentUniversity={this.state.studentUniversity}
                            studentCourse={this.state.studentCourse}
                            handleSearch={this.handleSearchInput}
                            filterStudents={() => this.setState({
                                filteredStudents: filterUnits({
                                        name: this.state.studentName,
                                        university: this.state.studentUniversity,
                                        course: this.state.studentCourse
                                    },
                                    this.state.students)
                            })}
                        />
                    </div>

                    {/* Student Previews Table*/}
                    <TeamMemberPreviewList members={this.state.filteredStudents}/>
                </div>
            </div>
        );
    }
}

export default SearchStudent;
