const Article = require('../models/article');

exports.create = function(req, res) {
  const article = new Article(req.body);
  article.save(function (err) {
    if (err) return res.status(500).send('Error when save');
    res.send({ message: 'Article created' });
  });
};

exports.findAll = function(req, res) {
  Article.find(function (err, articles) {
    if (err) return console.error(err);
    res.json(articles);
  });
};

exports.findOne = function(req, res) {
  const query = { _id: req.params.id };
  Article.findOne(query, function (err, article) {
    if (err) return res.status(404).send('Article not found');
    res.json(article);
  });
};

exports.update = function(req, res) {
  const article = req.body;
  const query = { _id: req.params.id };
  Article.findOneAndUpdate(query, { $set: { name: article.name, price: article.price } }, {}, (err) => {
    if (err) return res.status(500).send('Error when update');
    res.send({ message: 'Article updated' });
  });
};

exports.delete = function(req, res) {
  const query = { _id: req.params.id };
  Article.remove(query, (err) => {
    if (err) return res.status(404).send('Article not found');
    res.send({ message: 'Article deleted' });
  });
};
