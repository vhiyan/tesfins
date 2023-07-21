const fins = require('omron-fins');
const Netcat = require('node-netcat')

const options = {timeout: 5000, SA1: 0, DA1: 10, protocol: "tcp"}; //protocol can be "udp" or "tcp" only
const IP = `172.19.88.88`;
const PORT = 9600;
const client = fins.FinsClient(PORT, IP, options);
let done = false;

let sensorValue=[];
// Connecting / disconnecting...
const optionsnc = {
 // define a connection timeout
	timeout: 60000,
 // buffer(default, to receive the original Buffer objects), ascii, hex,utf8, base64
  read_encoding: 'buffer'
 }
 
 const nc = new Netcat.client(3000, '127.0.0.1', [optionsnc])

 const data ={
    id:27,
    proxy:1
 }
 function connectNC() {
     nc.start();
     nc.on('error',function err(err) {
         console.log("🚀 ~ file: index.js:29 ~ err ~ err:", err)
        return 'error'
    })
    nc.send(JSON.stringify(data));
    nc.on('close', function close(_data){
        console.log("🚀 ~ file: index.js:33 ~ close ~ _data:", _data)
        return 'done'
    })

 }


 
 setInterval(() => {
     const conn = connectNC()
    if(conn==='error')connectNC();
    // else if(!done)sendData(JSON.stringify(data));
 }, 1000);
 

//  process.on('uncaughtException', function (err) {
//      console.log("🚀 ~ file: index.js:28 ~ err.code:", err.code)
//     if(err.code == 'ECONNREFUSED'){
//     nc.start();
//     console.log("🚀 ~ file: index.js:28 ~ 'ECONREFUSED':", 'ECONREFUSED')
//     }
//   });


// client init connection

// client.connect()?console.log('not connect'):console.log('connect');


// setInterval(() => {
//     client.read(`D10000`,10,function(err, msg) {
//         if(err) return console.log("🚀 ~ file: index.js:16 ~ client.read ~ err:", err)
//         // console.log("🚀 ~ file: index.js:29 ~ client..readMultiple ~ msg:", msg)
//         sensorValue = msg.response.values;
//         console.log("🚀 ~ file: index.js:32 ~ client.read ~ sensorValue:", sensorValue)
//     });    
// }, 200);

