const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
chai.use(chaiHttp);

const ARTICLES_URL = '/articles';

describe('Test for article', function() {
  it('should return 2 articles', function(done) {
    chai.request(app)
    .get(ARTICLES_URL)
    .then((result) => {
      result.should.have.lengthOf(2);
    });
  });
});
