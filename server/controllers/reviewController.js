const Review = require('../models/Review');

exports.addReview = async (req, res) => {
  const review = new Review(req.body);
  await review.save();
  res.json(review);
};

exports.getReviewsByBook = async (req, res) => {
  const reviews = await Review.find({ book_id: req.params.bookId });
  res.json(reviews);
};

exports.deleteReview = async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  res.json({ message: 'Review deleted' });
};