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
            <Grid className="search-form" container spacing={3}>
                {/* Inputs to add student */}
                <Input
                    name="teamUniversity"
                    value={teamUniversity}
                    onChange={handleSearch}
                    label="University"
                />

                <Input
                    name="teamCourse"
                    value={teamCourse}
                    onChange={handleSearch}
                    label="Course"
                />

                <Grid
                    className="search-form__button-grid"
                    item
                    xl={2}
                    lg={2}
                    md={12}
                    s={12}
                    xs={12}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={filterTeams}
                        className="search-form__submit-button"
                    >
                        Search
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

export default SearchForm;
