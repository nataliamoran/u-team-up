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
            <div id="wrapper3">
                <div className="invitation-preview__bg-image">
                    <table className="invitation-preview">
                            <tr key={invitationPreview.invitationId}>
                                <td className="name_cell2">
                                    {invitationPreview.studentName}
                                </td>
                                <td className="status_cell2">
                                    {invitationPreview.invitationStatus}
                                </td>
                            </tr>
                    </table>
                </div>
            </div>
        );
    }
}


export default InvitationPreview;




