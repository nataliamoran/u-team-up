import React from "react";

import "./styles.css";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";

class TeamPreview extends React.Component {

    render() {
        const {studentPreview} = this.props;

        return (
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
        );
    }
}


export default TeamPreview;
