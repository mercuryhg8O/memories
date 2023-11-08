const express = require('express'); 
const mongoose = require('mongoose');

//Imports the Schemas from the Schemas folder
const AccountSchema = require('./src/schemas/account.schema.js');
const MemorySchema = require('./src/schemas/memory.schema.js');

const app = express(); 
const PORT = 3000; 



//URL and connection to the mongodb database
const url = `mongodb+srv://MemoriesUser42:RYplRI3sbvyjHTNi@memoriescluster.tyrwq3x.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(url)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })


//Placeholder code
app.get('/hello', (req, res)=>{ 
    res.set('Content-Type', 'text/html'); 
    res.status(200).send("<h1>Hello World!</h1>"); 
}); 

//Opens the backend to the port specified
app.listen(PORT, (error) =>{ 
    if(!error){ 
        console.log("Server is Successfully Running, and App is listening on port "+ PORT) 
    }
    else 
        console.log("Error occurred, server can't start", error); 
    } 
); 



