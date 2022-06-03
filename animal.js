const mongoose = require("mongoose");
const url = "mongodb+srv://EEngvall:10011014eE@cluster0.frqsy.mongodb.net/AAC?retryWrites=true&w=majority"
//const url = "mongodb://localhost:27017/AAC"

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


//Example animal
const animal = new Animal ({
    age_upon_outcome: "8 Years",
    animal_id: "J726666",
    animal_type: "Dog",
    breed: "Beagal Mix",
    color: "Black",
    date_of_birth: "2014-07-04",
    name: "Max",
    outcome_type: "Adoption",
    sex_upon_outcome: "Neutered Male"
});


// Animal.create([animal], function(err){
//     if(err){
//         console.log(err);
//     } else {
//         console.log("Successfully Added!")
//     }
// })

// Animal.find(function(err, animals){
//     console.log(animals);
// })

//Print all animal names to console
Animal.find(function (err, animals) {
    if (err) {
        //if error print to console
        console.log(err);
    } else {
        //If no error loop through animals and print names to console. 
        animals.forEach(function(animal){
            console.log(animal.name);
        })
    }
});


