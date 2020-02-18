import React from "react";


import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { Link } from "react-router-dom";

class TeamPreview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            seconds: 0
        };
    }

    render() {
        const { teamPreview } = this.props;

        return (
            <TableRow className="team-preview" key={teamPreview.teamID}>
                <TableCell component="th" scope="row">
                    {teamPreview.teamUniversity}
                </TableCell>

                <TableCell component="th" scope="row">
                    {teamPreview.teamCourse}
                </TableCell>

                <TableCell component="th" scope="row">
                    {teamPreview.teamDescription}
                </TableCell>

                <TableCell component="th" scope="row">
                    <Link to={"./../Team"}>
                        <Button className="join__button">Join</Button>
                    </Link>
                </TableCell>
            </TableRow>
        );
    }
}


export default TeamPreview;
