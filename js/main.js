/*https://github.com/Resilient-Labs/complex-api-bootcamp > Get data from one API and use that data to make a request to another API. Ex: Make request to breakfast food API = donuts. Take 'donut' and make request/query to Dunkin Donuts API to get their donuts of the day. We're chaining APIs

Getting the longitude / latitude : http://open-notify.org/Open-Notify-API/ISS-Location-Now/?ref=freepublicapis.com 
Converting the longitude / latitude into human readable text and adding current time: https://timeapi.io/swagger/index.html

*/

document.querySelector('button').addEventListener('click', locateSatellite)

function locateSatellite() {

    const url1 = `http://api.open-notify.org/iss-now.json`

    // Variable that holds API

    fetch(url1) // connect to API
    .then(res => res.json()) // parse resopnse as JSON. res name doesn't matter. Taking response and formatting it in JSON object
    .then(data => { // Outputting a series of things
        console.log(data)
        // console.log(data.timestamp)
        // console.log(data.iss_position)
        console.log(data.iss_position.latitude)
        console.log(data.iss_position.longitude)

        const latitude = data.iss_position.latitude
        const longitude = data.iss_position.longitude

        const url2 = `https://timeapi.io/api/time/current/coordinate?latitude=${latitude}&longitude=${longitude}`

        fetch(url2)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                console.log(data.time) // HH:MM
                console.log(data.timeZone)
                // console.log(data.time)
                // console.log(data.timeZone)

                if (data.timeZone == data.timeZone.find("Etc/GMT")) {
                    if(data.timeZone == data.timeZone.find("Etc/GMT+4")) {
                        console.log("Armenia Time (AMT)")
                        document.getElementById('current_time_zone').innerText = "Armenia Time (AMT)"
                    } else if (data.timeZone == data.timeZone.find("Etc/GMT+3")) {
                        console.log("Moscow Time (MSK)")
                        document.getElementById('current_time_zone').innerText = "Moscow Time (MSK)"
                    }
                }

                document.getElementById('current_time').innerText = data.time
                document.getElementById('current_time_zone').innerText = data.timeZone
            })

    })
    .catch(err => {
        console.log(`error ${err}`)
    });

}