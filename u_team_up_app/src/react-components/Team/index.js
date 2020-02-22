import React from "react";

import "./styles.css";
import TeamMemberPreviewList from "./../TeamMemberPreviewList";
import Button from "@material-ui/core/Button/Button";
import {Link} from "react-router-dom";

class Team extends React.Component {

    state = {
        id: "1",
        university: "UofT",
        course: "CSC309",
        description: "A+ group looking for a JS Jedi",
        members: [
            {name: "Tom", photo: "./static/boy.png"},
            {name: "Kate", photo: "./static/girl.png"}
        ]
    };

    render() {

        return (
            <div className="team">
                <div className="header">
                    <h1 className="header__team">team: </h1>
                    <p className="header__team_data"> {this.state.university} {this.state.course}</p>
                    <div className="team_page__menu_buttons">
                        <Link className="team_page__link" to={"./"}>
                            <Button variant="outlined" color="primary"
                                    className="team_page__button">edit team profile</Button>
                        </Link>
                        <Link className="team_page__link" to={"/team/appointment"}>
                            <Button variant="outlined" color="primary"
                                    className="team_page__button">team calendar</Button>
                        </Link>
                        <Link className="team_page__link" to={"./"}>
                            <Button variant="outlined" color="primary"
                                    className="team_page__button">applications</Button>
                        </Link>
                    </div>
                </div>
                <div className="body">
                    <h2 className="header__description">description:</h2>
                    <p className="header__team_description">{this.state.description}</p>

                    <TeamMemberPreviewList members={this.state.members}/>
                </div>
            </div>
        );
    }
}

export default Team;
