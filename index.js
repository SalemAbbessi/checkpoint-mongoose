const express = require("express");
const mongoose = require("mongoose");
const Person=require('./src/models/person.js');
const person = require("./src/models/person.js");
require('dotenv').config()

const server = process.env.SERVER
const database = process.env.DB
const PORT = process.env.PORT

// instance mel expresse 

 const app= express()
// connect to data base
mongoose.connect( `mongodb://${server}/${database}`,
  { useNewUrlParser: true, useUnifiedTopology: true });

  // Check if the connection is successful
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

  // const db = mongoose.connection;
  // db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  // db.once('open', () => {
  //   console.log('Connected to MongoDB');
  // });

 
// Ques 1 :CREATE PERSON and Save it

// const newPerson=new Person({
//   name:'salem',
//   age:29,
//   favoriteFoods:"lablebi"
// })


// newPerson.save()
// .then(Person => {
//       console.log('Person saved:', person);
//   })
//   .catch(err => {
//     console.error(err);
//   });


// Ques2:Create Many Records with model.create()
const arrayOfPersons = [
    {
     name: "patrick",
    age: 30,
      favoriteFoods: ["Sushi", "Chocolate"],
    },
    {
      name: "rosa",
      age: 18,
      favoriteFoods: ["Pizza", "Ice Cream"],
    },
    {
      name: "antoine",
      age: 20,
      favoriteFoods: ["Burger", "Pasta"],
    },
  ];
  
  // Ques 3:Create several people with Model.create(), using the function argument arrayOfPeople
  // Person.create(arrayOfPersons)
  //   .then((createdPersons) => {
  //     console.log("Persons created:", createdPersons);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });
  
// Ques 4:Use model.find() to Search Your Database
// const searchName='rosa'
// Person.find({name:searchName})
// .then (foundPersons=>{
//   console.log(`Persons with name '${searchName}':`, foundPersons);
// })
// .catch(err => {
//     console.error(err);
//   })

// Ques 5 :Use model.findOne() to Return a Single Matching Document from Your Database

//   const searchFood = 'lablebi';

// Person.findOne({ favoriteFoods: searchFood })
//   .then(foundPerson => {
//     console.log(`Person with '${searchFood}' in favorites:`, foundPerson);
//   })
//   .catch(err => {
//     console.error(err);
//   })
//  Ques 6: Use model.findById() to Search Your Database By _id
  
// const personId = '65678b21f8a2f29317938d16';

// Person.findById(personId)
//   .then(foundPerson => {
//     console.log(`Person with _id '${personId}':`, foundPerson);
//   })
//   .catch(err => {
//     console.error(err);
//   })

// Use Model.findById() with promises to find a person with the given id
// const personId = '65678b21f8a2f29317938d18';

// Person.findById(personId)

// .then(foundPerson => {

//   if (!foundPerson) {
//     console.log(`Person with _id '${personId}' not found.`);
//     return;
//        }
//        foundPerson.favoriteFoods.push('couscous');

//        return foundPerson.save();
//       })
//       .then(updatedPerson => {

//             if (updatedPerson) {

//               console.log(`Person with _id '${personId}' updated:`, updatedPerson);
//             }
//           })
//           .catch(err => {
//             console.error(err);
//           })
//           .finally(() => {
        
//             mongoose.connection.close();
//           });
         //Ques 8 :Perform New Updates on a Document Using model.findOneAndUpdate()

          // const personName = 'rosa';
          //  Person.findOneAndUpdate(
          //     { name: personName },
          //     { age: 20 },
          //     { new: true } 
          //   )
          //     .then(updatedPerson => {
          //       if (!updatedPerson) {
          //         console.log(`Person with name '${personName}' not found.`);
          //         return;
          //       }
            
          //       console.log(`Person with name '${personName}' updated:`, updatedPerson);
          //     })
          //     .catch(err => {
          //       console.error(err);
          //     })
          //     .finally(() => {
          //       mongoose.connection.close();
          //     });


            // Ques 9: Delete One Document Using model.findByIdAndRemove

            // const personId = '65678df75ae12837d0f53a33'

            // Person.findOneAndDelete({ _id: personId })
            //   .then(removedPerson => {
            //     if (!removedPerson) {
            //       console.log(`Person with _id '${personId}' not found.`);
            //       return;
            //     }
            
            //     console.log(`Person with _id '${personId}' removed:`, removedPerson);
            //   })
            //   .catch(err => {
            //     console.error(err);
            //   })
            //   .finally(() => {
            //     mongoose.connection.close();
            //   });
            
            // Ques 10 :MongoDB and Mongoose - Delete Many Documents with model.remove()    
  //           Person.deleteMany({ name: 'patrick' })
  // .then(result => {
  //   console.log(`Number of people named 'patrick' deleted:`, result.deletedCount);
  // })
  // .catch(err => {
  //   console.error(err);
  // })
  // .finally(() => {
    
  //   mongoose.connection.close();
  // });   
// Ques 11:Chain Search Query Helpers to Narrow Search Results
  // middleware for handle data json

  Person.find({ favoriteFoods: 'Pizza' })
  .sort('name')   // Sort the results by name
  .limit(2)       // Limit the results to two documents
  .select('-age') // Hide their age
  .exec()
  .then(data => {
    console.log('People who like Pizza:', data);
  })
  .catch(err => {
    console.error(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
app.use(express.json())


app.listen(PORT, () => {
    console.log(`server is runing on httt://${server}:${PORT}`)
  })

