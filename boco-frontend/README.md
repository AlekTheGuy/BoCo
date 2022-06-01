# BoCo - Frontend


<img src="public/favicon.ico" height="100" title="hover text">

## Table of contents
1. [Installation](#project-setup)
1. [Running the project](#running-the-project)
1. [Running tests](#running-tests)

## Project setup

To run the frontend node.js is required.
- Installation links
    - [node.js](https://nodejs.org/en/download/)

Install required dependencies by running   
```
npm install
```

The frontend cannot run by itself and requires a backend service. The URL to this backend service needs to be provided in the environmental variables. This can be done in these steps

- Create a file with the name ``.env`` in the root folder
- If the backend service uses the default configuration insert this into the file
    ```
    VUE_APP_BASEURL=http://localhost:3000/api/
    ```


## Running the project
- To compile and run with hot-reloads for development
    ```
    npm run serve
    ```

- To compile and minify project for prodoction
    ```
    npm run build
    ```

## Running tests
To run the tests run the command:
```
npm run test:unit
```
This will run all the tests and provide a coverage report. Due to a bug with jest and vue there are tests and files missing in the coverage report. This is due to jest skipping files with ``ES6`` import. 

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
