import { Router } from 'express';
import { UserController } from "../controllers/UserController.js";
import multer from "multer";

import { UserModel } from "../models/UserModel.js";

const upload = multer({
    dest: 'public/articulos/fotos/'
});

export const CreateUserRouter = ({userModel}: any) => {
    const UsersRouter = Router();
    const userController = new UserController({userModel});
    UsersRouter.use(upload.none());
    UsersRouter.get('/', userController.getAll);
    UsersRouter.get('/:id', userController.getOne);
    UsersRouter.post('/', userController.create);
    UsersRouter.put('/', userController.update);
    UsersRouter.delete('/', userController.delete);
}