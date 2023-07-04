from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    film_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('films.id')))
    review = db.Column(db.String(250), nullable=False)
    rating = db.Column(db.DECIMAL, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=datetime.utcnow)
    updated_at = db.Column(db.DateTime(timezone=True), default=datetime.utcnow)

    film = db.relationship("Film", back_populates="film_reviews")
    user = db.relationship("User", back_populates="user_reviews")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'film_id': self.film_id,
            'review': self.review,
            'rating': self.rating,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
