import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Input from "./../Input";

import "./styles.css";


class SearchForm extends React.Component {
    render() {
        const {
            teamUniversity,
            teamCourse,
            handleSearch,
            filterTeams
        } = this.props;

        return (

            <Grid className="search-form" container direction="row" justify="center" alignItems="center">

                <Input
                    name="teamUniversity"
                    value={teamUniversity}
                    onChange={handleSearch}
                    label="University"
                    className="university__input"
                />

                <Input
                    name="teamCourse"
                    value={teamCourse}
                    onChange={handleSearch}
                    label="Course"
                    className="course__input"
                />


                <Button
                    variant="outlined"
                    color="primary"
                    onClick={filterTeams}
                    className="search-form__submit-button"
                >

                    Search
                </Button>


            </Grid>

        );
    }
}

export default SearchForm;
