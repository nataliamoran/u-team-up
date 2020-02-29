// Method to filter Student List or Team List based on the Criteria

export const filterUnits = (criteria, studentOrTeamList) => {
    return Object.keys(criteria).filter(c => criteria[c]).reduce(
        (accumulator, c) => accumulator.filter(unit =>
            (unit[c] === criteria[c]) ||
            (Array.isArray(unit[c]) &&
            !(unit[c].filter(subUnit => subUnit === criteria[c]).length === 0))
        ),
        studentOrTeamList)
};
