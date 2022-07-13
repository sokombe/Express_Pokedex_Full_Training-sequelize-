const { Pokemon } = require('../../db/sequelize')
const {Op}=require("sequelize")  

// for authorization
const auth=require("../../auth/auth")

module.exports = (app) => {
  app.get('/api/pokemons',auth, (req, res) => {

    if(req.query.name){ // if there is a name as param for search
    
      const name=req.query.name
      const limit= parseInt(req.query.limit) || 3  // if null you affect 3 
      
      if(name.length<2){ // restriction for less than 2 caracters for search
        const message=`Votre recherche doit contenir au moin 2 caractère pour le nom du pokémon`
        return res.status(400).json({message})
      }

      return Pokemon.findAndCountAll({  //findAll renvoie la liste de total et sans donner le nombre total
        where:
        {
          /* name:{ // name from model(db)
            [Op.eq]:name // name from user req.query for search with equality strict
          } */
          // approximative search( renvoie la liste des pokémons dont leurs noms contiennent le terme name de la requête)
          name:{
            [Op.like]: `%${name}%`
          }
        },
        limit:limit, // to limit number of results
        //offset: 5, limit: 5,
        order:['name']
      })
      .then(({count,rows})=>{
        const message=`Il ya ${count} pokémon(s) correspondant(s) au terme de recherche ${name}`
        res.json({message,data:rows})
      })
    }
    else{ // without params
         Pokemon.findAll({
          order:['name'],

        })
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée.'
        res.json({ message, data: pokemons })
      })
      .catch(error=>{
        const message=`La liste des pokémons n'a pas pu être récupérée. Réessayer dans quelques  instants.`
        res.status(500).json({message,data:error})
      })
    }

 
  })
}