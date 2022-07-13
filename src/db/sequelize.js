const { Sequelize, DataTypes } = require('sequelize')
const pokemons = require('./mock-pokemon')
const bcrypt=require("bcrypt")
// import models
const PokemonModel = require('../models/pokemon')
const UserModel=require("../models/users")
//... others models.... 


// connexion à la bd
const sequelize = new Sequelize(
    "Pokedex",// db name
    "postgres", //sgbd name
    "lenovot430", //sgbd pw
    {
        host:"localhost",
        dialect:"postgres", // Driver name
        dialectOptions:{
            timezone:"Etc/GMT-2"
        },
        logging:false
    }
)

// we authentificate   or check the connexion with the db
sequelize.authenticate()
.then( ()=>{
    console.log("Connected")
} )
.catch(err=>{
    console.log("error: "+err)
})

 // we call all model before for sync with sequelize
const Pokemon = PokemonModel(sequelize, DataTypes)
const User=UserModel(sequelize,DataTypes)
// const an other model....
// an other one.....

const initDb = () => {
    // we sync with the db all models
  return sequelize.sync({force: true}).then(_ => { 
    // after we can perfor other actions

    // here we add pokémons for test
    pokemons.map(pokemon => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp, 
        picture: pokemon.picture,
        types: pokemon.types
      }).then(pokemon =>{
        console.log(pokemon.toJSON())
      }) 
    }) 

    // we add new user for test
    bcrypt.hash("lenovot430",10) // we crypt password
    .then(hash=>{
       User.create({
      username:"gogosokombe1@gmail.com",
      password:hash 
    })
    .then(user=> console.log(user.toJSON()))

    } )
    console.log('La base de donnée a bien été initialisée !')
  })
}
  
module.exports = { 
  initDb, // to use in the app.js for init db
   Pokemon, // to user in routes files for creating end points
   // we can return much model synced with sequelize here...
   User
}