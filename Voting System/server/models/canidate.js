
module.exports=(sequelize,DataTypes)=>{
    const Canidate=sequelize.define('Canidate',{
     id:{
         type:DataTypes.STRING,
         allowedNull:false,
         primaryKey:true,
         unique:true
     },
     cnic:{
         type:DataTypes.STRING,
         allowedNull:false,
     },
     partyid:{
         type:DataTypes.STRING,
         allowedNull:false,
     },
     status:{
         type:DataTypes.STRING,
         allowedNull:true,
 
     },
     constituencyid:{
         type:DataTypes.INTEGER,
         allowedNull:false,
 
     }
    })
    Canidate.associate = (models) => {
        // Associate Canidate with User using the 'cnic' field
        Canidate.belongsTo(models.User, { foreignKey: 'cnic', as: 'user' });
        
        // Associate Canidate with Party using the 'partyid' field
        Canidate.belongsTo(models.Party, { foreignKey: 'partyid', as: 'party' });
        // Associate Canidate with Constituency using the 'constituencyid' field
        Canidate.belongsTo(models.Constituency, { foreignKey: 'constituencyid', as: 'constituency' });
       
      };
    return Canidate
 }
