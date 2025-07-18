
const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let dropdowselect = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("#btn");
let message=document.querySelector(".msg");

const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");


for (let select of dropdowselect) {
    for (currcode in countryList) {
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value = currcode;

        if (select.name === "from" && currcode == "INR") {
            newoption.selected = "selected";
        }
        else if (select.name === "to" && currcode == "USD") {
            newoption.selected = "selected";
        }
        select.append(newoption);

    }
    select.addEventListener("change", (evt) => {
       
        // console.log(select.value);
        updateflag(evt.target);

    })
}



btn.addEventListener("click", async (evt) => {
    const fromc = fromcurr.value.toLowerCase();
    //console.log(fromc);
    const toc = tocurr.value.toLowerCase();
    //console.log(toc);
    evt.preventDefault();  //for don't refresh or load page repeatadly
    let amt = document.getElementById("defaultamount");
    let amtval = amt.value;
    // console.log(amtval);
    if (amtval == "" || amtval < 1) {
        amtval = 1;
        amt.value = "1";
    }
    const URL = `${BASE_URL}/${fromc}.json`;
    // console.log(URL);
    let responses = await fetch(URL);
//console.log(responses);
    let data = await responses.json();
    let rate=data[fromc];
    // console.log(rate);
    let torate=rate[toc];
    // console.log(torate);
    const totalamount=amtval*torate;
    message.innerText=`${amtval} ${fromcurr.value} = ${totalamount} ${tocurr.value}`;
  
}



)


const updateflag = (element) => {
    let Currycode = element.value;
    let curryname = countryList[Currycode];
    const imgsrc = element.parentElement.querySelector("img");
    const newsrc = `https://flagsapi.com/${curryname}/flat/64.png`;
    imgsrc.src = newsrc;
};



