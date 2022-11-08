const searched= document.getElementById("city-search");
const cityName = document.getElementById("city");
const requestUrl = 'api.openweathermap.org/data/2.5/forecast?q=' + searched + '&appid=a3f3af924ab3526ef547b4a14eefdfc8&units=imperial'

const $searchBtn = document.getElementById('btn');
$searchBtn.addEventListener('click', getCity);


function getCity(event){
    cityName.innerHTML = "Here's current weather in " + searched.value + ':';
    event.preventDefault();
}



// fetch(requestUrl)
// .then(response => response.json())
// .then(data =>)