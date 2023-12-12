import { Router } from 'express';
import { UserController } from "../controllers/UserController";
import multer from "multer";

export const UsersRouter = Router();

const upload = multer({
    dest: 'public/articulos/fotos/'
});

UsersRouter.use(upload.none());

UsersRouter.get('/', UserController.getAll);
UsersRouter.get('/:id', UserController.getOne);
UsersRouter.post('/', UserController.create);
UsersRouter.put('/', UserController.update);
UsersRouter.delete('/', UserController.delete);

// usersRouter.post('/users', upload.none(), Login.ValidarLogin);
// usersRouter.put('/users', upload.none(), Login.ValidarLogin);
// usersRouter.delete('/users', upload.none(), Login.ValidarLogin);
// app.get('/users', Login.ValidarLogin);
// app.get('/users', upload.none(), Login.ValidarLogin);