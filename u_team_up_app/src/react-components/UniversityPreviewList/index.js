import React from "react";
import {uid} from "react-uid";

import UniversityPreview from "../UniversityPreview";

import "./styles.css";

class UniversityPreviewList extends React.Component {
    render() {
        const {universities} = this.props;

        return (
            <div>
                {universities.map(universityPreview => (
                    <UniversityPreview
                        key={uid(
                            universityPreview
                        )}
                        universityPreview={universityPreview}
                    />
                ))}
            </div>

        );
    }
}

export default UniversityPreviewList;
