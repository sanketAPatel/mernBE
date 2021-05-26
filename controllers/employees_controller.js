const {validationResult}=require('express-validator');
const Employee=require('../models/employee');
const Department=require('../models/department');



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


const show =  async (req,res)=>{
    let employee_id=req.params.employee_id;

    let employee;

        try {
            employee= await Employee.findById(employee_id)
        }catch {
            return  res.status(500).json({message:'not found id '})
        }
    if(!employee){
        return res.status(401).json({'message':'no employee found by that id'})
    }
    //console.log(employee)
     res.status(200).json({employee});

}

const employeeByDepartment= async (req,res)=>{
    let department_id=req.params.department_id;

   // const employee=dummyDB.filter( e => e.department === department_id);
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
        department = await Department.findById(department_id);
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
       //   console.log(newEmployee)
        department.employees.push(newEmployee)
        await department.save()
    } catch (e) {
        return res.status(500).json({message: e.toString()})

    }

    return res.status(201).json({newEmployee})

}

const update = async (req,res)=>{
    const{id,name,age,department,title}=req.body;
    let employee_id=req.params.employee_id;

    const errors=validationResult(req)
    if(!errors.isEmpty()){
        res.json({errors})
    }

    let employee;
    try {
        employee=  await Employee.findById(employee_id);
    }catch (e){
        return  res.status(500).json({message:'please check the id '})
    }

    //employee.id=id;
    employee.name=name;
    employee.age=age;
   employee.department=department;
    employee.title=title;


try {
    await  employee.save();
}catch (e){
        res.status(417).json({message:'data not updated for employee'})
}
   // return res.status(200).json({'message':'update the employees by id '+employee_id});
}

const deleteEmployee =async  (req,res)=>{
    let employee_id=req.params.employee_id;

   // dummyDB=dummyDB.filter( e => e.id !== employee_id)
    let employee;
    try {
        employee=await Employee.findById(employee_id);
    }
   catch (e) {
       return res.status(404).json({'message':'no emp found'});
   }

   let department= await Department.findById(employee.department_id);

   try {
        await  department.employees.pull(employee);
              department.save();
       await employee.remove();
          }

          catch (e) {
       return res.status(417).json({'message':'employee details not deleted - '+ e.toString()})
   }

    return res.status(200).json({'message':'delete the employees by id '+employee_id});
}

exports.index=index;
exports.show=show;
exports.employeeByDepartment = employeeByDepartment;
exports.search=search;
exports.store=store;
exports.update=update;
exports.deleteEmployee=deleteEmployee;
