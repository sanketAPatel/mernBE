const {validationResult}=require('express-validator');
const Employee=require('../models/employee');
const Department=require('../models/department');

let dummyDB=[
    {
        id: '1',
        name:'n1',
        age:'a1',
        department:'d1',
        title:'c1'
    },
    {
        id: '2',
        name:'t1',
        age:'d1',
        department:'d1',
        title:'c1cc'
    },
    {
        id: '3',
        name:'n31',
        age:'d1',
        department:'d2',
        title:'c23'
    },
    {
        id: '4',
        name:'tn4',
        age:'d1df',
        department:'d2',
        title:'c2'
    }

]

const index= async (req,res)=>{

    let employees;
    try {
        employees=await Employee.find();
    }
    catch (e){
        return res.status(417).json({'message':e})
    }


    return res.status(200).json({employees})
}




const show = (req,res)=>{
 let employee_id=req.params.employee_id

    const employee=dummyDB.find( e =>e.id === employee_id);

    if(!employee){

        return res.status(401).json({'message':'no employee found by that id'})
    }
    return res.status(200).json({employee});

}

const employeeByDepartment=(req,res)=>{
    let department_id=req.params.department_id;

    const employee=dummyDB.filter( e => e.department === department_id);
    if(!employee){

        return res.status(401).json({'message':'no employee found by that id'})
    }

    return res.status(200).json({employee});
}

const search=(req,res)=>{

    return res.status(200).json({'message':'to search all the employees '});
}


const store=async (req, res) => {
     // 1. rxv body params from req,
      //chceck department exist by the
    //create object for new employee  saving the employee with model; send resp.

    const {id, name, age, department_id, title} = req.body  //object destructuring approach

    let department;

    try {
        department = Department.find(department_id);
    } catch (e) {
        return res.status(500).json({message: e.toString()})
    }

    const newEmployee = new Employee({
        name,
        age,
        department_id,
        title
    })


    try {
        await newEmployee.save()
        department.employee.push(newEmployee)
       await department.save()
    } catch (e) {
        return res.status(500).json({message: e.toString()})

    }

    //  dummyDB.push(newEmployee);
         newEmployee.save();

    // return res.status(200).json({'message':'to add new employees '});
}

const update =(req,res)=>{
    const{id,name,age,department,title}=req.body;
    let employee_id=req.params.employee_id;
    const employee=dummyDB.find(e=> e.id==employee_id);
    employee.id=id;
    employee.name=name;
    employee.age=age;
    employee.department=department;
    employee.title=title;
    //const employeeIndex= dummyDB.findIndex(e=> e.id === employee_id);
   // dummyDB[employeeIndex]=employee;

    const errors=validationResult(req)
    if(!errors.isEmpty()){
        res.json({errors})
    }

    return res.status(200).json({'message':'update tge emplouees by id '+employee_id});
}

const deleteEmployee =(req,res)=>{
    let employee_id=req.params.employee_id;

    dummyDB=dummyDB.filter( e => e.id !== employee_id)
    return res.status(200).json({'message':'delte the employees by id '+employee_id});
}

exports.index=index;
exports.show=show;
exports.employeeByDepartment = employeeByDepartment;
exports.search=search;
exports.store=store;
exports.update=update;
exports.deleteEmployee=deleteEmployee;
