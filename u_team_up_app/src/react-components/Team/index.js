import React from "react";


import "./styles.css";
import {TEAMS_BACKEND, USER_BACKEND, USERS_BACKEND} from "../../config";
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
import {deleteTeamFromDB, updateTeamDataInDB} from "../../actions/teamScripts";
import {updateProfileData} from "../../actions/profileScripts";


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
            team: null,
            teamMembers: [],
            student: null,
            students: [],
            filteredStudents: []
        };
    }


    getTeamFromDB = () => {
        return new Promise((resolve, reject) => {
            const teamUrl = TEAMS_BACKEND + "/" + this.props.teamId;
            fetch(teamUrl)
                .then((response) => response.json())
                .then((json) => {
                    this.setState({
                        team: json
                    });
                    resolve();
                }).catch((error) => {
                console.error(error);
                reject();
            });
        })
    };

    getTeamMembersFromDB = () => {
        let url;

        this.state.team.members.map(username => (
            <div key={uid(
                username
            )}>
                {url = USER_BACKEND + username}
                {
                    fetch(url)
                        .then((response) => response.json())
                        .then((json) => {
                            this.state.teamMembers.push(json);
                            this.setState({
                                teamMembers: this.state.teamMembers
                            });
                        }).catch((error) => {
                        console.error(error)
                    })
                }
            </div>
        ));
    };


    componentDidMount() {

        this.getTeamFromDB()
            .then(() => this.getTeamMembersFromDB()).catch((error) => {
            console.error(error)
        });

        const studentUrl = USER_BACKEND + this.props.globalState.identity.username;

        fetch(studentUrl)
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    student: json
                });
            }).catch((error) => {
            console.error(error)
        });

        fetch(USERS_BACKEND)
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    students: json
                });
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
        this.state.team.applications.push(
            {
                // studentUsername: this.props.globalState.identity.username,
                student: this.state.student,
                application: this.state.quizApplication,
                open: false
            });
        const team_data = {
            applications: this.state.team.applications,
            token: this.props.globalState.identity.token
        };

        this.state.student.applications.push({
            teamId: this.state.team._id,
            application: this.state.quizApplication,
            status: "Pending"
        });
        this.setState({
            student: this.state.student
        });
        const profile_data = {
            applications: this.state.student.applications,
            _id: this.props.globalState.identity.username,
            token: this.props.globalState.identity.token
        };
        updateTeamDataInDB(team_data, this.state.team._id);
        updateProfileData(profile_data, this.props.globalState.identity.username);
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
            team: updatedTeam
        });
        const data = {
            acceptNewApplications: this.state.team.acceptNewApplications,
            token: this.props.globalState.identity.token
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
        this.setState({
            teamExists: false
        });
        const team_data = {
            token: this.props.globalState.identity.token
        };
        deleteTeamFromDB(team_data, this.state.team._id);
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
        let data = {
            description: this.state.team.description,
            token: this.props.globalState.identity.token
        };
        updateTeamDataInDB(data, this.state.team._id);
    };

    /* Method to delete a member */
    removeMember = (memberToRemove) => {
        const members = this.state.team.members.filter(member => member !== memberToRemove._id);
        const updatedTeam = this.state.team;
        updatedTeam.members = members;
        const updatedTeamMembers = this.state.teamMembers.filter(member => member._id !== memberToRemove._id);
        this.setState({
            team: updatedTeam,
            teamMembers: updatedTeamMembers
        })
        let data = {
            members: this.state.team.members,
            token: this.props.globalState.identity.token
        };
        updateTeamDataInDB(data, this.state.team._id);
        if(this.state.student._id === memberToRemove._id){
            this.changeEditMode();
        }

    };

    /* Method to add a member */
    addMember = (student) => {
        this.state.team.members.push(student._id);
        this.state.teamMembers.push(student);
        this.setState({
            team: this.state.team,
            teamMembers: this.state.teamMembers
        })
        let data = {
            members: this.state.team.members,
            token: this.props.globalState.identity.token
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
        let data = {
            quizQuestions: this.state.team.quizQuestions,
            token: this.props.globalState.identity.token
        };
        updateTeamDataInDB(data, this.state.team._id);
    };

    /* Method to add a quiz question */
    addQuizQuestion = () => {
        this.state.team.quizQuestions.push(this.state.newQuizQuestion);
        this.setState({
            team: this.state.team
        })
        let data = {
            quizQuestions: this.state.team.quizQuestions,
            token: this.props.globalState.identity.token
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
                                {this.state.teamMembers.map(member => (
                                    <div key={uid(
                                        member
                                    )}>

                                        {member.fullname ? member.fullname : member._id}
                                        <button
                                            className="team_page__button"
                                            onClick={this.removeMember.bind(this, member)}>Remove
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
                            <h4 className="edit_team_page__title">Stop accepting applications</h4>
                            <div className="team_stop_accept_inv_checkbox">
                                <Checkbox
                                    checked={!this.state.team.acceptNewApplications}
                                    onChange={this.handleAcceptApplicationsChange}
                                    value="primary"
                                    inputProps={{'aria-label': 'primary checkbox'}}
                                />
                            </div>
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
                            {this.state.teamMembers.map(member => (
                                <div key={uid(
                                    member
                                )}>

                                    {member.fullname ? member.fullname : member._id}
                                    <button
                                        className="team_page__button"
                                        onClick={this.removeMember.bind(this, member)}>Remove
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
                                                fullname: this.state.studentName,
                                                university: this.state.studentUniversity,
                                                currentCourses: this.state.studentCourse
                                            },
                                            this.state.students)
                                    })}
                                />
                            </div>
                            {this.state.filteredStudents.map(student => (
                                <div key={uid(
                                    student
                                )}>
                                    {student.fullname ? student.fullname : student._id}
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
            && !(team.members.filter(username => username === global.identity.username).length === 0)) {
            editButton =
                <Button variant="outlined" color="primary"
                        className="team_page__button" onClick={this.changeEditMode}>edit team profile</Button>
            calendarButton =
                <Link className="team_page__link" to={`/team/${team._id}/appointment`}>
                    <Button variant="outlined" color="primary"
                            className="team_page__button">team calendar</Button>
                </Link>;
            applicationsButton =
                <Link className="team_page__link" to={`/team/${team._id}/application`}>
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
            && (team.members.filter(username => username === global.identity.username).length === 0)) {
            quizButton =
                <div>
                    <Button
                        variant="outlined"
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

                                {<TeamMemberPreviewList members={this.state.teamMembers}/>}
                                {console.log("Team Members Sent to Preview")}
                                {console.log(this.state.teamMembers)}

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
