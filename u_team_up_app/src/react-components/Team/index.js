import React from "react";


import "./styles.css";
import TeamMemberPreviewList from "./../TeamMemberPreviewList";
import Header from '../Header';
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button/Button";
import TextField from "@material-ui/core/TextField";
import {uid} from "react-uid";
import Grid from "@material-ui/core/Grid";
import {NotificationContainer, NotificationManager} from 'react-notifications';

class Team extends React.Component {

    // @param {team: Object}
    constructor(props) {
        super(props);

        this.state = {
            global: props.globalState,
            quizApplication: [],
            isInEditMode: false,
            teamExists: true,
            teamDescription: "",
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

    changeEditMode = () => {
        this.setState({
            isInEditMode: !this.state.isInEditMode
        })
    };

    handleEditInput = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    deleteTeam = () => {
        // TODO: Update DB - remove the team data from the DB
        this.setState({
            teamExists: false
        })
    };

    updateInfo = () => {
        this.setState({
            isInEditMode: false,
            team: {
                id: this.state.team.id,
                university: this.state.team.university,
                course: this.state.team.course,
                description: this.state.teamDescription === "" ? this.state.team.description : this.state.teamDescription,
                members: this.state.team.members,
                quizQuestions: this.state.team.quizQuestions
            }
        })
    };

    removeMember = (uid) => {
        this.state.team.members = this.state.team.members.filter(member => member.uid != uid);
        this.setState({
            team: this.state.team
        })
    };

    removeQuizQuestion = (question) => {
        this.state.team.quizQuestions = this.state.team.quizQuestions.filter(q => q != question);
        this.setState({
            team: this.state.team
        })
    };

    renderDeletionConfirmation = () => {
        return (
            <h2 id="deletion_confirmation">Your team is successfully deleted</h2>
        )
    };

    renderTeamEditView = () => {
        return (
            <div>

                <div>
                    <div>
                        <div className="edit_team_page__description">
                            <h4>Team Description</h4>
                            <textarea
                                name="teamDescription"
                                className="edit_team_page__input"
                                defaultValue={this.state.team.description}
                                value={this.teamDescription}
                                onChange={this.handleEditInput}
                            >
                        </textarea>
                            <div>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    className="team_page__button"
                                    onClick={this.updateInfo}>Save
                                </Button>
                            </div>
                        </div>

                        <Grid className="edit_team_page__members">
                            <h4>Team Members</h4>
                            {this.state.team.members.map(member => (
                                <div key={uid(
                                    member
                                )}>

                                    {member.name}
                                    <button
                                        className="team_page__button"
                                        onClick={this.removeMember.bind(this, member.uid)}>Remove
                                    </button>


                                </div>
                            ))}
                        </Grid>

                        <Grid className="edit_team_page__quiz">
                            <h4>Quiz Questions</h4>
                            {this.state.team.quizQuestions.map(question => (
                                <div key={uid(
                                    question
                                )}>

                                    {question}
                                    <button
                                        className="team_page__button"
                                        onClick={this.removeQuizQuestion.bind(this, question)}>Remove
                                    </button>


                                </div>
                            ))}
                        </Grid>

                    </div>
                    <div className="edit_team_page__buttons">

                        {/* Click the cancel button to go back to default mode*/}
                        <Button
                            variant="outlined"
                            color="primary"
                            className="team_page__button"
                            onClick={this.changeEditMode}>Back to Team</Button>

                        <Button
                            variant="outlined"
                            color="primary"
                            className="team_page__button"
                            onClick={this.deleteTeam}>Delete Team</Button>
                    </div>
                </div>
            </div>

        )
    };

    render() {
        const team = this.state.team;
        const global = this.state.global;

        let editButton;
        let calendarButton;
        let applicationsButton;
        let quizButton;

        {
            // Check the user id to determine if this user is a member of the team
            // to show team config buttons to team members only
        }
        if (!(team.members.map(member => member.uid).filter(uid => uid === global.identity.uid).length === 0)) {
            editButton =
                <Button variant="outlined" color="primary"
                        className="team_page__button" onClick={this.changeEditMode}>edit team profile</Button>
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
            quizButton =
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        className="quiz_button"
                        onClick={this.submitApplication}
                    >
                        Apply
                    </Button>
                    <NotificationContainer/>
                </div>;
        }

        return (
            this.state.teamExists ?
                this.state.isInEditMode ?
                    this.renderTeamEditView()
                    :
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
                                <Grid className="quiz_table">
                                    {this.state.team.quizQuestions.map(question => (
                                        <div key={uid(
                                            question
                                        )}>
                                            <div className="quiz_question">
                                                <TextField
                                                    id="filled-textarea"
                                                    label={question}
                                                    onChange={this.handleApplicationInput}
                                                    multiline
                                                    variant="filled"
                                                />
                                            </div>

                                        </div>
                                    ))}
                                </Grid>
                            </div>
                            {quizButton}

                        </div>
                    </div>
                :
                this.renderDeletionConfirmation()
        );
    }
}

export default Team;
