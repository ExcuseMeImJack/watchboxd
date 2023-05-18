from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from .like import likes
from .film_to_watch import films_to_watch
from .watched import watches



class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    username = db.Column(db.String(16), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    bio = db.Column(db.String(1000))
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_img_url = db.Column(db.String)
    created_at = db.Column(db.Date, default=datetime.today)
    updated_at = db.Column(db.Date, default=datetime.today)

    lists = db.relationship("List", back_populates="user", cascade="all, delete-orphan")
    films = db.relationship("Film", back_populates="film_user", cascade="all, delete-orphan")
    user_likes = db.relationship("Film", secondary=likes, back_populates="film_likes")
    user_watches = db.relationship("Film", secondary=watches, back_populates="film_watches")
    user_films_to_watch = db.relationship("Film", secondary=films_to_watch, back_populates="film_to_watch")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'username': self.username,
            'email': self.email,
            'profile_img_url': self.profile_img_url,
            'bio': self.bio,
            'lists': [list.to_dict() for list in self.lists],
            'likes': [film.id for film in self.user_likes],
            'films_to_watch': [film.to_dict() for film in self.user_films_to_watch],
            'films_watched': [film.to_dict() for film in self.user_watches],
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
