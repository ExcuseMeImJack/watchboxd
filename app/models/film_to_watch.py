from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

films_to_watch = db.Table(
    'films_to_watch',
    db.Model.metadata,
    db.Column('users', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')),primary_key=True),
    db.Column('films', db.Integer, db.ForeignKey(add_prefix_for_prod('films.id')), primary_key=True),
    db.Column('created_at', db.Date, default=datetime.now()),
    db.Column('updated_at', db.Date, default=datetime.now())
)

if environment == "production":
    films_to_watch.schema = SCHEMA
