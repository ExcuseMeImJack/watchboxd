from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo', last_name='User', username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        first_name='Marnie', last_name='Gates',username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        first_name='Bobbie', last_name='Salazar',username='bobbie', email='bobbie@aa.io', password='password')
    tester1 = User(
        first_name='Jack', last_name='Roybal',username='tester1', email='tester1@aa.io', password='password')
    tester2 = User(
        first_name='Andre', last_name='Hristu',username='tester2', email='tester2@aa.io', password='password')
    tester3 = User(
        first_name='David', last_name='Kim',username='tester3', email='tester3@aa.io', password='password')

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
