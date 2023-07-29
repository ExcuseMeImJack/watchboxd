# Watchboxd

Watchboxd is a clone of Letterboxd, a movie-based social media site. Watchboxd is providing the moviegoer a space to create custom lists, find friends and discover films.

Check out [Watchboxd](https://watchboxd.onrender.com)

## Index

[MVP Feature List](https://github.com/ExcuseMeImJack/watchboxd/wiki/MVP-Feature-List) |
[Database Scheme](https://github.com/ExcuseMeImJack/watchboxd/wiki/Database-Schema) |
[User Stories](https://github.com/ExcuseMeImJack/watchboxd/wiki/User-Stories) |
[Wire Frames](https://github.com/ExcuseMeImJack/watchboxd/wiki/Wireframe) |

## Technologies Used

<img src='https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white'><img src='https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white'><img src='https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E'><img src='https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white'><img src='https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB'><img src='https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white'><img src='https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white'><img src='https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white'><img src='https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white'><img src='https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white'><img src='https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white'><img src='https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E'>

## Splash Page

![Splash](https://github.com/ExcuseMeImJack/watchboxd/assets/118242834/68422dc6-752a-4d39-8d6c-dbe7521b43b5)

## Films

![Films](https://github.com/ExcuseMeImJack/watchboxd/assets/118242834/b8ac5586-ea10-4c9d-a880-3d6e4e33e848)

## Lists

![Lists](https://github.com/ExcuseMeImJack/watchboxd/assets/118242834/c3836a22-509b-444d-bd00-68ba70adbbec)

## Getting started
1. Clone this repository:

   `
   https://github.com/ExcuseMeImJack/watchboxd.git
   `
2. Install denpendencies into the Backend by running this command in the terminal:

   * `pipenv install -r requirements.txt`

3. Install denpendencies into the Frontend by running these commands in another terminal:

   * `cd react-app`
   * `npm install`

4. Create a **.env** file using the **.envexample** provided

5. Set up your database with information from your .env and then run the following to create your database, migrate, and seed:

   * `pipenv run flask db migrate`
   * `pipenv run flask db upgrade`
   * `pipenv run flask seed all`

6. Start the app for both backend using:

   * `pipenv run flask run`

7. Start the app for both frontend using:

   * `npm start`

8. Now you can use the Demo User or Create an account

## Amazon Web Services S3
* For setting up your AWS refer to this [guide](https://github.com/jdrichardsappacad/aws-s3-pern-demo)

***

# Features

## Films
* Logged in users can create a Film
* Users can read/view Films
* Logged in users can update their Film
* Logged in users can delete their Film

## Lists
* Logged in users can create Lists and add Films to the lists
* Users can read/view all of the Lists
* Logged in users can update their Lists
* Logged in users can delete their List

## Profile
* Users can create a Profile
* Logged in users can read/view their Profile
* Logged in users can update their Profile
* Logged in users can delete their Profile

## Likes
* Logged in users can like a Film
* Logged in users can read/view their Likes
* Logged in users can delete/remove their Like from a Film

## Watches
* Logged in users can add a Watched to a Film
* Logged in users can read/view their Watches
* Logged in users can delete/remove their Watches from a Film

## Watchlist
* Logged in users can add a Film to their Watchlist to create the Watchlist
* Logged in users can read/view their Watchlist
* Logged in users can update their Watchlist

## AWS
* Logged in users can upload a profile picture to AWS S3
* Logged in users can upload a film background image to AWS S3
* Logged in users can upload a film tile image to AWS S3

## Future Features
### Shows
* Logged in users can create a Show
* Users can read/view Shows
* Logged in users can update their Show
* Logged in users can delete their Show

### Friends
* Logged in users can friend other users
* Logged in users can read/view their friends
* Logged in users can remove another user as a friend

### Advanced Details for Films and Shows
* Genres will be able to be added by dropdown menu
* Cast and Crew will be able to be added to the Film/Show
* Episodes will be added to the Shows
* Users will be able to view a cast/crew member's detail page

### Websockets
* Logged in users can message other users they friend

***

# API-Routes
This web app uses the following API routes to dynamically update the page to create a single-page-app-like feel for the user for specific features.

## FILMS
  * `GET /api/films`
      * Purpose: Query for all the films and returns them in a list of film dictionaries
      * Return: `{'films': [{'id': 1, 'title': 'Jurassic Park', . . . }, {'id': 1, . . . }]}`
  * `GET /api/films/{film_id}`
      * Purpose: Query for a film by the film id and returns a film in a dictionary
      * Return: `{'id': 1, 'title': 'Jurassic Park', . . . }`
  * `POST /api/films`
      * Purpose: Create a film that will assign the current user as it's creator and returns the created film in a dictionary
      * Return: `{'id': 1, 'title': 'Jurassic Park', . . . }`
  * `PUT /api/films/{film_id}`
      * Purpose: Update a film by id if the film belongs to the current user and returns the updated film in a dictionary
      * Return: `{'id': 1, 'title': 'Jurassic Park', . . . }`
  * `PUT /api/films/{film_id}`
  * `DELETE /api/films/{film_id}`
      * Purpose: Delete a film by id
      * Return: `{'message': 'Successfully deleted!'}`

## LISTS
  * `GET /api/lists`
      * Purpose: Query for all the lists and returns them in a dictionary
      * Return: `{'lists': [{'id': 1, 'list_name': 'My List', . . . }, {'id': 2, 'list_name': 'My List', . . . }]}`
  * `GET /api/lists/{list_id}`
      * Purpose: Query for a list by the list id and returns a list in a dictionary
      * Return: `{'id': 1, 'list_name': 'My List', . . . }`
  * `POST /api/lists`
      * Purpose: Create a new list
      * Return: `{'id': 1, 'list_name': 'My List', . . . }`
  * `PUT /api/lists/{list_id}`
      * Purpose: Update a list by id
      * Return: `{'id': 1, 'list_name': 'My List', . . . }`
  * `DELETE /api/lists/{list_id}`
      * Purpose: Delete a list by id
      * Return: `{'message': 'Successfully deleted!'}`

## LIKES
  * `POST /api/likes/{film_id}`
      * Purpose: Add a like to a film
      * Return: `'message': 'Film liked'`
  * `DELETE /api/likes/{film_id}`
      * Purpose: Remove a like from a film
      * Return: `{'message': 'Film unliked'}`

## WATCHED
  * `POST /api/watched/{film_id}`
      * Purpose: Add a watched to a film
      * Return: `'message': 'Film watched'`
  * `DELETE /api/watched/{film_id}`
      * Purpose: Remove a watched from a film
      * Return: `{'message': 'Film unwatched'}`

## WATCHLIST
  * `POST /api/watchlist/{film_id}`
      * Purpose: Add a film to the user's watchlist
      * Return: `{'message': 'Film added to watchlist'}`
  * `DELETE /api/watchlist/{film_id}`
      * Purpose: Remove a film from the user's watchlist
      * Return: `{'message': 'Film removed from watchlist'}`

## USERS
  * `GET /api/users`
      * Purpose: Query for all users and returns them in a list of user dictionaries
      * Return: `{'users': [{'id': 1, 'first_name': 'Tester', . . .}, {'id': 2, 'first_name': 'Tester', . . .}]}`
  * `GET /api/users/{user_id}`
      * Purpose: View a specific user by id
      * Return: `{'id': 1, 'first_name': 'Tester', . . .}`
  * `POST /api/auth/signup`
      * Purpose: Create a new user
      * Return `{'id': 1, 'first_name': 'Tester', . . .}`
  * `PUT /api/users`
      * Purpose: Update the current user
      * Return: `{'id': 1, 'first_name': 'Tester', . . .}`
  * `DELETE /api/users`
      * Purpose: Delete the current user
      * Return: `{'message': 'Successfully deleted!'}`
