from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SelectMultipleField
from wtforms.validators import DataRequired, Length

from ..models import Film


class CreateListForm(FlaskForm):

    list_name = StringField('Name', validators=[DataRequired()])
    description = StringField('Description', validators=[Length(max=1000, message="Description must be less than 1000 characters.")])
    is_private = SelectField(u'Who can view', choices=[("false", "false"), ("true", "true")], validators=[DataRequired()])
    add_film = StringField('Add a Film') # [(film.id, film.name) for film in Film.query.all()]
