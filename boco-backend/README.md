# BoCo - Backend

This is the API for the Borrow Company web application. The corresponding frontend is located [here](https://gitlab.stud.idi.ntnu.no/idatt2106_2022_02/boco-frontend).

This project was developed between the 19th of April and The 6th of May, 2022 for the course *IDATT2106 - System development 2 with flexible project* at NTNU. Development follow the agile SCRUM workflow, and was divided into two distinct sprints with corresponding planning and review.

## Run Locally

Clone the project [*with SSH*](https://docs.gitlab.com/ee/user/ssh.html)

```bash
  git clone git@gitlab.stud.idi.ntnu.no:idatt2106_2022_02/boco-backend.git
```

Go to the project directory

```bash
  cd boco-backend
```

#### Environment variables

To run our backend, a configuration file is needed.
- Create a ``.env`` file in the projects root directory.
- Copy paste the following fields into the file.
- If you want to, you can edit the default values with your own configuration. Especially the password should be randomly generated and hard to guess. Remember to make sure the configuration is consistent with the frontend.

```file
POSTGRES_DB=bocodb
POSTGRES_IP=localhost
POSTGRES_PORT=5432
POSTGRES_USER=boco
POSTGRES_PASS=superSecureMegaAwesomePassword
SERVER_PORT=3000
```

#### Running with Docker compose

By far the easiest way to run our backend is through Docker Compose. This is because it automatically configures and runs both the PostgreSQL database and the backend for you.

To do this you need to install [Docker](https://docs.docker.com/get-docker/), and if you're on Linux you also need to install [Docker Compose](https://docs.docker.com/compose/install/) independently.

When you have installed Docker and Docker Compose, simply run

```bash
docker-compose up
```

Docker will now start two containers; one running a PostgreSQL database and one running our backend application.


When you want to shut down the containers run

```bash
docker-compose down
```

If you edit the code, you will need to rebuild the application with

*Note: if you want to change any docker/environment variables you also need to shut down the containers before rebuilding.*

```bash
docker-compose up --build
```

If you want to delete the database contents or change anything about the database configuration (for example the environment variables); shut down the containers, then delete the Docker volume containing the database data.

```bash
docker-compose down
docker volume rm boco-backend_boco-data
```


#### Running natively

First and foremost, to run our backend you need a running [PostgreSQL](https://www.postgresql.org/download/) database.

You also need to install the [JDK](https://www.oracle.com/java/technologies/downloads/) (Java Development Kit). Under development of the API, version 17 LTS (Long Term Support) was used. 

Afterwards, you need to install [Apache Maven](https://maven.apache.org/index.html), our dependency manager of choice.

Then you need to uncomment the PostgreSQL config in the ``application.properties`` file located at ``src/main/resources/``. 

Finally, you can run the API with

```bash
  mvn spring-boot:run
```


## Running Tests

To run tests, run the following command

```bash
  mvn clean test
```
After running the tests a test coverage report will be produced. This report is located in the folder `target/site`

When building through Docker Compose, Docker automatically runs the tests and stops the launching process at failures.

## API Documentation
[API Docs via swagger](http://localhost:3000/api/swagger-ui/index.html#/)
