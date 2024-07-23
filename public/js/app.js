const weatherForm = document.querySelector('.weatherForm');
const search = document.querySelector('.address');
const messageOne = document.querySelector('.message-1');
const messageTwo = document.querySelector('.message-2');

messageOne.textContent = 'Loading...';
messageTwo.textContent = '';

function fetchWeather(address){
    const weatherApi = 'http://api.weatherstack.com/current?';
    const apiKey = 'access_key=7f0ae9d5caa155b9d0e786fe505e31fc';
    const query = `&query=${address}`;
    const units = '&units=f';
    const url = `${weatherApi}${apiKey}${query}${units}`;

    fetch(url).then(response => {
        messageOne.textContent = 'Loading...';
        messageTwo.textContent = '';
        response.json().then(data => {
            if(data.error)
                messageOne.textContent = data.error.info;
            else{
                messageOne.textContent = `${data.location.name}, ${data.location.region}`;
                messageTwo.textContent = `It is currently ${data.current.temperature} degrees out. It feels like ${data.current.feelslike} degrees out`;
            }

        });
    });
}

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault(); //prevent browser from refreshing the page
    fetchWeather(search.value);
});
