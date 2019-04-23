const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const location = process.argv[2];

if(location){
    geocode(location, (error, {lat, long, location}) => {
        if(error){
            console.log("Error", error);
        } else {
            forecast(lat, long, (error, forecastData) => {
                if(error){
                    console.log('Error', error)
                } else {
                    const {
                        summary, temperature, precipProbability
                    } = forecastData;
                    console.log(location);
                    console.log(`${summary}. It is currently ${temperature} degrees out. There is a ${precipProbability * 100} chance of rain.`);
                }
            });
        }
    });
} else {
    console.log("Please provide an address");
}