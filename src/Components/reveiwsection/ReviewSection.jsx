import { Fragment, useState } from "react";
import { FaStar, FaStarHalfAlt, FaThumbsDown, FaThumbsUp, FaUser } from "react-icons/fa";
import PropTypes from "prop-types";
import { useGetReviewsByProductIdQuery, useAddReviewMutation, useLikeReviewMutation, useDislikeReviewMutation } from '../../redux/api/reviewAPI.js';
import { useSelector } from 'react-redux'; 
import { toast } from 'react-toastify'; 
import "./ReviewSection.css";

const Rating = ({ rating }) => (
  <p className="review-rating">
    <span>
      {[...Array(5)].map((_, i) => {
        const index = i + 1;
        let comment = "";
        if (index <= Math.floor(rating)) {
          comment = <FaStar key={i} className="filled" />;
        } else if (rating > i && rating < index + 1) {
          comment = <FaStarHalfAlt key={i} className="half-filled" />;
        } else {
          comment = <FaStar key={i} className="empty" />;
        }
        return <Fragment key={i}>{comment}</Fragment>;
      })}
    </span>
  </p>
);

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
};

const ReviewItem = ({ item, onLike, onDislike }) => (
  <div className="review-item">
    <div className="review-user">
      <FaUser className="review-avatar" />
      <div className="review-details">
        <h5 className="review-name">{item.userId.name}</h5> 
        <Rating rating={item.rating} />
        <p className="review-date">Comment At: {new Date(item.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
    <div className="review-text">{item.comment}</div>
    <div className="review-actions">
      <button onClick={() => onLike(item._id)} className="review-button">
        <FaThumbsUp />
        {item.likes} {/* Display number of likes */}
      </button>
      <button onClick={() => onDislike(item._id)} className="review-button">
        <FaThumbsDown />
        {item.dislikes} {/* Display number of dislikes */}
      </button>
    </div>
  </div>
);

ReviewItem.propTypes = {
  item: PropTypes.object.isRequired,
  onLike: PropTypes.func.isRequired,
  onDislike: PropTypes.func.isRequired,
};

const ReviewSection = ({ productId }) => {
  const { data: { reviews } = { reviews: [] }, isLoading, isError } = useGetReviewsByProductIdQuery(productId);
  const [addReview] = useAddReviewMutation();
  const [likeReview] = useLikeReviewMutation();
  const [dislikeReview] = useDislikeReviewMutation();
  
  const user = useSelector((state) => state.user.user);
  const userId = user ? user._id : null; 

  const [visibleReviews, setVisibleReviews] = useState(5);
  const [commentText, setCommentText] = useState("");
  const [rating, setRating] = useState(0);

  const loadMoreComments = () => {
    setVisibleReviews((prev) => prev + 5);
  };

  const handleSubmit = async () => {
    if (!userId) {
      toast.error('User not logged in.'); 
      return;
    }
    if (!commentText.trim() || rating === 0) {
      toast.error('Comment and rating are required.'); 
      return;
    }

    const reviewData = {
      productId,
      comment: commentText,
      rating,
      userId,
    };

    try {
      await addReview(reviewData).unwrap();
      setCommentText("");
      setRating(0);
      toast.success('Review submitted successfully!'); 
    } catch (error) {
      console.error('Failed to submit review: ', error);
      toast.error('Failed to submit review.'); 
    }
  };

  const handleLike = async (reviewId) => {
    try {
      await likeReview(reviewId).unwrap();
      toast.success('Review liked!'); 
    } catch (error) {
      console.error('Failed to like review: ', error);
      toast.error('Failed to like review.'); 
    }
  };

  const handleDislike = async (reviewId) => {
    try {
      await dislikeReview(reviewId).unwrap();
      toast.success('Review disliked!'); 
    } catch (error) {
      console.error('Failed to dislike review: ', error);
      toast.error('Failed to dislike review.'); 
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading reviews.</p>;

  return (
    <section className="review-section">
      <div className="review-container">
        <div className="review-header">
          <h2 className="review-title">Reviewer Recommendation</h2>
          <div className="review-recommendation">91%</div>
          <p className="review-subtitle">
            Recommended by {reviews.length} reviewers.
          </p>
          <div className="review-average">
            <span>
              Average Rating: {reviews.length > 0 ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1) : 0}
            </span>
            <Rating rating={reviews.length > 0 ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length) : 0} />
          </div>
        </div>

        <div className="new-review">
          <div className="rating-input">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={i < rating ? "active" : "inactive"}
                onClick={() => setRating(i + 1)}
              />
            ))}
          </div>
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write your comment"
            className="comment-input"
          />
          <button onClick={handleSubmit} className="submit-button">
            Submit New Comment
          </button>
        </div>

        {reviews.length > 0 ? (
          reviews.slice(0, visibleReviews).map((item) => (
            <ReviewItem 
              item={item} 
              key={item._id} 
              onLike={handleLike} 
              onDislike={handleDislike} 
            />
          ))
        ) : (
          <p>No reviews available for this product.</p>
        )}
        
        {visibleReviews < reviews.length && (
          <button onClick={loadMoreComments} className="load-more">
            Load More Comments
          </button>
        )}
      </div>
    </section>
  );
};

export default ReviewSection;
