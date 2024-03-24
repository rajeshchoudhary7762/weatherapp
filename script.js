function checkWeather() {
    const cityName = document.querySelector('#searchBox').value;
    if(cityName == '') {
        alert('Please enter your city name!');
    }else {
        weatherApp(cityName);
    }
}


async function weatherApp(cityname) {
    const apiKey = '31a809b61f8f08b2cd8decb7799b60e3';
    const city = cityname;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try{
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod === '404') {
            alert('City not found!');
        } else {
            setweatherData(
                data.name + ', ' + data.sys.country,
                data.weather[0].icon,
                Math.floor(data.main.temp) + '°C',
                Math.floor(data.main.feels_like) + '°C',
                data.weather[0].description,
                Math.floor(data.main.temp_min) + '°' + ' / ' + Math.floor(data.main.temp_max) + '°',
                data.main.humidity + '%',
                data.main.pressure + ' hPa',
                (data.visibility)/1000 + ' Km',
                '...',
                data.wind.speed + ' Km/h',
                data.wind.deg
                
            );
        }
    }
    catch(error) {
        console.log('Error fetching data : ', error);
    }
}
weatherApp('Ranchi');


function setweatherData(location, icon, temp, realfeel, cond, minmax, humidity, pressure, visibility, airQty, windspeed, winddir) {
    let Location = document.querySelector('#cityName');
    let weatherIcon = document.querySelector('#weatherIcon');
    let weatherTemp = document.querySelector('#weatherTemp');
    let feelsLike = document.querySelector('#feelsLike');
    let weatherCond = document.querySelector('#weatherCond');
    let minMax = document.querySelector('#minMax');
    let windDir = document.querySelector('#windDir');
    let windSpeed = document.querySelector('#windSpeed');
    let Humidity = document.querySelector('#humidity');
    let Pressure = document.querySelector('#pressure');
    let Visibility = document.querySelector('#visibility');
    let AirQuality = document.querySelector('#airQuality');

    let iconCode = icon.slice(0, -1);
    let imagename;
    if(iconCode == '01') {
        imagename = 'clear-sky';
    } 
    else if(iconCode == '02') {
        imagename = 'few-clouds';
    }
    else if(iconCode == '03' || iconCode == '04') {
        imagename = 'broken-clouds';
    }
    else if(iconCode == '10') {
        imagename = 'shower-rain';
    }
    else if(iconCode == '11') {
        imagename = 'thunderstrom';
    }
    else if(iconCode == '13') {
        imagename = 'snow';
    }
    else if(iconCode == '50') {
        imagename = 'mist';
    }

    //Set Data
    Location.innerHTML = location;
    weatherIcon.src = `images/${imagename}.svg`;
    weatherTemp.innerHTML = temp;
    feelsLike.innerHTML = realfeel;
    weatherCond.innerHTML = capitalizeWords(cond);
    minMax.innerHTML = minmax;
    windDir.innerHTML = `<div class="d-flex align-items-center ">${winddir} <i style="transform: rotate(${winddir}deg)" class="ms-2 fi fi-rr-location-arrow d-flex"></i></div>`;
    windSpeed.innerHTML = windspeed;
    Humidity.innerHTML = humidity;
    Pressure.innerHTML = pressure;
    Visibility.innerHTML = visibility;
    AirQuality.innerHTML = airQty;
}

function capitalizeWords(str) {
    return str.replace(/\b\w/g, function(char) {
        return char.toUpperCase();
    });
}
