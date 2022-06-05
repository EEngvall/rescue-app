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
});

app.post("/submit", function(req, res){
    var input = req.body.input;
    var filter = req.body.filter;
    var age_upon_outcome = []
    var animal_id = []
    var animal_type = []
    var breed = []
    var color = []
    var date_of_birth =[]
    var name = []
    var outcome_type = []
    var sex_upon_outcome = []
    Animal.find({[filter]:input}, function (err, animals) {
        if (err) {
            //if error print to console
            console.log(err);
        } else {
            //If no error loop through animals and print names to console.
            //This for each loop inserts the animals attributes into the above empty arrays.  I currently do this becuase I'm
            //having a difficult time iterating over the animal objects using EJS and getting them to appear correctly. 
            //This method requires more memory since I'm using individualy arrays so it will need to be refactored at some point to resolve this issue.  
            animals.forEach(function(animal){
                age_upon_outcome.push(animal.age_upon_outcome);
                animal_id.push(animal.animal_id);
                animal_type.push(animal.animal_type);
                breed.push(animal.breed);
                color.push(animal.color);
                date_of_birth.push(animal.date_of_birth);
                name.push(animal.name);
                outcome_type.push(animal.outcome_type);
                sex_upon_outcome.push(animal.sex_upon_outcome);

            })
            console.log(filter, input)
            //Passes the value of each array back to the ejs file for use. 
            res.render("animals", {
                name: name, 
                animal_id: animal_id, 
                animal_type: animal_type, 
                breed:breed, color:color, 
                date_of_birth:date_of_birth,
                name:name,
                outcome_type:outcome_type,
                sex_upon_outcome:sex_upon_outcome
            });

        }
    });
})

//Redirects back to the root route. 
app.post("/retry", function(req, res) {
    res.redirect("/")
})

//Verifys server is up and running on necessary port, or 3000 if no environement variable is specified. 
app.listen(process.env.PORT || 3000,  function(){
    console.log("Listening on port 3000");
})






