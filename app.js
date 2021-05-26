const express =require('express');
const  app =express();
const port =process.env.PORT||4000
const bodyParser=require('body-parser')
const {check}=require('express-validator')
const mongoose=require('mongoose');

const employeeRoutes=require('./routes/employees')
const departmentRoutes= require('./routes/departments')




app.use(bodyParser.json());

app.use((req,res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Headers','Origin, Content-Type, Accept')
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE')

    next()
})
app.use('/api/employees',employeeRoutes)
app.use('/api/departments',departmentRoutes)

app.listen(port,()=>{
    console.log(`this app runs on http://localhost:${port}`);
})

mongoose.connect('mongodb+srv://sanketraj:Nopassword1@cluster0.7lwoz.mongodb.net/ems?retryWrites=true&w=majority'
,{ useNewUrlParser: true ,useUnifiedTopology:true })
.then(()=>{
    console.log(`developement sertver started on ${port}`);
}).catch(()=>{
        console.log('unable to connect');
})