import React from "react";


import "./styles.css";
import {TEAMS_BACKEND, PROFILES_BACKEND} from "../../config";
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
import {deleteTeamFromDB} from "../../actions/teamScripts";
import {updateTeamDataInDB} from "../../actions/teamScripts";


class Team extends React.Component {

    // @param {team: Object}
    constructor(props) {
        super(props);

        this.state = {
            global: props.globalState,
            quizApplication: {},
            isInEditMode: false,
            isInAdminEditMode: false,
            teamExists: true,
            teamDescription: "",
            newQuizQuestion: "",
            studentName: "",
            studentUniversity: "",
            studentCourse: "",
            // TODO: FETCH DATA FROM THE DB
            team: null,
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

    componentDidMount() {
        const url = TEAMS_BACKEND + "/" + this.props.teamId;

        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                console.log("Team JSON");
                console.log(json);
                this.setState({
                    team: json
                });
                console.log(this.state);
            }).catch((error) => {
            console.error(error)
        });
    }

    handleApplicationInput = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const application = this.state.quizApplication;
        application[[name]] = value;
        this.setState({
            quizApplication: application
        })
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
        this.state.team.applications.push(
            {
                studentId: this.props.globalState.identity.uid,
                application: this.state.quizApplication
            });

        let data = {
            applications: this.state.team.applications,
        };
        updateTeamDataInDB(data, this.state.team._id);
        NotificationManager.success('Your application is successfully submitted')

