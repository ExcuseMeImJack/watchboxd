import ReactStars from "react-stars";

const ReviewTile = ({review, reviewUser}) => {

  const formatDate = () => {
    const unFormattedDate = review.created_at.split(" ");
    const date = unFormattedDate[1]
    const month = unFormattedDate[2]
    const year = unFormattedDate[3]
    return (`${date} ${month} ${year}`)
  }

  return (
    <div className="review-tile-container">
      <div className="review-user-profile-pic">
        <img id="review-tile-profile-image" src={reviewUser.profile_img_url}/>
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
          <p>Reviewed by <strong>{reviewUser.username}</strong></p>
          <p>{formatDate()}</p>
        </div>
        <p>{review.review}</p>
      </div>
    </div>
  )
}

export default ReviewTile
