const dbConfig = require("../config/dbConfig");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

pool:{
    max:dbConfig.pool.max,
    min:dbConfig.pool.min,
    acquire:dbConfig.pool.acquire,
    idle:dbConfig.pool.idle
}
});

const db={}
db.Sequelize=Sequelize
db.sequelize=sequelize
db.User=require('./user.js')(sequelize,DataTypes)
db.Canidate=require('./canidate.js')(sequelize,DataTypes)
db.Party=require('./party.js')(sequelize,DataTypes)
db.Constituency=require('./constituency.js')(sequelize,DataTypes)
db.Election=require('./election.js')(sequelize,DataTypes)
db.Vote=require('./vote.js')(sequelize,DataTypes)
db.History=require('./history.js')(sequelize,DataTypes)
db.User.associate(db)
db.Canidate.associate(db)
db.Party.associate(db)
db.Constituency.associate(db)
db.Vote.associate(db)
db.History.associate(db)

db.sequelize.sync({force:false}).then(()=>{"db connected and synced successfully"})
module.exports=db