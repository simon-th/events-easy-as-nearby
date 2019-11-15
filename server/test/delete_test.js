const assert = require('assert');
const Test = require('../mongodb_schemas/Test');
describe('Deleting a data', () => {

  let test;

  beforeEach((done) => {
    test = new Test({ name: 'poke' });
    test.save()
      .then(() => done());
  });

  it('removes multiple data', (done) => {
    Test.remove({ name: 'poke' })
      .then(() => Test.findOne({ name: 'poke' }))
      .then((test) => {
        assert(test === null);
        done();
      });
  });

  it('removes a data', (done) => {
    Test.findOneAndRemove({ name: 'poke' })
      .then(() => Test.findOne({ name: 'poke' }))
      .then((test) => {
        assert(test === null);
        done();
      });
  });

})
