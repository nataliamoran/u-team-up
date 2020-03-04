export const filterUniversities = search => {

    const university = {
        name: search.state.universityName,
        id: search.state.universityId,
    };


    const newlyFilteredUniversities = search.state.universities.filter(s => {
        return !(s.universityName === university.name &&
            s.adminId === university.Id &&
            (university.name === "" && university.Id === "") ||
            (s.universityName === university.name) ||
            (s.universityId === university.id));
    });

    search.setState({
        filteredUniversities: newlyFilteredUniversities
    });

};

export const addUniversities = search => {

    const university = {
        name: search.state.universityName1,
        id: search.state.universityId1,
    };

    const newlyFilteredUniversities = search.state.universities;
    newlyFilteredUniversities.push({universityName: university.name, universityId: university.id});

    search.setState({
        filteredUniversities: newlyFilteredUniversities
    });

};