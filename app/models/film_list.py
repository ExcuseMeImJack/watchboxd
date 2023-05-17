from .db import db, environment, SCHEMA, add_prefix_for_prod

film_lists = db.Table(
    'film_lists',
    db.Model.metadata,
    db.Column('films', db.Integer, db.ForeignKey(add_prefix_for_prod('films.id')), primary_key=True),
    db.Column('lists', db.Integer, db.ForeignKey(add_prefix_for_prod('lists.id')), primary_key=True)

)

if environment == "production":
    film_lists.schema = SCHEMA
