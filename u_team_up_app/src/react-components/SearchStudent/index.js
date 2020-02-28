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

class SearchStudent extends React.Component {

    state = {
        studentName: "",
        studentUniversity: "",
        studentCourse: "",
        students: [
            {studentName: "Tom", studentUniversity: "UofT", studentCourse: "CSC309", studentID: "1"},
            {studentName: "Kate", studentUniversity: "UofT", studentCourse: "CSC207", studentID: "2"}
        ],
        filteredStudents: [
            {studentName: "Tom", studentUniversity: "UofT", studentCourse: "CSC309", studentID: "1"},
            {studentName: "Kate", studentUniversity: "UofT", studentCourse: "CSC207", studentID: "2"}
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
                <Menu studentId={studentId}/>
                <div className="search_student_view">
                    <h1 className="search_student_form_title">find a partner</h1>

                    {/* Students Search Form */}
                    <div className="search_student_form">
                        <SearchStudentForm
                            studentName={this.state.studentName}
                            studentUniversity={this.state.studentUniversity}
                            studentCourse={this.state.studentCourse}
                            handleSearch={this.handleSearchInput}
                            filterStudents={() => filterStudents(this)}
                        />
                    </div>

                    {/* Student Previews Table*/}
                    <div>
                        {this.state.filteredStudents.map(studentPreview => (
                            <div key={uid(
                                studentPreview
                            )}>
                            <div id="wrapper">
                                <div className="student-preview__bg-image">
                                    <Table className="student-preview">
                                        <TableBody>
                                            <TableRow key={studentPreview.studentID}>
                                                <TableCell component="td" scope="row" className="name_cell">
                                                    {studentPreview.studentName}
                                                </TableCell>
                                                <TableCell component="td" scope="row" className="university_cell">
                                                    {studentPreview.studentUniversity}
                                                </TableCell>

                                                <TableCell component="td" scope="row" className="course_cell">
                                                    {studentPreview.studentCourse}
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchStudent;
