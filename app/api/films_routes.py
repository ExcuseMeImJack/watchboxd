from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Film
from ..forms import CreateFilmForm
from app.api.aws_helpers import get_unique_filename, upload_file_to_s3
from .auth_routes import validation_errors_to_error_messages

film_routes = Blueprint('films', __name__)
