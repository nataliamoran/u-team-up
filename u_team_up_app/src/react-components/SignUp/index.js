import React from "react";
import "./styles.css";

class Signup extends React.Component {
    render() {
        return (
      <div>
        <meta charSet="utf-8" />
        <title>SignUp</title>

        <div className="content">
          <h1>UTeamUp SignUp</h1>
          <form className="login" action="./../SearchTeam" method="post">
            {/* UTORid */}
            <label htmlFor="utorid">UTORID</label>
            <br />
            <input className="login_input" type="text" name="utorid" defaultValue />
            <br /><br />

            <label htmlFor="uni">UNIVERSITY</label>
            <br />
            <input className="login_input" type="text" name="uni" defaultValue />
            <br /><br />

            <label htmlFor="email">UNIVERSITY EMAIL</label>
            <br />
            <input className="login_input" type="text" name="email" defaultValue />
            <br /><br />

            {/* password */}
            <label htmlFor="password">PASSWORD</label>
            <br />
            <input className="login_input" type="text" name="password" defaultValue />
            <br /><br />

            <label htmlFor="confirm_password">CONFIRM PASSWORD</label>
            <br />
            <input className="login_input" type="text" name="confirm_password" defaultValue />
            <br /><br />

            {/* login button */}
            <input className="login_button" type="submit" name="signup" defaultValue="Signup" />
          </form>
        </div>
      </div>
    );
    }
}

export default Signup;
