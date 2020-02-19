import React from "react";
import {uid} from "react-uid";

import TeamPreview from "../TeamPreview";

import "./styles.css";

class TeamPreviewList extends React.Component {
    render() {
        const {teams} = this.props;

        return (
            <div>
                {teams.map(teamPreview => (
                    <TeamPreview
                        key={uid(
                            teamPreview
                        )}
                        teamPreview={teamPreview}
                    />
                ))}
            </div>

        );
    }
}

export default TeamPreviewList;