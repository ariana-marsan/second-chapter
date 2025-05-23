
const http = require('node:http');
const fs = require('node:fs');

const desiredPort = 3001;

const processRequest = (req, res) =>{
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    if (req.url === '/'){
        res.end ('<h1>Welcome to the home page</h1>');
    } else if(req.url === '/imagen'){

        fs.readFile('./DSCN0312.JPG', (err, data)=>{
            if (err) {
                res.statusCode = 500;
                res.end ('<h1>Internal server error</h1>');
            } else {
                res.setHeader('Content-Type', 'image/jpg');
                res.end(data)
            }
        })

    } else if(req.url === '/about'){
        res.end ('<h1>Welcome to the about page</h1>');}
        else {
        res.statusCode = 404;
        res.end ('<h1>Page not found</h1>');
    }
}

const server = http.createServer(processRequest);

server.listen(desiredPort, () => {
    console.log(`Server is running on port ${desiredPort}`);
}
);