from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

watches = db.Table(
    'watches',
    db.Model.metadata,
    db.Column('users', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')),primary_key=True),
    db.Column('films', db.Integer, db.ForeignKey(add_prefix_for_prod('films.id')), primary_key=True),
    db.Column('created_at', db.DateTime, default=datetime.utcnow),
    db.Column('updated_at', db.DateTime, default=datetime.utcnow)
)
# db.Column(db.DateTime(timezone=True), default=datetime.utcnow)
if environment == "production":
    watches.schema = SCHEMA
