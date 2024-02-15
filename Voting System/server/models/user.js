
module.exports=(sequelize,DataTypes)=>{
    const User=sequelize.define('User',{
     cnic:{
         type:DataTypes.STRING,
         allowedNull:false,
         primaryKey:true,
         unique:true
     },
     name:{
         type:DataTypes.STRING,
         allowedNull:false,
     },
     email:{
         type:DataTypes.STRING,
     },
     password:{
         type:DataTypes.STRING,
         allowedNull:false,
     },
     type:{
         type:DataTypes.STRING,
         allowedNull:true,
 
     },
     constituencyid:{
         type:DataTypes.INTEGER,
         allowedNull:false,
 
     },
     picture: { // New field for image URL or path
       type: DataTypes.STRING,
       allowNull: true,
     },
    })
    User.associate = (models) => {
        // Associate User with Canidate using the 'cnic' field
        User.hasMany(models.Canidate, { foreignKey: 'cnic', as: 'canidates' });
        User.hasOne(models.Vote, { foreignKey: 'votercnic', as: 'vote' });
        User.hasMany(models.History, { foreignKey: 'votercnic', as: 'history' }); // Associate User with Constituency using the 'constituencyid' field
    User.belongsTo(models.Constituency, { foreignKey: 'constituencyid', as: 'constituency' });
    //User.hasMany(models.Vote, { foreignKey: 'cnic', as: 'votes' });
      };
    return User
 }
