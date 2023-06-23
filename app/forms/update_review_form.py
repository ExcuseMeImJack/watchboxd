from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length

class UpdateReviewForm(FlaskForm):
    review = StringField('Review', validators=[DataRequired(), Length(max=250, message="Review must be less than 250 characters.")])
    rating = IntegerField('Rating', validators=[DataRequired()])
