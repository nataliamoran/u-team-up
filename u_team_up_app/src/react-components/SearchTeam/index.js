import React from "react";

import "./styles.css";
import {uid} from "react-uid";

import {filterUnits} from "../../actions/filterUnits";

import Table from "@material-ui/core/Table/Table";
import TableBody from "@material-ui/core/TableBody/TableBody";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button/Button";
import Input from "../Input";
import Grid from "@material-ui/core/Grid/Grid";
import {NotificationContainer, NotificationManager} from "react-notifications";
import TextField from "@material-ui/core/TextField/TextField";

class SearchTeam extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            global: props.state,
            uid: 3,
            newTeamCourse: "",
            newTeamDescription: "",
            newTeamUniversity: "",
            teamUniversity: "",
            teamCourse: "",
            teams: [ // TODO: FETCH DATA FROM DB
                {university: "UofT", course: "CSC309", id: "1", description: "A+ group looking for a JS Jedi"},
                {university: "UofT", course: "CSC207", id: "2", description: "Let's crash this course together!"}
            ],
        };

        this.state.filteredTeams = Array.from(this.state.teams);
    }

    /* Method to handle the Team Search Form input */
    handleFormInput = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    createTeam = () => {
        this.state.teams.push({
            university: this.state.newTeamUniversity,
            course: this.state.newTeamCourse,
            id: this.state.uid,
            description: this.state.newTeamDescription
        });
        this.state.uid += 1;
        this.setState({
            teams: this.state.teams,
            filteredTeams: this.state.teams
        });
        NotificationManager.success('New team was successfully created!')
    };

    render() {
        let createTeamForm;

        if (this.props.state.identity.uid != "") {
            createTeamForm =
                <div>
                    <h1 className="search_form_title">create new team</h1>
                <Grid container direction="row" justify="center" alignItems="center">
                    <Input
                        className="new_team__input"
                        name="newTeamUniversity"
                        value={this.state.newTeamUniversity}
                        id="filled-textarea"
                        label={"University"}
                        onChange={this.handleFormInput}
                        multiline
                    />
                    <Input
                        className="new_team__input"
                        name="newTeamCourse"
                        value={this.state.newTeamCourse}
                        id="filled-textarea"
                        label={"Course"}
                        onChange={this.handleFormInput}
                        multiline
                    />
                    <TextField
                        className="new_team__input"
                        name="newTeamDescription"
                        value={this.state.newTeamDescription}
                        id="filled-textarea"
                        label={"Description"}
                        onChange={this.handleFormInput}
                        multiline
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        className="new_team_button"
                        onClick={this.createTeam}
                    >
                        Create
                    </Button>
                    <NotificationContainer/>
                </Grid>
                </div>
        }

        return (
            <div className="search_team_view">

                {createTeamForm}

                <h1 className="search_form_title">find your team</h1>

                {/* Team Search Form */}
                <Grid className="search-form" container direction="row" justify="center" alignItems="center">
                    <Input
                        name="teamUniversity"
                        value={this.state.teamUniversity}
                        onChange={this.handleFormInput}
                        label="University"
                        className="university__input"
                    />
                    <Input
                        name="teamCourse"
                        value={this.state.teamCourse}
                        onChange={this.handleFormInput}
                        label="Course"
                        className="course__input"
                    />
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => this.setState({
                            filteredTeams: filterUnits({
                                    university: this.state.teamUniversity,
                                    course: this.state.teamCourse,
                                },
                                this.state.teams)
                        })}
                        className="search-form__submit-button"
                    >

                        Search
                    </Button>
                </Grid>

                {/* Team Previews Table*/}
                <div>
                    {this.state.filteredTeams.map(teamPreview => (
                        <div key={uid(
                            teamPreview
                        )}>
                            <div id="wrapper">
                                <div className="team-preview__bg-image">
                                    <Table className="team-preview">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell component="td" scope="row" className="university_cell">
                                                    {teamPreview.university}
                                                </TableCell>

                                                <TableCell component="td" scope="row" className="course_cell">
                                                    {teamPreview.course}
                                                </TableCell>

                                                <TableCell component="td" scope="row" className="description_cell">
                                                    {teamPreview.description}
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>
                                <div className="button__bg-image">
                                    <Table className="button-preview">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell component="td" scope="row" className="button_cell">

                                                    <Link className="join__link" to={`/team/${teamPreview.id}`}>
                                                        <Button variant="outlined" color="primary"
                                                                className="join__button">Join</Button>
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        );
    }
}

export default SearchTeam;
