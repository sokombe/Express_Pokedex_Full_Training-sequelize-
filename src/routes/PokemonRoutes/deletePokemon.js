const { Pokemon } = require('../../db/sequelize')

// for authorization
const auth=require("../../auth/auth")
  
module.exports = (app) => {
  app.delete('/api/pokemons/:id',auth, (req, res) => {
    Pokemon.findByPk(req.params.id).then(pokemon => {
      if(pokemon===null){
        const message=`Le pokémon démandé n'existe pas  Réessayer avec un autre identifiant.`
      return  res.status(404).json({message,data:error}) 
      }
      const pokemonDeleted = pokemon;
     return  Pokemon.destroy({
        where: { id: pokemon.id }
      })
      .then(_ => {
        const message = `Le pokémon avec l'identifiant n°${pokemonDeleted.id} a bien été supprimé.`
        res.json({message, data: pokemonDeleted })
      })  
    })
    .catch(error=>{
      const message=`Le pokémons n'a pas pu être supprimé. Réessayer dans quelques  instants.`
      res.status(500).json({message,data:error})
    })
  })
}