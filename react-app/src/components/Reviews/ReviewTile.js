import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetAllUsers } from "../../store/session";
import Loading from "../Loading";

const ReviewTile = ({review}) => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.session.users)

  useEffect(() => {
    dispatch(thunkGetAllUsers())
}, [dispatch])

if(!users) return <Loading/>

  return (
    <div className="review-tile-container">

    </div>
  )
}

export default ReviewTile
