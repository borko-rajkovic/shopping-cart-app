# ShoppingCartApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.7.

# Installation

```
npm install
cd backend
npm install
```

# Run project

You can choose to run separate frontend and backend, or to run them in parallel

After backend is up and running, you can find Swagger documentation for Rest API:

http://localhost:3000/api/

### Run backend

```
cd backend
npm start
```

### Run frontend

```
npm start
```

### Run frontend and backend in parallel

```
npm start-with-backend
```

# Tests

### Unit tests

```
npm run test
```

### E2E tests

First you need to start frontend (no need to start backend since testing framework will provide routes)

```
npm run start
```

After frontend is up and running, run following command:

```
npm run cypress
```

# Cordova

This project contains support for FingerprintAuth (Android platform)

## Setup

In order to set it up, follow these instructions:

### Install Cordova

```
npm install cordova -g
```

### Build Frontend for Cordova

```
npm run build:cordova
```

## Run in browser

```
cd CordovaShoppingCart
cordova run browser
```

## Emulate on Android

```
cd CordovaShoppingCart
cordova emulate android
```

## Build for Android

```
cd CordovaShoppingCart
cordova build android
```
