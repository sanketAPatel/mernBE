const mongoose = require('mongoose')
const Schema = mongoose.Schema

const departmentSchema=new Schema({
            name:{type:String,required:true},
            location:{type:String,required:true},
    employee:[{type:mongoose.Types.ObjectId,required:true,ref:'Employee'}]
})

module.exports=mongoose.model('Department',departmentSchema)