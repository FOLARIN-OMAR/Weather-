let curLoc = document.getElementById("currentLoc")
let temP = document.getElementById("teMP")
let weatherDesc = document.getElementById("weatherDesc")
let countryCode = document.getElementById("countryCode")
const apiKey = "96e7435bef9d5f2dbadf238b1c27706e"

window.addEventListener('load', () => {
        // Accessing Geolocation of User
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                let latitude = position.coords.latitude;
                let longitude = position.coords.longitude;
                let condition = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
                let conditionData = await (condition.json());
                console.log(conditionData);
                const {temp} = conditionData.main;
                const place = conditionData.name;
                const {description} = conditionData.weather[0];
                const {country} = conditionData.sys;


                curLoc.innerHTML += `${place}`;
                temP.innerHTML += `${temp.toFixed(2)} °C`;
                weatherDesc.innerHTML += `${description}`;
                countryCode.innerHTML += `${country}`;
            });
        }
});

async function searchLoc() {
    curLoc.innerHTML = "";
    temP.innerHTML = "";
    weatherDesc.innerHTML = "";
    countryCode.innerHTML = "";
    // Accessing Geolocation of Search
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            let location = document.getElementById("inputLoc").value
            let condition = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
            let conditionData = await (condition.json());
            console.log(conditionData);
            const { temp } = conditionData.main;
            const place = conditionData.name;
            const { description } = conditionData.weather[0];
            const { country } = conditionData.sys;

            curLoc.innerHTML += `${place}`
            temP.innerHTML += `${temp.toFixed(2)} °C`;
            weatherDesc.innerHTML += `${description}`
            countryCode.innerHTML += `${country}`
        });
    }
}