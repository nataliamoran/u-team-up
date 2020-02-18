import React from "react";
import { uid } from "react-uid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";

import TeamPreview from "../TeamPreview";

import "./styles.css";

/* Component for the List of Students */
class TeamPreviewList extends React.Component {
    render() {
        const { teams } = this.props;

        return (
            <Table className="team-preview-list">
                <TableBody>
                    {teams.map(teamPreview => (
                        <TeamPreview
                            key={uid(
                                teamPreview
                            )}
                            teamPreview={teamPreview}
                        />
                    ))}
                </TableBody>
            </Table>
        );
    }
}

export default TeamPreviewList;