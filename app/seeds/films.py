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
        trailer_url = "https://youtu.be/foyufD52aog",
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
        description = "Don't go in the water. When an insatiable great white shark terrorizes the townspeople of Amity Island, the police chief, an oceanographer and a grizzled shark hunter seek to destroy the blood-thirsty beast.",
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
    film13 = Film(
        title="The Shawshank Redemption",
        year=1994,
        description="Two imprisoned men bond over several years, finding solace and eventual redemption through acts of common decency.",
        trailer_url="https://www.youtube.com/watch?v=6hB3S9bIaco",
        director="Frank Darabont",
        genre="Drama",
        background_img_url="https://a.ltrbxd.com/resized/sm/upload/1y/23/4e/ir/shawshank-redemption-1200-1200-675-675-crop-000000.jpg",
        tile_img_url="https://a.ltrbxd.com/resized/sm/upload/7l/hn/46/uz/zGINvGjdlO6TJRu9wESQvWlOKVT-0-460-0-690-crop.jpg",
        film_user = users[randint(0, len(users) - 1)],
        film_watches = sample(users, randint(0, len(users))),
        film_likes = sample(users, randint(0, len(users)))
    )
    film14 = Film(
        title="The Godfather",
        year=1972,
        description="The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        trailer_url="https://www.youtube.com/watch?v=sY1S34973zA",
        director="Francis Ford Coppola",
        genre="Crime",
        background_img_url="https://a.ltrbxd.com/resized/sm/upload/zp/bn/1x/6r/the-godfather-1200-1200-675-675-crop-000000.jpg",
        tile_img_url="https://a.ltrbxd.com/resized/film-poster/5/1/8/1/8/51818-the-godfather-0-460-0-690-crop.jpg",
        film_user = users[randint(0, len(users) - 1)],
        film_watches = sample(users, randint(0, len(users))),
        film_likes = sample(users, randint(0, len(users)))
    )
    film15 = Film(
        title="Pulp Fiction",
        year=1994,
        description="Various interconnected stories revolve around the Los Angeles underworld.",
        trailer_url="https://www.youtube.com/watch?v=s7EdQ4FqbhY",
        director="Quentin Tarantino",
        genre="Crime",
        background_img_url="https://a.ltrbxd.com/resized/sm/upload/z6/e0/vw/uy/pulp-fiction-65-1200-1200-675-675-crop-000000.jpg",
        tile_img_url="https://a.ltrbxd.com/resized/film-poster/5/1/4/4/4/51444-pulp-fiction-0-460-0-690-crop.jpg",
        film_user = users[randint(0, len(users) - 1)],
        film_watches = sample(users, randint(0, len(users))),
        film_likes = sample(users, randint(0, len(users)))
    )
    film16 = Film(
        title="Fight Club",
        year=1999,
        description="An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
        trailer_url="https://www.youtube.com/watch?v=J8FRBYOFu2w",
        director="David Fincher",
        genre="Drama",
        background_img_url="https://a.ltrbxd.com/resized/sm/upload/b0/iz/eb/dq/fight-club-1200-1200-675-675-crop-000000.jpg",
        tile_img_url="https://a.ltrbxd.com/resized/film-poster/5/1/5/6/8/51568-fight-club-0-460-0-690-crop.jpg",
        film_user = users[randint(0, len(users) - 1)],
        film_watches = sample(users, randint(0, len(users))),
        film_likes = sample(users, randint(0, len(users)))
    )
    film17 = Film(
        title="Forrest Gump",
        year=1994,
        description="The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold through the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
        trailer_url="https://www.youtube.com/watch?v=bLvqoHBptjg",
        director="Robert Zemeckis",
        genre="Drama",
        background_img_url="https://a.ltrbxd.com/resized/sm/upload/ly/1s/z6/yx/forrest-gump-1200-1200-675-675-crop-000000.jpg",
        tile_img_url="https://a.ltrbxd.com/resized/film-poster/2/7/0/4/2704-forrest-gump-0-460-0-690-crop.jpg",
        film_user = users[randint(0, len(users) - 1)],
        film_watches = sample(users, randint(0, len(users))),
        film_likes = sample(users, randint(0, len(users)))
    )
    film18 = Film(
        title="The Dark Knight",
        year=2008,
        description="When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham, the Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        trailer_url="https://www.youtube.com/watch?v=EXeTwQWrcwY",
        director="Christopher Nolan",
        genre="Action",
        background_img_url="https://a.ltrbxd.com/resized/sm/upload/zu/51/m1/43/the-dark-knight-20-1200-1200-675-675-crop-000000.jpg",
        tile_img_url="https://a.ltrbxd.com/resized/sm/upload/78/y5/zg/ej/oefdD26aey8GPdx7Rm45PNncJdU-0-460-0-690-crop.jpg",
        film_user = users[randint(0, len(users) - 1)],
        film_watches = sample(users, randint(0, len(users))),
        film_likes = sample(users, randint(0, len(users)))
    )
    film19 = Film(
        title="The Lord of the Rings: The Return of the King",
        year=2003,
        description="Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
        trailer_url="https://www.youtube.com/watch?v=r5X-hFf6Bwo",
        director="Peter Jackson",
        genre="Adventure",
        background_img_url="https://a.ltrbxd.com/resized/sm/upload/a7/4r/al/mc/lotr-return-of-the-king-1200-1200-675-675-crop-000000.jpg",
        tile_img_url="https://a.ltrbxd.com/resized/sm/upload/zs/nt/u4/uz/xieWkPAgQrrk5wOyncayPd65hrp-0-460-0-690-crop.jpg",
        film_user = users[randint(0, len(users) - 1)],
        film_watches = sample(users, randint(0, len(users))),
        film_likes = sample(users, randint(0, len(users)))
    )
    film20 = Film(
        title="The Matrix",
        year=1999,
        description="A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
        trailer_url="https://www.youtube.com/watch?v=Q8g9zL-JL8E",
        director="Lana Wachowski, Lilly Wachowski",
        genre="Action",
        background_img_url="https://a.ltrbxd.com/resized/sm/upload/o3/er/ey/ie/matrix-1200-1200-675-675-crop-000000.jpg",
        tile_img_url="https://a.ltrbxd.com/resized/film-poster/5/1/5/1/8/51518-the-matrix-0-460-0-690-crop.jpg",
        film_user = users[randint(0, len(users) - 1)],
        film_watches = sample(users, randint(0, len(users))),
        film_likes = sample(users, randint(0, len(users)))
    )
    film21 = Film(
        title="Schindler's List",
        year=1993,
        description="In German-occupied Poland during World War II, Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazi Germans.",
        trailer_url="https://www.youtube.com/watch?v=JdRGC-w9syA",
        director="Steven Spielberg",
        genre="Biography",
        background_img_url="https://a.ltrbxd.com/resized/sm/upload/nd/tx/5x/q9/schindlers-list-1200-1200-675-675-crop-000000.jpg",
        tile_img_url="https://a.ltrbxd.com/resized/sm/upload/bz/1x/em/jr/yPisjyLweCl1tbgwgtzBCNCBle-0-460-0-690-crop.jpg",
        film_user = users[randint(0, len(users) - 1)],
        film_watches = sample(users, randint(0, len(users))),
        film_likes = sample(users, randint(0, len(users)))
    )
    film22 = Film(
        title="Goodfellas",
        year=1990,
        description="The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate.",
        trailer_url="https://www.youtube.com/watch?v=qo5jJpHtI1Y",
        director="Martin Scorsese",
        genre="Crime",
        background_img_url="https://a.ltrbxd.com/resized/sm/upload/ws/2f/hj/8v/goodfellas-1200-1200-675-675-crop-000000.jpg",
        tile_img_url="https://a.ltrbxd.com/resized/film-poster/5/1/3/8/3/51383-goodfellas-0-460-0-690-crop.jpg",
        film_user = users[randint(0, len(users) - 1)],
        film_watches = sample(users, randint(0, len(users))),
        film_likes = sample(users, randint(0, len(users)))
    )
    film23 = Film(
        title="The Silence of the Lambs",
        year=1991,
        description="A young F.B.I. cadet must confide in an incarcerated and manipulative killer to receive his help on catching another serial killer who skins his victims.",
        trailer_url="https://www.youtube.com/watch?v=W6Mm8Sbe__o",
        director="Jonathan Demme",
        genre="Crime",
        background_img_url="https://a.ltrbxd.com/resized/sm/upload/jq/r8/n3/gk/silence-of-the-lambs-1200-1200-675-675-crop-000000.jpg",
        tile_img_url="https://a.ltrbxd.com/resized/film-poster/5/1/7/8/2/51782-the-silence-of-the-lambs-0-460-0-690-crop.jpg",
        film_user = users[randint(0, len(users) - 1)],
        film_watches = sample(users, randint(0, len(users))),
        film_likes = sample(users, randint(0, len(users)))
    )
    film24 = Film(
        title="Saving Private Ryan",
        year=1998,
        description="Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.",
        trailer_url="https://www.youtube.com/watch?v=1gz2B8xb0ug",
        director="Steven Spielberg",
        genre="Drama",
        background_img_url="https://a.ltrbxd.com/resized/sm/upload/3d/c1/78/g4/saving-private-ryan-80-1200-1200-675-675-crop-000000.jpg",
        tile_img_url="https://a.ltrbxd.com/resized/sm/upload/hz/fu/r7/y7/35CMz4t7PuUiQqt5h4u5nbrXZlF-0-460-0-690-crop.jpg",
        film_user = users[randint(0, len(users) - 1)],
        film_watches = sample(users, randint(0, len(users))),
        film_likes = sample(users, randint(0, len(users)))
    )
    film25 = Film(
        title="The Departed",
        year=2006,
        description="An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.",
        trailer_url="https://www.youtube.com/watch?v=SGWvwjZ0eDc",
        director="Martin Scorsese",
        genre="Crime",
        background_img_url="https://a.ltrbxd.com/resized/sm/upload/33/lu/26/83/the-departed-1200-1200-675-675-crop-000000.jpg",
        tile_img_url="https://a.ltrbxd.com/resized/sm/upload/jr/th/pu/pb/laefkgrfa3oKwvBtWTBtf2suiI4-0-460-0-690-crop.jpg",
        film_user = users[randint(0, len(users) - 1)],
        film_watches = sample(users, randint(0, len(users))),
        film_likes = sample(users, randint(0, len(users)))
    )
    film26 = Film(
        title="The Lion King",
        year=1994,
        description="Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.",
        trailer_url="https://www.youtube.com/watch?v=4sj1MT05lAA",
        director="Roger Allers, Rob Minkoff",
        genre="Animation",
        background_img_url="https://a.ltrbxd.com/resized/sm/upload/g5/1m/19/tr/the-lion-king-150-1200-1200-675-675-crop-000000.jpg",
        tile_img_url="https://a.ltrbxd.com/resized/sm/upload/lz/96/yu/mf/ztuEReeV6ofpU1HxUV9AsR6aLoe-0-460-0-690-crop.jpg",
        film_user = users[randint(0, len(users) - 1)],
        film_watches = sample(users, randint(0, len(users))),
        film_likes = sample(users, randint(0, len(users)))
    )
    film27 = Film(
        title="The Usual Suspects",
        year=1995,
        description="A sole survivor tells of the twisty events leading up to a horrific gun battle on a boat, which began when five criminals met at a seemingly random police lineup.",
        trailer_url="https://www.youtube.com/watch?v=oiXdPolca5w",
        director="Bryan Singer",
        genre="Crime",
        background_img_url="https://a.ltrbxd.com/resized/sm/upload/7i/1n/bq/2m/usual-suspects-1200-1200-675-675-crop-000000.jpg",
        tile_img_url="https://a.ltrbxd.com/resized/film-poster/5/1/4/9/5/51495-the-usual-suspects-0-460-0-690-crop.jpg",
        film_user = users[randint(0, len(users) - 1)],
        film_watches = sample(users, randint(0, len(users))),
        film_likes = sample(users, randint(0, len(users)))
    )
    film28 = Film(
        title="The Avengers",
        year=2012,
        description="Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
        trailer_url="https://www.youtube.com/watch?v=eOrNdBpGMv8",
        director="Joss Whedon",
        genre="Action",
        background_img_url="https://a.ltrbxd.com/resized/sm/upload/8w/a1/14/qk/the-avengers-2012-1200-1200-675-675-crop-000000.jpg",
        tile_img_url="https://a.ltrbxd.com/resized/sm/upload/10/u6/42/pa/cezWGskPY5x7GaglTTRN4Fugfb8-0-460-0-690-crop.jpg",
        film_user = users[randint(0, len(users) - 1)],
        film_watches = sample(users, randint(0, len(users))),
        film_likes = sample(users, randint(0, len(users)))
    )
    film29 = Film(
        title="Whiplash",
        year=2014,
        description="A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.",
        trailer_url="https://www.youtube.com/watch?v=7d_jQycdQGo",
        director="Damien Chazelle",
        genre="Drama",
        background_img_url="https://a.ltrbxd.com/resized/sm/upload/sk/f3/f1/b2/whiplash-1200-1200-675-675-crop-000000.jpg",
        tile_img_url="https://a.ltrbxd.com/resized/sm/upload/cl/dn/kr/f1/4C9LHDxMsoYI0S3iMPZdm3Oevwo-0-460-0-690-crop.jpg",
        film_user = users[randint(0, len(users) - 1)],
        film_watches = sample(users, randint(0, len(users))),
        film_likes = sample(users, randint(0, len(users)))
    )
    film30 = Film(
        title="The Social Network",
        year=2010,
        description="Harvard student Mark Zuckerberg creates the social networking site that would become known as Facebook but is later sued by two brothers who claimed he stole their idea, and the co-founder who was later squeezed out of the business.",
        trailer_url="https://www.youtube.com/watch?v=lB95KLmpLR4",
        director="David Fincher",
        genre="Drama",
        background_img_url="https://a.ltrbxd.com/resized/sm/upload/cw/9j/d9/kp/the-social-network-1200-1200-675-675-crop-000000.jpg",
        tile_img_url="https://a.ltrbxd.com/resized/sm/upload/nw/cm/pa/ai/sGQv3ZMZBDBnl3z42Q0mEQ5uiDe-0-460-0-690-crop.jpg",
        film_user = users[randint(0, len(users) - 1)],
        film_watches = sample(users, randint(0, len(users))),
        film_likes = sample(users, randint(0, len(users)))
    )
    film31 = Film(
        title="Inglourious Basterds",
        year=2009,
        description="In Nazi-occupied France during World War II, a plan to assassinate Nazi leaders by a group of Jewish U.S. soldiers coincides with a theatre owner's vengeful plans for the same.",
        trailer_url="https://www.youtube.com/watch?v=6AtLlVNsuAc",
        director="Quentin Tarantino",
        genre="Adventure",
        background_img_url="https://a.ltrbxd.com/resized/sm/upload/3k/ei/4w/1h/inglourious-basterds-1200-1200-675-675-crop-000000.jpg",
        tile_img_url="https://a.ltrbxd.com/resized/film-poster/4/1/3/5/2/41352-inglourious-basterds-0-460-0-690-crop.jpg",
        film_user = users[randint(0, len(users) - 1)],
        film_watches = sample(users, randint(0, len(users))),
        film_likes = sample(users, randint(0, len(users)))
    )
    film32 = Film(
        title="Avengers: Endgame",
        year=2019,
        description="The Avengers embark on a final mission to reverse the devastating effects of Thanos' snap and restore balance to the universe.",
        trailer_url="https://www.youtube.com/watch?v=TcMBFSGVi1c",
        director="Anthony Russo, Joe Russo",
        genre="Action",
        background_img_url="https://a.ltrbxd.com/resized/sm/upload/pv/3f/zz/og/avengers-endgame-1200-1200-675-675-crop-000000.jpg",
        tile_img_url="https://a.ltrbxd.com/resized/film-poster/2/2/6/6/6/0/226660-avengers-endgame-0-460-0-690-crop.jpg",
        film_user = users[randint(0, len(users) - 1)],
        film_watches = sample(users, randint(0, len(users))),
        film_likes = sample(users, randint(0, len(users)))
    )
    film33 = Film(
        title="Avatar",
        year=2009,
        description="A paraplegic marine is sent to the planet Pandora on a unique mission, but he becomes torn between following orders and protecting the world he feels is his home.",
        trailer_url="https://www.youtube.com/watch?v=5PSNL1qE6VY",
        director="James Cameron",
        genre="Adventure",
        background_img_url="https://a.ltrbxd.com/resized/sm/upload/7s/di/by/2k/avatar-1200-1200-675-675-crop-000000.jpg",
        tile_img_url="https://a.ltrbxd.com/resized/sm/upload/1p/mh/li/l2/b7nR3eKeTOwHPKmDLUWunIGasKo-0-460-0-690-crop.jpg",
        film_user = users[randint(0, len(users) - 1)],
        film_watches = sample(users, randint(0, len(users))),
        film_likes = sample(users, randint(0, len(users)))
    )
    film34 = Film(
        title="Titanic",
        year=1997,
        description="A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
        trailer_url="https://www.youtube.com/watch?v=2e-eXJ6HgkQ",
        director="James Cameron",
        genre="Drama",
        background_img_url="https://a.ltrbxd.com/resized/sm/upload/vw/ni/jd/40/titanic-1200-1200-675-675-crop-000000.jpg",
        tile_img_url="https://a.ltrbxd.com/resized/film-poster/5/1/5/2/4/51524-titanic-0-460-0-690-crop.jpg",
        film_user = users[randint(0, len(users) - 1)],
        film_watches = sample(users, randint(0, len(users))),
        film_likes = sample(users, randint(0, len(users)))
    )
    film35 = Film(
        title="Star Wars: The Force Awakens",
        year=2015,
        description="Three decades after the defeat of the Galactic Empire, a new threat arises. The Resistance, led by General Leia Organa, must stop the First Order's rise to power.",
        trailer_url="https://www.youtube.com/watch?v=sGbxmsDFVnE",
        director="J.J. Abrams",
        genre="Action",
        background_img_url="https://a.ltrbxd.com/resized/sm/upload/w7/zg/ko/rl/star-wars-force-awakens-1200-1200-675-675-crop-000000.jpg",
        tile_img_url="https://a.ltrbxd.com/resized/sm/upload/t1/n6/d1/k6/g2mqdMU3jaz6uEosF5aqJgbw7e9-0-460-0-690-crop.jpg",
        film_user = users[randint(0, len(users) - 1)],
        film_watches = sample(users, randint(0, len(users))),
        film_likes = sample(users, randint(0, len(users)))
    )
    film36 = Film(
        title="Avengers: Infinity War",
        year=2018,
        description="The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.",
        trailer_url="https://www.youtube.com/watch?v=6ZfuNTqbHE8",
        director="Anthony Russo, Joe Russo",
        genre="Action",
        background_img_url="https://a.ltrbxd.com/resized/sm/upload/22/q6/od/p6/avengers-infinity-war-1200-1200-675-675-crop-000000.jpg",
        tile_img_url="https://a.ltrbxd.com/resized/film-poster/2/2/6/6/6/1/226661-avengers-infinity-war-0-460-0-690-crop.jpg",
        film_user = users[randint(0, len(users) - 1)],
        film_watches = sample(users, randint(0, len(users))),
        film_likes = sample(users, randint(0, len(users)))
    )
    film37 = Film(
        title="Jurassic World",
        year=2015,
        description="A new theme park, built on the original site of Jurassic Park, creates a genetically modified hybrid dinosaur that escapes containment and goes on a rampage.",
        trailer_url="https://www.youtube.com/watch?v=RFinNxS5KN4",
        director="Colin Trevorrow",
        genre="Adventure",
        background_img_url="https://a.ltrbxd.com/resized/sm/upload/7c/u4/4v/r2/jurassic-world-1200-1200-675-675-crop-000000.jpg",
        tile_img_url="https://a.ltrbxd.com/resized/film-poster/1/0/4/1/7/4/104174-jurassic-world-0-460-0-690-crop.jpg",
        film_user = users[randint(0, len(users) - 1)],
        film_watches = sample(users, randint(0, len(users))),
        film_likes = sample(users, randint(0, len(users)))
    )
    film38 = Film(
        title="Frozen II",
        year=2019,
        description="Anna, Elsa, Kristoff, Olaf, and Sven leave Arendelle to travel to an ancient, autumn-bound forest of an enchanted land. They set out to find the origin of Elsa's powers in order to save their kingdom.",
        trailer_url="https://www.youtube.com/watch?v=bwzLiQZDw2I",
        director="Chris Buck, Jennifer Lee",
        genre="Animation",
        background_img_url="https://a.ltrbxd.com/resized/sm/upload/5h/mn/vz/i3/37735823-FEA3-4DF6-A86D-28394558BAD8-1200-1200-675-675-crop-000000.jpg",
        tile_img_url="https://a.ltrbxd.com/resized/film-poster/2/5/8/1/2/7/258127-frozen-ii-0-460-0-690-crop.jpg",
        film_user = users[randint(0, len(users) - 1)],
        film_watches = sample(users, randint(0, len(users))),
        film_likes = sample(users, randint(0, len(users)))
    )
    film39 = Film(
        title="Beauty and the Beast",
        year=2017,
        description="A selfish prince is cursed to become a monster for the rest of his life unless he learns to fall in love with a beautiful young woman he keeps prisoner.",
        trailer_url="https://www.youtube.com/watch?v=OvW_L8sTu5E",
        director="Bill Condon",
        genre="Fantasy",
        background_img_url="https://a.ltrbxd.com/resized/sm/upload/op/ow/pu/rc/beauty-and-beast-2017-1200-1200-675-675-crop-000000.jpg",
        tile_img_url="https://a.ltrbxd.com/resized/film-poster/2/4/8/7/0/8/248708-beauty-and-the-beast-0-460-0-690-crop.jpg",
        film_user = users[randint(0, len(users) - 1)],
        film_watches = sample(users, randint(0, len(users))),
        film_likes = sample(users, randint(0, len(users)))
    )
    film40 = Film(
        title="Eight Crazy Nights",
        year=2002,
        description="Davey Stone, a 33-year old party animal, finds himself in trouble with the law after his wild ways go too far.",
        trailer_url="https://www.youtube.com/watch?v=VoFIpnSGnZk",
        director="Seth Kearsley",
        genre="Animation, Comedy",
        background_img_url="https://a.ltrbxd.com/resized/sm/upload/7y/qr/v0/pu/eight-crazy-nights-1200-1200-675-675-crop-000000.jpg",
        tile_img_url="https://a.ltrbxd.com/resized/film-poster/4/3/9/4/1/43941-eight-crazy-nights-0-460-0-690-crop.jpg",
        film_user = users[randint(0, len(users) - 1)],
        film_watches = sample(users, randint(0, len(users))),
        film_likes = sample(users, randint(0, len(users)))
    )
    film41 = Film(
        title="La La Land",
        year=2016,
        description="Mia, an aspiring actress, serves lattes to movie stars in between auditions and Sebastian, a jazz musician, scrapes by playing cocktail party gigs in dingy bars, but as success mounts they are faced with decisions that begin to fray the fragile fabric of their love affair, and the dreams they worked so hard to maintain in each other threaten to rip them apart.",
        trailer_url="https://www.youtube.com/watch?v=VoFIpnSGnZk",
        director="Damien Chazelle",
        genre="Music, Drama, Romance, Comedy",
        background_img_url="https://a.ltrbxd.com/resized/sm/upload/a6/th/cz/kf/la-la-land-1200-1200-675-675-crop-000000.jpg",
        tile_img_url="https://a.ltrbxd.com/resized/film-poster/2/4/0/3/4/4/240344-la-la-land-0-460-0-690-crop.jpg",
        film_user = users[randint(0, len(users) - 1)],
        film_watches = sample(users, randint(0, len(users))),
        film_likes = sample(users, randint(0, len(users)))
    )



    films = [film1, film2, film3, film4, film5, film6, film7, film8, film9, film10, film11, film12, film13, film14, film15, film16, film17, film18, film19, film20, film21, film22, film23, film24, film25, film26, film27, film28, film29, film30, film31, film32, film33, film34, film35, film36, film37, film38, film39, film40, film41]
    add_films = [db.session.add(film) for film in films]
    db.session.commit()

    return films

def undo_films():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.films RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM films"))

    db.session.commit()
