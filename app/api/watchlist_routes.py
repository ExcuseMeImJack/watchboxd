from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Film
from .auth_routes import validation_errors_to_error_messages

watchlist_routes = Blueprint('watchlist', __name__)

@watchlist_routes.route('/<int:id>', methods=["POST"])
@login_required
def add_to_watchlist(id):
    """
    Add a film to the watchlist byt id
    """
    film = Film.query.get(id)
    user = User.query.get(current_user.id)
    film.film_to_watch.append(user)
    db.session.commit()

    return {'message': 'Film added to watchlist'}

@watchlist_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def remove_from_watchlist(id):
    """
    Remove a film from the watchlist by id
    """
    film = Film.query.get(id)
    # user = User.query.get(current_user.id)
    film.film_to_watch = [user for user in film.film_to_watch if user.id != current_user.id]
    db.session.commit()

    return {'message': 'Film removed from watchlist'}
