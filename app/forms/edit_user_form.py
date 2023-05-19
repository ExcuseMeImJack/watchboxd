from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.aws_helpers import ALLOWED_EXTENSIONS

class EditUserForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired(), Length(min=4, max=16, message="Username must be between 4 to 16 characters.")])
    first_name = StringField('First Name')
    last_name = StringField('Last Name')
    profile_img_url = FileField("Avatar Upload", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    bio = StringField('Bio', validators=[Length(max=1000, message="Bio must be less than 1000 characters")])
