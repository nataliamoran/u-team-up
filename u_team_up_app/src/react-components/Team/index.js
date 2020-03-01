import React from "react";


import "./styles.css";
import TeamMemberPreviewList from "./../TeamMemberPreviewList";
import Header from '../Header';
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button/Button";
import TableBody from "@material-ui/core/TableBody/TableBody";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import Table from "@material-ui/core/Table/Table";
import TextField from "@material-ui/core/TextField";

class Team extends React.Component {

    // @param {team: Object}
    constructor(props) {
        super(props);

        this.state = {
            global: props.globalState,
            // TODO: FETCH
            team: props.teamId === '1' ? {
                id: "1",
                university: "UofT",
                course: "CSC309",
                description: "A+ group looking for a JS Jedi",
                members: [
                    {
                        uid: "2",
                        name: "Bob Bobson",
                        university: "UofT",
                        photo: "./static/boy.png",
                        profileLink: "/student-profile"
                    },
                    {
                        uid: "1",
                        name: "Alice Alison",
                        university: "UofT",
                        photo: "./static/alice.png",
                        profileLink: "/student-profile"
                    }
                ]
            } : {
                id: "2",
                university: "UofT",
                course: "CSC207",
                description: "Let's crash this course together!",
                members: [
                    {
                        uid: "2",
                        name: "Bob Bobson",
                        university: "UofT",
                        photo: "./static/boy.png",
                        profileLink: "/student-profile"
                    }
                ]
            },
        };
    }

    render() {
        const team = this.state.team;
        const global = this.state.global;

        let editButton;
        let calendarButton;
        let applicationsButton;

        {
            // Check the user id to determine if this user is a member of the team
            // to show team config buttons to team members only
        }
        if (!(team.members.map(member => member.uid).filter(uid => uid === global.identity.uid).length === 0)) {
            editButton =
                <Link className="team_page__link" to={`/team/${team.id}/edit`}>
                    <Button variant="outlined" color="primary"
                            className="team_page__button">edit team profile</Button>
                </Link>;
            calendarButton =
                <Link className="team_page__link" to={`/team/${team.id}/appointment`}>
                    <Button variant="outlined" color="primary"
                            className="team_page__button">team calendar</Button>
                </Link>;
            applicationsButton =
                <Link className="team_page__link" to={`/team/${team.id}/application`}>
                    <Button variant="outlined" color="primary"
                            className="team_page__button">applications</Button>
                </Link>;


        }

        return (
            <div className="team">
                <Header type='main' title='team: ' data={`${team.university} ${team.course}`}>
                    {editButton}
                    {calendarButton}
                    {applicationsButton}
                </Header>

                <div className="body">
                    <h2 className="header__description">description:</h2>
                    <p className="header__team_description">{team.description}</p>

                    <TeamMemberPreviewList members={team.members}/>

                    <div className="quiz">
                    <Table className="quiz_table">
                        <TableBody>
                            <TableRow>
                                <TableCell component="td" scope="row">
                                    <TextField
                                        id="filled-textarea"
                                        label="Which grade are you aiming for?"
                                        multiline
                                        variant="filled"
                                    />
                                </TableCell>

                            </TableRow>
                            <TableRow>
                                <TableCell component="td" scope="row">
                                    <TextField
                                        id="filled-textarea"
                                        label="How many hours per week are you planning to spend working on the project?"
                                        multiline
                                        variant="filled"
                                    />
                                </TableCell>

                            </TableRow>
                            <TableRow>
                                <TableCell component="td" scope="row">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                    >
                                        Apply
                                    </Button>
                                </TableCell>

                            </TableRow>
                        </TableBody>
                    </Table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Team;
