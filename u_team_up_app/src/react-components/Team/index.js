import React from "react";


import "./styles.css";
import TeamMemberPreviewList from "./../TeamMemberPreviewList";
import Header from '../Header';
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button/Button";
import TextField from "@material-ui/core/TextField";
import {uid} from "react-uid";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import SearchStudentForm from "../SearchStudentForm";
import {filterUnits} from "../../actions/filterUnits";

class Team extends React.Component {

    // @param {team: Object}
    constructor(props) {
        super(props);

        this.state = {
            global: props.globalState,
            quizApplication: [],
            isInEditMode: false,
            isInAdminEditMode: false,
            acceptNewApplications: true,
            teamExists: true,
            teamDescription: "",
            newQuizQuestion: "",
            studentName: "",
            studentUniversity: "",
            studentCourse: "",
            // TODO: FETCH DATA FROM THE DB
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
                        photo: "./static/bob2.png",
                        profileLink: "/student-profile/2"
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
            } : props.teamId === '2' ? {
                id: "2",
                university: "UofT",
                course: "CSC207",
                description: "Let's crash this course together!",
                members: [
                    {
                        uid: "2",
                        name: "Bob Bobson",
                        university: "UofT",
                        photo: "./static/bob2.png",
                        profileLink: "/student-profile"
                    }
                ],
                quizQuestions: [
                    "Which programming languages do you know?",
                    "Can you do weekly team meetings?",
                    "Do you have a GitHub account?"
                ]
            } : null,
            students: [
                {
                    name: "Bob Bobson",
                    university: "UofT",
                    course: ["CSC309", "CSC369"],
                    uid: "2",
                    photo: "./static/bob2.png",
                    profileLink: "/student-profile/2"
                },
                {
                    name: "Alice Alison",
                    university: "UofT",
                    course: ["CSC309", "CSC207"],
                    uid: "1",
                    photo: "./static/alice.png",
                    profileLink: "/student-profile"
                }
            ],
            filteredStudents: []
        };
    }

    handleApplicationInput = event => {
        const target = event.target;
        const value = target.value;
        this.state.quizApplication.push(value);
    };

    handleNewQuestionInput = event => {
        const target = event.target;
        const value = target.value;
        this.setState({
            newQuizQuestion: value
        });
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

    changeAdminEditMode = () => {
        this.setState({
            isInAdminEditMode: !this.state.isInAdminEditMode
        })
    };

    handleAcceptApplicationsChange = () => {
        this.setState({
            acceptNewApplications: !this.state.acceptNewApplications
        })
        //TODO Push updates to the DB
    };

    handleEditInput = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    /* Method to delete a team */
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

    /* Method to delete a member */
    removeMember = (uid) => {
        this.state.team.members = this.state.team.members.filter(member => member.uid != uid);
        this.setState({
            team: this.state.team
        })
        //TODO Push updates to the DB
    };

    /* Method to add a member */
    addMember = (student) => {
        this.state.team.members.push(student);
        this.setState({
            team: this.state.team
        })
        //TODO Push updates to the DB
    };

    /* Method to remove a quiz question */
    removeQuizQuestion = (question) => {
        this.state.team.quizQuestions = this.state.team.quizQuestions.filter(q => q != question);
        this.setState({
            team: this.state.team
        })
        //TODO Push updates to the DB
    };

    /* Method to add a quiz question */
    addQuizQuestion = () => {
        this.state.team.quizQuestions.push(this.state.newQuizQuestion);
        this.setState({
            team: this.state.team
        })
        //TODO Push updates to the DB
    };


    /* Method to handle the Student Search Form input */
    handleSearchInput = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    /* Method to show team deletion confirmation view */
    renderDeletionConfirmation = () => {
        return (
            <h2 id="deletion_confirmation">Team is successfully deleted</h2>
        )
    };

    /* Team View - User Edit Mode */
    renderTeamEditView = () => {
        return (
            <div>

                <div>
                    <div>
                        <div className="edit_team_page__description">
                            <h4 className="edit_team_page__title">Team Description</h4>
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
                            <h4 className="edit_team_page__title">Team Members</h4>
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
                            <h4 className="edit_team_page__title">Quiz Questions</h4>
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

                        <Grid className="edit_team_page__quiz">
                            <h4 className="edit_team_page__title">New Quiz Questions</h4>
                            <div className="team_page__new_quiz_question">
                                <TextField
                                    id="filled-textarea"
                                    label={"Write a quiz question"}
                                    onChange={this.handleNewQuestionInput}
                                    multiline
                                    variant="filled"
                                />
                                <div>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        className="team_page__button"
                                        onClick={this.addQuizQuestion.bind(this)}>Add
                                    </Button>
                                </div>
                            </div>
                            <h4 className="edit_team_page__title">Stop accepting new applications</h4>
                            <Checkbox
                                checked={!this.state.acceptNewApplications}
                                onChange={this.handleAcceptApplicationsChange}
                                value="primary"
                                inputProps={{'aria-label': 'primary checkbox'}}
                            />
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

    /* Team View - Admin Edit Mode */
    renderTeamAdminEditView = () => {

        return (
            <div>

                <div>
                    <div>
                        <Grid className="edit_team_page__members">
                            <h4 className="edit_team_page__title">Team Members</h4>
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

                            {/* Students Search Form */}
                            <div className="search-form">
                                <SearchStudentForm
                                    studentName={this.state.studentName}
                                    studentUniversity={this.state.studentUniversity}
                                    studentCourse={this.state.studentCourse}
                                    handleSearch={this.handleSearchInput}
                                    filterStudents={() => this.setState({
                                        filteredStudents: filterUnits({
                                                name: this.state.studentName,
                                                university: this.state.studentUniversity,
                                                course: this.state.studentCourse
                                            },
                                            this.state.students)
                                    })}
                                />
                            </div>
                            {this.state.filteredStudents.map(student => (
                                <div key={uid(
                                    student
                                )}>
                                    {student.name}
                                    <button
                                        className="team_page__button"
                                        onClick={this.addMember.bind(this, student)}>Add
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
                            onClick={this.changeAdminEditMode}>Back to Team</Button>

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

    /* Team View */
    render() {
        const team = this.state.team;
        const global = this.props.globalState;

        let editButton;
        let editAdminButton;
        let calendarButton;
        let applicationsButton;
        let quizButton;

        {
            // Check the user id to determine if this user is a member of the team
            // to show team config buttons to team members only
        }
        if (team != null
            && !(team.members.map(member => member.uid).filter(uid => uid === global.identity.uid).length === 0)) {
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
            // Show Admin Mode Edit button to the admin
        }
        if (global.identity.type === "admin") {
            editAdminButton =
                <Button variant="outlined" color="primary"
                        className="team_page__button" onClick={this.changeAdminEditMode}>edit team profile</Button>

        }

        {
            // Check the user id to determine if this user is a member of the team
            // to show quiz questions to non-members only
        }
        if ((global.identity.type === "user") &&
            (this.state.acceptNewApplications === true) &&
            team != null &&
            (team.members.map(member => member.uid).filter(uid => uid === global.identity.uid).length === 0)) {
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
        } else if (this.state.acceptNewApplications === false) {
            quizButton =
                <div><p className="applications_not_accepted">Sorry, currently we do not accept new applications</p>
                </div>
        }

        return (
            this.state.teamExists ?
                this.state.isInEditMode ?
                    this.renderTeamEditView()
                    :
                    this.state.isInAdminEditMode ?
                        this.renderTeamAdminEditView()
                        :
                        <div className="team">
                            <Header type='main' title='team: '
                                    data={team ? `${team.university} ${team.course}` : ""}>
                                {editAdminButton}
                                {editButton}
                                {calendarButton}
                                {applicationsButton}
                            </Header>

                            <div className="body">
                                <h2 className="header__description">description:</h2>
                                <p className="header__team_description">{team ? team.description : ""}</p>
                                {team ? <TeamMemberPreviewList members={team.members}/> : null}
                                <div className="quiz">
                                    <Grid className="quiz_table">
                                        {team ? this.state.team.quizQuestions.map(question => (
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
                                        )) : null}
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
