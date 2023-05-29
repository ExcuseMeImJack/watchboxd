# Watchboxd

Watchboxd is a clone of Letterboxd, a movie-based social media site. Watchboxd is providing the moviegoer a space to create custom lists, find friends and discover films.

Check out [Watchboxd](https://watchboxd.onrender.com)

## Index

[MVP Feature List](https://github.com/ExcuseMeImJack/watchboxd/wiki/MVP-Feature-List) |
[Database Scheme](https://github.com/ExcuseMeImJack/watchboxd/wiki/Database-Schema) |
[User Stories](https://github.com/ExcuseMeImJack/watchboxd/wiki/User-Stories) |
[Wire Frames](https://github.com/ExcuseMeImJack/watchboxd/wiki/Wireframe) |

## Technologies Used

<img src='https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white'>
<img src='https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white'>
<img src='https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E'>
<img src='https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white'>
<img src='https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB'>
<img src='https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white'>
<img src='https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white'>
<img src='https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white'>
<img src='https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white'>
<img src='https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white'>
<img src='https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white'>
<img src='https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E'>


## Splash Page
![splash](https://user-images.githubusercontent.com/66566925/174560214-c0601b18-8cbe-4ce4-895c-8bf8b196eeb5.gif)

## Spots
![spots](https://user-images.githubusercontent.com/66566925/174561250-05f8e96e-eb7e-4741-9167-e3a6eaf2f7d0.gif)

## One spot page and reviews
![ezgif com-gif-maker](https://i.imgur.com/T2nPAl0.mp4)


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
