# PICKO Dapp

## Demo

##### Link: https://picko-app.herokuapp.com/

##### Video: https://www.youtube.com/watch?v=KInTGaoc7yg&t

## Using The App on Production

#### Login Information

> Customer Login Information: Username - test@picko.com, Password - 123123 <br><br>
> Restaurant Login Information: Username - test@picko.com / test2@picko.com, Password - 123123 <br><br>
> Driver Login Information: Username - test@picko.com, Password - 123123

#### Noted

> This project is currently hosted on Heroku. The first loading time will take around 10 seconds<br><br>
> For Customer Testing, you will need to use `Liberty Square Apartments, 4363, Chestnut Ridge Road` as address <br><br>
> For Driver testing, you will need to enable fake location on chrome and set `Latitude: 43.0056` `Longitude: -78.8143` <br>
> For more information about how to enable custom location checkout this [article](https://developer.chrome.com/docs/devtools/device-mode/geolocation/)

## Requirement

##### Node version >= 16.13.2

##### PostgreSQL

##### `.env` file for server

## Installation

##### Node: Download in [Node.js Official Site](https://nodejs.org/en/)

##### PostgreSQL: Download in [PostgreSQL Official Site](https://www.postgresql.org/download/).

#### env variables for server

    DATABASE_URL=postgres://username:password@host:port/databases
    ACCESS_TOKEN_SECRET
    REFRESH_TOKEN_SECRET
    AWS_BUCKET_NAME
    AWS_BUCKET_REGION
    AWS_ACCESS_KEY
    AWS_SECRET_KEY

### Using the App

    npm install
    npm run pre-deploy
    npm run start

### Watch CSS, Client, and Server

    npm install
    npm run watch

### Init DB

    cd server
    npm install
    npm run init-db

## Tech Stack

##### `Frontend:` React TypeScript, Vite, SASS, React Router, Leaflet Map

##### `Backend:` Express TypeScript, Prisma, AWS S3, JWT, Cluster, Socket, PM2

##### `Databases:` Postgresql
