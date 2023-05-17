from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length
from .signup_form import username_exists, user_exists

class EditUserForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired(), username_exists, Length(min=4, max=16, message="Username must be between 4 to 16 characters.")])
    email = StringField('Email address', validators=[DataRequired(), user_exists])
    first_name = StringField('First Name', validators=[DataRequired()])
    last_name = StringField('Last Name', validators=[DataRequired()])
    bio = StringField('Bio', validators=[Length(max=1000, message="Bio must be less than 1000 characters")])
