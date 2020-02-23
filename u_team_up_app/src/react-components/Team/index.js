import React from "react";

import "./styles.css";
import TeamMemberPreviewList from "./../TeamMemberPreviewList";
import Button from "@material-ui/core/Button/Button";
import {Link} from "react-router-dom";
import Header from '../Header';

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
                <Header type='main' title='team: ' data={ `${this.state.university} ${this.state.course}` }>
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
                </Header>

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
