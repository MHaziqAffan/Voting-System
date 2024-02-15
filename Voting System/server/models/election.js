module.exports = (sequelize, DataTypes) => {
  const Election = sequelize.define("Election", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    startDate: {
      type: DataTypes.DATE,
      allowedNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowedNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowedNull: false,
    },
  });
  Election.associate = (models) => {
    Election.hasOne(models.Vote, { foreignKey: 'electionid', as: 'vote' });
  //     // Associate Party with Canidate using the 'partyid' field
  //     Election.hasMany(models.Canidate, { foreignKey: 'partyid', as: 'candidate' });
   };
  return Election;
};
