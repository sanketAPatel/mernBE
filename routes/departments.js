const express=require('express')
const router= express.Router();


const DepartmentController=require('../controllers/departments_controller');


router.get('/',DepartmentController.index);
router.get('/:department_id',DepartmentController.show);
router.get('/employee/:employee_id',DepartmentController.DepartmentByEmployee);
router.get('/search',DepartmentController.search);
router.post('/',DepartmentController.store);

router.patch('/:department_id',

    DepartmentController.update)
router.delete('/:department_id',DepartmentController.deleteDepartment)


module.exports=router;

