import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Input from "./../Input";

import "./styles.css";


class AddUniversityForm extends React.Component {
    render() {
        const {
            universityName1,
            universityId1,
            handleSearch3,
            addUniversities
        } = this.props;

        return (

            <Grid className="search-form" container direction="row" justify="center" alignItems="center">


                <Input
                    name="universityName1"
                    value={universityName1}
                    onChange={handleSearch3}
                    label="University name"
                    className="name__input"
                />

                <Input
                    name="universityId1"
                    value={universityId1}
                    onChange={handleSearch3}
                    label="University Id"
                    className="id__input"
                />

                <Button
                    variant="outlined"
                    color="primary"
                    onClick={addUniversities}
                    className="search-form__submit-button"
                >
                    Add
                </Button>

            </Grid>

        );
    }
}

export default AddUniversityForm;
