import React from "react";

import "./styles.css";
import {uid} from "react-uid";


import {filterUnits} from "../../actions/filterUnits";
import {TEAMS_BACKEND} from "../../config";


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
            studentUsername: null,
            // uid: 3,
            newTeamCourse: "",
            newTeamDescription: "",
            newTeamUniversity: "",
            teamUniversity: "",
            teamCourse: "",
            teams: [ // TODO: FETCH DATA FROM DB
                // {university: "UofT", course: "CSC309", id: "1", description: "A+ group looking for a JS Jedi"},
                // {university: "UofT", course: "CSC207", id: "2", description: "Let's crash this course together!"}
            ],
        };

        this.state.filteredTeams = Array.from(this.state.teams);
        if (props.state.identity.type === "user") {
            this.state.studentUsername = props.state.identity.username;
        }
    }

    componentDidMount() {
        const url = TEAMS_BACKEND;
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                this.setState({
                    teams: json.teams,
                    filteredTeams: json.teams
                });
                console.log(this.state);
            }).catch((error) => {
            console.error(error)
        });
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

    addTeamToDB = () => {
        return new Promise((resolve, reject) => {
            const url = TEAMS_BACKEND;

            let data = {
                university: this.state.newTeamUniversity,
                course: this.state.newTeamCourse,
                description: this.state.newTeamDescription,
                members: this.state.studentUsername ? [this.state.studentUsername] : []
            };
            const request = new Request(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
            });
            fetch(request)
                .then(function (res) {
                    if (res.status === 200) {
                        console.log('Added team')
                        NotificationManager.success('New team was successfully created!');
                        resolve();

                    } else {
                        console.log('Could not add team')
                        reject();

                    }
                    console.log(res)
                }).catch((error) => {
                console.log(error)
            });
        });
    };

    getAllTeamsFromDB = () => {
        const url = TEAMS_BACKEND;
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                console.log("fetching after saving a new team");
                console.log(json);
                this.setState({
                    teams: json.teams,
                    filteredTeams: json.teams
                });
                this.forceUpdate();
                console.log("new state after saving a new team");
                console.log(this.state);
            }).catch((error) => {
            console.error(error)
        });
    };

    /* Method to create a new team */
    createTeam = () => {
        if (this.state.newTeamUniversity === "" ||
            this.state.newTeamCourse === "" ||
            this.state.newTeamDescription === "") {
            NotificationManager.error('Please complete all fields')
            return;
        }
        //TODO Push updates to the DB

        this.addTeamToDB()
            .then(() => this.getAllTeamsFromDB()).catch((error) => {
            console.error(error)
        });
    };

    isTeamMember = (team) => {
        const member = team.members.filter(m => m === this.props.state.identity.username);
        const res = member.length !== 0;
        return res;
    };

    render() {
        let createTeamForm;
        let teamButton;
        let backgroundImg;
        console.log("redering");

        /* Show Create Team Form to registered users only*/

        if (this.props.state.identity.username !== "") {
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
                            variant="outlined"
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

        const displayTeamButton = (team) => {
            const isMember = this.isTeamMember(team);
            if (this.props.state.loginStatus === "guest"
                || this.props.state.loginStatus === "admin"
                || isMember) {
                teamButton =
                    <Button variant="outlined" color="primary"
                            className="join__button">Open</Button>
            } else {
                teamButton =
                    <Button variant="outlined" color="primary"
                            className="join__button">Join</Button>
            }

            if (this.props.state.loginStatus === "user" && this.isTeamMember(team)) {
                backgroundImg = "button__bg-image__member";
            } else {
                backgroundImg = "button__bg-image";
            }

        };

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
                            {displayTeamButton(teamPreview)}
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
                                <div className={backgroundImg}>
                                    <Table className="button-preview">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell component="td" scope="row" className="button_cell">

                                                    <Link className="join__link" to={`/team/${teamPreview._id}`}>
                                                        {teamButton}
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
