export const filterTeams = search => {

    const team = {
        university: search.state.teamUniversity,
        course: search.state.teamCourse
    };


    const newlyFilteredTeams = search.state.teams.filter(t => {
        return (t.teamUniversity === team.university && t.teamCourse === team.course) ||
            (team.university==="" && team.course==="") ||
            (team.university==="" && t.teamCourse === team.course) ||
            (t.teamUniversity === team.university && team.course==="");
    });

    search.setState({
        filteredTeams: newlyFilteredTeams
    });

};
