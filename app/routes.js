const net = require('net');
const fs = require('fs');

const logfile = process.env.GAME_OUTPUT_LOG || "/srv/emberhunt/server_logs/server_log.txt";
const tcpport = process.env.GAMETCPPORT || 11234
const host = process.env.GAMEHOST || 'game'

function sendCommandInternal(command, res) {
    // Create a new TCP client.
    const client = new net.Socket();
    client.on('error', (err) => {console.log(err)});
    // Send a connection request to the server.
    client.connect({ port: tcpport, host: host }, () => {
        // If there is no error, the server has accepted the request and created a new 
        // socket dedicated to us.

        // The client can now send data to the server by writing to its socket.

        // For now I just include the password 
        // but this will be guarded behind some authentication in the future
        client.write('emberhunt\n');
        var bufferSize = 0;
        client.on('data', (chunk) => {
            if (`${chunk.toString()}`.includes("authenticated")) {
                // Wait to be authenticated
                bufferSize = 0;
                client.write(command);
            }
            if (bufferSize == 0) {
                // The first response back is the size of the incoming buffer
                bufferSize = chunk.readUInt32LE(0);
            } 
            else {
                console.log(`${chunk.toString()}`);
                res.status(200).send(`${chunk.toString()}`);
                client.end();
            }
        });
    });

}

module.exports = function (app) {

    app.get('/api/fps', (req, res ) => {
        sendCommandInternal('fps\n', res);
    });

    app.get('/api/help', (req, res ) => {
        sendCommandInternal('help\n', res);
    });

    app.get('/api/gamelog', (req, res ) => {
        // Grab the game log
        //res.download(path.resolve("/srv/emberhunt/server_logs/server_log.txt"));
        res.status(200).send(fs.readFileSync(logfile, 'utf8'));
    });

    app.post('/api/sendCommand', (req, res) => {
        sendCommandInternal(req.body.text + "\n", res);
    });

    // application -------------------------------------------------------------
    app.get('*', (req, res) => {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

    app.get('/log', (req, res) => {
        res.sendFile(__dirname + '/public/index.html');
    });
};
