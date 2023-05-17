from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

@user_routes.route('/<int:id>')
@login_required
def user_by_id(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/', methods=['PUT'])
@login_required
def update_user():
    """
    Update the current user and returns that user in a dictionary
    """
    curr_user = User.query.get(current_user.id)
    form = editUserForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        profile_pic = form.data["user"]
        if profile_pic
