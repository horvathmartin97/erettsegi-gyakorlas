import fs from 'fs';
import input from './utils/input.js';

// A vonal feletti kódrészlethez ne nyúlj, a vonal alá dolgozz!
// ------------------------------------------------------------

//const userInput = await input('Így kérhetsz be adatot a felhasználótól: ');

//console.log(userInput);
const readedData = [];
const fileData = fs.readFileSync("data/utca.txt", "utf-8");
const fileDataArray = fileData.split("\r\n");
const lane = [];
for (let i =0; i < fileDataArray.length-1; i++){
    const row = fileDataArray[i].split(" ");
    if (i===0){
        lane.push(row[0]);
        lane.push(row[1]);
        lane.push(row[2]);
    }else{
        readedData.push({
            taxNumber:row[0],
            streetName:row[1],
            streetNumber:row[2],
            payLine:row[3],
            baseArea:row[4],

        })
    }
}
console.log("2.feladat");
console.log(readedData.length);

console.log("3.feladat");
const userArray=[];
const userInput = await input('Adjon meg egy adószámot: ');
for(let i = 0; i < readedData.length; i++){
    if (readedData[i].taxNumber === userInput){
        userArray.push(readedData[i].streetName + " utca "+ readedData[i].streetNumber);
    }
}
if(userArray.length > 0){
    for(let i = 0; i < userArray.length; i++){
      console.log(userArray[i]);   
    }
}else{
    console.log("Nem található ilyen adószám!");
}

console.log("4.feladat");
let ado = [];
for (let i = 0; i < readedData.length; i++) {
    if(readedData[i].payLine === "A"){
        ado.push ({
            prize:Number(lane[0]) * Number(readedData[i].baseArea),
            line: readedData[i].payLine,
        });
    }
    if(readedData[i].payLine === "B"){
        ado.push ({
            prize:Number(lane[1]) * Number(readedData[i].baseArea),
            line: readedData[i].payLine,
        });
    }
    if(readedData[i].payLine === "C"){
      if(Number(lane[2])*Number(readedData[i].baseArea)<10000){
              ado.push ({
            prize:Number(lane[2]) * Number(readedData[i].baseArea),
            line: readedData[i].payLine,
        });
      }  else{
        ado.push({
            prize:Number(lane[2])*Number(readedData[i].baseArea),
        });
      }
  
    }
    }
console.log("5.feladat.");
let alineCounter = 0;
let alinePrize = 0;
let blineCounter = 0;
let blinePrize = 0;
let clineCounter = 0;
let clinePrize = 0;
for (let i = 0; i < readedData.length; i++) {
    if(ado[i].line === ("A")){
        alinePrize+= ado[i].prize;
        alineCounter++;
    }else if(ado[i].line === ("B")){
        blinePrize+= ado[i].prize;
        blineCounter++;
    }else if(ado[i].line === ("C")){
        clinePrize+= ado[i].prize;
        clineCounter++;
    }
}
console.log(`A sávba ${alineCounter} telek esik, az adó ${alinePrize} Ft`);
console.log(`B sávba ${blineCounter} telek esik, az adó ${blinePrize} Ft`);
console.log(`C sávba ${clineCounter} telek esik, az adó ${clinePrize} Ft`);


console.log("6.feladat");

const dualStreet = [];

for (let i = 0; i < readedData.length; i++){
    let holderStreet = readedData[i].streetName;
    let holderPay = readedData[i].payLine;
    let isIn = false;
    if (dualStreet.length !==0){
        for(let j = 0; j < dualStreet.length;j++){
            if(readedData[i].streetName === dualStreet[j]){
                isIn = true;
            }
        }
    }
    if ( isIn === false){ 
    for(let j = i + 1; j < readedData.length; j++){
    if(holderStreet === readedData[j].streetName && holderPay !== readedData[j].payLine){
        dualStreet.push(readedData[j].streetName);
        j = readedData.length;
    }
   }
 }
}
console.log(`A több sávba sorolt utcák:`);
for ( let i = 0; i < dualStreet.length;i++){
    console.log(dualStreet[i]);
}

// 7.feladat

const userTaxNumber = [];
const userTaxPrice = [];
let integratedTax = 0;

for (let i = 0; i < readedData.length; i++) {
    let holderNumber = readedData[i].taxNumber;
    let holderTax = ado[i].prize;
    let isIn = false;
    if(userTaxNumber.length !== 0){
        for(let j = 0; j < userTaxNumber.length; j++){
            if(readedData[i].taxNumber === userTaxNumber[i]){
                isIn = true;
            }
        }
    }
    if(isIn === false){
        for(let j = i+1; j < readedData.length;j++){
            if(holderNumber === readedData[j].taxNumber){
                holderTax += ado[i].prize;
            }
           
        }
        userTaxNumber.push(holderNumber);
        userTaxPrice.push(holderTax);
    } 
}
let toTxt = "";
for (let i = 0; i < userTaxNumber.length; i++) {
    toTxt += userTaxNumber[i]+" "+userTaxPrice[i]+"\n";
}
fs.writeFileSync("data/fizetendo.txt",toTxt);

