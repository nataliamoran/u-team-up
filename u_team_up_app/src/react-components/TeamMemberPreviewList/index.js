import React from "react";
import {uid} from "react-uid";

import TeamMemberPreview from "../TeamMemberPreview";

import "./styles.css";

class TeamMemberPreviewList extends React.Component {
    render() {
        const {members} = this.props;

        return (
            <div className="team-member-preview__list">
                {members.map(teamMemberPreview => (
                    <TeamMemberPreview
                        key={uid(
                            teamMemberPreview
                        )}
                        teamMemberPreview={teamMemberPreview}
                    />
                ))}
            </div>

        );
    }
}

export default TeamMemberPreviewList;