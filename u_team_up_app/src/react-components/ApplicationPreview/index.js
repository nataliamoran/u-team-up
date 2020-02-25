import React from "react";

import "./styles.css";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";


class ApplicationPreview extends React.Component {

    render() {
        const {applicationPreview} = this.props;
        const {teamPreview} = this.props;

        return (
            <div id="wrapper1">
                <div className="application-preview__bg-image1">
                    <Table className="application-preview1">
                        <TableBody>
                            <TableRow key={applicationPreview.studentID}>
                                <TableCell component="td" scope="row" className="name_cell1">
                                    {applicationPreview.studentName}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                <div className="button__bg-image1">
                    <Table className="button-preview1">
                        <TableBody className="list-preview">
                            <TableRow className="row-preview">
                                <TableCell component="td" scope="row" className="button_cell">

                                    <Link className="see__link" to={`/team/1/`}>
                                        <Button variant="outlined" color="primary"
                                                className="see__button">See</Button>
                                    </Link>
                                </TableCell>
                                <TableCell component="td" scope="row" className="button_cell">

                                    <Link className="accept__link" to={`/team/1/application`}>
                                        <Button variant="outlined" color="primary"
                                                className="accept__button">Accept</Button>
                                    </Link>
                                </TableCell>
                                <TableCell component="td" scope="row" className="button_cell">

                                    <Link className="reject__link" to={`/team/1/application`}>
                                        <Button variant="outlined" color="primary"
                                                className="reject__button">Reject</Button>
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


export default ApplicationPreview;
