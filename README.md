# SMS Management Application API

 [![CircleCI](https://circleci.com/gh/ssewilliam/snap-sms.svg?style=svg&circle-token=e07afdba4b4897ac22e1bfad7baca168424b55ed)](https://circleci.com/gh/ssewilliam/snap-sms)

---
SNAP SMS is a simple API that allows users to send messages to a list of available contacts

---

## Prerequisites and Technologies used

- [Node Js](https://nodejs.org/en/)
- [Express Js](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [PostgreSQL](https://www.postgresql.org/)

## How to install and run the application

- Clone the [repo](https://github.com/ssewilliam/snap-sms.git) and `cd into snap-sms`
- Run `yarn` or `npm install` to install the API dependencies
- Create a .env file using `.env-example-file` to add the following environment variables
  - DATABASE_DIALECT
  - DATABASE_URL
  - NODE_ENV
  - PORT
  - SEQUELISE_LOGGING
  - NO_PLURALIZE_TABLE_NAMES

- Run `yarn makemigrations` to create tables in the database you created initially
- Run `yarn start` to start the application

| Author | |
| --- | -- |
| <img style="border-radius: 50%" src="https://avatars3.githubusercontent.com/u/21138053?s=180&v=4" width="70"/>| ssewilliam |
