import React from "react";
import ReactDOM from "react-dom";
import { Container, Header, List } from "semantic-ui-react";

import "./styles.css";

import TeamPreviewList from "./../TeamPreviewList";
import SearchForm from "./../SearchForm";
import Menu from "./../Menu";

import { filterTeams } from "../../actions/searchTeam";

class SearchTeam extends React.Component {

    state = {
        teamUniversity: "",
        teamCourse: "",
        teams: [
            { teamUniversity:"UofT", teamCourse: "CSC309", teamID: "1", teamDescription: "A+ group looking for a JS Jedi" },
            { teamUniversity:"UofT", teamCourse: "CSC207", teamID: "2", teamDescription: "Let's crash this course together!"  }
        ],
        filteredTeams: [
            { teamUniversity:"UofT", teamCourse: "CSC309", teamID: "1", teamDescription: "A+ group looking for a JS Jedi" },
            { teamUniversity:"UofT", teamCourse: "CSC207", teamID: "2", teamDescription: "Let's crush this course together!"  }
        ]
    };

    handleSearchInput = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    render() {
        const {studentId} = this.props;

        return (
            <div>
                <Menu studentId={studentId} />
            <div className="search_team_view">
                <h1 className="search_form_title">find your team</h1>

                <div className="search_form">
                <SearchForm
                    teamUniversity={this.state.teamUniversity}
                    teamCourse={this.state.teamCourse}
                    handleSearch={this.handleSearchInput}
                    filterTeams={() => filterTeams(this)}
                />
                </div>

                <TeamPreviewList teams={this.state.filteredTeams} />
            </div>
            </div>
        );
    }
}

export default SearchTeam;
