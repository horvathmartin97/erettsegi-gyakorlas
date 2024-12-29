import fs from 'fs';
import input from './utils/input.js';

// A vonal feletti kódrészlethez ne nyúlj, a vonal alá dolgozz!
// ------------------------------------------------------------

//const userInput = await input('Így kérhetsz be adatot a felhasználótól: ');

//console.log(userInput);
console.log("1.feladat");
const readedData = [];
const fileData = fs.readFileSync("data/rendel.txt", "utf-8");
const fileDataArray = fileData.split("\r\n");
const lane = [];
for (let i = 0; i < fileDataArray.length; i++){
    const row = fileDataArray[i].split(" ");
        readedData.push({
            orderDate:row[0],
            cityName:row[1],
            numberOfOrder:row[2],
        })
    }
console.log(readedData);
console.log("2.feladat");
console.log(readedData.length);
console.log("3.feladat");
const userInput = await input('Kérem adjon meg egy nap számot: ');
let orderNumber = [];
for (let i = 0; i < readedData.length; i++){
    if(readedData[i].orderDate === userInput){
        orderNumber.push(readedData[i].orderDate);
    }
}
console.log("Rendeleséke száma az adott napon: " + orderNumber.length);
console.log("4.feladat");
const noAd = [];
for(let i = 0; i < readedData.length; i++){
    if(readedData[i].numberOfOrder === 0){
        noAd.push(readedData[i].numberOfOrder); 
    }
}
console.log("Minden nap volt rendelés a reklámban nem éríntett városból."); 
console.log(noAd.length + " nap nem volt a reklámban nem érintett városból rendelés.");
console.log("5.feladat");
let biggestOrders = readedData[0].numberOfOrder;
for (let i = 0; i < readedData.length; i++){
    if(readedData[i].numberOfOrder > biggestOrders){
        biggestOrders = readedData[i].numberOfOrder;
    }
}
console.log(biggestOrders);
