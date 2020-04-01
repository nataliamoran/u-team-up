import React from "react";
import {uid} from "react-uid";

import TeamMemberPreview from "../TeamMemberPreview";

import "./styles.css";

class TeamMemberPreviewList extends React.Component {
    render() {
        const { members, append } = this.props;

        console.group("TeamMemberPreviewList")
        console.log("Rendering Team Member Preview List")
        console.log(this.props)
        console.log(members)
        members.map(item => {
            console.log("item")
            console.log(item)
        })
        console.groupEnd()

        return (
            <div className="team-member-preview__list">
                { members.map(
                    (teamMemberPreview, index) => [
                        <TeamMemberPreview
                            key={uid(
                                teamMemberPreview
                            )}
                            teamMemberPreview={teamMemberPreview}
                            append={append}
                        />
                    ]
                ) }
            </div>

        );
    }
}

export default TeamMemberPreviewList;
