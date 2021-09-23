// Dependencies

const express = require('express');
const fs = require('fs');
const path = require('path');

// Sets up the server

const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


// Routes files required used to show what the user will view and where to pull the data from
require('./routes/api')(app);
require('./routes/html')(app);

// Create our server
const server = http.createServer(handleRequest);

// Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
