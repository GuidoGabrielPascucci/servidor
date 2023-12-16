import express from 'express';
import cors from 'cors';
import { CreateUserRouter } from "./routes/users.js";


export const createApp = ({userModel}: any) => {

  const app = express();
  const PORT = 3000;
  app.disable('x-powered-by');
  app.set("key_jwt", "pascucci.guido");
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());
  app.use('/users', CreateUserRouter({userModel}));
  
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  })

}