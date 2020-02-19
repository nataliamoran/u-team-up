import React from "react";

import "./styles.css";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";


class TeamMemberPreview extends React.Component {

    render() {
        const {teamMemberPreview} = this.props;

        return (
                <div className="team-member-preview__bg-image">
                    <Table className="team-member-preview">
                        <TableBody>
                            <TableRow key={teamMemberPreview.name}>
                                <TableCell component="td" scope="row" className="photo_cell">
                                    <img  className="team_member__photo"
                                          src={require(`${teamMemberPreview.photo}`)} alt="team member photo" />
                                </TableCell>

                                <TableCell component="td" scope="row" className="name_cell">
                                    {teamMemberPreview.name}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
        );
    }
}


export default TeamMemberPreview;
