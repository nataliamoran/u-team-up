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
import {uid} from "react-uid";
import {NotificationContainer, NotificationManager} from 'react-notifications';

class Team extends React.Component {

    // @param {team: Object}
    constructor(props) {
        super(props);

        this.state = {
            global: props.globalState,
            quizApplication: [],
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
                ],
                quizQuestions: [
                    "Which grade are you aiming for?",
                    "How many hours per week are you planning to spend working on the project?"
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
                ],
                quizQuestions: [
                    "Which programming languages do you know?",
                    "Can you do weekly team meetings?",
                    "Do you have a GitHub account?"
                ]
            },
        };
    }

    handleApplicationInput = event => {
        const target = event.target;
        const value = target.value;
        this.state.quizApplication.push(value);
    };

    submitApplication = () => {
        //TODO: save this.state.quizApplication to the DB
        NotificationManager.success('Your application is successfully submitted')
    };

    render() {
        const team = this.state.team;
        const global = this.state.global;

        let editButton;
        let calendarButton;
        let applicationsButton;
        let quiz;

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

        {
            // Check the user id to determine if this user is a member of the team
            // to show quiz questions to non-members only
        }
        if (team.members.map(member => member.uid).filter(uid => uid === global.identity.uid).length === 0) {
            quiz =
                <div className="quiz">
                    <Table className="quiz_table">
                        <TableBody>
                            {this.state.team.quizQuestions.map(question => (
                                <div key={uid(
                                    question
                                )}>
                                    <TableRow>
                                        <TableCell component="td" scope="row">
                                            <TextField
                                                id="filled-textarea"
                                                label={question}
                                                onChange={this.handleApplicationInput}
                                                multiline
                                                variant="filled"
                                            />
                                        </TableCell>
                                    </TableRow>
                                </div>
                            ))}
                            <TableRow>
                                <TableCell component="td" scope="row">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className="quiz_button"
                                        onClick={this.submitApplication}
                                    >
                                        Apply
                                    </Button>
                                    <NotificationContainer/>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
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
                    {quiz}

                </div>
            </div>
        );
    }
}

export default Team;
