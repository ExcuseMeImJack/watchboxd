from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Film
from .auth_routes import validation_errors_to_error_messages

watched_routes = Blueprint('watched', __name__)

@watched_routes.route('/<int:id>', methods=["POST"])
@login_required
def watch_film(id):
    """
    Add a watched to a film byt id
    """
    film = Film.query.get(id)
    user = User.query.get(current_user.id)
    film.film_watches.append(user)
    db.session.commit()

    return {'message': 'Film watched'}

@watched_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def unwatch_film(id):
    """
    Remove a watched from a film by id
    """
    film = Film.query.get(id)
    # user = User.query.get(current_user.id)
    film.film_watches = [user for user in film.film_watches if user.id != current_user.id]
    db.session.commit()

    return {'message': 'Film unliked'}
