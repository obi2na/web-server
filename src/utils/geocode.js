const axios = require('axios');

function geocode(address, callback){
    const geocodeApi = 'https://api.mapbox.com/search/geocode/v6/forward?';
    const gLocation = `q=${encodeURI(address)}`;
    const accessToken = '&access_token=pk.eyJ1IjoiYW5pZWthbjYyIiwiYSI6ImNseW00YzVpZjBlbTIya29uMG1sNGVmMHYifQ.zjWuO5UgS6z3LjdWUYylpg';

    axios.get(`${geocodeApi}${gLocation}${accessToken}`)
        .then(response => {
            if(response.data.features.length === 0)
                callback('unable to find location');
            else {
                const hit = response.data.features[0];
                const coordinates = hit.geometry.coordinates;
                callback(undefined, coordinates);
            }
        })
        .catch(function (error) {
            callback(`geocode api error: ${error}`);
        });

}

module.exports = geocode;
