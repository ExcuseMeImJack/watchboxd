from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from random import randint, sample
from .films import seed_films
from .lists import seed_lists

# Adds a demo user, you can add other users here if you want
def seed_users(films):
    demo = User(
        first_name='Demo',
        last_name='User',
        username='Demo',
        email='demo@aa.io',
        profile_img_url='https://d3ki9tyy5l5ruj.cloudfront.net/obj/3d4665c7cf119dc9dc38232301b18fa68b9bb17c/avatar.svg',
        password='password',
        user_likes=sample(films, randint(0, len(films))),
        user_watches=sample(films, randint(0, len(films)))
    )
    marnie = User(
        first_name='Marnie',
        last_name='Gates',
        username='marnie',
        email='marnie@aa.io',
        profile_img_url='https://d3ki9tyy5l5ruj.cloudfront.net/obj/3d4665c7cf119dc9dc38232301b18fa68b9bb17c/avatar.svg',
        password='password',
        user_likes=sample(films, randint(0, len(films))),
        user_watches=sample(films, randint(0, len(films)))
    )
    bobbie = User(
        first_name='Bobbie',
        last_name='Salazar',
        username='bobbie',
        email='bobbie@aa.io',
        profile_img_url='https://d3ki9tyy5l5ruj.cloudfront.net/obj/3d4665c7cf119dc9dc38232301b18fa68b9bb17c/avatar.svg',
        password='password',
        user_likes=sample(films, randint(0, len(films))),
        user_watches=sample(films, randint(0, len(films)))
    )
    tester1 = User(
        first_name='Jack',
        last_name='Roybal',
        username='tester1',
        email='tester1@aa.io',
        profile_img_url='https://d3ki9tyy5l5ruj.cloudfront.net/obj/3d4665c7cf119dc9dc38232301b18fa68b9bb17c/avatar.svg',
        password='password',
        user_likes=sample(films, randint(0, len(films))),
        user_watches=sample(films, randint(0, len(films)))
    )
    tester2 = User(
        first_name='Andre',
        last_name='Hristu',
        username='tester2',
        email='tester2@aa.io',
        profile_img_url='https://d3ki9tyy5l5ruj.cloudfront.net/obj/3d4665c7cf119dc9dc38232301b18fa68b9bb17c/avatar.svg',
        password='password',
        user_likes=sample(films, randint(0, len(films))),
        user_watches=sample(films, randint(0, len(films)))
    )
    tester3 = User(
        first_name='David',
        last_name='Kim',
        username='tester3',
        email='tester3@aa.io',
        profile_img_url='https://d3ki9tyy5l5ruj.cloudfront.net/obj/3d4665c7cf119dc9dc38232301b18fa68b9bb17c/avatar.svg',
        password='password',
        user_likes=sample(films, randint(0, len(films))),
        user_watches=sample(films, randint(0, len(films)))
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(tester1)
    db.session.add(tester2)
    db.session.add(tester3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
