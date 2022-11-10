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
    const month = now.getUTCMonth() + 1
    const date = now.getUTCDate() +'/' + months[month] + '/' + now.getUTCFullYear();

    
    console.log(day)
    //itterates the days of the week starting from the current day and places them in the appropriate elements.
    for (i=0 ; i < 6; i++){
        document.getElementById('wday' + (i + 1)).innerHTML = days[(day + i) % days.length]
        console.log(days[(day + i) % days.length])
    }
    const p = document.createElement('p');
    p.setAttribute('id', 'date');
    document.getElementById('current-weather').appendChild(p).innerHTML = date

}
    getDays()
    
    //adds event listener to search button initiating the getCity function
    $searchBtn.addEventListener('click', getCity);
    //getCity() inserts user selected city into the fetch url and displays the weather info for current weather and five day forcast

    function getCity(event) {
    const city = searched.value
    cityName.innerHTML = "Here's current weather in " + city + ':';
    const requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=a3f3af924ab3526ef547b4a14eefdfc8&units=imperial`
    event.preventDefault();


    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {

            //Getting the min and max values for each day
            for (i = 0; i < 5; i++) {
                document.getElementById('day' + (i + 1) + 'Min').innerHTML = 'Min: ' + Number(data.list[i].main.temp_min ).toFixed(1) + '°';
            };

            for (i = 0; i < 5; i++) {
                document.getElementById('day' + (i + 1) + 'Max').innerHTML = 'Max: ' + Number(data.list[i].main.temp_max ).toFixed(2) + '°';
            };
            //itterates over the currentData array, writes a p in the html and sets each with a unique id.
            for (i = 0; i < 4; i++) {
                const currentData = ['temp', 'wind', 'humid', 'uv']
                const p = document.createElement('p');
                p.setAttribute('id', currentData[i]);
                document.getElementById('current-weather').appendChild(p)
                //document.getElementById('day' + (i + 1) + 'Max').innerHTML = 'Max: ' + Number(data.list[i].main.temp_max ).toFixed(2) + '°';
            };

            //Getting Weather Icons
            // for (i = 0; i < 5; i++) {
            //     document.getElementById("img" + (i + 1)).innerHTML.src = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png";
            // };
        })
}

