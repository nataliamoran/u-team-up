import React from "react";
import {uid} from "react-uid";

import AdministratorPreview from "../AdministratorPreview";

import "./styles.css";

class AdministratorPreviewList extends React.Component {
    render() {
        const {administrators} = this.props;

        return (
            <div>
                {administrators.map(administratorPreview => (
                    <AdministratorPreview
                        key={uid(
                            administratorPreview
                        )}
                        administratorPreview={administratorPreview}
                    />
                ))}
            </div>

        );
    }
}

export default AdministratorPreviewList;
