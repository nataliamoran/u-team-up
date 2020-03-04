import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Input from "./../Input";

import "./styles.css";


class SearchCourseForm extends React.Component {
    render() {
        const {
            courseName,
            courseUniversity,
            handleSearch4,
            filterCourses,
        } = this.props;

        return (

            <Grid className="search-form" container direction="row" justify="center" alignItems="center">

                <Input
                    name="courseName"
                    value={courseName}
                    onChange={handleSearch4}
                    label="Course name"
                    className="name__input"
                />

                <Input
                    name="courseUniversity"
                    value={courseUniversity}
                    onChange={handleSearch4}
                    label="Course university"
                    className="university__input"
                />

                <Button
                    variant="outlined"
                    color="primary"
                    onClick={filterCourses}
                    className="search-form__submit-button"
                >
                    Remove
                </Button>

            </Grid>

        );
    }
}

export default SearchCourseForm;
