const test = require('unit.js');

const assert = test.assert;

const { filter, match } = require('../helper/filter');

describe('match()', () => {
    it('Matching numbers', () => {
        assert(match(50, 50));
        assert(! match(50, 25));
    });

    it('Matching strings', () => {
        assert(match('test', 'es'));
        assert(! match('test', 'u'));
        assert(match('test', ''));
        assert(match('', ''));
        assert(! match('', 'test'));
    });

    it('Matching arrays', () => {
        assert(match([50, 25, 1], 1));
        assert(! match([50, 25, 1], 70));
        assert(match(['uuuu', 'wwww', 'zzzz'], 'u'));
        assert(! match(['uuuu', 'wwww', 'zzzz'], 'k'));
    });
});

const obj1 = { a: 'bbbbb', b: ['test1', 'test3'], c: 50 };
const obj2 = { a: 'bb', b: ['t5', 't3'] };
const list1 = [obj1, obj2];


describe('match.all()', () => {
    it('One criterion', () => {
        test.assert(match.all({ a: 'b' })(obj1));
    });

    it('Two criteria', () => {
        test.assert(match.all({ a: 'b', b: '1' })(obj1));
    });
});

describe('match.allValid()', () => {
    it('Invalid criteria', () => {
        test.assert(match.allValid({ a: '', c: undefined })(obj1));
    });
});

describe('filter()', () => {
    it('Filter list', () => {
        test
            .array(filter({ b: '1' }, list1))
            .is([obj1])

            .array(filter({ b: '', c: 50 }, list1))
            .is([obj1])

            .array(filter({ b: undefined, c: 0 }, list1))
            .is([])
        ;
    });
});
