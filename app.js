require("dotenv").config()
require("./api/data/db.js")
const express = require("express")
const path = require("path")
const routes = require("./api/routes")

const app = express();

app.use(express.json())

app.use(express.urlencoded({extended: true}))


app.use("/api", function(req,res,next){
    res.header("Access-Control-Allow-Origin","http://localhost:4200") 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,DELETE,POST,PUT");
    next();
 })
 

app.use("/api", routes)

app.set("port",process.env.PORT).set
const server = app.listen(app.get("port"), function(){
    console.log(process.env.MSG_SERVER_START,server.address().port);
})