from app.models import db, Film, environment, SCHEMA
from sqlalchemy.sql import text
from random import sample, randint

def seed_films(users):
    film1 = Film(
        title = "Interstellar",
        year = 2014,
        description = "Mankind was born on Earth. It was never meant to die here. The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
        background_img_url = "https://a.ltrbxd.com/resized/sm/upload/r4/0u/oq/0i/interstellar-1200-1200-675-675-crop-000000.jpg",
        trailer_url = "https://www.youtube.com/watch?v=2LqzF5WauAw",
        tile_img_url = "https://a.ltrbxd.com/resized/film-poster/1/1/7/6/2/1/117621-interstellar-0-500-0-750-crop.jpg",
        director = "Christopher Nolan",
        genre = "Science-Fiction, Drama, Adventure",
        film_user = users[3],
        film_watches = sample(users, randint(0, len(users))),
        film_likes = sample(users, randint(0, len(users)))
    )
    film2 = Film(
        title = "Jurassic World: Fallen Kingdom",
        year = 2018,
        description = "The park is gone. Three years after the demise of Jurassic World, a volcanic eruption threatens the remaining dinosaurs on the isla Nublar, so Claire Dearing, the former park manager, recruits Owen Grady to help prevent the extinction of the dinosaurs once again.",
        background_img_url = "https://a.ltrbxd.com/resized/sm/upload/hr/q4/5n/t1/jurassic-world-fallen-kingdom-1200-1200-675-675-crop-000000.jpg",
        trailer_url = "https://www.youtube.com/watch?v=vn9mMeWcgoM",
        tile_img_url = "https://a.ltrbxd.com/resized/film-poster/2/8/1/5/2/9/281529-jurassic-world-fallen-kingdom-0-460-0-690-crop.jpg",
        director = "J. A. Bayona",
        genre = "Thriller, Science-Fiction, Action, Adventure",
        film_user = users[3],
        film_watches = sample(users, randint(0, len(users))),
        film_likes = sample(users, randint(0, len(users)))

    )
    film3 = Film(
        title = "In the Heights",
        year = 2021,
        description = "The time has come. The story of Usnavi, a bodega owner who has mixed feelings about closing his store and retiring to the Dominican Republic or staying in Washington Heights.",
        background_img_url = "https://a.ltrbxd.com/resized/sm/upload/6o/n7/l3/an/in%20the%20hieghts-1200-1200-675-675-crop-000000.jpg",
        trailer_url = "https://www.youtube.com/watch?v=U0CL-ZSuCrQ",
        tile_img_url = "https://a.ltrbxd.com/resized/film-poster/3/9/9/5/0/0/399500-in-the-heights-0-460-0-690-crop.jpg",
        director = "Jon M. Chu",
        genre = "Music, Romance, Drama",
        film_user = users[3],
        film_watches = sample(users, randint(0, len(users))),
        film_likes = sample(users, randint(0, len(users)))
    )
    film4 = Film(
        title = "Aladdin",
        year = 2019,
        description = "Choose Wisely. A kindhearted street urchin named Aladdin embarks on a magical adventure after finding a lamp that releases a wisecracking genie while a power-hungry Grand Vizier vies for the same lamp that has the power to make their deepest wishes come true.",
        background_img_url = "https://a.ltrbxd.com/resized/sm/upload/t5/xc/w8/fo/aladdin-2019-1200-1200-675-675-crop-000000.jpg",
        trailer_url = "https://www.youtube.com/watch?v=U0CL-ZSuCrQ",
        tile_img_url = "https://a.ltrbxd.com/resized/film-poster/3/5/4/5/3/8/354538-aladdin-0-460-0-690-crop.jpg",
        director = "Guy Ritchie",
        genre = "Fantasy, Adventure, Romance, Family",
        film_user = users[0],
        film_watches = sample(users, randint(0, len(users))),
        film_likes = sample(users, randint(0, len(users)))
    )
    film5 = Film(
        title = "Pixels",
        year = 2015,
        description = "Game on. Video game experts are recruited by the military to fight 1980s-era video game characters who’ve attacked New York.",
        background_img_url = "https://a.ltrbxd.com/resized/sm/upload/f1/ct/oh/jq/pixels-2015-1200-1200-675-675-crop-000000.jpg",
        trailer_url = "https://www.youtube.com/watch?v=XAHprLW48no",
        tile_img_url = "https://a.ltrbxd.com/resized/film-poster/1/8/1/1/1/8/181118-pixels-0-460-0-690-crop.jpg",
        director = "Chris Columbus",
        genre = "Comedy, Action, Science-Fiction",
        film_user = users[3],
        film_watches = sample(users, randint(0, len(users))),
        film_likes = sample(users, randint(0, len(users)))
    )
    film6 = Film(
        title = "Kingsman: The Secret Service",
        year = 2014,
        description = "Manners Maketh Man. The story of a super-secret spy organization that recruits an unrefined but promising street kid into the agency’s ultra-competitive training program just as a global threat emerges from a twisted tech genius.",
        background_img_url = "https://a.ltrbxd.com/resized/sm/upload/hq/ob/tz/ns/uRHdkM871YJQDl3ux3ulCQw7BfV-1200-1200-675-675-crop-000000.jpg",
        trailer_url = "https://www.youtube.com/watch?v=kl8F-8tR8to",
        tile_img_url = "https://a.ltrbxd.com/resized/film-poster/1/4/8/2/0/0/148200-kingsman-the-secret-service-0-460-0-690-crop.jpg",
        director = "Matthew Vaughn",
        genre = "Action, Comedy, Crime, Adventure",
        film_user = users[3],
        film_watches = sample(users, randint(0, len(users))),
        film_likes = sample(users, randint(0, len(users)))
    )
    film7 = Film(
        title = "Big Hero 6",
        year = 2014,
        description = "The special bond that develops between plus-sized inflatable robot Baymax, and prodigy Hiro Hamada, who team up with a group of friends to form a band of high-tech heroes.",
        background_img_url = "https://a.ltrbxd.com/resized/sm/upload/wc/nn/r0/8o/big-hero-6-1200-1200-675-675-crop-000000.jpg",
        trailer_url = "https://www.youtube.com/watch?v=z3biFxZIJOQ",
        tile_img_url = "https://a.ltrbxd.com/resized/sm/upload/hu/db/3b/mm/q6WZxPlic8hpKzCxnzWOFCCLQfo-0-460-0-690-crop.jpg",
        director = "Chris Williams, Don Hall",
        genre = "Family, Animation, Adventure, Action",
        film_user = users[0],
        film_watches = sample(users, randint(0, len(users))),
        film_likes = sample(users, randint(0, len(users)))
    )
    film8 = Film(
        title = "If I Stay",
        year = 2014,
        description = "Live For Love. Mia Hall, a talented young cellist, thought the most difficult decision she would ever have to make would be whether to pursue her musical dreams at prestigious Juilliard or follow her heart to be with the love of her life, Adam, a rock singer/guitarist. However, a car wreck changes everything in an instant, and now Mia’s life hangs in the balance. Suspended between life and death, Mia faces a choice that will decide her future.",
        background_img_url = "https://a.ltrbxd.com/resized/sm/upload/1y/zu/aq/50/if-i-stay-1200-1200-675-675-crop-000000.jpg",
        trailer_url = "https://www.youtube.com/watch?v=wH6PNeTy6Nc",
        tile_img_url = "https://a.ltrbxd.com/resized/sm/upload/81/57/w1/3y/mLnBvLD3qJC82rhjJFZJijfYkFD-0-460-0-690-crop.jpg",
        director = "R.J. Cutler",
        genre = "Drama",
        film_user = users[3],
        film_watches = sample(users, randint(0, len(users))),
        film_likes = sample(users, randint(0, len(users)))
    )
    film9 = Film(
        title = "Skyfall",
        year = 2012,
        description = "Think On Your Sins. When Bond’s latest assignment goes gravely wrong and agents around the world are exposed, MI6 is attacked forcing M to relocate the agency. These events cause her authority and position to be challenged by Gareth Mallory, the new Chairman of the Intelligence and Security Committee. With MI6 now compromised from both inside and out, M is left with one ally she can trust: Bond. 007 takes to the shadows - aided only by field agent, Eve - following a trail to the mysterious Silva, whose lethal and hidden motives have yet to reveal themselves.",
        background_img_url = "https://a.ltrbxd.com/resized/sm/upload/mz/jc/gj/h9/skyfall-1200-1200-675-675-crop-000000.jpg",
        trailer_url = "https://www.youtube.com/watch?v=6kw1UVovByw",
        tile_img_url = "https://a.ltrbxd.com/resized/sm/upload/5j/ag/wy/k3/bwCC7klDpDcVtEXDK74vDzXLyeF-0-460-0-690-crop.jpg",
        director = "Sam Mendes",
        genre = "Action, Thriller, Adventure",
        film_user = users[3],
        film_watches = sample(users, randint(0, len(users))),
        film_likes = sample(users, randint(0, len(users)))
    )
    film10 = Film(
        title = "(500) Days of Summer",
        year = 2009,
        description = "This is not a love story. This is a story about love. Tom, greeting-card writer and hopeless romantic, is caught completely off-guard when his girlfriend, Summer, suddenly dumps him. He reflects on their 500 days together to try to figure out where their love affair went sour, and in doing so, Tom rediscovers his true passions in life.",
        background_img_url = "https://a.ltrbxd.com/resized/sm/upload/38/td/jx/jy/500-days-summer-1200-1200-675-675-crop-000000.jpg",
        trailer_url = "https://www.youtube.com/watch?v=PsD0NpFSADM",
        tile_img_url = "https://a.ltrbxd.com/resized/film-poster/3/9/3/5/0/39350--500-days-of-summer-0-460-0-690-crop.jpg",
        director = "Marc Webb",
        genre = "Drama, Romance, Comedy",
        film_user = users[0],
        film_watches = sample(users, randint(0, len(users))),
        film_likes = sample(users, randint(0, len(users)))
    )
    film11 = Film(
        title = "Jaws",
        year = 1975,
        description = "Don’t go in the water. When an insatiable great white shark terrorizes the townspeople of Amity Island, the police chief, an oceanographer and a grizzled shark hunter seek to destroy the blood-thirsty beast.",
        background_img_url = "https://a.ltrbxd.com/resized/sm/upload/r0/oj/7p/ys/jaws-1200-1200-675-675-crop-000000.jpg",
        trailer_url = "https://www.youtube.com/watch?v=U1fu_sA7XhE",
        tile_img_url = "https://a.ltrbxd.com/resized/film-poster/5/1/5/4/2/51542-jaws-0-460-0-690-crop.jpg",
        director = "Steven Spielberg",
        genre = "Thriller, Horror, Adventure",
        film_user = users[3],
        film_watches = sample(users, randint(0, len(users))),
        film_likes = sample(users, randint(0, len(users)))
    )
    film12 = Film(
        title = "October Sky",
        year = 1999,
        description = "Sometimes one dream is enough to light up the whole sky. Based on the true story of Homer Hickam, a coal miner’s son who was inspired by the first Sputnik launch to take up rocketry against his father’s wishes, and eventually became a NASA scientist.",
        background_img_url = "https://a.ltrbxd.com/resized/sm/upload/vq/cs/2w/iu/october-sky-10-1200-1200-675-675-crop-000000.jpg",
        trailer_url = "https://www.youtube.com/watch?v=zxJQgYPXjN4",
        tile_img_url = "https://a.ltrbxd.com/resized/film-poster/4/3/8/6/8/43868-october-sky-0-460-0-690-crop.jpg",
        director = "Joe Johnston",
        genre = "Family, Drama",
        film_user = users[3],
        film_watches = sample(users, randint(0, len(users))),
        film_likes = sample(users, randint(0, len(users)))
    )

    films = [film1, film2, film3, film4, film5, film6, film7, film8, film9, film10, film11, film12]
    add_films = [db.session.add(film) for film in films]
    db.session.commit()

    return films

def undo_films():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.films RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM films"))

    db.session.commit()
