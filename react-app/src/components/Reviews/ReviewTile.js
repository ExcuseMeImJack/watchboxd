import ReactStars from "react-stars";
import OpenModalButton from "../OpenModalButton";
import DeleteReviewModal from "../DeleteReviewModal";
import { useSelector } from "react-redux";

const ReviewTile = ({ review, reviewUser, film }) => {
  const user = useSelector(state => state.session.user)
  const formatDate = () => {
    const unFormattedDate = review.created_at.split(" ");
    const date = unFormattedDate[1];
    const month = unFormattedDate[2];
    const year = unFormattedDate[3];
    return `${date} ${month} ${year}`;
  };

  return (
    <div className="review-tile-container">
      <div className="review-user-profile-pic">
        <img id="review-tile-profile-image" src={reviewUser.profile_img_url} />
      </div>
      <div className="review-tile-info">
        <div className="review-tile-details">
          <ReactStars
            id="real-star-rating"
            count={5}
            edit={false}
            value={review.rating}
            size={18}
            color2={"#23ce31"}
          />
          <p>
            Reviewed by <strong>{reviewUser.username}</strong>
          </p>
          <p>{formatDate()}</p>
          {user.id === review.user_id && (
            <OpenModalButton
              buttonStyleClass={"delete-review change-cursor"}
              buttonText={"Delete Review"}
              modalComponent={<DeleteReviewModal review={review} film={film} />}
              modalStyleClass={"delete-profile-modal-content"}
            />
          )}
        </div>
        <p>{review.review}</p>
      </div>
    </div>
  );
};

export default ReviewTile;
