const fins = require('omron-fins');
// const Netcat = require('node-netcat')
const net = require('net');

const options = {timeout: 5000, SA1: 0, DA1: 10, protocol: "tcp"}; //protocol can be "udp" or "tcp" only
const IP = `172.19.88.88`;
const PORT = 9600;
const client = fins.FinsClient(PORT, IP, options);
let ncconnect = false;
let sensorValue=[];
// Connecting / disconnecting...
const optionsnc = {
 // define a connection timeout
	timeout: 1000,
 // buffer(default, to receive the original Buffer objects), ascii, hex,utf8, base64
  read_encoding: 'buffer'
 }
 
 const HOSTIP = '127.0.0.1';
const HOSTPORT = 3000;
 const nc = new net.Socket();
 const data ={
     id:27,
     proxy:1
    }
    
    function createCon(){
    

     nc.on('error',function(err){
         console.log("🚀 ~ file: index.js:34 ~ nc.on ~ err:", err.code)
           setTimeout(() => {
            nc.connect(HOSTPORT,HOSTIP)
           }, 5000);   
     })

     nc.on('connect',function(){
        ncconnect = true;
        if(ncconnect){
            setInterval(() => {
                nc.write(`${JSON.stringify(data)}`)
                console.log("🚀 ~ file: index.js:32 ~ connect:",JSON.stringify(data))
                // nc.destroy()
            }, 4000);
        }
     })
 
     nc.on('close', function(){
         console.log("🚀 ~ file: index.js:40 ~ nc.on ~ close")
         
         if(ncconnect){

             throw new Error('disconnecng')
         }
     })

     nc.connect(HOSTPORT,HOSTIP)

    }

    createCon();

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

