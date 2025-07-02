import sequelize, { DataTypes } from "sequelize";

const User = sequelize.define("User",{
    username:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    password:{
        type:DataTypes.password,
        allowNull:false
    }
},
{
    timestamps:true,
    tablename:"users"
        
})

module.exports = User