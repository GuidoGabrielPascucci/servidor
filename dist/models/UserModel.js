import mysql from 'mysql2/promise';
// type InsertResult = OkPacket | ResultSetHeader;
// type ALGO = [OkPacket | mysql.RowDataPacket[] | ResultSetHeader[] | mysql.RowDataPacket[][] | OkPacket[] | mysql.ProcedureCallPacket, mysql.FieldPacket[]]
const config = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'vuela_poker_db'
};
const connection = await mysql.createConnection(config);
// const connection = await mysql.createConnection(config);
// let tuple: [ number, boolean, string ];
// const passingResponse: [string, string | number] = ["key", 'value'];
export class UserModel {
    static async getAll() {
        const [result] = await connection.query('SELECT * FROM users');
        return result;
    }
    static async getOneById(id) {
        const [result] = await connection.query(`SELECT * FROM users WHERE id = ?`, id);
        return result;
    }
    static async getOneByEmail(email) {
        const [result] = await connection.query(`SELECT * FROM users WHERE email = ?`, email);
        return result;
    }
    static async getOneByUsername(username) {
        const [result] = await connection.query(`SELECT * FROM users WHERE username = ?`, username);
        return result;
    }
    // CON TUPLA
    static async getOne_tupla(input) {
        const not_success_result = { success: false, data: null };
        if (input[0] === 'id' && typeof input[1] !== 'number') {
            return not_success_result;
        }
        const [result] = await connection.query(`SELECT * FROM users WHERE ? = ?`, [input[0], input[1]]);
        console.log(result);
        if (result.length) {
            return { success: true, data: result };
        }
        else {
            return not_success_result;
        }
    }
    // CON OBJETO
    static async getOne_obj(input) {
        const not_success_result = { success: false, data: null };
        if (input.key === 'id' && typeof input.value !== 'number') {
            return not_success_result;
        }
        const [result] = await connection.query(`SELECT * FROM users WHERE ? = ?`, [input.key, input.value]);
        console.log(result);
        if (result.length) {
            return { success: true, data: result };
        }
        else {
            return not_success_result;
        }
    }
    // public static async getSome(input: UserInput) {
    //   const [ result ] = await connection.query(`SELECT * FROM users WHERE id = ?`, id);
    //   return result;
    // }
    // public static async getByCountry(countries: UserInput) {
    //   const [ result ] = await connection.query(`SELECT * FROM users WHERE id = ?`, id);
    //   return result;
    // }
    static async create(input) {
        try {
            const [result] = await connection.query(`
        INSERT INTO users (lastname, name, username, email, password, country, role)
          VALUES (?, ?, ?, ?, ?, ?, ?)`, [input.lastname, input.name, input.username, input.email, input.password, input.country, input.role]);
            let insertedId = 0;
            if ('affectedRows' in result && result.affectedRows > 0) {
                insertedId = result.insertId;
            }
            if (insertedId) {
                const [select_results] = await connection.query(`SELECT * FROM users WHERE id=${insertedId}`);
                const newUser = select_results[0];
                return newUser;
            }
            else {
                return false;
            }
        }
        catch (e) {
            // No dejar al descubierto, puede enviar información sensible de la db
            // Enviar la traza a un servicio interno para verlo más adelante
            // sendLog(e)
            throw new Error('Error creating new User');
        }
    }
    static async update(input) {
        const [result] = await connection.query(`UPDATE users SET lastname=${input.lastname}, name=${input.name}, username=${input.username}, email=${input.email}, password=${input.password}, country=${input.country}, role=${input.role}`);
        return result;
    }
    static async delete(id) {
        const [result] = await connection.query(`DELETE FROM users WHERE id=${id}`);
        return result;
    }
}
//# sourceMappingURL=UserModel.js.map