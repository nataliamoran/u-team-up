import React from "react";

import "./styles.css";
import SearchStudentForm from "./../SearchStudentForm";
import Menu from "./../Menu";

import {filterStudents} from "../../actions/searchStudent";
import Table from "@material-ui/core/Table/Table";
import TableBody from "@material-ui/core/TableBody/TableBody";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import {uid} from "react-uid";
import TeamMemberPreviewList from "../TeamMemberPreviewList";
import Grid from "@material-ui/core/Grid/Grid";

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
                            filterStudents={() => filterStudents(this)}
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
