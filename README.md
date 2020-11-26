# Currency Rate App

A small one page application that displays all the currencies from the bank and their respective exchange rate.

## Specification

The page has a header and a search bar at the top.

Each currency list item contains:

- Flag of the country
- Name of the country
- Currency of the country
- Exchange rate of that currency (middle rate)

The currencies are searchable by an input field.
The search term is also present in the URL as a query parameter and deep linking works accordingly.\
Example: [http://localhost:3000/search?currency=huf](http://localhost:3000/search?currency=huf)

## Setup

The project requires the Long Term Support (LTS) version of Node.js (14.15.1) to be installed.

### Install the dependencies

```bash
npm install
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
