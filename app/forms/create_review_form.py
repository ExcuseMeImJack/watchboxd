from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField
from wtforms.validators import DataRequired, ValidationError, Length

class CreateReviewForm(FlaskForm):
    review = StringField('Review', validators=[DataRequired(), Length(max=250, message="Review must be less than 250 characters.")])
    rating = DecimalField('Rating', validators=[DataRequired()], rounding=None, places=2)
