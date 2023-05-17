from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import SubmitField, StringField
from app.routes.aws_helpers import ALLOWED_EXTENSIONS
from wtforms.validators import DataRequired, ValidationError
from app.models import User
from .signup_form import username_exists, user_exists

class EditUserForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    
