const express=require('express')
const router =express.Router();
const {check}=require('express-validator')
const employeeController =require('../controllers/employees_controller');

router.get('/',employeeController.index);
router.get('/:employee_id',employeeController.show);
router.post('/department/:department_id',employeeController.employeeByDepartment);
router.get('/search',employeeController.search);
router.post('/',employeeController.store);


router.patch('/:employee_id',
    [check('title','cant be empty').not().isEmpty()
        ,    check('department','minimum length is 4')
                .isLength({min:4,max:25})]
        ,employeeController.update)


router.delete('/:employee_id',employeeController.deleteEmployee)
module.exports=router;

//[check('department','cant be empty').not().isEmpty(),
//             check('title','minimum length is 4').isLength({min:4})]