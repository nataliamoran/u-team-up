import React from "react";

import "./styles.css";

import TeamPreviewList from "./../TeamPreviewList";
import SearchForm from "./../SearchForm";
import Menu from "./../Menu";

import { filterTeams } from "../../actions/searchTeam";

class SearchTeam extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            teamUniversity: "",
            teamCourse: "",
            teams: [ // TODO: FETCH
                { teamUniversity:"UofT", teamCourse: "CSC309", teamId: "1", teamDescription: "A+ group looking for a JS Jedi" },
                { teamUniversity:"UofT", teamCourse: "CSC207", teamId: "2", teamDescription: "Let's crash this course together!"  }
            ],
        }

        this.state.filteredTeams = Array.from(this.state.teams);
    }

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
