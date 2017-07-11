const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const Article = require('../models/article');


const should = chai.should();
chai.use(chaiHttp);

const ARTICLES_URL = '/api/articles';

describe('Test for article', function() {

  beforeEach(function(done) {
    const query = { };
    Article.remove(query, (err) => {
      if (err) return done(err);
      done();
    });
  });

  it('should create article without err', function(done) {
    chai.request(app)
    .post(ARTICLES_URL)
    .send({
      title: 'title1',
      content: 'content1',
    })
    .end((err, res) => {
      // console.log('------>', res);
      should.not.exist(err);
      res.should.have.status(200);
      done();
    });
  });

  it('should return 1 article in array', function(done) {

    const article = new Article({
      title: 'title1',
      content: 'content1',
    });

    article.save(function (err) {
      if (err) return done(err);
      chai.request(app)
      .get(ARTICLES_URL)
      .end((err, res) => {
        // console.log('------>', res);
        should.not.exist(err);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.should.have.lengthOf(1);
        done();
      });
    });
  });
});
