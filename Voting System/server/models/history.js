
module.exports=(sequelize,DataTypes)=>{
    const History=sequelize.define('History',{
     id:{
         type:DataTypes.INTEGER,
         primaryKey:true,
         autoIncrement:true
     },
     votercnic:{
         type:DataTypes.STRING,
         allowedNull:false,
     },
     canidateid:{
        type:DataTypes.STRING,
     },
     electionid:{
         type:DataTypes.INTEGER,
         allowedNull:false,
     },
    })
    History.associate = (models) => {
        History.belongsTo(models.User, { foreignKey: 'votercnic', as: 'voter' });
        // Associate Canidate with Party using the 'partyid' field
        History.belongsTo(models.User, { foreignKey: 'canidateid', as: 'canidate' });
         // Associate Canidate with Constituency using the 'constituencyid' field
        History.belongsTo(models.Election, { foreignKey: 'electionid', as: 'election' });
      };
    return History
 }
