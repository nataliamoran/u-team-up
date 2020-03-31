import React from "react";

import "./styles.css";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import {Link} from "react-router-dom";


class TeamMemberPreview extends React.Component {

    render() {
        let name;
        let photo;
        let university;

        const {teamMemberPreview} = this.props;
        console.log("Team Member Preview")
        console.log(teamMemberPreview)

        if (teamMemberPreview.fullname) {
            name = teamMemberPreview.fullname;
        } else {
            name = teamMemberPreview._id;
        }

        if (teamMemberPreview.photo) {
            photo =
                <img className="team_member__photo"
                     src={require(`${teamMemberPreview.photo}`)} alt="team member photo"/>

        } else {
            photo =
                <img className="team_member__photo"
                     src={require(`${"./static/account.png"}`)} alt="team member photo"/>
        }


        if (teamMemberPreview.university) {
            university = teamMemberPreview.university
        }


        return (
            <Link className="team_page__link" to={'/student-profile/' + teamMemberPreview._id}>
                <div className="team-member-preview__bg-image">
                    <Table className="team-member-preview">
                        <TableBody>
                            <TableRow key={teamMemberPreview._id}>
                                <TableCell component="td" scope="row" className="photo_cell">
                                    {photo}
                                </TableCell>
                                <TableCell component="td" scope="row" className="name_cell">
                                    {name}
                                </TableCell>
                                <TableCell component="td" scope="row" className="university_cell">
                                    {university}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </Link>
        );
    }
}


export default TeamMemberPreview;
