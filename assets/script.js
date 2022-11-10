const now = new Date();
console.log(now)
const searched = document.getElementById("city-search");
const cityName = document.getElementById("city");
const $searchBtn = document.getElementById('btn');

function getDays(){
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov','Dec'];

    const day = now.getDay();
    const month = now.getUTCMonth() + 1
    const date = now.getUTCDate() +'/' + months[month] + '/' + now.getUTCFullYear();

    
    console.log(dayNumber)
    for (i=0 ; i < 6; i++){
        document.getElementById('wday' + (i + 1)).innerHTML = days[(day + i) % days.length]
        console.log(days[(day + i) % days.length])
    }
    const p = document.createElement('p');
    p.setAttribute('id', 'date');
    document.getElementById('current-weather').appendChild(p).innerHTML = date

}
    getDays()
    
    
    $searchBtn.addEventListener('click', getCity);
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
                document.getElementById("day" + (i + 1) + "Min").innerHTML = "Min: " + Number(data.list[i].main.temp_min ).toFixed(1) + "°";
                //Number(1.3450001).toFixed(2); // 1.35
            };

            for (i = 0; i < 5; i++) {
                document.getElementById("day" + (i + 1) + "Max").innerHTML = "Max: " + Number(data.list[i].main.temp_max ).toFixed(2) + "°";
            };

            document.getElementById('temp').insertAdjacentText('afterend', data.list[1].main.temp)
            document.getElementById('wind').insertAdjacentText('afterend', data.list[1].wind.speed);
            document.getElementById('humidity').insertAdjacentText('afterend', data.list[1].main.humidity)
            
            //Getting Weather Icons
            // for (i = 0; i < 5; i++) {
            //     document.getElementById("img" + (i + 1)).innerHTML.src = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png";
            // };
        })
}

