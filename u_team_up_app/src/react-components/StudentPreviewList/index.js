import React from "react";
import {uid} from "react-uid";

import StudentPreview from "../StudentPreview";

import "./styles.css";

class StudentPreviewList extends React.Component {
    render() {
        const {students} = this.props;

        return (
            <div>
                {students.map(studentPreview => (
                    <StudentPreview
                        key={uid(
                            studentPreview
                        )}
                        studentPreview={studentPreview}
                    />
                ))}
            </div>

        );
    }
}

export default StudentPreviewList;
