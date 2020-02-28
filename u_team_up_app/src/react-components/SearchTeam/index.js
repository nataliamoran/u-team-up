import React from "react";

import "./styles.css";
import {uid} from "react-uid";

import { filterTeams } from "../../actions/searchTeam";
import Table from "@material-ui/core/Table/Table";
import TableBody from "@material-ui/core/TableBody/TableBody";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button/Button";
import Input from "../Input";
import Grid from "@material-ui/core/Grid/Grid";

class SearchTeam extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            teamUniversity: "",
            teamCourse: "",
            teams: [ // TODO: FETCH DATA FROM DB
                { teamUniversity:"UofT", teamCourse: "CSC309", teamId: "1", teamDescription: "A+ group looking for a JS Jedi" },
                { teamUniversity:"UofT", teamCourse: "CSC207", teamId: "2", teamDescription: "Let's crash this course together!"  }
            ],
        }

        this.state.filteredTeams = Array.from(this.state.teams);
    }

    handleSearchInput = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    render() {
        const {studentId} = this.props;

        return (
            <div className="search_team_view">
                <h1 className="search_form_title">find your team</h1>

                /* Team Search Form */
                <Grid className="search-form" container direction="row" justify="center" alignItems="center">
                    <Input
                        name="teamUniversity"
                        value={this.state.teamUniversity}
                        onChange={this.handleSearchInput}
                        label="University"
                        className="university__input"
                    />
                    <Input
                        name="teamCourse"
                        value={this.state.teamCourse}
                        onChange={this.handleSearchInput}
                        label="Course"
                        className="course__input"
                    />
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => filterTeams(this)}
                        className="search-form__submit-button"
                    >

                        Search
                    </Button>
                </Grid>

                /* Team Previews Table*/
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
                                                {teamPreview.teamUniversity}
                                            </TableCell>

                                            <TableCell component="td" scope="row" className="course_cell">
                                                {teamPreview.teamCourse}
                                            </TableCell>

                                            <TableCell component="td" scope="row" className="description_cell">
                                                {teamPreview.teamDescription}
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

                                                <Link className="join__link" to={`/team/${teamPreview.teamId}`}>
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
