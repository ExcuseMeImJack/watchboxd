from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Film, Review
from ..forms import CreateReviewForm, UpdateReviewForm, CreateFilmForm, EditFilmForm
from app.api.aws_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3
from .auth_routes import validation_errors_to_error_messages

film_routes = Blueprint('films', __name__)

@film_routes.route('/<int:id>/reviews')
def film_reviews(id):
    """
    Query for all reviews for a film by film id
    """
    film = Film.query.get(id)

    if not film:
        return {'errors': ['Film does not exist']}, 404

    reviews = Review.query.filter(Review.film_id == id)
    return {'reviews': [review.to_dict() for review in reviews]}

@film_routes.route('/<int:id>/reviews', methods=['POST'])
@login_required
def create_review(id):
    """
    Create a review that will assign the current user as it's creator as well as assigning the film. Then returns the created review in a dictionary
    """
    form = CreateReviewForm()
    film = Film.query.get(id)

    print("\n\n\n\n\n\n\n\n")
    print(form.data["review"])
    print(form.data["rating"])

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review(
            review=form.data["review"],
            rating=form.data["rating"],
            user_id=current_user.id,
            film_id=film.id
        )

        db.session.add(review)
        db.session.commit()
        return review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@film_routes.route('')
def films():
    """
    Query for all the films and returns them in a list of film dictionaries
    """
    films = Film.query.all()
    return {'films': [film.to_dict() for film in films]}

@film_routes.route('/<int:id>')
def film_by_id(id):
    """
    Query for a film by the film id and returns a film in a dictionary
    """
    film = Film.query.get(id)

    if not film:
         return {'errors': ['Film does not exist']}, 404

    return film.to_dict()

@film_routes.route('', methods=['POST'])
@login_required
def create_film():
    """
    Create a film that will assign the current user as it's creator and returns the created film in a dictionary
    """
    form = CreateFilmForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        film = Film(
            title=form.data["title"],
            year=form.data["year"],
            genre=form.data["genre"],
            director=form.data["director"],
            description=form.data["description"],
            trailer_url=form.data["trailer_url"],
            user_id=current_user.id
        )

        background_img = form.data["background_img_url"]
        tile_img = form.data["tile_img_url"]

        if background_img:
            background_img.filename = get_unique_filename(background_img.filename)
            upload = upload_file_to_s3(background_img)

            if "url" not in upload:
                return {'errors': [upload]}

            background_img_url = upload["url"]
            film.background_img_url = background_img_url

        if tile_img:
            tile_img.filename = get_unique_filename(tile_img.filename)
            upload = upload_file_to_s3(tile_img)

            if "url" not in upload:
                return {'errors': [upload]}

            tile_img_url = upload["url"]
            film.tile_img_url = tile_img_url

        db.session.add(film)
        db.session.commit()
        return film.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@film_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_film(id):
    """
    Update a film by id if the film belongs to the current user and returns the updated film in a dictionary
    """
    film = Film.query.get(id)

    if not film:
         return {'errors': ['Film does not exist']}, 404

    if film.user_id == current_user.id:
        form = EditFilmForm()
        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():
            background_img_url = form.data["background_img_url"]
            tile_img_url = form.data["tile_img_url"]

            if background_img_url:
                remove_file_from_s3(film.background_img_url)
                background_img_url.filename = get_unique_filename(background_img_url.filename)
                upload = upload_file_to_s3(background_img_url)
                if "url" not in upload:
                    return {'errors': [upload]}
                background_img_url = upload["url"]
                film.background_img_url = background_img_url

            if tile_img_url:
                remove_file_from_s3(film.tile_img_url)
                tile_img_url.filename = get_unique_filename(tile_img_url.filename)
                upload = upload_file_to_s3(tile_img_url)
                if "url" not in upload:
                    return {'errors': [upload]}
                tile_img_url = upload["url"]
                film.tile_img_url = tile_img_url

            film.title = form.data["title"]
            film.year = form.data["year"]
            film.genre = form.data["genre"]
            film.director = form.data["director"]
            film.description = form.data["description"]
            film.trailer_url = form.data["trailer_url"]

            db.session.commit()
            return film.to_dict()
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    return {'errors': ["Unauthorized"]}

@film_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_film(id):
    """
    Delete a film by id if the film belongs to the current user and returns a message when it successfully deletes
    """
    film = Film.query.get(id)

    if not film:
         return {'errors': ['Film does not exist']}, 404

    if film.user_id == current_user.id:
        db.session.delete(film)
        db.session.commit()
        return {'message': 'Successfully deleted!'}
    else:
        return {'errors': ['Unauthorized']}
