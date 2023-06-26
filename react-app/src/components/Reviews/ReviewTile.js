import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetAllUsers } from "../../store/session";
import Loading from "../Loading";
import ReactStars from "react-stars";

const ReviewTile = ({review}) => {
  const dispatch = useDispatch();
  const users = useSelector(state =>  state.session.users)

  useEffect(() => {
    dispatch(thunkGetAllUsers())
  }, [dispatch])

  if(!users) return <Loading/>
  const user = users.find(user => user.id === review.user_id)

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
        <img id="review-tile-profile-image" src={user.profile_img_url}/>
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
          <p>Reviewed by <strong>{user.username}</strong></p>
          <p>{formatDate()}</p>
        </div>
        <p>{review.review}</p>
      </div>
    </div>
  )
}

export default ReviewTile
