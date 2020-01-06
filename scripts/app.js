const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details =document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const forecast = new Forecast();


const updateUI = (data) => {
    // console.log(data);
    // const cityDets = data.cityDets;
    // const weather = data.weather;

    //destructure property
    const { cityDets, weather } = data;
    //update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;
    //update the night/day and icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);
    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    // let timeSrc = null;
    // if(weather.IsDayTime){
    //     timeSrc = 'img/day.svg';
    // }else{
    //     timeSrc = 'img/night.svg';
    // }
    time.setAttribute('src', timeSrc);


    //remove the d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none')
    }
};

// const updateCity = async (city) => {
//     const cityDets = await getCity(city);
//     const weather = await getWeather(cityDets.Key);
//     return { //when property name and value are exactly same we can delete one of them
//         cityDets: cityDets,   
//         weather: weather
//     };
// }

cityForm.addEventListener('submit', e => {

    //prevent default action
    e.preventDefault();

    //Get city value
    const city = cityForm.city.value.trim(); //trim removes whitespace
    cityForm.reset();

    //update the UI with new city
    forecast.updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

    //set Local Storage
    localStorage.setItem('city', city);
});

if(localStorage.getItem('city')){
    forecast.updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}