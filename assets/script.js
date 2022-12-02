const now = new Date();
console.log(now)
const searched = document.getElementById("city-search");
const cityName = document.getElementById("city");
const $searchBtn = document.getElementById('btn');

//gets days 
function getDays(){
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov','Dec'];

    const day = now.getDay();
    const month = now.getUTCMonth()
    const date = now.getUTCDate() +'/' + months[month] + '/' + now.getUTCFullYear();

    
    console.log(day)
    //itterates the days of the week starting from the current day and places them in the appropriate elements.
    for (i=0 ; i < 6; i++){
        document.getElementById('wday' + (i + 1)).innerHTML = days[(day + i) % days.length]
        console.log(days[(day + i) % days.length])
    }
    //Creates p element in current-weather
    const p = document.createElement('p');
    p.setAttribute('id', 'date');
    document.getElementById('current-weather').appendChild(p).innerHTML = date

}
    getDays()
    
    //adds event listener to search button initiating the getCity function
    $searchBtn.addEventListener('click', getCity);
    //getCity() inserts user selected city into the fetch url and displays the weather info for current weather and five day forcast

//------

function renderCities() {
    // clears the cityInput element
    cityList.innerHTML = "";

    // create a new li for each city entry
    for (var i = 0; i < cities.length; i++) {
        let city = cities[i];

        let btn = document.createElement("button");
        btn.textContent = city;

        btn.setAttribute("data-value", city)
        btn.addEventListener("click", historySearch)
        cityList.appendChild(btn);
    }
}

function storeCities() {
    const city = searched.value
    // Stringify and set key in localStorage to cities array
    localStorage.setItem("cities", JSON.stringify(city));
}



//------


    function getCity(event) {
    const city = searched.value
    cityName.innerHTML = "Here's current weather in " + city + ':';
    const requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=a3f3af924ab3526ef547b4a14eefdfc8&units=imperial`
    event.preventDefault();
    storeCities();


    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {

            //Getting the min and max values for each day
            for (i = 0; i < 5; i++) {
                document.getElementById('day' + (i + 1) + 'Min').innerHTML = 'Low: ' + Number(data.list[i].main.temp_min ).toFixed(0) + '°F';
            };

            for (i = 0; i < 5; i++) {
                document.getElementById('day' + (i + 1) + 'Max').innerHTML = 'High: ' + Number(data.list[i].main.temp_max ).toFixed(0) + '°F';
                console.log(data.list[i])
            };
            //itterates over the currentData array, writes a p in the html and sets each with a unique id.
            for (i = 0; i < 3; i++) {
                const currentData = ['Temp', 'Wind', 'Humidity'];
                const p = document.createElement('p');
                p.setAttribute('id', currentData[i]);
                document.getElementById('current-weather').appendChild(p).classList.add('border', 'm-5', 'rounded', 'col-5', 'mx-auto', 'h-25')
                document.getElementById(currentData[i]).innerHTML = currentData[i] + ':   '
            
            };
            document.getElementById('Temp').insertAdjacentText('beforeend', data.list[1].main.temp + '°F')
            document.getElementById('Wind').insertAdjacentText('beforeend', data.list[1].wind.speed + '°F');
            document.getElementById('Humidity').insertAdjacentText('beforeend', data.list[1].main.humidity + '°F')

            
        })
}

