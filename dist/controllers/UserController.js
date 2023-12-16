import { UserModel } from "../models/UserModel.js";
import { ValidateInput } from "../schemas/UserSchema.js";
export class UserController {
    userModel;
    constructor({ userModel }) {
        this.userModel = userModel;
    }
    async getAll(req, res) {
        const [records] = await UserModel.getAll();
        if (records.length) {
            res.status(200).json({
                success: true,
                status: 200,
                message: `${records.length} records fetched`,
                data: records
            });
        }
        else {
            res.status(404).json({
                success: false,
                status: 404,
                message: `No records fetched`,
                data: null
            });
        }
    }
    async getOne(req, res) {
        const id_str = req.params.id;
        const regexp = /^[1-9][0-9]*$/;
        const { id, email, username } = req.body;
        if (id) {
            // validaciones para ID ingresado
        }
        if (email) {
            // validaciones para EMAIL ingresado
        }
        if (username) {
            // validaciones para USERNAME ingresado
        }
        if (regexp.test(id_str)) {
            const id = parseInt(id_str);
            if ((!isNaN(id)) && (id > 0 && id < 99999999999)) {
                // const record: any = await UserModel.getOne(id);
                // const result: any = await UserModel.getOne_tupla(['email', ]);
                // if (result.success)
                // {
                //   return res.status(200).json({
                //     success: true,
                //     status: 200,
                //     message: `Found`,
                //     data: result
                //   });
                // }
            }
        }
        res.status(404).json({
            success: false,
            status: 404,
            message: `Not found`,
            data: null
        });
    }
    async create(req, res) {
        const validation = ValidateInput(req.body);
        if (!validation.success) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: JSON.parse(validation.error.message)
            });
        }
        const newUser = await UserModel.create(validation.data);
        if (newUser) {
            return res.status(200).json({
                success: true,
                status: 200,
                message: `User created`,
                data: newUser
            });
        }
        else {
            return res.status(400).json({
                success: false,
                status: 404,
                message: `User not created`,
                data: null
            });
        }
    }
    async update(req, res) {
        const { lastname, name, username, email, password, country, role } = req.body;
        // aqui irian las validaciones !!!
        const data = {
            lastname,
            name,
            username,
            email,
            password,
            country,
            role
        };
        const result = await UserModel.update(data);
        if (result.affectedRows) {
            return res.status(200).json({
                success: true,
                status: 200,
                message: `User updated`,
            });
        }
        res.status(400).json({
            success: false,
            status: 404,
            message: `Not updated`,
        });
    }
    async delete(req, res) {
        const id_str = req.body.id;
        const regexp = /^[1-9][0-9]*$/;
        if (regexp.test(id_str)) {
            const id = parseInt(id_str);
            if ((!isNaN(id)) && (id > 0 && id < 99999999999)) {
                const result = await UserModel.delete(id);
                if (result.affectedRows) {
                    return res.status(200).json({
                        success: true,
                        status: 200,
                        message: `Deleted succesfully`,
                    });
                }
            }
        }
        res.status(404).json({
            success: false,
            status: 404,
            message: `Not deleted`,
        });
    }
}
//# sourceMappingURL=UserController.js.map