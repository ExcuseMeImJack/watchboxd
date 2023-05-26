from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .film_list import film_lists

class List(db.Model):
    __tablename__ = 'lists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    list_name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    is_private = db.Column(db.Boolean, nullable=False, default=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    created_at = db.Column(db.DateTime(timezone=True), default=datetime.utcnow)
    updated_at = db.Column(db.DateTime(timezone=True), default=datetime.utcnow)

    film_list = db.relationship("Film", secondary=film_lists, back_populates='film_lists')
    user = db.relationship("User", back_populates="lists")

    def to_dict(self):
        return {
            'id': self.id,
            'list_name': self.list_name,
            'description': self.description,
            'is_private': self.is_private,
            'user_id': self.user_id,
            'creator_username': self.user.username,
            'creator_profile_img_url': self.user.profile_img_url,
            'films': [film.to_dict() for film in self.film_list],
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
