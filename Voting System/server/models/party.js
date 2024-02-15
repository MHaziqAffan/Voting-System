
module.exports=(sequelize,DataTypes)=>{
    const Party=sequelize.define('Party',{
     id:{
         type:DataTypes.STRING,
         allowedNull:false,
         primaryKey:true,
         unique:true
     },
     name:{
         type:DataTypes.STRING,
         allowedNull:false,
     },
     symbol:{
         type:DataTypes.STRING,
         allowedNull:true
     }
    })
    Party.associate = (models) => {
        // Associate Party with Canidate using the 'partyid' field
        Party.hasMany(models.Canidate, { foreignKey: 'partyid', as: 'candidate' });
      };
    return Party
 }