import React from "react";

import "./styles.css";
import {filterUnits} from "../../actions/filterUnits";
import SearchStudentForm from "./../SearchStudentForm";

import TeamMemberPreviewList from "../TeamMemberPreviewList";
import Grid from "@material-ui/core/Grid/Grid";
import Input from "../Input";
import Button from "@material-ui/core/Button/Button";
import {NotificationContainer, NotificationManager} from "react-notifications";
import {Link} from "react-router-dom";
import { request } from '../../actions/url';
import { SERVER_URL } from '../../config';

class SearchStudent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            studentName: "",
            studentUniversity: "",
            newStudentName: "",
            newStudentUniversity: "",
            studentCourse: "",
            students: [],
        };
        this.state.filteredStudents = [];
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

    /* Method to remove a student */
    removeStudent = (student) => {
        this.state.students = this.state.students.filter(s => s !== student);
        this.setState({
            students: this.state.students
        });
        this.state.filteredStudents = Array.from(this.state.students);
        //TODO Push updates to the DB
    };

    filterStudents = () => {
        request.get(`${SERVER_URL}api/users`,
                    {
                        fullname: this.state.studentName,
                        university: this.state.studentUniversity,
                        course: this.state.studentCourse, // FIXME
                    })
            .then(res => {
                console.log("Success", res);
                this.setState({ filteredStudents: res.result });
            })
            .catch(e => {
                console.log('Error');
                NotificationManager.error('There was an error getting the list of students.');
            });
    };

    createStudent = () => {};

    /* Student Search View - Admin Mode */
    newStudentForm = () =>
        [<h1 className="search_form_title">create a new student</h1>,
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
                 variant="outlined"
                 color="primary"
                 className="new_team_button"
                 onClick={this.createStudent}
             >
                 Create
             </Button>
         </Grid>];



    /* Student Search View - Student Mode */
    render() {

        const global = this.props.state;
        const isAdmin = global.identity.type === "admin";
        const appendActions =
              isAdmin
              && (student =>
                  <button
                      className="team_page__button"
                      onClick={() => this.removeStudent(student)}>
                      remove
                  </button>);

        return (
            <div>
                <div className="search_student_view">
                    <h1 className="search_form_title">
                        { isAdmin
                          ? 'manage students'
                          : 'find a partner' }
                    </h1>

                    { isAdmin &&
                      [this.newStudentForm(),
                       <h1 className='search_form_title'>
                           search students
                       </h1>
                      ] }

                    <NotificationContainer />

                    {/* Students Search Form */}
                    <div className="search-form">
                        <SearchStudentForm
                            studentName={this.state.studentName}
                            studentUniversity={this.state.studentUniversity}
                            studentCourse={this.state.studentCourse}
                            handleSearch={this.handleSearchInput}
                            filterStudents={this.filterStudents}
                        />
                    </div>

                    {/* Student Previews Table*/}
                    <div className="search_student_member_view">
                        <TeamMemberPreviewList
                            members={this.state.filteredStudents}
                            append={appendActions}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchStudent;
