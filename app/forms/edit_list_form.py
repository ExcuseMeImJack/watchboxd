from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired, Length
from app.models import Film, db

class EditListForm(FlaskForm):
    list_name = StringField('Name', validators=[DataRequired()])
    description = StringField('Description', Length(max=1000, message="Description must be less than 1000 characters."))
    is_private = SelectField('Who can view', choices = [("Anyone - Public list", False), ("Only you - Private list", True)], validators=[DataRequired()], default=True)
    add_film = SelectField('Add a Film', choices = []) # (film.id, film.name) for film in Film.query.all()
