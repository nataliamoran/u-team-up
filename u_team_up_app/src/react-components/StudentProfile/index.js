import React from "react";
import "./styles.css";
import newUser from "./static/new_user.png";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button/Button";
import TextField from "@material-ui/core/TextField";
import ImageForm from "./../ImageForm";
import { SERVER_URL } from "../../config";
import { request } from '../../actions/url';
import {updateProfileData} from "../../actions/profileScripts";
import {NotificationManager} from 'react-notifications';

/** @param props: {
 *      editing: boolean,
 *      multiline: boolean,
 *      value: string,
 *      onChange: function,
 *      className: string,
 *      name: string,
 * }
 */

function ViewOrEdit(props) {
    const { editing, multiline, value, onChange, className, name } = props;

    const classToAdd = className ? " " + className : "";

    return editing ? (
        React.createElement(multiline ? "textarea" : "input", {
            className: "student_profile__input" + classToAdd,
            type: "text",
            value,
            onChange,
            name
        })
    ) : (
        <p>{value}</p>
    );
}

class StudentProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: props.username,
            global: props.globalState,
            imageUrl: "",
            fullname: "",
            university: "",
            yearOfStudy: "",
            majorOfStudy: "",
            coursesTaken: [],
            currentCourses: [],
            reviews: [],
            description: "",
            location: "",
            gpa: "",
            pastProject: "",
            experience: "",
            // ...(studentInfo[
            //     this.props.id || this.props.globalState.identity.uid
            // ] || { reviews: [] }), // TODO: FETCH
            isInEditMode: false,
            profile: null
        };

        this.changedFields = {};
    }

    getUserProfileFromDB = () =>
        request.get(`${SERVER_URL}api/user`,
                    { username: this.props.username || this.props.globalState.identity.username })
        .then(json => this.setState(json))
        .catch((error) => {
            console.error(error)
        })

    componentDidMount() {
        this.getUserProfileFromDB();
    }


    updateInfo = () => {
        this.setState({
            isInEditMode: false
        });

        const profile_data = {
            username: this.props.globalState.identity.username,
            token: this.props.globalState.identity.token,
            ...this.changedFields,
        };

        updateProfileData(profile_data, this.props.globalState.identity.username);
        NotificationManager.success('Profile data saved!')
        this.changedFields = {};
    };

    changeEditMode = () => {
        this.setState({
            isInEditMode: !this.state.isInEditMode
        });
    };

    handleEditInput = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, () => this.changedFields[name] = value);
        event.preventDefault();
    };

    displayArray = arr => arr.join(' ');

    handleEditInputArray = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const arr = value.split(/\s+/);

        this.setState({
            [name]: arr,
        }, () => this.changedFields[name] = arr);
        event.preventDefault();
    };

    handleReviewInput = event => {
        const target = event.target;
        const value = target.value;
        this.setState({
            newReview: value
        });
    };

    addReview = () => {
        this.state.reviews.push(this.state.newReview);
        this.setState({
            reviews: this.state.reviews
        });
    };

    render() {
        const loggedIn = this.props.globalState.identity.type !== "guest";
        const isMe =
            loggedIn &&
            (this.props.username || this.props.globalState.identity.uid) ===
                this.props.globalState.identity.uid;

        const editingInfo = isMe && this.state.isInEditMode;
        const canAddReview = loggedIn && !isMe;

        const addReview = canAddReview
            ? [
                  <p>Write your teammate a review!</p>,
                  <TextField
                      className="reviewInput"
                      label={"Format: your name - your review"}
                      onChange={this.handleReviewInput}
                      multiline
                      variant="filled"
                  />,
                  <div>
                      <Button
                          variant="outlined"
                          color="primary"
                          className="team_page__button"
                          onClick={this.addReview.bind(this)}
                      >
                          Add
                      </Button>
                  </div>
              ]
            : [];

            const uploadImg = editingInfo ?
            /* Image upload form */
            [<ImageForm profile={this} username={this.props.globalState.identity.username}/>]
             : null;

            // const myApplication = isMe ?
            // <div>
            //     <p>
            //         <Link
            //             className="student__application"
            //             to={"./../student-app-inv"}
            //         >
            //             My application
            //         </Link>
            //     </p>
            // </div> : null

        return (
            <div>
                <div>
                    <div className="left-box">

                        <img
                        className="profile-pic"
                        src={this.state.imageUrl || newUser}
                        alt="profile picture"
                    />
                        {uploadImg}

                        <div className="info inner">
                            <h4 className="student_profile_h4">Name:</h4>
                            <ViewOrEdit
                                editing={editingInfo}
                                className="student_profile__input"
                                type="text"
                                value={this.state.fullname}
                                onChange={this.handleEditInput}
                                name="fullname"
                            />

                            <h4 className="student_profile_h4">University:</h4>
                            <ViewOrEdit
                                editing={editingInfo}
                                className="student_profile__input"
                                type="text"
                                value={this.state.university}
                                onChange={this.handleEditInput}
                                name="university"
                            />

                            <h4 className="student_profile_h4">
                                Year of Study:
                            </h4>
                            <ViewOrEdit
                                editing={editingInfo}
                                className="student_profile__input"
                                type="text"
                                value={this.state.yearOfStudy}
                                onChange={this.handleEditInput}
                                name="yearOfStudy"
                            />

                            <h4 className="student_profile_h4">
                                Major of Study:
                            </h4>
                            <ViewOrEdit
                                editing={editingInfo}
                                className="student_profile__input"
                                type="text"
                                value={this.state.majorOfStudy}
                                onChange={this.handleEditInput}
                                name="majorOfStudy"
                            />
                        </div>

                        <div className="taken inner">
                            <h4 className="student_profile_h4">
                                Courses Taken:
                            </h4>
                            <ViewOrEdit
                                editing={editingInfo}
                                className="student_profile__input"
                                type="text"
                                value={this.displayArray(this.state.coursesTaken)}
                                onChange={this.handleEditInputArray}
                                name="coursesTaken"
                            />
                        </div>

                        <div className="taking inner">
                            <h4 className="student_profile_h4">
                                Currently Taking:
                            </h4>
                            <ViewOrEdit
                                editing={editingInfo}
                                className="student_profile__input"
                                type="text"
                                value={this.displayArray(this.state.currentCourses)}
                                onChange={this.handleEditInputArray}
                                name="currentCourses"
                            />
                        </div>

                        <div className="reviews inner">
                            <h4 className="student_profile_h4">Reviews:</h4>
                            <p>
                                {this.state.reviews.map(review => (
                                    <div key={review}>{review}</div>
                                ))}
                            </p>
                            {addReview}
                        </div>
                    </div>

                    <div className="right-box">
                        {/*{myApplication}*/}
                        <div className="description inner">
                            <h4 className="student_profile_h4">Description:</h4>
                            <ViewOrEdit
                                editing={editingInfo}
                                className="student_profile__input"
                                type="text"
                                value={this.state.description}
                                onChange={this.handleEditInput}
                                name="description"
                            />
                        </div>

                        <div className="more-info inner">
                            <h4 className="student_profile_h4">Email:</h4>
                            <ViewOrEdit
                                editing={editingInfo}
                                className="student_profile__input"
                                type="text"
                                value={this.state.email}
                                onChange={this.handleEditInput}
                                name="email"
                            />

                            <h4 className="student_profile_h4">Location:</h4>
                            <ViewOrEdit
                                editing={editingInfo}
                                className="student_profile__input"
                                type="text"
                                value={this.state.location}
                                onChange={this.handleEditInput}
                                name="location"
                            />

                            <h4 className="student_profile_h4">GPA:</h4>
                            <ViewOrEdit
                                editing={editingInfo}
                                className="student_profile__input"
                                type="text"
                                value={this.state.gpa}
                                onChange={this.handleEditInput}
                                name="gpa"
                            />

                            <h4 className="student_profile_h4">
                                Past Project:
                            </h4>
                            <ViewOrEdit
                                multiline={true}
                                editing={editingInfo}
                                className="student_profile__input"
                                type="text"
                                value={this.state.pastProject}
                                onChange={this.handleEditInput}
                                name="pastProject"
                            />
                        </div>

                        <div className="experience inner">
                            <h4 className="student_profile_h4">Experience:</h4>
                            <ViewOrEdit
                                multiline={true}
                                editing={editingInfo}
                                className="student_profile__input"
                                type="text"
                                value={this.state.experience}
                                onChange={this.handleEditInput}
                                name="experience"
                            />
                        </div>

                        {isMe && (
                            <div className="edit inner">
                                {editingInfo ? (
                                    [
                                        <button
                                            className="student_profile__button"
                                            onClick={this.updateInfo}
                                        >
                                            Save
                                        </button>,
                                        /* Click the cancle button to go back
                                           to default mode */
                                        <button
                                            className="student_profile__button"
                                            onClick={this.changeEditMode}
                                        >
                                            Cancel
                                        </button>
                                    ]
                                ) : (
                                    <button
                                        className="student_profile__button"
                                        type="button"
                                        name="edit"
                                        onClick={this.changeEditMode}
                                    >
                                        Edit your profile
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default StudentProfile;
