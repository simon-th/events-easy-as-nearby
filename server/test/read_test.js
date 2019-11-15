const assert = require('assert');
const Test = require('../mongodb_schemas/Test');
let test;
beforeEach(() => {
    test = new Test({  name: 'poke' });
    test.save()
        .then(() => done());
});
describe('Reading data details', () => {
    it('finds test data with the name of poke', () => {
        Test.findOne({ name: 'poke' })
            .then((tests) => {
                assert(test.name === 'poke');
                done();
            });
    })
})
