const weatherForm = document.querySelector('.weatherForm');
const search = document.querySelector('.address');
const messageOne = document.querySelector('.message-1');
const messageTwo = document.querySelector('.message-2');

messageOne.textContent = 'Loading...';
messageTwo.textContent = '';

function fetchWeather(address){

    fetch(`/weather?address=${address}`).then(response => {
        messageOne.textContent = 'Loading...';
        messageTwo.textContent = '';
        response.json().then(data => {
            if(data.error){
                messageOne.textContent = data.error;
                messageTwo.textContent = 'error';
                console.log(data.error);
            }
            else{
                messageOne.textContent = data.address;
                messageTwo.textContent = `The temperature is ${data.temp} degrees. ${data.forecast}`;
                console.log(data);
            }
        });
    });
}

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault(); //prevent browser from refreshing the page
    fetchWeather(search.value);
});
