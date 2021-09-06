// Dependencies

const express = require('express');
const fs = require('fs');
const path = require('path');

// Sets up the server

const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

// Routes files required used to show what the user will view and where to pull the data from
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// Create our server
const server = http.createServer(handleRequest);

// Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
