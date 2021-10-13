// Setup empty JS object to act as endpoint for all routes
projectData = {};
const port = 8000;

// Require Express to run server and routes
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors())
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
})
// Routes and requestes
app.post("/save-data", (req, res) => {
    let data = req.body;
    projectData.temp = data.temp;
    projectData.date = data.date;
    projectData.content = data.content;
    console.log(data)
    console.log(projectData)
    res.send("")
});
app.get("/get-data", (req, res) => {
    res.send(JSON.stringify(projectData))
    console.log('\n get is triggered')
})