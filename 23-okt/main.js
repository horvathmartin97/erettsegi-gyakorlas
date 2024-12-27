import fs from 'fs';
import input from './utils/input.js';

// A vonal feletti kódrészlethez ne nyúlj, a vonal alá dolgozz!
// ------------------------------------------------------------

//const userInput = await input('Így kérhetsz be adatot a felhasználótól: ');

//console.log(userInput);

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
