const express=require('express');

const app=express();

const https=require('node:https');

const bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  const query= req.body.cityName;
  const appid= "8c3649a4783c0b7acf69b0e066680bff";
  const units="metric";

  const url= "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ appid +"&units="+ units +""
  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData= JSON.parse(data)
      const temp= weatherData.main.temp
      const desc= weatherData.weather[0].description
      const icon= weatherData.weather[0].icon
      const imageURL=("http://openweathermap.org/img/wn/"+ icon +"@2x.png");
      res.write("<p>The weather is currently"+desc+"</p>");
      res.write("<h1>The tempature in " + query +" is "+temp+" Celcius degree.");
      res.write('<head><meta charset="utf-8"></head>');
      res.write("<img src="+ imageURL +">");
      res.send()
    })
  })
})



app.listen(3000,function(){
  console.log("Server is up and running on port 3000")
});
