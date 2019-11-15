const assert = require('assert');
const Test = require('../mongodb_schemas/Test'); //imports the Pokemon model.
describe('Creating data', () => {
    it('creates a test data', () => {
        //assertion is not included in mocha so
        //require assert which was installed along with mocha
        const test = new Test({ name: 'Pickachu' });
        test.save() //takes some time and returns a promise
            .then(() => {
                assert(!test.isNew); //if poke is saved to db it is not new
                done();
            });
    });
});
