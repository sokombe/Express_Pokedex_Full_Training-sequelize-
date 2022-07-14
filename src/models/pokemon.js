const validType=['Plante','Poison','Feu','Eau','Insecte','Vol','Normal','Electrik','Fée']

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false ,
        unique:{
          msg:"Le nom est déjà pris"
        },
        validate:{
          notEmpty:{msg:"Le nom ne peut pas être vide..."},
          notNull:{msg:"Le nom est une propietés requise."},
          max:{
            args:[25],
            msg: "La taille du nom doit  varier entre 1 à 25 caractères."
          }
        }

      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
          isInt:{msg:"Utilisez uniquement des nombres entiers pour les points de vie."},
          notNull:{msg:"Les points de vie sont une propietés requise."},
          min:{
            args:[0],
            msg:"Le point de vie doivent être supérieurs ou égale à 0."
          },
          max:{
            args:[99],
            msg:"Le point de vie doivent être inférieur ou égale à 99."
          }
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
          isInt:{msg:"Utilisez uniquement des nombres entiers pour les cp."},
          notNull:{msg:"Les cp sont une propietés requise."}
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          isUrl:{msg:"Utilisez une Url valide pour l'image du pokémon."},
          notNull:{msg:"L'Url est une propietés requise."}
        }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get(){
            return this.getDataValue("types").split(",")
        },
        set(types){
            this.setDataValue("types",types.join())
        },
        validate:{
          isTypeValid(fromUserType){
            if(!fromUserType){
              throw new Error("Un pokémon doit avoir au moins un type")
            }
            if(fromUserType.split(",").length>3){
              throw new Error("Un pokémon ne peut pas avoir plus de trois type")
            }
            fromUserType.split(",").forEach(type => {
              if(!validType.includes(type)){
                throw new Error(`Le type d'un pokémon doit appartenir à la liste suivante : ${validType}`)
              }
            });
          }
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: true
    })
  }