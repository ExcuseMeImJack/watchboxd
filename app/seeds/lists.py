from app.models import db, List, environment, SCHEMA
from sqlalchemy.sql import text
from random import randint, sample

def seed_lists():
    list1 = List(
        list_name = 'The wonderful list',
        description = 'A list for my friends and I.',
        is_private = False,
        user_id = 1
    )
    list2 = List(
        list_name = 'Movies I Watched',
        description = 'A list for my friends and I.',
        is_private = False,
        user_id = 4
    )
    list3 = List(
        list_name = 'My private list',
        description = 'A list for only me.',
        is_private = True,
        user_id = 1
    )
    list4 = List(
        list_name = 'My wonderful list',
        description = 'A list for my friends and I.',
        is_private = False,
        user_id = 4
    )
    list5 = List(
        list_name = 'Movies I hate',
        description = 'A list for all the movies I hate',
        is_private = False,
        user_id = 1
    )

    db.session.add(list1)
    db.session.add(list2)
    db.session.add(list3)
    db.session.add(list4)
    db.session.add(list5)
    db.session.commit()

def undo_lists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.lists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM lists"))

    db.session.commit()
