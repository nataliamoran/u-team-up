import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Input from "./../Input";

import "./styles.css";


class SearchUniversityForm extends React.Component {
    render() {
        const {
            universityName,
            universityId,
            handleSearch2,
            filterUniversities,
        } = this.props;

        return (

            <Grid className="search-form" container direction="row" justify="center" alignItems="center">

                <Input
                    name="universityName"
                    value={universityName}
                    onChange={handleSearch2}
                    label="University name"
                    className="name__input"
                />

                <Input
                    name="universityId"
                    value={universityId}
                    onChange={handleSearch2}
                    label="University Id"
                    className="id__input"
                />

                <Button
                    variant="outlined"
                    color="primary"
                    onClick={filterUniversities}
                    className="search-form__submit-button"
                >
                    Remove
                </Button>

            </Grid>

        );
    }
}

export default SearchUniversityForm;
