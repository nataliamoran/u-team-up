import React from "react";
import {uid} from "react-uid";

import ApplicationPreview from "../ApplicationPreview";

import "./styles.css";

class ApplicationPreviewList extends React.Component {
    render() {
        const {applications} = this.props;

        return (
            <div>
                {applications.map(applicationPreview => (
                    <ApplicationPreview
                        key={uid(
                            applicationPreview
                        )}
                        applicationPreview={applicationPreview}
                    />
                ))}
            </div>

        );
    }
}

export default ApplicationPreviewList;
