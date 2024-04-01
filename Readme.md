# AUTORITY CHALLENGE API BOILERPLATE

Express backend boilerplate for Autority Challenge.

### Prerequisites

- [NodeJS v16](https://nodejs.org/)
- [PostgresSQL](https://www.postgresql.org/)

## Getting Started

Clone this project in your repository
Create PostgresSQL Data base with name `autority-challenge` on local or cloud and configure user and password

### Configure the database

Create a migration for the database table `todo` and columns:

| Name      | Type |
| ----------- | ----------- |
| id      | int AUTO_INCREMENT PRIMARY KEY       |
| name   | varchar NOT NULL       |
| description  | text NOT NULL       |
| author   | varchar NOT NULL       |
| isComplete  | boolean NOT NULL       |
| createdAt   | datetime NOT NULL DETAUL CURRENT_TIMESTAMP |
| updateAt   | datetime NOT NULL DETAUL CURRENT_TIMESTAMP |
| deleteAt   | datetime |


Copy `.env.example` in new file with name `.env` and enter your database information.

## Run migrations

```bash
npm run migrate
```
**Note:** *The project have a migration for reference: 'src/database/migrations/20221001094700-create-user-table-reference.js'*

**Note:** *The api route 'http://localhost:4000/health' test the server and database*

## Start Development Server

Install the project dependencies:

```bash
npm install
```

Start the db
```
docker-compose up
```

Start the dev server

```bash
npm run dev
```

## Work your apis APIs under the following criteria

| API               |    CRUD    |                                Description |
| :---------------- | :--------: | -----------------------------------------: |
| GET /tasks        |  **READ**  |        Get all Task created in `todo` table |
| GET /task/{id}    |  **READ**  |        Get the Task by id from `todo` table |
| POST /task        | **CREATE** | Create a Task and insert into `todo` table |
| PUT /task/{id}    | **UPDATE** |            Update the Task by id in `todo` table |
| DELETE /task/{id} | **DELETE** |            Delete a Task by id from `todo` table |

