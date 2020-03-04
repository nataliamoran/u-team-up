import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Input from "./../Input";

import "./styles.css";


class InviteStudentForm extends React.Component {
    render() {
        const {
            studentName,
            handleSearch,
            addInvitations,
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

                <Button
                    variant="outlined"
                    color="primary"
                    onClick={addInvitations}
                    className="search-form__submit-button"
                >
                    Invite
                </Button>

            </Grid>

        );
    }
}

export default InviteStudentForm;
