import React from "react";
import ReactDOM from "react-dom";
import { Container, Header, List } from "semantic-ui-react";

import "./styles.css";

import AdministratorPreviewList from "./../AdministratorPreviewList";
import UniversityPreviewList from "./../UniversityPreviewList";
import CoursePreviewList from "./../CoursePreviewList";


import SearchAdminForm from "./../SearchAdminForm";
import AddAdminForm from "./../AddAdminForm";
import SearchUniversityForm from "./../SearchUniversityForm";
import AddUniversityForm from "./../AddUniversityForm";
import SearchCourseForm from "./../SearchCourseForm";
import AddCourseForm from "./../AddCourseForm";

import Menu from "./../Menu";

import { addAdmins } from "../../actions/searchAdmin";
import { filterAdmins } from "../../actions/searchAdmin";
import { addUniversities } from "../../actions/searchUniversity";
import { filterUniversities } from "../../actions/searchUniversity";
import { addCourses } from "../../actions/searchCourse";
import { filterCourses } from "../../actions/searchCourse";

class AdminDashboard extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
        	adminId: "",
            adminName: "",
	        adminEmail: "",
            adminId1: "",
            adminName1: "",
            adminEmail1: "",
	        administrators: [ // TODO: FETCH
                { adminName: "Paul McCartney", adminId: "1", adminEmail: "paul@gmail.com" },
                { adminName: "George Harrison", adminId: "2", adminEmail: "george@gmail.com" },
                { adminName: "Ringo Starr", adminId: "3", adminEmail: "ringo@gmail.com" },
            	{ adminName: "John Lennon", adminId: "4", adminEmail: "john@gmail.com" }, 
            	{ adminName: "David Bowie", adminId: "5", adminEmail: "david@gmail.com" },
            	{ adminName: "Bob Dylan", adminId: "6", adminEmail: "bob@gmail.com" }
            ], 
            universityId: "",
            universityName: "",
            universityId1: "",
            universityName1: "",
            universities: [ // TODO: FETCH
                { universityName: "University of Toronto", universityId: "1"},
                { universityName: "University of Waterloo", universityId: "2"},
                { universityName: "New York University", universityId: "3"},
                { universityName: "University of Cambridge", universityId: "4"},
                { universityName: "University of Oxford", universityId: "5"}
            ],
            courseId: "",
            courseName: "", 
            courseUniversity: "",
            courseId1: "",
            courseName1: "", 
            courseUniversity1: "",
            courses: [ // TODO: FETCH
                {courseName: "CSC207", courseId: "1", courseUniversity: "University of Toronto"},
                {courseName: "CSC309", courseId: "2", courseUniversity: "University of Toronto"},
                {courseName: "CSC369", courseId: "3", courseUniversity: "University of Toronto"},
                {courseName: "CSC208", courseId: "1", courseUniversity: "University of Waterloo"},
                {courseName: "CSC209", courseId: "1", courseUniversity: "New York University"},
                {courseName: "CSC210", courseId: "1", courseUniversity: "University of Cambridge"},
                {courseName: "CSC211", courseId: "1", courseUniversity: "University of Oxford"}
            ]
        }

        this.state.filteredAdmins = Array.from(this.state.administrators);
        this.state.filteredUniversities = Array.from(this.state.universities);
        this.state.filteredCourses = Array.from(this.state.courses);
    }

    handleSearchInput = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    handleSearchInput1 = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    handleSearchInput2 = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    handleSearchInput3 = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    handleSearchInput4 = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    handleSearchInput5 = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    render() {
        const {adminId} = this.props;

        return (
            <div className="admin_dashboard_view">
                <div className="admin_options">
                    <h1 className="welcome_back">Welcome Back, admin!</h1> 
                    <h2>What would you like to do?</h2> 
                    <ul>
                        <li><a href="/adminDashboard#admin_list">View, Add, or Remove administrators</a></li>
                        <li><a href="/signup">Create a Student Profile</a></li>
                        <li><a href="/adminDashboard#university_list">View, Add, or Remove universities</a></li>
                        <li><a href="/adminDashboard#course_list">View, Add, or Remove courses</a></li>
                    </ul>
                </div> 
                <div id="admin_list"> 
                    <h1 className="search_form_title">Administrators: </h1>
                    <table className="headers">
                        <tr> 
                            <td className="name">
                                <h3>Name</h3> 
                            </td>
                            <td className="email">
                                <h3>Email</h3> 
                            </td>
                        </tr> 
                    </table>
                    
                    <AdministratorPreviewList administrators={this.state.filteredAdmins} /> 
                </div>
                <div id="remove_admin">
                    <h1 className="remove_admin_header">Remove Admin</h1>
                    <SearchAdminForm
                        adminName={this.state.adminName}
                        adminEmail={this.state.adminEmail}
                        handleSearch={this.handleSearchInput}
                        filterAdmins={() => filterAdmins(this)}
                    />
                </div>
                
                <div id="add_admin">
                    <h1 className="add_admin_header">Add Admin</h1>
                    <AddAdminForm
                        adminName1={this.state.adminName1}
                        adminEmail1={this.state.adminEmail1}
                        handleSearch1={this.handleSearchInput1}
                        addAdmins={() => addAdmins(this)}
                    />
                </div>
                <div id="university_list"> 
                    <h1 className="search_form_title">Universities: </h1>
                    <table className="headers1">
                        <tr> 
                            <td className="name">
                                <h3>Name</h3> 
                            </td>
                            <td className="id">
                                <h3>Id</h3> 
                            </td>
                        </tr> 
                    </table>
                    
                    <UniversityPreviewList universities={this.state.filteredUniversities} /> 
                </div>
                <div id="remove_university">
                    <h1 className="remove_university_header">Remove University</h1>
                    <SearchUniversityForm
                        universityName={this.state.universityName}
                        universityId={this.state.universityId}
                        handleSearch2={this.handleSearchInput2}
                        filterUniversities={() => filterUniversities(this)}
                    />
                </div>
                
                <div id="add_admin">
                    <h1 className="add_admin_header">Add University</h1>
                    <AddUniversityForm
                        universityName1={this.state.universityName1}
                        universityId1={this.state.universityId1}
                        handleSearch3={this.handleSearchInput3}
                        addUniversities={() => addUniversities(this)}
                    />
                </div>
                <div id="course_list"> 
                    <h1 className="search_form_title">Courses: </h1>
                    <table className="headers1">
                        <tr> 
                            <td className="name">
                                <h3>Name</h3> 
                            </td>
                            <td className="course_university">
                                <h3>Id</h3> 
                            </td>
                        </tr> 
                    </table>
                    
                    <CoursePreviewList courses={this.state.filteredCourses} /> 
                </div>
                <div id="remove_university">
                    <h1 className="remove_university_header">Remove Course</h1>
                    <SearchCourseForm
                        courseName={this.state.courseName}
                        courseUniversity={this.state.courseUniversity}
                        handleSearch4={this.handleSearchInput4}
                        filterCourses={() => filterCourses(this)}
                    />
                </div>
                
                <div id="add_admin">
                    <h1 className="add_admin_header">Add Course</h1>
                    <AddCourseForm
                        courseName1={this.state.courseName1}
                        courseUniversity1={this.state.courseUniversity1}
                        handleSearch5={this.handleSearchInput5}
                        addCourses={() => addCourses(this)}
                    />
                </div>
            </div>
        );
    }
}

export default AdminDashboard;
