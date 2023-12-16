import { Request, Response } from 'express';
import { UserModel } from "../models/UserModel.js";
import { User, ValidateInput } from "../schemas/UserSchema.js";

export class UserController {

  private userModel;

  constructor({ userModel }: any)
  {
    this.userModel = userModel;
  }

  public async getAll(req: Request, res: Response) {

    const [ records ]: any = await UserModel.getAll();

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

  public async getOne(req: Request, res: Response) {

    const id_str: string  = req.params.id;
    const regexp = /^[1-9][0-9]*$/;

    const { id, email, username } = req.body;

    if (id)
    {
      // validaciones para ID ingresado
    }

    if (email)
    {
      // validaciones para EMAIL ingresado
    }

    if (username)
    {
      // validaciones para USERNAME ingresado
    }



    if (regexp.test(id_str))
    {
      const id: number = parseInt(id_str);
  
      if ( (!isNaN(id)) && (id > 0 && id < 99999999999) )
      {
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

  public async create(req: Request, res: Response) {

    const validation = ValidateInput(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: JSON.parse(validation.error.message)
      });
    }

    const newUser: User|false = await UserModel.create(validation.data);

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

  public async update(req: Request, res: Response) {
    
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

    const result: any = await UserModel.update(data);

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

  public async delete(req: Request, res: Response) {
    
    const id_str : string  = req.body.id;
    const regexp = /^[1-9][0-9]*$/;

    if (regexp.test(id_str))
    {
      const id: number = parseInt(id_str);
  
      if ( (!isNaN(id)) && (id > 0 && id < 99999999999) )
      {
        const result: any = await UserModel.delete(id);
    
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