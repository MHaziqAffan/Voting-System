
module.exports=(sequelize,DataTypes)=>{
    const Vote=sequelize.define('Vote',{
     id:{
         type:DataTypes.INTEGER,
         primaryKey:true,
         autoIncrement:true
     },
     votercnic:{
         type:DataTypes.STRING,
         allowedNull:false,
         unique:true
     },
     canidateid:{
        type:DataTypes.STRING,
     },
     electionid:{
         type:DataTypes.INTEGER,
         allowedNull:false,
     },
    })
    Vote.associate = (models) => {
        Vote.belongsTo(models.User, { foreignKey: 'votercnic', as: 'voter' });
        // Associate Canidate with Party using the 'partyid' field
        Vote.belongsTo(models.User, { foreignKey: 'canidateid', as: 'canidate' });
         // Associate Canidate with Constituency using the 'constituencyid' field
        Vote.belongsTo(models.Election, { foreignKey: 'electionid', as: 'election' });
      };
    return Vote
 }
