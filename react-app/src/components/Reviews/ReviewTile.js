import ReactStars from "react-stars";
import OpenModalButton from "../OpenModalButton";
import DeleteReviewModal from "../DeleteReviewModal";
import { useSelector } from "react-redux";
import Loading from "../Loading";

const ReviewTile = ({ review, film }) => {
  const user = useSelector(state => state.session.user)
  const users = useSelector(state => state.session.users)

  const formatDate = () => {
    const unFormattedDate = review.created_at.split(" ");
    const date = unFormattedDate[1];
    const month = unFormattedDate[2];
    const year = unFormattedDate[3];
    return `${date} ${month} ${year}`;
  };

  if(!users) return <Loading/>

  const findReviewUser = (review) => {
    return users.find(user => user.id === review.user_id)
  }

  const reviewUser = findReviewUser(review)

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
          {user && user.id === review.user_id && (
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
