from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
from random import sample, randint

def seed_reviews(users, films):
    reviews = []

    for film_id in range(1, 41):
        reviews.append(Review(
            user_id=1,
            film_id=film_id,
            review="An emotional roller coaster! The performances were exceptional. Prepare to shed a few tears. #TearJerker",
            rating=randint(1, 5),
        ))

    for film_id in range(1, 41):
        reviews.append(Review(
            user_id=2,
            film_id=film_id,
            review="An emotional roller coaster! The performances were exceptional. Prepare to shed a few tears. #TearJerker",
            rating=randint(1, 5),
        ))

    for film_id in range(1, 41):
        reviews.append(Review(
            user_id=3,
            film_id=film_id,
            review="An emotional roller coaster! The performances were exceptional. Prepare to shed a few tears. #TearJerker",
            rating=randint(1, 5),
        ))

    for film_id in range(1, 41):
        reviews.append(Review(
            user_id=4,
            film_id=film_id,
            review="An emotional roller coaster! The performances were exceptional. Prepare to shed a few tears. #TearJerker",
            rating=randint(1, 5),
        ))

    for film_id in range(1, 41):
        reviews.append(Review(
            user_id=5,
            film_id=film_id,
            review="An emotional roller coaster! The performances were exceptional. Prepare to shed a few tears. #TearJerker",
            rating=randint(1, 5),
        ))

    add_reviews = [db.session.add(review) for review in reviews]
    db.session.commit()

    return reviews

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
