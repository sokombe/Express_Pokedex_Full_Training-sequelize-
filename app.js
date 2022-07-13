//On crée une instance de la dépendance express qu'on va utiliser 
const express=require("express")                              
const favicon=require("serve-favicon")
const bodyParser=require("body-parser")
const cors=require("cors")
const sequelize=require("./src/db/sequelize")


const app=express()
const port= process.env.PORT || 5000  // process.env.PORT for production envirenment

// middleware
app
.use(favicon(__dirname +'/favicon.ico'))
.use(bodyParser.json())
.use(cors())

// we init our db
sequelize.initDb()
   
// Différents points de terminaisons ICI:

// 0. The root end-point
app.get("/",(req,res)=>{
    res.json("Hello dear user 👋! Welcome to Pokemons Api")
})

//1. pour les pokemons:
//create
require("./src/routes/PokemonRoutes/createPokemon")(app)
//read
require("./src/routes/PokemonRoutes/findPokemonByPK")(app)
require("./src/routes/PokemonRoutes/findAllPokemons")(app)
//update
require("./src/routes/PokemonRoutes/updatePokemon")(app)
//delete
require("./src/routes/PokemonRoutes/deletePokemon")(app)

// 2. User routes
// login
require("./src/routes/UserRoutes/login")(app)

// Errors Handling
// 404
app.use(({res})=>{
const message="Impossible  de trouver la ressource  demandée ! Vous pouvez essayer une autre URL."
res
.status(404)
.json(message)
})


//On démare notre serveur sur le port 
app.listen(port,()=>console.log(`Notre Application tourne sur: http://localhost:${port}`))



