# Strava Segments to NFTs

[![Build](https://github.com/alainncls/strava-segments-to-nfts-webapp/actions/workflows/tests.yml/badge.svg)](https://github.com/alainncls/strava-segments-to-nfts-webapp/actions/workflows/tests.yml)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=alainncls_strava-segments-to-nfts-webapp&metric=coverage)](https://sonarcloud.io/summary/new_code?id=alainncls_strava-segments-to-nfts-webapp)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=alainncls_strava-segments-to-nfts-webapp&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=alainncls_strava-segments-to-nfts-webapp)

Web application for a project aiming to generate an NFT for each new unique and eligible segment a Strava user runs
through.  
Backend project is [here](https://github.com/alainncls/strava-segments-to-nfts) and contains much of the
information/notes.

## How to launch

### 1. Add Strava identifiers

Add a `.env.local` file following the `.env` template, and add your (secret) Strava identifiers.

### 2. Install dependencies

    npm install

### 3. Run the webapp

    npm run start

## How to test

### Run unit tests with watch

    npm run test

### Run unit tests with coverage

    npm run test:coverage

## Technical notes/ideas

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).