import {Request,Response} from "express";
import {body, validationResult } from "express-validator";

export default function UserControllerValidate(request:Request, response:Response): any  {
    
    // body('email').isEmail();
    
    // const errors = validationResult(request);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }


    // console.log("sem erros");
    // console.log(errors);

}