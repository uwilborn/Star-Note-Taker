//Dependencies

const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

// ROUTING
// API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the notes)
  // ---------------------------------------------------------------------------


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
//Requirement: GET /api/notes should read the db.json file and return all saved notes as JSON.


   app.get("/api/notes", function(req, res) {
   res.json(thenotes);
});

//STEP 3: Use express method app.post(path, callback function) to route the HTTP POST 
//request to the specified path with the specified callback functions. To access the parsed request body, use req.body().
//callback function receives a request of a new note object, adds it to the object array via push array method,
// then calls the function that will update the json file.Return a confirmation to the user.
//Requirement: POST /api/notes should receive a new note to save on the request body, add it to the db.json file, 
//and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

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
 //Reference: https://modernweb.com/the-basics-of-express-routes/
 // (example)
 //Route path: /todos/:id
//Request URL: http://localhost:xxxx/todos/36
//req.params: { "id": "36" }

app.get("/api/thenotes/:id", function(req,res) {
    // display json for the thenotes array indices of the provided id
    res.json(thenotes[req.params.id]);
});

// STEP 5: (DELETE) Use  express method to delete a note with specific object id
//DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete. 
//In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.

  app.delete("/api/thenotes/:id", function(req, res) {
    thenotes.splice(req.params.id, 1);
    updatedb();
    console.log("Note Deleted:"+req.params.id);
});


  
  
 //STEP 6A:(UNIQUE ID)
 //Possible Step (unique id addition if it works)
const addId = (id = 1) => {
   return function recur(thenotes) {
      if ('title' in thenotes) {
         thenotes.id = id++;
      };
      Object.keys(thenotes).forEach(el => {
         Array.isArray(thenotes[el]) && thenotes[el].forEach(recur);
      });
   };
}
const mapId = thenotes => {
   thenotes.forEach(addId);
}
mapId(thenotes);
console.log(JSON.stringify(thenotes, undefined, 2));
  
  
  
 //STEP 6: (UPDATE) Use fs.writefile(file,contents,error function) to resplace the contents of the db.json file. 
//When sending data to a web server, the data has to be a string. Convert a JavaScript object into a string with JSON.stringify().
//Reference: https://heynode.com/tutorial/readwrite-json-files-nodejs/
//db.json will be overwritten
  
function updatedb() {
  fs.writeFile("db/db.json",JSON.stringify(thenotes),err => {
      if (err) throw err;
      return true;
  });
};

//the end


//Original(https://www.tutorialspoint.com/adding-a-unique-id-for-each-entry-in-json-object-in-javascript)
//const addId = (id = 1) => {
 //  return function recur(obj) {
 //     if ('title' in obj) {
 //        obj.id = id++;
 //     };
 //     Object.keys(obj).forEach(el => {
 //        Array.isArray(obj[el]) && obj[el].forEach(recur);
 //     });
 //  };
//}
//const mapId = arr => {
//   arr.forEach(addId);
//}
//mapId(arr);
//console.log(JSON.stringify(arr, undefined, 4));
