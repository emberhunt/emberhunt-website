const Net = require('net');
const Global = require('./globals.js');

module.exports = {
	processCommand: (message, chatUser, fullCommand) => {
		var client = new Net.Socket();
		client.on('error', (err) => {console.log(err)});
	    // Send a connection request to the server.
	    client.connect({ port: Global.tcpport, host: Global.host }, () => {
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
	                client.write(message.content.replace('#!', '') + "\n");
	            }
	            if (bufferSize == 0) {
	                // The first response back is the size of the incoming buffer
	                bufferSize = chunk.readUInt32LE(0);
	            } 
	            else {
	            	// Send back response
	                console.log(`${chunk.toString()}`);
	                message.channel.send("```" + `${chunk.toString()}` + "```");
	                client.end();
	            }
	        });
	    });
	}
}