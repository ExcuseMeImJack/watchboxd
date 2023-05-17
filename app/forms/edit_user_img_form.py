from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import SubmitField
from ..api.aws_helpers import ALLOWED_EXTENSIONS

class EditUserImgForm(FlaskForm):
    user_img = FileField("Avatar Upload", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
