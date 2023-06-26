from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Review
from .auth_routes import validation_errors_to_error_messages
from ..forms import UpdateReviewForm

review_routes = Blueprint('reviews', __name__)

@review_routes.route('')
def reviews():
    """
    Query for all the reviews and returns then in a list of review dictionaries
    """
    reviews = Review.query.all()
    return {'reviews': [review.to_dict() for review in reviews]}

@review_routes.route('/<int:id>')
def review_by_id(id):
    """
    Query for a review by the review id and returns a film in a dictionary
    """
    review = Review.query.get(id)

    if not review:
        return {'errors': ['Review does not exist']}, 404

    return review.to_dict()

# CREATE IN THE FILM ROUTES

@review_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_review(id):
    """
    Update a Review by id if the review belongs to the current user and returns the updated review in a dictionary
    """
    review = Review.query.get(id)

    if not review:
        return {'errors': ['Review does not exist']}, 404

    if review.user_id == current_user.id:
        form = UpdateReviewForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            if(form.data["review"]):
                review.review = form.data["review"]
            if(form.data["rating"]):
                review.rating = form.data["rating"]
            db.session.commit()
            return review.to_dict()
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    return {'errors': ["Unauthorized"]}

@review_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_review(id):
    """
    Delete a review by id if the list belongs to the current user and returns a message when it deletes
    """
    review = Review.query.get(id)

    if not list:
        return {'errors': ['Review does not exist']}, 404

    if review.user_id == current_user.id:
        db.session.delete(review)
        db.session.commit()
        return {'message': 'Successfully deleted!'}
    else:
        return {'errors': ['Unauthorized']}
