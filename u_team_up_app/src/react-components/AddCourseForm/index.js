import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Input from "./../Input";

import "./styles.css";


class AddCourseForm extends React.Component {
    render() {
        const {
            courseName1,
            courseUniversity1,
            handleSearch5,
            addCourses
        } = this.props;

        return (

            <Grid className="search-form" container direction="row" justify="center" alignItems="center">


                <Input
                    name="courseName1"
                    value={courseName1}
                    onChange={handleSearch5}
                    label="Course name"
                    className="name__input"
                />

                <Input
                    name="courseUniversity1"
                    value={courseUniversity1}
                    onChange={handleSearch5}
                    label="Course university"
                    className="university__input"
                />

                <Button
                    variant="outlined"
                    color="primary"
                    onClick={addCourses}
                    className="search-form__submit-button"
                >
                    Add
                </Button>

            </Grid>

        );
    }
}

export default AddCourseForm;
