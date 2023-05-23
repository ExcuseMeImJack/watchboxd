from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Film, List
from ..forms import CreateFilmForm, EditListForm, CreateListForm
from app.api.aws_helpers import get_unique_filename, upload_file_to_s3
from .auth_routes import validation_errors_to_error_messages

list_routes = Blueprint('lists', __name__)

@list_routes.route('')
def lists():
    """
    Query for all the lists and returns them in a dictionary
    """
    lists = List.query.all()
    return {'lists': [list.to_dict() for list in lists]}

@list_routes.route('/<int:id>')
def list_by_id(id):
    """
    Query for a list by the list id and returns a list in a dictionary
    """
    list = List.query.get(id)

    if not list:
        return {'errors': ['List does not exist']}, 404

    return list.to_dict()

@list_routes.route('', methods=['POST'])
@login_required
def create_list():
    """
    Create a list that will assign the current user as it's creator and returns the created list in a dictionary
    """
    form = CreateListForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        film_ids = form.data["add_film"].split(',')
        films = Film.query.filter(Film.id.in_(film_ids)).all()

        if form.data["is_private"] == 'true':
            is_private = True
        elif form.data["is_private"] == 'false':
            is_private = False

        list = List(
            list_name = form.data["list_name"],
            description = form.data["description"],
            is_private = is_private,
            film_list = films,
            user_id=current_user.id
        )

        db.session.add(list)
        db.session.commit()
        return list.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@list_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_list(id):
    """
    Update a list by id if the list belongs to the current user and returns the updated list in a dictionary
    """
    list = List.query.get(id)

    if not list:
        return {'errors': ['List does not exist']}, 404

    if list.user_id == current_user.id:
        form = EditListForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():

            film_ids = form.data["add_film"].split(',')
            films = Film.query.filter(Film.id.in_(film_ids)).all()

            if form.data["is_private"] == 'true':
                is_private = True
            elif form.data["is_private"] == 'false':
                is_private = False

            list.list_name = form.data["list_name"]
            list.description = form.data["description"]
            list.is_private = is_private
            list.film_list = films

            db.session.commit()
            return list.to_dict()
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    return {'errors': ["Unauthorized"]}

@list_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_list(id):
    """
    Delete a list by id if the list belongs to the current user and returns a message when it deletes
    """
    list = List.query.get(id)

    if not list:
        return {'errors': ['Film does not exist']}, 404

    if list.user_id == current_user.id:
        db.session.delete(list)
        db.session.commit()
        return {'message': 'Successfully deleted!'}
    else:
        return {'errors': ['Unauthorized']}
