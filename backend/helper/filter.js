const match = (unit, criterion) => {
    if (Array.isArray(unit)) {
        return unit.some(u => match(u, criterion));
    }
    if (typeof(criterion) === 'string') {
        return typeof(unit) === 'string' && unit.includes(criterion);
    } else {
        return unit === criterion;
    }
};

match.all = (criteria) => (
    unit => Object.keys(criteria)
        .every(c => match(unit[c], criteria[c])));

match.allValid = (criteria) => {
    const newCriteria = {};
    Object.keys(criteria)
        .filter(c => criteria[c] !== undefined
                && criteria[c] !== '')
        .forEach(c => newCriteria[c] = criteria[c]);

    return match.all(newCriteria);
}

const filter = (criteria, list) =>
      list.filter(match.allValid(criteria));

module.exports = {
    filter,
    match,
};
