const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
	// Aqui definimos el modelo

  sequelize.define('actividad', {
	  id:{
		  type: DataTypes.INTEGER,
	          primaryKey: true
	  },
	  name: {
		  type: DataTypes.STRING,
		  allowNull: false,
	},
	difficulty: {
	type: DataTypes.ENUM ("1","2","3","4","5")
	},
	duration: {
	type: DataTypes.INTEGER
	},
	season: { 
	type: DataTypes.ENUM("verano","otoño","invierno","primavera")
	},
	country: {
	type: DataTypes.STRING
	}
  },  // cierra actividad
	{
	timestamps: false
	})
// {freezeTableName: true,}
  };



