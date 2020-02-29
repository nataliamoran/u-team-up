export const filterUnits = (criteria, studentOrTeamList) => {
    return Object.keys(criteria).filter(c => criteria[c]).reduce((accumulator, c) => accumulator.filter(unit => unit[c] === criteria[c]), studentOrTeamList)
};
