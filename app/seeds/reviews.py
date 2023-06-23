from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
from random import sample, randint

def seed_reviews(users, films):
  reviews = []
  reviews.append(Review(
      user_id = randint(1,5),
      film_id = randint(1,len(films)),
      review = "Absolutely mind-blowing! This movie defies all logic and reason, leaving you questioning your very existence. From the riveting plotline of a sentient sandwich seeking world domination to the profound performance of a tap-dancing sloth, it's a cinematic masterpiece that will haunt your dreams for years to come.",
      rating = randint(1, 5),
  ))
  reviews.append(Review(
      user_id = randint(1,5),
      film_id = randint(1,len(films)),
      review = "A tour de force of cinematography and special effects! Never before have I witnessed such incredible CGI unicorns battling it out in a futuristic roller derby. This film will transport you to a realm of pure imagination and questionable fashion choices.",
      rating = randint(1, 5),
  ))
  reviews.append(Review(
      user_id = randint(1,5),
      film_id = randint(1,len(films)),
      review = "I laughed, I cried, I pondered the meaning of life. This movie had it all, from the heartwarming story of a talking cucumber discovering his true purpose to the heart-stopping dance-off between a troupe of ninja penguins and breakdancing llamas. It's an emotional rollercoaster you won't want to miss!",
      rating = randint(1, 5),
  ))
  reviews.append(Review(
      user_id = randint(1,5),
      film_id = randint(1,len(films)),
      review = "Move over, Shakespeare! This movie is the epitome of highbrow entertainment. With dialogue so profound it'll make your brain hurt, and a plot twist that involves time-traveling hamsters, it's a cinematic experience that will leave you questioning the very nature of art itself.",
      rating = randint(1, 5),
  ))
  reviews.append(Review(
      user_id = randint(1,5),
      film_id = randint(1,len(films)),
      review = "Prepare to be awestruck by the awe-inspiring awesomeness of this movie! It's a visual spectacle filled with exploding marshmallows, acrobatic squirrels, and a love story between a vampire and a garden gnome. You'll leave the theater feeling like you've just witnessed a psychedelic fever dream.",
      rating = randint(1, 5),
  ))
  reviews.append(Review(
      user_id = randint(1,5),
      film_id = randint(1,len(films)),
      review = "Brace yourself for the most thought-provoking movie of our generation. It takes you on a journey through the depths of the human psyche, exploring profound themes like the existential crisis of a sentient vacuum cleaner and the metaphysical implications of a singing hot dog. Prepare to have your mind blown!",
      rating = randint(1, 5),
  ))
  reviews.append(Review(
      user_id = randint(1,5),
      film_id = randint(1,len(films)),
      review = "Move over, Hollywood! This indie gem is a true cinematic triumph. With its minimalist plot centered around a cat playing chess against a supercomputer, it's a captivating tale of feline intelligence and strategic prowess. The performances are subtle yet mesmerizing, and the film will leave you questioning your own intellectual capabilities.",
      rating = randint(1, 5),
  ))
  reviews.append(Review(
      user_id = randint(1,5),
      film_id = randint(1,len(films)),
      review = "Prepare to be enchanted by this whimsical masterpiece. Set in a world where socks have feelings and embark on epic quests, it's a charming story that will tug at your heartstrings and make you reconsider your sock-drawer organization. Don't miss this sock-tacular adventure!",
      rating = randint(1, 5),
  ))
  reviews.append(Review(
      user_id = randint(1,5),
      film_id = randint(1,len(films)),
      review = "The critics may not understand its brilliance, but this movie is an avant-garde masterpiece. With its experimental narrative structure that jumps randomly between dimensions and a protagonist who communicates solely through interpretive dance, it's a bold exploration of the boundaries of cinema. Not for the faint of heart!",
      rating = randint(1, 5),
  ))
  reviews.append(Review(
      user_id = randint(1,5),
      film_id = randint(1,len(films)),
      review = "Prepare for an adrenaline-fueled thrill ride from start to finish! This movie delivers non-stop action as a team of highly trained guinea pigs takes on an army of evil garden gnomes. The intense chase scenes and epic battles will leave you on the edge of your seat, craving for more guinea pig heroics.",
      rating = randint(1, 5),
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
