from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .film_list import film_lists
from .like import likes
from .film_to_watch import films_to_watch

class Film(db.Model):
    __tablename__ = 'films'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False, unique=True)
    year = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    background_img_url = db.Column(db.String, nullable=False)
    trailer_url = db.Column(db.String, nullable=False)
    tile_img_url = db.Column(db.String, nullable=False)
    director = db.Column(db.String(100), nullable=False)
    genre = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    created_at = db.Column(db.Date, default=datetime.today)
    updated_at = db.Column(db.Date, default=datetime.today)

    film_lists = db.relationship("List", secondary=film_lists, back_populates="film_list")
    film_user = db.relationship("User", back_populates="films")
    film_likes = db.relationship("User", secondary=likes, back_populates="user_likes")
    film_to_watch = db.relationship("User", secondary=films_to_watch, back_populates="user_films_to_watch")

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'year': self.year,
            'description': self.description,
            'background_img_url': self.background_img_url,
            'trailer_url': self.trailer_url,
            'tile_img_url': self.tile_img_url,
            'director': self.director,
            'genre': self.genre,
            'user_id': self.user_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }