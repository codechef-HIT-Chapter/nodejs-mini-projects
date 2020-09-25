const express = require('express')
const { static, response } = require('express')
const bodyParser = require('body-parser')
const request=require('request');

const app = express()
const port = 3000
const location="https://api.weatherbit.io/v2.0/current?,IN&key=a87e76bd1d654e758325702ad0886d41&city=";

app.use(static("public"))
app.use(bodyParser.urlencoded({ extended: false }))
var city="";
var country="";
var url="";
var loc="";
var temp=0.0;
var city="";
var weather="";
var data;

app.get('/', (req, res)=>{
    res.render("home.ejs");
})

app.get('/weather',(req,res)=>{
    res.render("weather.ejs",{
        weather:weather,
        temp:temp,
        city:city
    })
})

app.post('/location',(req,res)=>{
    city=req.body.city;
    country=req.body.country;
    loc=location+city+','+country;
    request(loc,(error,response)=>{
        data=JSON.parse(response.body);
        if(data["error"]=="API key not valid, or not yet activated."){
            res.redirect("/error");
        }else{
            city=(data["data"][0]["city_name"]);
            weather=(data["data"][0]["weather"]["description"]);
            temp=(data["data"][0]["temp"]);
            res.redirect('/weather');
        }
    });
})

app.get("/error",(req,res)=>{
    res.render("error.ejs");
})

app.listen(port, () => console.log(`Server is running!`))