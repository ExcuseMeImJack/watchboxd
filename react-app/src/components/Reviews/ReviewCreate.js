import ReviewForm from "./ReviewForm";
import Loading from "../Loading";

const ReviewCreate = ({film}) => {
  const review = {
    review: "",
    rating: 0
  }

  if(!review) return <Loading/>

  return (
    <ReviewForm reviewInfo={review} formType={'create'} film={film}/>
  )
}

export default ReviewCreate
