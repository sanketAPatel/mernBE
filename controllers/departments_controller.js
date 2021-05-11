
const index=(req,res)=>{
    return res.status(200).json({'message':'here  ill show all the departmetns  in list '});
}

const show = (req,res)=>{
    let department_id=req.params.department_id;
    return res.status(200).json({'message':'here illl show department  by id '+department_id});

}

const DepartmentByEmployee=(req,res)=>{
    let employee_id=req.params.employee_id;
    return res.status(200).json({'message':'here Ill show department from the employee '+employee_id});
}

const search=(req,res)=>{

    return res.status(200).json({'message':'to search all the department '});
}

const store=(req,res)=>{

    return res.status(200).json({'message':'to add new department '});
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
exports.DepartmentByEmployee = DepartmentByEmployee;
exports.search=search;
exports.store=store;
exports.update=update;
exports.deleteDepartment=deleteDepartment;
