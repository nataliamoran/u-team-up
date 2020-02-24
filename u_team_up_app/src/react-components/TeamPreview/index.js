import React from "react";

import "./styles.css";

import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import {Link} from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";

class TeamPreview extends React.Component {

    render() {
        const {teamPreview} = this.props;

        return (
            <div id="wrapper">
                <div className="team-preview__bg-image">
                    <Table className="team-preview">
                        <TableBody>
                            <TableRow>
                                <TableCell component="td" scope="row" className="university_cell">
                                    {teamPreview.teamUniversity}
                                </TableCell>

                                <TableCell component="td" scope="row" className="course_cell">
                                    {teamPreview.teamCourse}
                                </TableCell>

                                <TableCell component="td" scope="row" className="description_cell">
                                    {teamPreview.teamDescription}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                <div className="button__bg-image">
                    <Table className="button-preview">
                        <TableBody>
                            <TableRow>
                                <TableCell component="td" scope="row" className="button_cell">

                                    <Link className="join__link" to={`/team/${teamPreview.teamId}`}>
                                        <Button variant="outlined" color="primary"
                                                className="join__button">Join</Button>
                                    </Link>
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
