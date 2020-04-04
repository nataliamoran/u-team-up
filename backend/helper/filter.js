const match = (unit, criterion) => {
    if (Array.isArray(unit)) {
        return unit.some(u => match(u, criterion));
    }
    if (typeof(criterion) === 'string') {
        return typeof(unit) === 'string' && unit.toLowerCase().includes(criterion.toLowerCase());
    } else {
        return unit === criterion;
    }
};

match.all = (criteria) => (
    unit => Object.keys(criteria)
        .every(c => match(unit[c], criteria[c])));

const criterionValid =
      c => c !== undefined && c !== '';

const validCriteria = (criteria) => {
    const newCriteria = {};
    Object.keys(criteria)
        .filter(c => criterionValid(criteria[c]))
        .forEach(c => newCriteria[c] = criteria[c]);

    return newCriteria;
}

match.allValid = (criteria) =>
    match.all(validCriteria(criteria));

const filter = (criteria, list) =>
      list.filter(match.allValid(criteria));

module.exports = {
    filter,
    match,
    validCriteria,
};
