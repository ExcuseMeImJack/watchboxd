import Loading from "../Loading"
import ReviewForm from "./ReviewForm"

const ReviewUpdate = ({review, film}) => {
  return (
    <ReviewForm reviewInfo={review} formType={'update'} film={film}/>
  )
}

export default ReviewUpdate
