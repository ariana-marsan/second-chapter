
const http = require('node:http');

const dittoJSON = require('./ditto.json')

const processRequest = (req, res)=>{
    const { method, url } = req;

    switch (method){
        case'GET':
        switch (url){
            case'/pokemon/ditto':
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            return res.end(JSON.stringify(dittoJSON));
            default:
                res.statusCode = 404
                res.setHeader('Content-Type', 'text/html; charset=utf-8')
                return res.end('<h1>404</h1>')
        }
        case 'POST':
            switch (url){
                case '/pokemon':{
                let body = '';

                req.on('data', chunk =>{
                    body += chunk.toString()
                })

                req.on('end', ()=>{
                    const data = JSON.parse(body)
                    
                    res.writeHead(201, {
                        'Content-Type': 'application/json; charset=utf-8'
                    })
                    res.end(JSON.stringify(data))
                })
                break;
            }

            default:
                res.statusCode = 404
                res.setHeader('Content-Type', 'text/html; charset=utf-8')
                return res.end('<h1>404</h1>')
        }

    }
}

const server = http.createServer(processRequest);

server.listen(1234, ()=>{
    console.log('Server is listening on port 1234');
})