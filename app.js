const express = require('express');
const bodyParser = require('body-parser');

const https = require('https');
const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));


app.get("/" , function (req,res) { 
    
        res.sendFile(__dirname + "/index.html");

 });

 app.post("/" , function (req,res) { 

        const userCityChoise = req.body.cityName;

        
        

        
             const query = userCityChoise;
            const apiKey = "906e6e4ce56b64ef91b42d5a3a6636e";
            const units = "metric";
        
            const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "8&units=" + units +"";
        
            https.get(url, function (response) { 
        
                
        
                response.on("data" ,  function (data) {
        
                     const weatherData = JSON.parse(data);
                   
                    const temp = weatherData.main.temp;
                    const city = weatherData.name;
                    const descrip = weatherData.weather[0].description;
                    const icon = weatherData.weather[0].icon;
        
                    const imageUrl = " http://openweathermap.org/img/wn/"+ icon +"@2x.png"
        
                    
                    res.write("<h1>A Temperatura em " + city + " e de " + temp + " graus C</h1>");
                    res.write("<img src=" + imageUrl +">");
                    res.write("<p>A tempo esta " + descrip + "</p>");
                    res.send();
        
                 });
             });
    


  });






app.listen(port, function() {
    console.log("Server on port: " + port);
    
});