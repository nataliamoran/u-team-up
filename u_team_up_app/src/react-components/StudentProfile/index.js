import React from "react";
import "./styles.css";
import alice from "./static/alice.png"

class StudentProfile extends React.Component {
    render() {
        return (
            <div>
                <meta charSet="utf-8" />
                <title>Profile</title>
                <div className="left-box">
                <img className="profile-pic" src={alice} alt="alice photo" />

                <div className="info inner">
                <h2>Alice Alison</h2>
                <p>Student at the University of Toronto</p>
                <p>3rd year, Computer Science Specialist</p>
              </div>

              <div className="course">
                <div className="taken inner">
                  <h4>Courses Taken:</h4>
                  <ul>
                    <li>CSC207</li>
                    <li>CSC209</li>
                  </ul>
                </div>
                <div className="taking inner">
                  <h4>Currently Taking:</h4>
                  <ul>
                    <li>CSC309</li>
                    <li>CSC363</li>
                    <li>CSC401</li>
                  </ul>
                </div>
              </div>

              <div className="current-teams inner">
                <h4>Current Teams:</h4>
                <ul>
                  <li>CSC309 Team 1</li>
                </ul>
              </div>

              <div className="reviews inner">
                <h4>Reviews:</h4>
                <p><a href="bob.html">Bob Bobson</a>: I love working with Alice!💙</p>
              </div>
            </div>

            <div className="right-box">
              <div className="notifications">
                <p><a href="student_application_invitation.html">Notifications</a></p>
              </div>

              <div className="description inner">
                <h4>Description:</h4>
                <p>If you love burger like I do, add me to your team.</p>
              </div>

              <div className="more-info inner">
                <h4>Location:</h4> On campus
                <h4>GPA:</h4> 3.5/4.0
                <h4>Past Project:</h4> Todo list
              </div>

              <div className="experience inner">
                <h4>Experience:</h4>
                <ul>
                  <li>Teaching Assistant</li>
                </ul>
                <h4>Resume: <a href="#">Link</a></h4>
              </div>

              <div className="edit inner">
                <p>Click <button type="button" name="edit">here</button> to edit your profile</p>
              </div>
            </div>
          </div>
        )
    }
}

export default StudentProfile;
