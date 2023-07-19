const fins = require('omron-fins');

const options = {timeout: 5000, SA1: 0, DA1: 10, protocol: "tcp"}; //protocol can be "udp" or "tcp" only
const IP = `172.19.88.88`;
const PORT = 9600;
const client = fins.FinsClient(PORT, IP, options);


// Connecting / disconnecting...

client.connect();

for (let index = 0; index < 10; index++) {
    console.log("🚀 ~ file: index.js:14 ~ index:", index)
    setTimeout(() => {
        client.read(`D1000${index}`,10,function(err, msg) {
            if(err) return console.log("🚀 ~ file: index.js:16 ~ client.read ~ err:", err)
            msg.response.values[0]==='undefined'?console.log("cannot read"):console.log("🚀 ~ file: index.js:17 ~ client.read ~ msg.response.values[0]:", msg.response.values[0])
        });    
    }, 200);
}
    // client.disconnect();

// client.connect({"host": "plc_2", "port": 9700, "protocol": "tcp", "timeout": 3000, "DA1": 2}); //connect to different PLC with new options

//NOTE: Calling client.disconnect(); then client.connect(); will simply reconnect using the same connection options last used.
