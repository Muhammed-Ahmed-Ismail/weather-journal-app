/* Global Variables */
const key = "58a6678172f10df04b2aac1cab2e7159";
const genButton = document.querySelector("button#generate");
const zipInput = document.querySelector("input#zip");
const contentInput = document.querySelector("textarea#feelings");
const dateDiv = document.querySelector("div#date");
const tempDiv = document.querySelector("div#temp");
const contentDiv = document.querySelector("div#content");
//console.log(zip.value)
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();
genButton.addEventListener('click', async () => {
    let temp = await getData();
    let content = contentInput.value;
    await postData(newDate, temp, content).then(async function () {
        let data = await fetch("http://localhost:8000/get-data");
        return data.json();
    }).then((data) => {
        updateUI(data)
    }).catch((err) => {
        console.error(err)
    })
    // updateUI(newDate, temp, content)
})


async function updateUI(data) {

    dateDiv.innerHTML = `Date: ${data.date}`;
    tempDiv.innerHTML = `Temperature: ${data.temp} C`;
    contentDiv.innerHTML = `How it feels: ${data.content}`;

}





async function getData() {
    let zipCode = zipInput.value;

    if (!zipCode || !parseInt(zipCode)) {
        console.error("False value for zip code!!")
        return
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&units=metric&appid=${key}`;
    console.log(url)
    let res = await fetch(url);
    let data = await res.json();
    let temp = data.main.temp
    console.log(data)
    return temp

}

async function postData(date, temp, content) {
    let dataTopPost = {
        date,
        temp,
        content
    }
    await fetch("http://localhost:8000/save-data", {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(dataTopPost)
    }).then((res) => {
        console.log(res)
    }).catch((err) => {
        console.error(err)
    })
    return new Promise((resolve, reject) => {
        resolve()
    })
}