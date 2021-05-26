const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employeeSchema= new Schema({
    name:{ type :String ,required:true},
    age : {type:String,required:true},
    title:{type:String,required:true},
    department_id:{type:mongoose.Types.ObjectId,required:true,ref:'Department' }

})
module.exports =mongoose.model('Employee',employeeSchema)