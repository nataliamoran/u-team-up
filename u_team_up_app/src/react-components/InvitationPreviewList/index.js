import React from "react";
import {uid} from "react-uid";

import InvitationPreview from "../InvitationPreview";

import "./styles.css";

class InvitationPreviewList extends React.Component {
    render() {
        const {invitations} = this.props;

        return (
            <div>
                {invitations.map(invitationPreview => (
                    <InvitationPreview
                        key={uid(
                            invitationPreview
                        )}
                        invitationPreview={invitationPreview}
                    />
                ))}
            </div>

        );
    }
}

export default InvitationPreviewList;
