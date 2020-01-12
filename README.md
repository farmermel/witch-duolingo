This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

<div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

## Available Scripts

## Frontend

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information

## Backend

### `node server.js`

Launches the server listening on port 8081.
By default the server sends dummy data. To use the actual Google Translate Api follow [these instructions](https://cloud.google.com/translate/docs/basic/setup-basic#before_you_begin) to obtain an api key and set up your local environment.
You'll then need to set an `NODE_ENV` environment variable to anything but `development` or `test` and the server will start using the Google Api.