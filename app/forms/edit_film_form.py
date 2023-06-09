from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, IntegerField
from ..api.aws_helpers import ALLOWED_EXTENSIONS
from wtforms.validators import DataRequired, ValidationError, Email, Length
from app.models import Film

def is_youtube_link(form, field):
    link = field.data
    if('www.youtube.com' not in link):
        return ValidationError('Trailer Link is not a YouTube Link.')

class EditFilmForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    year = IntegerField('Year', validators=[DataRequired()])
    genre = StringField('Genre', validators=[DataRequired()])
    director = StringField('Director', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired(), Length(max=1000, message="Description must be less than 1000 characters.") ])
    trailer_url = StringField('Trailer Upload', validators=[DataRequired(), is_youtube_link] )
    tile_img_url = FileField("Film Cover Image Upload", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    background_img_url = FileField("Film Background Image Upload", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
