from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from random import randint, sample
from .films import seed_films
from .lists import seed_lists

# Adds a demo user, you can add other users here if you want
def seed_users():
    dom = User(
        first_name='Dom',
        last_name='Price',
        username='Price',
        email='dom@aa.io',
        profile_img_url='https://i.imgur.com/0dH3sp9.png',
        password='password'
    )
    jack = User(
        first_name='Jack',
        last_name='Roybal',
        username='ExcuseMeImJack',
        email='jack@aa.io',
        profile_img_url='https://i.imgur.com/vvdTmr8.png',
        password='password'
    )
    ryan = User(
        first_name='Ryan',
        last_name='Malmos',
        username='Malmos',
        email='ryan@aa.io',
        profile_img_url='https://i.imgur.com/mwl6gBf.png',
        password='password'
    )
    david = User(
        first_name='David',
        last_name='Kim',
        username='Sleepyz',
        email='david@aa.io',
        profile_img_url='https://i.imgur.com/FmfQU5i.png',
        password='password'
    )
    andre = User(
        first_name='Andre',
        last_name='Hristu',
        username='DrizzlyDre',
        email='andre@aa.io',
        profile_img_url='https://i.imgur.com/pLYIDwK.png',
        password='password'
    )
    bao = User(
        first_name='Bao',
        last_name='Zhang',
        username='BAO',
        email='bao@aa.io',
        profile_img_url='https://i.imgur.com/gfgeXDF.png',
        password='password'
    )

    db.session.add(dom)
    db.session.add(jack)
    db.session.add(ryan)
    db.session.add(david)
    db.session.add(andre)
    db.session.add(bao)
    db.session.commit()

    return [dom, jack, ryan, david, andre, bao]


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
