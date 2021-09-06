//Dependencies

const fs = require('fs');
const path = require('path');

// ROUTING
// API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the notes)
  // ---------------------------------------------------------------------------
//CRUD Methodology

module.exports = (app) => {
  
//STEP 1: Use fs.readFile(file, error function) to read the db.json and return the contents.
//When receiving data from a web server, the data is always a string.
//Parse the data with JSON.parse(), and the data becomes a JavaScript object.


  fs.readFile("db/db.json", (err, data) => {

    if (err) throw err;

    var thenotes = JSON.parse(data);
    return thenotes;
  });

//STEP 2: Use express method app.get() method to define a route handler 
//that the server will call when it receives an HTTP GET request to the path.
//The res.json() function sends a JSON response in the form of an object.


   app.get("/api/notes", function(req, res) {
   res.json(thenotes);
});

//STEP 3: Use express method app.post(path, callback function) to route the HTTP POST 
//request to the specified path with the specified callback functions. To access the parsed request body, use req.body().
//callback function receives a request of a new note object, adds it to the object array via push array method,
// then calls the function that will update the json file.Return a confirmation to the user.

app.post("/api/notes", function(req, res) {
    
    let newNote = req.body;
    thenotes.push(newNote);
    updatedb();
    return console.log("Note Added:"+newNote.title);
});

//STEP 4: (DISPLAY) Like step 3, use app.get() method to define a route handler 
//that the server will call when it receives an HTTP GET request to the path and a specific note.
//The res.json() function sends a JSON response in the form of an object of the specific note.
//Use req.params.id to capture the object specified at the specific position in the object array.

app.get("/api/thenotes/:id", function(req,res) {
    // display json for the thenotes array indices of the provided id
    res.json(thenotes[req.params.id]);
});

// STEP 5: (DELETE) Use  express method to delete a note with specific object id
app.delete("/api/thenotes/:id", function(req, res) {
    thenotes.splice(req.params.id, 1);
    updatedb();
    console.log("Note Deleted:"+req.params.id);
});

//STEP 6: (UPDATE) Use fs.writefile(file,contents,error function) to resplace the contents of the db.json file. 
//When sending data to a web server, the data has to be a string. Convert a JavaScript object into a string with JSON.stringify().

function updatedb() {
  fs.writeFile("db/db.json",JSON.stringify(thenotes),err => {
      if (err) throw err;
      return true;
  });
};
}
