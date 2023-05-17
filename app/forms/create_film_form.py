from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, IntegerField
from ..api.aws_helpers import ALLOWED_EXTENSIONS
from wtforms.validators import DataRequired, ValidationError, Email, Length
from app.models import Film

def title_exists(form, field):
    title = field.data
    film = Film.query.filter(Film.title.lower() == title.lower()).first()
    if film:
        raise ValidationError('Film already exists.')

def is_youtube_link(form, field):
    link = field.data
    if('www.youtube.com' not in link):
        return ValidationError('Trailer Link is not a YouTube Link.')

class CreateFilmForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired(), title_exists])
    year = IntegerField('Year', validators=[DataRequired()])
    genre = StringField('Genre', validators=[DataRequired()])
    director = StringField('Director', validators=[DataRequired()])
    description = StringField('Description', Length(max=1000, message="Description must be less than 1000 characters."))
    trailer_upload = StringField('Trailer Upload', is_youtube_link)
    film_tile_image = FileField("Film Cover Image Upload", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    film_background_image = FileField("Film Background Image Upload", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
