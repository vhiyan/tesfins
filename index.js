const fins = require('omron-fins');
const Netcat = require('node-netcat')

const options = {timeout: 5000, SA1: 0, DA1: 10, protocol: "tcp"}; //protocol can be "udp" or "tcp" only
const IP = `172.19.88.88`;
const PORT = 9600;
const client = fins.FinsClient(PORT, IP, options);

let sensorValue=[];
// Connecting / disconnecting...
const optionsnc = {
 // define a connection timeout
	timeout: 60000,
 // buffer(default, to receive the original Buffer objects), ascii, hex,utf8, base64
  read_encoding: 'buffer'
 }
const nc = new Netcat.client(3000, '127.0.0.1', [optionsnc])


// client init connection
nc.start();



client.connect();

setInterval(() => {
    client.read(`D10000`,10,function(err, msg) {
        if(err) return console.log("🚀 ~ file: index.js:16 ~ client.read ~ err:", err)
        // console.log("🚀 ~ file: index.js:29 ~ client..readMultiple ~ msg:", msg)
        sensorValue = msg.response.values;
        console.log("🚀 ~ file: index.js:32 ~ client.read ~ sensorValue:", sensorValue)
    });    
}, 200);

const data = {
    id:30,
    proxy:1
}

console.log(JSON.stringify(data));
// nc.send(JSON.stringify(data));


    // client.disconnect();

// client.connect({"host": "plc_2", "port": 9700, "protocol": "tcp", "timeout": 3000, "DA1": 2}); //connect to different PLC with new options

//NOTE: Calling client.disconnect(); then client.connect(); will simply reconnect using the same connection options last used.
