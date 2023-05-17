from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import SubmitField, StringField, IntegerField, SelectField, QuerySelectField
from ..api.aws_helpers import ALLOWED_EXTENSIONS
from wtforms.validators import DataRequired, ValidationError, Email, Length
from app.models import Film
from random import randint, sample

class CreateListForm(FlaskForm):
    list_name = StringField('Name', validators=[DataRequired()])
    description = StringField('Description', Length(max=1000, message="Description must be less than 1000 characters."))
    is_private = SelectField('Who can view', choices = [("Anyone - Public list", False), ("Only you - Private list", True)], validators=[DataRequired()], default=True)
    films = Film.query.all()
    add_film = SelectField('Add a Film', choices = [(film.id, film.name) for film in films])
