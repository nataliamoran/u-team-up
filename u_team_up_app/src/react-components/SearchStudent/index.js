import React from "react";

import "./styles.css";
import {filterUnits} from "../../actions/filterUnits";
import SearchStudentForm from "./../SearchStudentForm";

import TeamMemberPreviewList from "../TeamMemberPreviewList";
import {uid} from "react-uid";
import Grid from "@material-ui/core/Grid/Grid";
import Input from "../Input";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import {NotificationContainer, NotificationManager} from "react-notifications";

class SearchStudent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            studentName: "",
            studentUniversity: "",
            newStudentName: "",
            newStudentUniversity: "",
            studentCourse: "",
            uid: 3,
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
            ]
        };
        this.state.filteredStudents = Array.from(this.state.students);
    }

    /* Method to handle the Student Search Form input */
    handleSearchInput = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    removeStudent = (student) => {
        this.state.students = this.state.students.filter(s => s != student);
        this.setState({
            students: this.state.students
        });
        this.state.filteredStudents = Array.from(this.state.students);
    };

    createStudent = () => {
        if(this.state.newStudentName === "" ||
            this.state.newStudentUniversity === ""){
            NotificationManager.error('Please complete all fields')
            return;
        }
        this.state.students.push({
            name: this.state.newStudentName,
            university: this.state.newStudentUniversity,
            course: [],
            uid: this.state.uid,
            photo: "",
            profileLink: ""
        });
        this.state.uid += 1;
        this.setState({
            students: this.state.students
        });
        this.state.filteredStudents = Array.from(this.state.students);
        NotificationManager.success('New student was successfully created!')
    };

    renderAdminModeView = () => {

        return (
            <div>
                <div className="search_student_view">
                    <div>
                        <h1 className="search_form_title">create a new student</h1>
                        <Grid container direction="row" justify="center" alignItems="center">
                            <Input
                                className="new_team__input"
                                name="newStudentName"
                                value={this.state.newStudentName}
                                id="filled-textarea"
                                label={"Name"}
                                onChange={this.handleSearchInput}
                                multiline
                            />
                            <Input
                                className="new_team__input"
                                name="newStudentUniversity"
                                value={this.state.newStudentUniversity}
                                id="filled-textarea"
                                label={"University"}
                                onChange={this.handleSearchInput}
                                multiline
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                className="new_team_button"
                                onClick={this.createStudent}
                            >
                                Create
                            </Button>
                            <NotificationContainer/>
                        </Grid>
                    </div>

                    <h1 className="search_form_title">search students</h1>
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
                    <div className="students-list__admin-view">
                    {/* Student Previews Table*/}
                    {this.state.filteredStudents.map(student => (
                        <div key={uid(
                            student
                        )}>
                            {student.name}
                            <button
                                className="team_page__button"
                                onClick={this.removeStudent.bind(this, student)}>remove
                            </button>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        )
    };

    render() {

        const global = this.props.state;

        return (
            global.identity.type === "admin" ?
                this.renderAdminModeView()
                :
            <div>
                <div className="search_student_view">
                    <h1 className="search_form_title">find a partner</h1>

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

                    {/* Student Previews Table*/}
                    <TeamMemberPreviewList members={this.state.filteredStudents}/>
                </div>
            </div>
        );
    }
}

export default SearchStudent;
