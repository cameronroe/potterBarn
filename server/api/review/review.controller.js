'use strict';

var _ = require('lodash');
var Review = require('./review.model');

// Get list of reviews
exports.index = function(req, res) {
  var queryObj = req.query;
   // { user_id: 12312313123 }
  Review.find(queryObj, function (err, reviews) {
    if(err) { return handleError(res, err); }
    return res.json(200, reviews);
  });
};

// Get a single review
exports.show = function(req, res) {
  console.log('this is what is hitting the show function:', req.body)
  Review.findById(req.params.id, function (err, review) {
    if(err) { return handleError(res, err); }
    if(!review) { return res.send(404); }
    return res.json(review);
  });
};

//Get reviews for single product
exports.productReviews = function(req, res){
  Review.reviewsByProduct(req.params, function(err, reviews){
    if(err) { return handleError(res, err); }
    if(!reviews) { return res.send(404); }
    return res.json(reviews);
  });
};

// Creates a new review in the DB.
exports.create = function(req, res) {
  Review.create(req.body, function(err, review) {
    if(err) { return handleError(res, err); }
    return res.json(201, review);
  });
};

// Updates an existing review in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Review.findById(req.params.id, function (err, review) {
    if (err) { return handleError(res, err); }
    if(!review) { return res.send(404); }
    var updated = _.merge(review, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, review);
    });
  });
};

// Deletes a review from the DB.
exports.destroy = function(req, res) {
  Review.findById(req.params.id, function (err, review) {
    if(err) { return handleError(res, err); }
    if(!review) { return res.send(404); }
    review.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}