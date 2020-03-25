// Method to filter Student List or Team List based on the Criteria
const stringSimilarity = require('string-similarity');

export const filterUnits = (criteria, studentOrTeamList) => {
    return Object.keys(criteria).filter(c => criteria[c]).reduce(
        (accumulator, c) => accumulator.filter(unit =>
            (stringSimilarity.compareTwoStrings(unit[c].toLowerCase(), criteria[c].toLowerCase()) > 0.5)
            || (Array.isArray(unit[c])
            && !(unit[c].filter(
                subUnit => (stringSimilarity.compareTwoStrings(subUnit.toLowerCase(), criteria[c].toLowerCase()) > 0.5)).length === 0))
        ),
        studentOrTeamList)
};
