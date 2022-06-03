const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser({extended: true}));
app.use(express.static("public"));

const url = "mongodb+srv://EEngvall:10011014eE@cluster0.frqsy.mongodb.net/AAC?retryWrites=true&w=majority"
mongoose.connect(url, {useNewUrlParser: true});

//Create DB Schema
const animalSchema = new mongoose.Schema ({
    age_upon_outcome: String,
    animal_id: String,
    animal_type: String,
    breed: String,
    color: String,
    date_of_birth: String,
    name: String,
    outcome_type: String,
    sex_upon_outcome: String
});

//Create new object (of Type, Schema, existing collection)
const Animal = mongoose.model("Animal", animalSchema, "Animals");

app.get("/", function(req, res){
    res.sendFile(__dirname + "/main.html");
    //res.render("list", {listTitle: "Today", newListItems: items})
});

app.post("/submit", function(req, res){
    var name = req.body.name;
    var data = [];
    Animal.find({"name": name}, function (err, animals) {
        if (err) {
            //if error print to console
            console.log(err);
        } else {
            //If no error loop through animals and print names to console. 
            animals.forEach(function(animal){
                console.log(animal);
                data.push(animal.animal_id);
            })
        }
        res.send(data);
    });
})

app.listen(process.env.PORT || 3000,  function(){
    console.log("Listening on port 3000");
})






