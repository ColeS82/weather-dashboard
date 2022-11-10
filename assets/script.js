const now = new Date();
console.log(now)
const searched = document.getElementById("city-search");
const cityName = document.getElementById("city");
const $searchBtn = document.getElementById('btn');

function getDays(){
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const dayNumber = now.getDay()
    
    console.log(dayNumber)
    for (i=0 ; i < 6; i++){
        
        document.getElementById("wday" + (i + 1)).innerHTML = days[(dayNumber + i) % days.length]
        
        console.log(days[(dayNumber + i) % days.length])
    }}
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

            //Getting Weather Icons
            // for (i = 0; i < 5; i++) {
            //     document.getElementById("img" + (i + 1)).innerHTML.src = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png";
            // };
        })
}

