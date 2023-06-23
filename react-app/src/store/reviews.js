const GET_ALL_REVIEWS = "reviews/GET_REVIEWS"
const GET_FILM_REVIEWS = "reviews/GET_FILM_REVIEWS"
const GET_USER_REVIEWS = "reviews/GET_USER_REVIEWS"
const GET_REVIEW = "reviews/GET_REVIEW"
const CREATE_REVIEW = "reviews/CREATE_REVIEW"
const DELETE_REVIEW = "reviews/DELETE_REVIEW"

const actionGetAllReviews = (reviews) => ({
  type: GET_ALL_REVIEWS,
  payload: reviews
})

const actionGetFilmReviews = (reviews) => ({
  type: GET_FILM_REVIEWS,
  payload: reviews
})

const actionGetUserReviews = (reviews) => ({
  type: GET_USER_REVIEWS,
  payload: reviews
})

const actionGetOneReview = (review) => ({
  type: GET_REVIEW,
  payload: review
})

const actionCreateReview = (newReview) => ({
  type: CREATE_REVIEW,
  payload: newReview
})

const actionDeleteReview = (review) => ({
  type: DELETE_REVIEW,
  payload: review
})

export const thunkGetAllReviews = () => async(dispatch) => {
  const res = await fetch('/api/reviews')
  if(res.ok){
    const reviews = await res.json();
    dispatch(actionGetAllReviews(reviews));
    return reviews;
  } else {
    const errors = await res.json();
    return errors;
  }
}

export const thunkGetAllFilmReviews = (filmId) => async(dispatch) => {
  const res = await fetch(`/api/films/${filmId}/reviews`)
  if(res.ok){
    const reviews = await res.json();
    dispatch(actionGetFilmReviews(reviews));
    return reviews;
  } else {
    const errors = await res.json();
    return errors;
  }
}

export const thunkGetAllUserReviews = () => async(dispatch) => {
  const res = await fetch('/api/users/reviews')
  if(res.ok){
    const reviews = await res.json();
    dispatch(actionGetUserReviews(reviews));
    return reviews;
  } else {
    const errors = await res.json();
    return errors;
  }
}

export const thunkGetReviewById = (reviewId) => async(dispatch) => {
  const res = await fetch(`/api/reviews/${reviewId}`)
  if(res.ok){
    const review = await res.json();
    dispatch(actionGetOneReview(review))
    return review;
  } else {
    const errors = await res.json();
    return errors;
  }
}

export const thunkCreateReviewByFilmId = (review, filmId) => async(dispatch) => {
  const res = await fetch(`/api/films/${filmId}/reviews`, {
    method: "POST",
    body: review
  })
  if(res.ok){
    const newReview = await res.json();
    dispatch(actionCreateReview(newReview));
    return newReview;
  } else {
    const errors = await res.json();
    return errors;
  }
}

export const thunkUpdateReviewById = (review, reviewId) => async(dispatch) => {
  const res = await fetch(`/api/reviews/${reviewId}`, {
    method: "PUT",
    body: review
  })
  if(res.ok){
    const updatedReview = await res.json();
    return updatedReview;
  } else {
    const errors = await res.json();
    return errors;
  }
}

export const thunkDeleteReviewById = (review) => async(dispatch) => {
  const res = await fetch(`/api/reviews/${review.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })
  if(res.ok){
    const data = await res.json();
    if(data.errors) return data.errors;
    dispatch(actionDeleteReview(review))
  }
}

const initialState = { reviews: null}
export default function reducer(state = initialState, action){
  switch(action.type){
    case GET_ALL_REVIEWS: {
      const newState = {...state, reviews: action.payload.reviews}
      return newState
    }
    case GET_FILM_REVIEWS: {
      const newState = {...state, reviews: action.payload.reviews}
      return newState
    }
    case GET_USER_REVIEWS: {
      const newState = {...state, reviews: action.payload.reviews}
      return newState
    }
    case GET_REVIEW: {
      const newState = {...state, reviews: action.payload.review}
      return newState
    }
    case CREATE_REVIEW: {
      const newState = {...state, reviews: action.payload.newReview}
      return newState
    }
    case DELETE_REVIEW: {
      const newState = {...state}
      delete newState[action.review]
      return newState
    }
    default:
      return state
  }
}
