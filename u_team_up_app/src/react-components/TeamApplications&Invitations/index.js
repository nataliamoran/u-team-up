import React from "react";
import "./styles.css";

class TeamApplicationInvitation extends React.Component {
    render() {
        return (
            <div>
        <meta charSet="utf-8" />
        <title>Applications and Invitations</title>
        <div className="box1">
          <h1>Your Applications</h1>
          <div className="application">
            <br />
            <table className="application-table">
              <tbody><tr><th>Current Applications: </th>
                  <th><button type="button" name="button">+ NEW</button></th>
                </tr></tbody><tbody>
                <tr>
                  <td>CSC309 Team 1</td>
                  <td>Accepted</td>
                </tr>
                <tr>
                  <td>CSC309 Team 2</td>
                  <td>Rejected</td>
                </tr>
                <tr>
                  <td>CSC363 Team 1</td>
                  <td>Pending</td>
                  <td><button type="button" name="button">Withdraw</button></td>
                </tr>
              </tbody>
            </table>
          </div>
          <br />
          <div className="invitations">
            <table>
              <tbody><tr><th>Current Invitations:</th>
                </tr></tbody><tbody>
                <tr>
                  <td>CSC401 Team 1</td>
                  <td><button className="accept-button" type="button" name="button">Accept</button>
                    <button className="reject-button" type="button" name="button">Reject</button></td>
                </tr>
                <tr>
                  <td>CSC401 Team 2</td>
                  <td><button className="accept-button" type="button" name="button">Accept</button>
                    <button className="reject-button" type="button" name="button">Reject</button></td>
                </tr>
                <tr>
                  <td>CSC401 Team 3</td>
                  <td><button className="accept-button" type="button" name="button">Accept</button>
                    <button className="reject-button" type="button" name="button">Reject</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="box2">
          <table>
            <tbody>
              <tr>
                <td><a href="index.html">Main</a></td>
              </tr>
              <tr>
                <td><a href="alice.html">Your Profile</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
        )
    }
}

export default TeamApplicationInvitation;