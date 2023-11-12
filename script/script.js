


// Country Weather ===============================================

const API = 'https://api.openweathermap.org/data/2.5/weather?q=' 
const key = '&appid=0f6c623e6098793457ecfa28c2c539ce' 
const form = document.querySelector('form') 
const output = document.querySelector('.output') 
const input = document.querySelector('#inp') 

const getWeather = async () => { 
    const url = API + input.value + key 
    const req = await fetch(url) 
    const res = await req.json() 
    renderWeather(res); 
    getMap(res.coord)
    input.value = '' 
} 

const renderWeather = (data) => {
    output.innerHTML = ''
    const title = document.createElement('h1')
    title.textContent = `City name: ${data.name}`
    title.classList.add('title')
    const tempC = document.createElement('h3')
    tempC.textContent = `C: ${Math.floor(+data.main.temp - 273.15)}`
    tempC.classList.add('tempC')
    const tempF = document.createElement('h3')
    tempF.textContent = `F: ${Math.floor((+data.main.temp - 273.15) * (9/5) + 32)}`
    tempF.classList.add('tempF')
    const weather = document.createElement('h3')
    weather.textContent = `Main: ${data.weather[0].main}`
    weather.textContent = `Description: ${data.weather[0].description}`
    weather.classList.add('weather')
    const windProp = document.createElement('h3')
    windProp.textContent = `Wind speed: ${data.wind.speed}`
    windProp.textContent = `Wind deg: ${data.wind.deg}`
    windProp.textContent = `Wind gust: ${data.wind.gust}`
    windProp.classList.add('wind_prop')
    const sysCountry = document.createElement('h3')
    sysCountry.textContent = `Country code: ${data.sys.country}`
    sysCountry.classList.add('country_code')
    const block1 = document.createElement('div')
    block1.classList.add('block1')
    const block2 = document.createElement('div')
    block2.classList.add('block2')
    const block3 = document.createElement('div')
    block3.classList.add('block3')

    block1.append(title, sysCountry)
    block2.append(tempC, tempF)
    block3.append(weather, windProp)

    output.append(block1, block2, block3)
}

const getMap = ({lat, lon}) => {
    let map = document.createElement('div');
    map.id = 'map'

    DG.then(() => {
        map = DG.map('map', {
            center: [lat, lon],
            zoom: 13
        });

        DG.marker([lat, lon]).addTo(map).bindPopup('Мы тут!');
    });

    output.append(map)

}

form.addEventListener('submit', (e) => { 
    e.preventDefault() 
    getWeather() 
})
