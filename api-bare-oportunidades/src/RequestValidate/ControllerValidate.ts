import { check} from 'express-validator';

export const UserControllerValidate: any = {
	validations: [
        check('email').isEmail(),
        check("senha").isLength({min:6, max:15}),
        check('tp_usuario').notEmpty()
    ],
};