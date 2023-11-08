const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

//Opens the backend to the port specified
server.listen(port, (error) =>{ 
    if(!error){ 
        console.log("Server is Successfully Running and listening on port "+ port) 
    }
    else 
        console.log("Error occurred, server can't start", error); 
    } 
); 
