console.log('Client side JS file');

// fetch('http://puzzle.mead.io/puzzle')
// .then(response => response.json())
// .then(data => console.log(data));

const msg1 = document.getElementById('location');
const msg2 = document.getElementById('forecast');

msg1.textContent = 'location';
msg2.textContent = 'forecast data'

const fetchForecast = (event) => {
    event.preventDefault();

    const input = document.querySelector('input').value;

    msg1.textContent = 'Loading....';
    msg2.textContent = '';

    fetch(`http://localhost:3000/weather?address=${input}`)
    .then(response => response.json())
    .then((data) => {
        if(data.error)
            return msg1.textContent = data.error;
        console.log(data);

        msg1.innerHTML = data.location;

        msg2.innerHTML = data.forecast;
    });

    console.log('fetchForecast()');
}

const weatherForm = document.querySelector('form');

weatherForm.addEventListener('submit', fetchForecast)