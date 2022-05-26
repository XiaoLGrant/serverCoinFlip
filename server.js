const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);

  // Build page based on doc file address and content type
  const readWrite = function (filePath, contentType) {
    fs.readFile(filePath, function(err, data) {
      res.writeHead(200, {'Content-Type': contentType});
      res.write(data);
      res.end();
    });
  }
 
  switch (page) {
    //Build index
    case '/': 
      readWrite('index.html', 'text/html');
    break;

    //Build other page
    case '/otherpage':
      readWrite('otherpage.html', 'text/html');
    break;

    //Build other other page
    case '/otherotherpage':
      readWrite('otherotherpage.html', 'text/html');
    break;
    
    //Build API to return a json file 
    case '/api':
    
      function UserInfo(name, status, currentOccupation){
        this.name = name,
        this.status = status,
        this.currentOccupation = currentOccupation
      }

      function CoinFlip() {
        this.coinResult = Math.random() <= 0.5 ? 'heads' : 'tails';
      }
  
      //API for name entered
      if ('student' in params) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        let objToJson;
        if (params['student'] == 'leon') {
          objToJson = new UserInfo('leon', 'Boss Man', 'Baller');
        } else {
          objToJson = new UserInfo('unknown', 'unknown', 'unknown');
        }
        res.end(JSON.stringify(objToJson));
      } 

      //API for coin flip
      else if ('coin' in params) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        let objToJson = new CoinFlip();
        res.end(JSON.stringify(objToJson));
      }
    break;

    //Build css sheets
    case '/css/style.css':
      readWrite('css/style.css', 'text/css');
    break;

    //Build main js page
    case '/js/main.js':
      readWrite('js/main.js', 'text/javascript');
    break;
  
    //Build error pages
    default:
      figlet('404!!', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        res.write(data);
        res.end();
      });
  }
});

//define server port where site will run
server.listen(process.env.PORT || 8000);


/*First attempts*/
/*
const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

//to make more readable
//const path = require('node:path');

const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);

  // Build page based on doc file address and content type
  const readWrite = function (filePath, contentType) {
    fs.readFile(filePath, function(err, data) {
      res.writeHead(200, {'Content-Type': contentType});
      res.write(data);
      res.end();
    });
  }

  /*to make more readable*/
  //Build file path
  /*let filePath = path.join(_dirname, req.url === '/' ? 'index.html' : req.url);
  
  //get Extension of file
  let extname = path.extname(filePath);

  //initial content type
  let contentType = 'text/html';

  //check ext and set content type
  switch(extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.js':
      contentType = 'image/jpg';
      break;
  }

  //read file
 fs.readFile(filepath, (err, content) => {
    if (err) {
      if (err.code === 'ENONET') {
        //pAGE NOT FOUND
        //LOAD ERROR PAGE
        fs.readFile(path.join(_dirname, '', '404.html'), (err, content) => {
          res.writeHead(200, { 'Content-Type': 'text/html'});
          res.end(content, 'utf8')
        })
      } else {
        //Some server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`)
      }
    } else {
      //Success
      res.writeHead(200, { 'Content-Type': contentType});
      res.end(current, 'utf8')
    }
  })

  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/otherpage') {
    fs.readFile('otherpage.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/otherotherpage') {
    fs.readFile('otherotherpage.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/api') {
    if('student' in params){
      if(params['student']== 'leon'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
          name: "leon",
          status: "Boss Man",
          currentOccupation: "Baller"
        }
        res.end(JSON.stringify(objToJson));
      }//student = leon
      else if(params['student'] != 'leon'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
          name: "unknown",
          status: "unknown",
          currentOccupation: "unknown"
        }
        res.end(JSON.stringify(objToJson));
      }//student != leon
    }//student if
  }//else if
  else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  }else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }else{
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }
});
server.listen(process.env.PORT || 8000);
*/