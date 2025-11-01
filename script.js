const searchBtn = document.getElementById("searchBtn");
const container = document.querySelector(".container");
const weatherBox = document.querySelector(".weather");

setTimeout(() => container.classList.add("show"), 200);

searchBtn.onclick = () => {
    const city = document.getElementById("cityInput").value;
    if (!city) return alert("Enter a city!");
    
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)
    .then(res => res.json())
    .then(loc => {
        if (!loc.results) return alert("City not found!");
        
        const lat = loc.results[0].latitude;
        const lon = loc.results[0].longitude;
        
        return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`);
    })
    .then(res => res.json())
    .then(data => {
        const temp = data.current.temperature_2m;
        const code = data.current.weather_code;

        document.getElementById("temp").innerText = Math.round(temp) + "°C";
        document.getElementById("city").innerText = city;

        // Definir descrição e ícone baseado no código do clima
        const icon = document.getElementById("icon");

        let desc = "";
        let bg = "";

        if (code === 0) { 
            desc = "Clear Sky ☀";
            icon.src = "https://cdn-icons-png.flaticon.com/512/3222/3222800.png";
            bg = "sunny";
        } else if (code <= 48) {
            desc = "Cloudy ☁";
            icon.src = "https://cdn-icons-png.flaticon.com/512/1146/1146869.png";
            bg = "cloudy";
        } else if (code <= 67) {
            desc = "Rain 🌧";
            icon.src = "https://cdn-icons-png.flaticon.com/512/1163/1163624.png";
            bg = "rainy";
        } else if (code <= 77) {
            desc = "Snow ❄";
            icon.src = "https://cdn-icons-png.flaticon.com/512/642/642102.png";
            bg = "snowy";
        }

        document.getElementById("desc").innerText = desc;

        // Mudar fundo da página
        document.body.className = "";
        document.body.classList.add(bg);

        weatherBox.classList.add("show");
    })
    .catch(() => alert("Error getting weather"));
};
