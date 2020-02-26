import React from "react";

import "./styles.css";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";

class InvitationPreview extends React.Component {

    render() {
        const {invitationPreview} = this.props;

        return (
            <div id="wrapper">
                <div className="invitation-preview__bg-image">
                    <Table className="invitation-preview">
                        <TableBody>
                            <TableRow key={invitationPreview.studentId}>
                                <TableCell component="td" scope="row" className="name_cell">
                                    {invitationPreview.studentName}
                                </TableCell>
                                <TableCell component="td" scope="row" className="status_cell">
                                    {invitationPreview.invitationStatus}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        );
    }
}


export default InvitationPreview;
