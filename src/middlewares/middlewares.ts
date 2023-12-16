// import { Router } from 'express';
// const mwRouter = Router();

// mwRouter.use()

// const JWT_Controller = new JWT(jwt, app.get("key_jwt"));

// const verificar_jwt = express.Router();
// const verificar_empleado = express.Router();

// verificar_jwt.use(JWT_Controller.VerificarToken);
// verificar_empleado.use(JWT_Controller.VerificarToken);






// const verificar_empleado = express.Router();


// verificar_empleado.use(async (request: any, response: any, next: any) => {

//   const db = new Database(request.getConnection);
//   const data = request.body;

//   try {
//     const result: any = await db.GenerarConsulta('SELECT * FROM empleados WHERE correo = ? AND clave = ?', [data.correo, data.clave]);

//     if (result.length > 0) {
//       response.obj_empleado = result[0];
//       next();
//     }
//     else {
//       response.send(JSON.stringify({
//         exito: false,
//         mensaje: 'Correo y/o clave incorrectas',
//         jwt: null,
//         status: 403
//       }));
//     }

//   }
//   catch (err) {
//     response.send(err);
//   }

// });








//////


// app.get('/', verificar_jwt, async (request: any, response: any) => {

//   try {
//     const db = new Database(request.getConnection);
//     const results: any = await db.TraerTodos('users');

//     const obj: any = {}

//     if (results.length > 0) {
//       obj.exito = true;
//       obj.mensaje = `Se envían ${results.length} usuarios`;
//       obj.dato = JSON.stringify(results);
//       obj.status = 200;
//     }
//     else {
//       obj.exito = false;
//       obj.mensaje = `No hay usuarios existentes`;
//       obj.dato = null;
//       obj.status = 424;
//     }

//     response.send(JSON.stringify(obj));
//   }
//   catch (err) {
//     response.send(err);
//   }

// })

// app.post('/', verificar_jwt, upload.single('foto'), async (request: any, response: any) => {

//   let articulo = JSON.parse(request.body.articulo_json);

//   let file = request.file;
//   let extension = mime.extension(file.mimetype);
//   let path = `${file.destination}/${articulo.tipo}.${extension}`;
//   let shortPath = `${articulo.tipo}.${extension}`;
//   fs.renameSync(file.path, path);

//   const data_articulo: any = {
//     tipo: articulo.tipo,
//     precio: articulo.precio,
//     path_foto: shortPath
//   }

//   try {
//     const db = new Database(request.getConnection);
//     const result = await db.Agregar('articulos', data_articulo);
//     const exito = result['exito'];
//     const mensaje = result['mensaje'];
//     const obj: any = {
//       exito,
//       mensaje
//     };
//     response.send(JSON.stringify(obj));
//   }
//   catch (err) {
//     response.send(err);
//   }

// })

// app.delete('/', verificar_jwt, upload.none(), async (request: any, response: any) => {

//   const id = request.body.id_articulo;

//   try {
//     const db = new Database(request.getConnection);
//     let result: any = await db.GenerarConsulta('SELECT path_foto FROM articulos WHERE id = ?', id);
    
//     const obj: any = {
//       exito: false,
//       mensaje: '',
//       status: 418
//     };

//     if (result.length > 0) {

//       const foto_articulo = result[0].path_foto;

//       result = null;
//       result = await db.Eliminar('articulos', id);

//       if (result.exito) {

//         let path = './public/articulos/fotos/' + foto_articulo;

//         fs.unlink(path, (err: any) => {
//           if (err) {
//             console.log("Hay un error....!!!!");
//             throw (err);
//           }
//         });

//         obj.exito = true
//         obj.mensaje = "Articulo eliminado exitosamente";
//         obj.status = 200;
//       }
//       else {
//         obj.mensaje = "No se ha podido eliminar tal articulo";
//       }
//     }
//     else {
//       obj.mensaje = "No se ha encontrado tal articulo";
//     }

//     response.send(JSON.stringify(obj));
//   }
//   catch (err) {
//     response.send(err);
//   }

// })

// app.post('/login', verificar_empleado, (request: any, response: any) => {

//   const user = response.obj_empleado;

//   const payload = {
//     empleado: {
//       id: user.id,
//       correo: user.correo,
//       nombre: user.nombre,
//       perfil: user.perfil
//     },
//     alumno: "pascucci_guido",
//     dni_alumno: "39288349"
//   };

//   const token = jwt.sign(payload, app.get("key_jwt"), {
//     expiresIn: "3m"
//   });

//   response.json({
//     exito: true,
//     mensaje: 'Credenciales válidas. Autenticando e ingresando al sitio',
//     jwt: token,
//     status: 200
//   });

// })

// app.get('/login', verificar_jwt, (request: any, response: any) => {

//   response.json({
//     exito: true,
//     mensaje: "Se envía payload",
//     payload: response.jwt,
//     status: 200
//   });

// })

// app.post("/crear_token", (request: any, response: any) => {

//   let obj_user = request.body;

//   if ((obj_user.usuario == "admin" || obj_user.usuario == "user") && obj_user.clave == "123456") {
//     //SE CREA EL PAYLOAD CON LOS ATRIBUTOS QUE SE NECESITAN
//     const payload = {
//       usuario: obj_user.usuario,
//       perfil: obj_user.usuario == "admin" ? "administrador" : "usuario",
//       fecha: new Date(2023, 9, 12, 14, 17, 0),
//     };

//     //SE FIRMA EL TOKEN CON EL PAYLOAD Y LA CLAVE SECRETA
//     const token = jwt.sign(payload, app.get("key_jwt"), {
//       expiresIn: "1m"
//       //exp: Math.floor(Date.now() / 1000) + 60
//     });

//     response.json({
//       exito: true,
//       mensaje: "JWT creado",
//       jwt: token
//     });
//   }
//   else {
//     response.json({
//       exito: false,
//       mensaje: "Usuario no registrado!!!",
//       jwt: null
//     });
//   }
// });



/////////


// app.post("/crear_token", JWT_Controller.CrearToken);
// app.post('/login', upload.none(), Login.ValidarLogin);

// app.get('/users', Login.ValidarLogin);
// app.get('/users', upload.none(), Login.ValidarLogin);
// app.post('/users', upload.none(), Login.ValidarLogin);
// app.put('/users', upload.none(), Login.ValidarLogin);
// app.delete('/users', upload.none(), Login.ValidarLogin);

/*
[GET] /           -> OBTENER REGISTROS
[POST] /          -> CREAR UN REGISTRO
[PUT] /           -> MODIFICAR UN REGISTRO
[DELETE] /        -> ELIMINAR UN REGISTRO
*/
