import React from "react";
import "./styles.css";

class Login extends React.Component {

    render() {
        return (
      <div>
        <meta charSet="utf-8" />
        <title>UTeamUp Login</title>
        <div className="content">
          <h1>UTeamUp</h1>
          <form className="login" action="index.html" method="post">
            {/* UTORid */}
            <label htmlFor="utorid">UTORID</label>
            <br />
            <input className="login_input" type="text" name="utorid" defaultValue />
            <br /><br />
            {/* password */}
            <label htmlFor="password">PASSWORD</label>
            <br />
            <input className="login_input" type="text" name="password" defaultValue />
            <br /><br />
            {/* login button */}
            <input className="login_button" type="submit" name="login" defaultValue="Login" />
          </form>
          <p>Don't have an account?</p>
          <p>Click to <a href="./../SignUp">SignUp</a>!</p>
        </div>
      </div>
    );
    }
}

export default Login;
