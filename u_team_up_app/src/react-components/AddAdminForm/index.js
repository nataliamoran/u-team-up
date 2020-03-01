import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Input from "./../Input";

import "./styles.css";


class AddAdminForm extends React.Component {
    render() {
        const {
            adminName1,
            adminEmail1,
            handleSearch,
            addAdmins
        } = this.props;

        return (

            <Grid className="search-form" container direction="row" justify="center" alignItems="center">


                <Input
                    name="adminName1"
                    value={adminName1}
                    onChange={handleSearch}
                    label="Admin name"
                    className="name__input"
                />

                <Input
                    name="adminEmail1"
                    value={adminEmail1}
                    onChange={handleSearch}
                    label="Email"
                    className="email__input"
                />

                <Button
                    variant="outlined"
                    color="primary"
                    onClick={addAdmins}
                    className="search-form__submit-button"
                >
                    Add
                </Button>

            </Grid>

        );
    }
}

export default AddAdminForm;
