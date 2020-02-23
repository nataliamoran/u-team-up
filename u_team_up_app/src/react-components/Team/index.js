import React from "react";

import "./styles.css";
import TeamMemberPreviewList from "./../TeamMemberPreviewList";
import Button from "@material-ui/core/Button/Button";
import {Link} from "react-router-dom";
import Menu from "../Menu";
import Header from '../Header';

class Team extends React.Component {

    // @param {team: Object}
    constructor(props) {
        super(props);

        
    }

    render() {
        const { team } = this.props;

        return (
            <div className="team">
                <Header type='main' title='team: ' data={ `${team.university} ${team.course}` }>
                    <Link className="team_page__link" to={"/team/${team.id}/edit"}>
                        <Button variant="outlined" color="primary"
                                className="team_page__button">edit team profile</Button>
                    </Link>
                    <Link className="team_page__link" to={`/team/${team.id}/appointment`}>
                        <Button variant="outlined" color="primary"
                                className="team_page__button">team calendar</Button>
                    </Link>
                    <Link className="team_page__link" to={"/team/${team.id}/application"}>
                        <Button variant="outlined" color="primary"
                                className="team_page__button">applications</Button>
                    </Link>
                </Header>

                <div className="body">
                    <h2 className="header__description">description:</h2>
                    <p className="header__team_description">{team.description}</p>

                    <TeamMemberPreviewList members={team.members}/>
                </div>
            </div>
        );
    }
}

export default Team;
