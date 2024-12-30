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
            orderDate:Number(row[0]),
            cityName:row[1],
            numberOfOrder:Number(row[2]),
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
    if(readedData[i].numberOfOrder === 0 && readedData[i].cityName === "NR" ){
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
let orderDate = " ";
for (let i = 0; i < readedData.length; i++){
    if ( biggestOrders === readedData[i].numberOfOrder)
        orderDate += readedData[i].orderDate+ " ";
}
console.log("A legnagyobb darabszám: " + biggestOrders, "a rendelés napja:" + orderDate);
console.log("6.feladat");

function osszes(varos,nap){
    let everyOrder = 0;
    for(let i = 0; i < readedData.length; i++){
        if(readedData[i].cityName === varos && readedData[i].orderDate === nap){
            everyOrder += readedData[i].numberOfOrder;
        }
    }
    return everyOrder;
}
console.log("7.feladat");
let tvAdd = 0;
let plAdd = 0;
let nrAdd =0;
for (let i =0; i < readedData.length;i++){
    if(readedData[i].orderDate === 21){
        if(readedData[i].cityName === "TV"){
            tvAdd += readedData[i].numberOfOrder;
        }else if(readedData[i].cityName === "PL"){
            plAdd += readedData[i].numberOfOrder;
        }else if(readedData[i].cityName === "NR"){
            nrAdd += readedData[i].numberOfOrder;
        }
    }
}
console.log(`A rendelt termékek darabszáma a 21.napon TV:${tvAdd} PL:${plAdd} NR:${nrAdd}`);
//console.log(`A rendelt termékek darabszáma a 21. napon TV:${osszes("TV",21)} PL:${osszes("PL",21)} NR:${osszes("NR",21)}`); 
console.log("8.feladat");
let plArray = "PL\t";
let tvArray = "TV\t";
let nrArray = "NR\t";
for(let i =0; i < 3; i++){
    let plSum=0;
    let tvSum=0;
    let nrSum=0;
    for(let j=0; j < readedData.length;j++){
        if(i === 0){
            if(readedData[j].orderDate < 11){
                if(readedData[j].cityName === "PL"){
                    plSum++;
                }else if(readedData[j].cityName === "TV"){
                    tvSum ++;
                }else if( readedData[j].cityName === "NR"){
                    nrSum ++;
                }
            }
        }else if(i === 1){
            if(readedData[j].orderDate > 10 && readedData[j].orderDate < 21){
                if(readedData[j].cityName === "PL"){
                    plSum++;
                }else if(readedData[j].cityName === "TV"){
                    tvSum ++;
                }else if( readedData[j].cityName === "NR"){
                    nrSum ++;
                }
            }
        }else if(i === 2){
            if(readedData[j].orderDate > 20 && readedData[j].orderDate <= 30){
                if(readedData[j].cityName === "PL"){
                    plSum++;
                }else if(readedData[j].cityName === "TV"){
                    tvSum ++;
                }else if( readedData[j].cityName === "NR"){
                    nrSum ++;
                }
               }   
         }
    }
    plArray+=plSum+"\t";
    tvArray+=tvSum+"\t";
    nrArray+=nrSum+"\t";
}
let writeText = "Napok\t1..10\t11..20\t21..30";
writeText+= "\n"+plArray+"\n"+tvArray+"\n"+nrArray;
fs.writeFileSync("data/kampany.txt,",writeText);
