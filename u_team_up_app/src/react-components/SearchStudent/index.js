import React from "react";

import "./styles.css";

import StudentPreviewList from "./../StudentPreviewList";
import SearchStudentForm from "./../SearchStudentForm";
import Menu from "./../Menu";

import { filterStudents } from "../../actions/searchStudent";

class SearchStudent extends React.Component {

    state = {
        studentName: "",
        studentUniversity: "",
        studentCourse: "",
        students: [
            { studentName: "Tom", studentUniversity:"UofT", studentCourse: "CSC309", studentID: "1"},
            { studentName: "Kate", studentUniversity:"UofT", studentCourse: "CSC207", studentID: "2" }
        ],
        filteredStudents: [
            { studentName: "Tom", studentUniversity:"UofT", studentCourse: "CSC309", studentID: "1"},
            { studentName: "Kate", studentUniversity:"UofT", studentCourse: "CSC207", studentID: "2" }
        ]
    };

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
                <Menu studentId={studentId} />
                <div className="search_student_view">
                    <h1 className="search_student_form_title">find a partner</h1>

                    <div className="search_student_form">
                        <SearchStudentForm
                            studentName={this.state.studentName}
                            studentUniversity={this.state.studentUniversity}
                            studentCourse={this.state.studentCourse}
                            handleSearch={this.handleSearchInput}
                            filterStudents={() => filterStudents(this)}
                        />
                    </div>

                    <StudentPreviewList students={this.state.filteredStudents} />
                </div>
            </div>
        );
    }
}

export default SearchStudent;
