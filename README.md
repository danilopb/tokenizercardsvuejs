# Tokenizer Cards VueJs

This is an frond end application to Tokenizer cards api.

## Prerequisites

Make sure you have Node.js and npm installed on your machine.

- Node.js (v18.0.0 or higher)

## Installation

1. Clone this repository to your local machine:

   git clone https://github.com/danilopb/tokenizercardsvuejs.git

2. Navigate to the project directory:

cd tokenizercardsvueJs

3. Install the project dependencies:

npm install

## Configuration

Before running the application, make sure to configure the necessary environment variables. Follow these steps:

Create a .env file in the root directory of the project.

Inside .env, define the required environment variables according to your needs. Here's an example or you can check the file .env.example in root directory:

```
VUE_APP_BASE_API_URL="http://localhost:3011/api"
```
The variable VUE_APP_BASE_API_URL contains the url of the api to be communicated with

## Usage

To start the API server, run the following command in the project directory:
```
npm run serve
```
The API server will start listening on the specified port (e.g., 8080).

## Other commands

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
