const http = require('http');
const { parse } = require('querystring');

var hostname = "0.0.0.0";
var port = 3000

var fs = require("fs");
data = fs.readFileSync('db.txt', 'utf8');
console.log(data.toString());

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        collectRequestData(req, result => {
            console.log(result);
            res.end(`
                    <!doctype html>
                    <html>
                    <body>
                        <form action="/" method="post">
                            <input type="text" name="title" /><br />
                            <button>Search</button>
                        </form>
		    Parsed data belonging to ${result.fname}
                    </body>
                    </html>
		    `);
        });
    } 
    else {
        res.end(`
            <!doctype html>
            <html>
            <body>
                <form action="/" method="post">
                    <input type="text" name="title" /><br />
                    <button>Search</button>
                </form>
            </body>
            </html>
        `);
    }
});

server.listen(port, hostname, function() 
{
  console.log('Server running at http://'+ hostname + ':' + port.toString() + '/');
});

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}