        console.log("team state");
        console.log(this.state.team);
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
        const updatedTeam = this.state.team;
        updatedTeam.acceptNewApplications = !this.state.team.acceptNewApplications;
        this.setState({
            isInEditMode: false,
            team: updatedTeam
        });
        //TODO Push updates to the DB
        let data = {
            acceptNewApplications: this.state.team.acceptNewApplications,
        };
        updateTeamDataInDB(data, this.state.team._id);
        console.log("Accept Applications Change");
        console.log(this.state.team);
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
        });
        deleteTeamFromDB(this.state.team._id);
    };

    updateInfo = () => {
        const updatedDescription = this.state.teamDescription === "" ?
            this.state.team.description
            :
            this.state.teamDescription;
        const updatedTeam = this.state.team;
        updatedTeam.description = updatedDescription;
        this.setState({
            isInEditMode: false,
            team: updatedTeam
        });
        //TODO: Push updates to the DB
        let data = {
            description: this.state.team.description,
        };
        updateTeamDataInDB(data, this.state.team._id);
    };

    getTeamMembers = (membersIds) => {
        let url;
        const teamMembers = [];

        membersIds.map(memberId => (
            <div key={uid(
                memberId
            )}>
                {url = PROFILES_BACKEND + "/" + memberId}
                {
                    fetch(url)
                        .then((response) => response.json())
                        .then((json) => {
                            console.log("Team JSON");
                            console.log(json);
                            teamMembers.push(json);
                            console.log(this.state);
                        }).catch((error) => {
                        console.error(error)
                    })
                }
            </div>
        ));

        return teamMembers;
    };

    /* Method to delete a member */
    removeMember = (uid) => {
        const members = this.state.team.members.filter(member => member.uid !== uid);
        const updatedTeam = this.state.team;
        updatedTeam.members = members;
        this.setState({
            team: updatedTeam
        })
        //TODO Push updates to the DB
        let data = {
            members: this.state.team.members,
        };
        updateTeamDataInDB(data, this.state.team._id);
    };

    /* Method to add a member */
    addMember = (student) => {
        this.state.team.members.push(student);
        this.setState({
            team: this.state.team
        })
        //TODO Push updates to the DB
        let data = {
            members: this.state.team.members,
        };
        updateTeamDataInDB(data, this.state.team._id);
    };

    /* Method to remove a quiz question */
    removeQuizQuestion = (question) => {
        const updatedQuizQuestions = this.state.team.quizQuestions.filter(q => q !== question);
        const updatedTeam = this.state.team;
        updatedTeam.quizQuestions = updatedQuizQuestions;
        this.setState({
            team: updatedTeam
        });
        //TODO Push updates to the DB
        let data = {
            quizQuestions: this.state.team.quizQuestions,
        };
       updateTeamDataInDB(data, this.state.team._id);
    };

    /* Method to add a quiz question */
    addQuizQuestion = () => {
        this.state.team.quizQuestions.push(this.state.newQuizQuestion);
        this.setState({
            team: this.state.team
        })
        //TODO Push updates to the DB
        let data = {
            quizQuestions: this.state.team.quizQuestions,
        };
        updateTeamDataInDB(data, this.state.team._id);
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
            <div className="deletion_confirmation__view">
            <h2 id="deletion_confirmation">Team is successfully deleted</h2>
                <Link className="join__link" to={`/`}>
                <Button
                    variant="outlined"
                    color="primary"
                    className="team_page__button">Back to searching teams
                </Button>
                </Link>
            </div>
        )
    };

    /* Team View - User Edit Mode */
    renderTeamEditView = () => {
        return (
            <div>

                <div>
                    <div className="edit_team">
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
                            <div className="team_description_save_button">
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    className="team_page__button"
                                    onClick={this.updateInfo}>Save
                                </Button>
                            </div>
                        </div>
                        <hr className="team_hr"/>

                        <Grid className="edit_team_page__members">
                            <h4 className="edit_team_page__title">Team Members</h4>
                            <div className="team_members">
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
                            </div>

                        </Grid>
                        <hr className="team_hr"/>

                        <Grid className="edit_team_page__quiz">
                            <h4 className="edit_team_page__title">Quiz Questions</h4>
                            <div className="team_quiz">
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
                            </div>

                        </Grid>
                        <hr className="team_hr"/>

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
                            <hr className="team_hr"/>

                            <p className="team_stop_accept_inv">Stop accepting new applications</p>
                            <Checkbox
                                className="team_stop_accept_inv_checkbox"
                                checked={!this.state.team.acceptNewApplications}
                                onChange={this.handleAcceptApplicationsChange}
                                value="primary"
                                inputProps={{'aria-label': 'primary checkbox'}}
                            />
                        </Grid>
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


        // Check the user id to determine if this user is a member of the team
        // to show team config buttons to team members only

        if (team !== null
            && !(team.members.filter(uid => uid === global.identity.uid).length === 0)) {
            editButton =
                <Button variant="outlined" color="primary"
                        className="team_page__button" onClick={this.changeEditMode}>edit team profile</Button>
            calendarButton =
                <Link className="team_page__link" to={`/team/${team._id}/appointment`}>
                    <Button variant="outlined" color="primary"
                            className="team_page__button">team calendar</Button>
                </Link>;
            applicationsButton =
                <Link className="team_page__link" to={`/team/${team.id}/application`}>
                    <Button variant="outlined" color="primary"
                            className="team_page__button">applications</Button>
                </Link>;


        }


        // Show Admin Mode Edit button to the admin
        if (global.identity.type === "admin") {
            editAdminButton =
                <Button variant="outlined" color="primary"
                        className="team_page__button" onClick={this.changeAdminEditMode}>edit team profile</Button>

        }


        // Check the user id to determine if this user is a member of the team
        // to show quiz questions to non-members only
        if ((global.identity.type === "user")
            && team
            && team.acceptNewApplications === true
            && team.quizQuestions.length !== 0
            && (team.members.filter(uid => uid === global.identity.uid).length === 0)) {
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
        } else if (team && team.acceptNewApplications === false) {
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
                            <Header className="team_name" type='main' title='team: '
                                    data={team ? `${team.university} ${team.course}` : ""}>
                                {editAdminButton}
                                {editButton}
                                {calendarButton}
                                {applicationsButton}
                            </Header>

                            <div className="team_body">
                                <h2 className="header__description">description:</h2>
                                <p className="header__team_description">{team ? team.description : ""}</p>

                                {team ? <TeamMemberPreviewList members={this.getTeamMembers(team.members)}/> : null}
                                <div className="quiz">
                                    <Grid className="quiz_table">
                                        {team ? this.state.team.quizQuestions.map(question => (
                                            <div key={uid(
                                                question
                                            )}>
                                                <div className="quiz_question">
                                                    <TextField
                                                        id="filled-textarea"
                                                        name={question}
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
