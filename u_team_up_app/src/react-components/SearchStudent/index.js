import React from "react";

import "./styles.css";
import SearchStudentForm from "./../SearchStudentForm";

import TeamMemberPreviewList from "../TeamMemberPreviewList";

class SearchStudent extends React.Component {

    state = {
        studentName: "",
        studentUniversity: "",
        studentCourse: "",
        students: [
            {name: "Bob Bobson", university: "UofT", course: "CSC309", id: "1", photo: "./static/boy.png", profileLink: "/student-profile"},
            {name: "Alice Alison", university: "UofT", course: "CSC207",  id: "2", photo: "./static/alice.png", profileLink: "/student-profile"}
        ],
        filteredStudents: [
            {name: "Bob Bobson", university: "UofT", course: "CSC309", id: "1", photo: "./static/boy.png", profileLink: "/student-profile"},
            {name: "Alice Alison", university: "UofT", course: "CSC207",  id: "2", photo: "./static/alice.png", profileLink: "/student-profile"}
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

    /* Method to filter students per Student Search Form input */
    filterStudents = search => {

        const student = {
            name: search.state.studentName,
            university: search.state.studentUniversity,
            course: search.state.studentCourse
        };


        const newlyFilteredStudents = search.state.students.filter(s => {
            return (s.name === student.name &&
                s.university === student.university &&
                s.course === student.course) ||
                (student.name === "" && student.university === "" && student.course === "") ||
                (s.name === student.name) ||
                (s.course === student.course) ||
                (s.university === student.university);
        });

        search.setState({
            filteredStudents: newlyFilteredStudents
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
                            filterStudents={() => this.filterStudents(this)}
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
