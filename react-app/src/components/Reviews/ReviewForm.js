import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  thunkCreateReviewByFilmId,
  thunkGetAllFilmReviews,
  thunkUpdateReviewById,
} from "../../store/reviews";
import Loading from "../Loading";
import "./Reviews.css";
import ReactStars from "react-stars";
import { thunkGetFilmById } from "../../store/films";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import OpenModalButton from "../OpenModalButton";
import DeleteReviewModal from "../DeleteReviewModal";

const ReviewForm = ({ reviewInfo, formType, film }) => {
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const [reviewCharCount, setReviewCharCount] = useState(
    reviewInfo.review.length ? reviewInfo.review.length : 0
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [review, setReview] = useState(
    reviewInfo.review ? reviewInfo.review : ""
  );
  const [rating, setRating] = useState(
    reviewInfo.rating ? reviewInfo.rating : 0
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const err = {};
    if (rating === 0) err.rating = "A star rating must be selected";
    if (rating > 5) err.rating = "The star rating must be 5 or less stars";
    if (review.length < 5) err.review = "A review must be atleast 5 characters";
    if (review.length > 250)
      err.review = "A review must be less than 250 characters";
    setErrors(err);
    if (review.length > 0 || reviewCharCount > 0) {
      if (review && review.length >= reviewCharCount)
        setReviewCharCount((count) => count + 1);
      if (review.length <= reviewCharCount)
        setReviewCharCount((count) => count - 1);
    }
    if (review.length === 0) setReviewCharCount(0);
  }, [rating, review]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (Object.keys(errors).length < 1) {
      const formData = new FormData();
      formData.append("review", review);
      formData.append("rating", rating);
      if (formType === "create") {
        const createdReview = await dispatch(
          thunkCreateReviewByFilmId(formData, film.id)
        );
        await dispatch(thunkGetFilmById(film.id));
        await dispatch(thunkGetAllFilmReviews(film.id));
      } else if (formType === "update") {
        const updatedReview = await dispatch(
          thunkUpdateReviewById(formData, reviewInfo.id)
        );
        await dispatch(thunkGetFilmById(film.id));
        await dispatch(thunkGetAllFilmReviews(film.id));
      }
    }
  };

  const changeRating = (newRating) => {
    setRating(newRating);
  };

  return (
    <div className="review-form-container">
      {formType === "create" ? (
        <h2>Create a New Review</h2>
      ) : (
        <h2>Update Your Review</h2>
      )}

      <form onSubmit={handleSubmit}>
        <div className="review-form-review">
          <textarea
            value={review}
            onChange={(e) => {
              setReview(e.target.value);
            }}
          />
          <div className="review-char-counter">
            <p>{reviewCharCount}/250</p>
          </div>
        </div>
        <div className="review-form-rating">
          <ReactStars
            count={5}
            value={rating}
            color2="#23ce31"
            size={36}
            onChange={changeRating}
          />
        </div>
        <div className="review-form-submit">
          {formType === "create" ? (
            <button
              className={
                Object.keys(errors).length > 0
                  ? "button-disabled-review"
                  : "button-enabled-review change-cursor"
              }
              disabled={Object.keys(errors).length > 0}
            >
              Submit Review
            </button>
          ) : (
            <div className="review-tile-update-delete-buttons">
              <button
                className={
                  Object.keys(errors).length > 0
                    ? "button-disabled-review"
                    : "button-enabled-review change-cursor"
                }
                disabled={Object.keys(errors).length > 0}
              >
                Update Review
              </button>
              <OpenModalButton
                buttonStyleClass={"delete-review change-cursor"}
                buttonText={"Delete Review"}
                modalComponent={<DeleteReviewModal review={reviewInfo} film={film}/>}
                modalStyleClass={"delete-profile-modal-content"}
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
