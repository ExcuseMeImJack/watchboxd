from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Film
from ..forms import EditUserForm
from app.api.aws_helpers import get_unique_filename, upload_file_to_s3
from .auth_routes import validation_errors_to_error_messages

user_routes = Blueprint('users', __name__)

@user_routes.route('/current')
@login_required
def get_current():
    """
    QUERY FOR THE CURRENT USER
    """
    return current_user.to_dict()

# GET ALL USERS
@user_routes.route('')
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

# GET A USER BY ID
@user_routes.route('/<int:id>')
@login_required
def user_by_id(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

# UPDATE THE CURRENT USER
@user_routes.route('', methods=['PUT'])
@login_required
def update_user():
    """
    Update the current user and returns that user in a dictionary
    """
    curr_user = User.query.get(current_user.id)

    form = EditUserForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        profile_img_url = form.data["profile_img_url"]

        if profile_img_url:
            profile_img_url.filename = get_unique_filename(profile_img_url.filename)
            upload = upload_file_to_s3(profile_img_url)
            if "url" not in upload:
                return {'errors': [upload]}

            user_img_url = upload["url"]
            curr_user.profile_img_url = user_img_url

        curr_user.first_name=form.data["first_name"]
        curr_user.last_name=form.data["last_name"]
        if curr_user.username != form.data["username"]:
            curr_user.username=form.data["username"]
        curr_user.bio=form.data["bio"]
        db.session.commit()
        return curr_user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# DELETE THE CURRENT USER
@user_routes.route('', methods=["DELETE"])
@login_required
def delete_user():
    """
    Delete the current user and returns a message when it successfully deletes
    """
    curr_user = User.query.get(current_user.id)
    db.session.delete(curr_user)
    db.session.commit()
    return {'message': 'Successfully deleted!'}
