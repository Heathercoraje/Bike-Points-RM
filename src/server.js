const http = require('http');
const router = require('./router.js');
const port = process.env.PORT || 3000;
const TFL_ID = process.env.TFL_ID;
const TFL_KEY = process.env.TFL_KEY;

const server = http.createServer(router)

server.listen(port);
console.log(`server is running on local host:${port}`);
