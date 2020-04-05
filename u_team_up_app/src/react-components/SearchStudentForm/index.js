import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Input from "./../Input";


class SearchStudentForm extends React.Component {
    render() {
        const {
            studentName,
            studentUniversity,
            studentCourse,
            handleSearch,
            filterStudents
        } = this.props;

        return (

            <Grid className="search-form" container direction="row" justify="center" alignItems="center">

                <Input
                    name="studentName"
                    value={studentName}
                    onChange={handleSearch}
                    label="Student name"
                    className="name__input"
                />

                <Input
                    name="studentUniversity"
                    value={studentUniversity}
                    onChange={handleSearch}
                    label="University"
                    className="university__input"
                />

                <Input
                    name="studentCourse"
                    value={studentCourse}
                    onChange={handleSearch}
                    label="Course"
                    className="course__input"
                />


                <Button
                    variant="outlined"
                    color="primary"
                    onClick={filterStudents}
                    className="search-form__submit-button"
                >

                    Search
                </Button>


            </Grid>

        );
    }
}

export default SearchStudentForm;
