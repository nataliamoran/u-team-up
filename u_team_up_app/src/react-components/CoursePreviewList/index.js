import React from "react";
import {uid} from "react-uid";

import CoursePreview from "../CoursePreview";

import "./styles.css";

class CoursePreviewList extends React.Component {
    render() {
        const {courses} = this.props;

        return (
            <div>
                {courses.map(coursePreview => (
                    <CoursePreview
                        key={uid(
                            coursePreview
                        )}
                        coursePreview={coursePreview}
                    />
                ))}
            </div>

        );
    }
}

export default CoursePreviewList;
