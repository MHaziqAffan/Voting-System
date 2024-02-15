
module.exports=(sequelize,DataTypes)=>{
    const Constituency=sequelize.define('Constituency',{
     id:{
         type:DataTypes.INTEGER,
         allowedNull:false,
         primaryKey:true,
         unique:true,
         autoIncrement:true
     },
     name:{
         type:DataTypes.STRING,
         allowedNull:false,
         unique:true
     }
    })
    Constituency.associate = (models) => {
        // Associate Constituency with User and Canidate
        Constituency.hasMany(models.User, { foreignKey: 'constituencyid', as: 'user' });
        Constituency.hasMany(models.Canidate, { foreignKey: 'constituencyid', as: 'candidate' });
      };
    return Constituency
 }