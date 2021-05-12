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

const update =async (req,res)=>{
let department_id=req.params.department_id


    const { name, location} = req.body

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).json({ errors })
    }

    let department;

    try{
        department = await Department.findById(department_id)
    }catch (e){
        return res.status(500).json({ message : e.toString()})
    }

    department.name = name
    department.location = location

    try{
        await department.save()
    }catch (e){
        return res.status(500).json({ message: "Whoops, Something went wrong."})
    }

    return res.status(200).json({department})
}

const deleteDepartment = async (req,res)=>{
    let department_id=req.params.department_id


    let department;

    try{
        department = await Department.findById(department_id)
    }catch (e) {
        return res.status(404).json({ message : e.toString()})
    }

    try{
        await Employee.remove({department_id})
    }catch (e) {
        return res.status(500).json({ message: "Unable to delete emps"})
    }

    try{
        await department.remove()
    }catch (e) {
        return res.status(500).json({ message: " Something went wrong"})
    }

    return res.status(200).json({ message : "department deleleted"})
}

exports.index=index;
exports.show=show;
//exports.DepartmentByEmployee = DepartmentByEmployee;
exports.search=search;
exports.store=store;
exports.update=update;
exports.deleteDepartment=deleteDepartment;
