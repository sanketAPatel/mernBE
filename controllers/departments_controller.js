const {validationResult}=require('express-validator');
const Employee=require('../models/employee');
const Department=require('../models/department');


const index=async  (req,res)=>{
    let departments;
    try {
        departments=await Department.find();
    }
    catch (e){
        return res.status(417).json({'message':e})
    }

    return res.status(200).json({departments})


}

const show = async (req,res)=>{
    let department_id=req.params.department_id;

    let department;

    try {
        department= await Department.findById(department_id)
    }catch {
        return  res.status(500).json({message:'not found id '})
    }
    if(!department){
        return res.status(401).json({'message':'no employee found by that id'})
    }
    //console.log(employee)
    res.status(200).json({department});

}

     /*const DepartmentByEmployee=(req,res)=>{
    let employee_id=req.params.employee_id;


    let employees
    try {
        employees=await Employee.find({department_id})
    }catch (e) {
        return  res.status(500).json('employee not found,check id please')
    }
    if(!employees){

        return res.status(401).json({'message':'no employee found by that id'})
    }

    return res.status(200).json({employees});
}*/

const search=(req,res)=>{

    return res.status(200).json({'message':'to search all the department '});
}

const store=async (req,res)=>{
    const { name, location } = req.body

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).json({ errors })
    }

    const newDepartment = new Department({
        name,
        location
    })

    try{
        await newDepartment.save()
    }catch (e){
        return res.status(500).json({ message : e.toString()})
    }

    return res.status(201).json( { author : newDepartment})

}

const update =(req,res)=>{
let department_id=req.params.department_id
    return res.status(200).json({'message':'update tge department by id '+department_id});
}

const deleteDepartment =(req,res)=>{
    let department_id=req.params.department_id
    return res.status(200).json({'message':'delte the department by id'+department_id});
}

exports.index=index;
exports.show=show;
//exports.DepartmentByEmployee = DepartmentByEmployee;
exports.search=search;
exports.store=store;
exports.update=update;
exports.deleteDepartment=deleteDepartment;
