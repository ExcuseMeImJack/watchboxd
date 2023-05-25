from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Film
from .auth_routes import validation_errors_to_error_messages

like_routes = Blueprint('likes', __name__)

@like_routes.route('/<int:id>', methods=["POST"])
@login_required
def like_film(id):
    """
    Add a like to a film byt id
    """
    film = Film.query.get(id)
    user = User.query.get(current_user.id)
    film.film_likes.append(user)
    db.session.commit()

    return {'message': 'Film liked'}

@like_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def unlike_film(id):
    """
    Remove a like to a film by id
    """
    film = Film.query.get(id)
    # user = User.query.get(current_user.id)
    film.film_likes = [user for user in film.film_likes if user.id != current_user.id]
    db.session.commit()

    return {'message': 'Film unliked'}
