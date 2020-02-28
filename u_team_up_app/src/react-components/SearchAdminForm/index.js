import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Input from "./../Input";

import "./styles.css";


class SearchAdminForm extends React.Component {
    render() {
        const {
            adminName,
            adminEmail,
            handleSearch,
            filterAdmins,
        } = this.props;

        return (

            <Grid className="search-form" container direction="row" justify="center" alignItems="center">

                <Input
                    name="adminName"
                    value={adminName}
                    onChange={handleSearch}
                    label="Admin name"
                    className="name__input"
                />

                <Input
                    name="adminEmail"
                    value={adminEmail}
                    onChange={handleSearch}
                    label="Email"
                    className="email__input"
                />

                <Button
                    variant="outlined"
                    color="primary"
                    onClick={filterAdmins}
                    className="search-form__submit-button"
                >
                    Remove
                </Button>

            </Grid>

        );
    }
}

export default SearchAdminForm;
