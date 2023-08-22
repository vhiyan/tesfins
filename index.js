const fins = require('omron-fins');
// const Netcat = require('node-netcat')
const net = require('net');
const date = require("date-and-time");

const options = {timeout: 5000, SA1: 0, DA1: 10, protocol: "tcp"}; //protocol can be "udp" or "tcp" only
const IP = `172.19.88.88`;
const PORT = 9600;
const client = fins.FinsClient(PORT, IP, options);
let readyToSend= Array(9).fill(true);
let timerSendLast= Array(9).fill(0);

let ncconnect = false;
let sensorValue=[];
let initialCondition = true;
let timerSend=[];
// let timerSendLast=[];
// Connecting / disconnecting...
const optionsnc = {
 // define a connection timeout
	timeout: 1000,
 // buffer(default, to receive the original Buffer objects), ascii, hex,utf8, base64
  read_encoding: 'buffer'
 }
 const HOSTIP = '127.0.0.1';
const HOSTPORT = 3000;
 
 const data = [
    {id:27,proxy:1},
    {id:27,proxy:1},
    {id:27,proxy:1},
    {id:27,proxy:1},
    {id:27,proxy:1},
    {id:27,proxy:1},
    {id:27,proxy:1},
    {id:27,proxy:1}
];


const intervaltimerSend = {
    interval : 5000,
};
    
(async () => {
	console.log('connect to dcs');
    	if(initialCondition == true){
		console.log(readyToSend[2]);
            // readyToSend[1]=true;
		initialCondition = false;
	}
        })()



     


    function sendData(__index) { 
	    if( new Date() - timerSendLast[__index] > intervaltimerSend.interval && readyToSend[__index]==true)
	    {
		readyToSend[__index]=false;
        const nc = new net.Socket();
            	nc.connect(HOSTPORT,HOSTIP,function(){
                	console.log("🚀 ~ file: index.js:52 ~ sendData ~ __index:", __index);
						const data_send =`${JSON.stringify(data[__index])}`; 
                	    const id = setTimeout(() => {     
                            nc.write(data_send);
                            clearTimeout(id);
                            nc.destroy();
                        }, 1000);
                	console.log("🚀 ~ file: index.js:32 ~ connect:",data_send);
                    
                    timerSendLast[__index] = new Date();
	   
     		})
            
     nc.on('error',function(err){
            // console.log(err.code);
            console.log("🚀 ~ file: index.js:52 ~ nc.on ~ err:", err)
     })
 
     nc.on('close', function(){
         console.log("🚀 ~ file: index.js:40 ~ nc.on ~ close")
     }) 
	    }
    }


//  process.on('uncaughtException', function (err) {
//      console.log("🚀 ~ file: index.js:28 ~ err.code:", err.code)
//     if(err.code == 'ECONNREFUSED'){
//     nc.start();
//     console.log("🚀 ~ file: index.js:28 ~ 'ECONREFUSED':", 'ECONREFUSED')
//     }
//   });


// client init connection

client.connect();


// client.connect()?console.log('not connect'):console.log('connect');


setInterval(() => {
    client.read(`D10000`,10,function(err, msg) {
        if(err) throw new Error('plc not connected')
        // console.log("🚀 ~ file: index.js:29 ~ client..readMultiple ~ msg:", msg)
        sensorValue = msg.response.values;
        for (const index in sensorValue) {  
            // console.log(`${sensorValue[index]} is at position ${index}`)
            if(sensorValue[index]==0){
                sendData(index);
            }else{
                readyToSend[index] = true
            }
            
        }
        // console.log("🚀 ~ file: index.js:32 ~ client.read ~ sensorValue:", sensorValue)
    });    
}, 200);



